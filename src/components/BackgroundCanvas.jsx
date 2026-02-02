import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MAX_COLORS = 8;

const fragmentShader = `
#define MAX_COLORS ${MAX_COLORS}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

  vec3 col = vec3(0.0);
  float a = 1.0;

  if (uColorCount > 0) {
    vec2 s = q;
    vec3 sumCol = vec3(0.0);
    float cover = 0.0;
    for (int i = 0; i < MAX_COLORS; ++i) {
      if (i >= uColorCount) break;
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float m = mix(m0, m1, kMix);
      float w = 1.0 - exp(-6.0 / exp(6.0 * m));
      sumCol += uColors[i] * w;
      cover = max(cover, w);
    }
    col = clamp(sumCol, 0.0, 1.0);
    a = uTransparent > 0 ? cover : 1.0;
  }

  if (uNoise > 0.0001) {
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
    col += (n - 0.5) * uNoise;
    col = clamp(col, 0.0, 1.0);
  }

  vec3 rgb = (uTransparent > 0) ? col * a : col;
  gl_FragColor = vec4(rgb, a);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const BackgroundCanvas = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const clockRef = useRef(null);
  const pointerTargetRef = useRef(new THREE.Vector2(0, 0));
  const pointerCurrentRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    if (!canvasRef.current) return;

    // Configuration - Original colorful theme
    const config = {
      colors: ['#1a237e', '#283593', '#3949ab', '#5c6bc0'],
      rotation: 0,
      speed: 0.15,
      scale: 1.2,
      frequency: 0.8,
      warpStrength: 0.6,
      mouseInfluence: 0.5,
      parallax: 0.3,
      noise: 0.05,
      transparent: true,
      autoRotate: 0
    };

    // Initialize THREE.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const uColorsArray = Array.from({ length: MAX_COLORS }, () => new THREE.Vector3(0, 0, 0));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uCanvas: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uSpeed: { value: config.speed },
        uRot: { value: new THREE.Vector2(1, 0) },
        uColorCount: { value: 0 },
        uColors: { value: uColorsArray },
        uTransparent: { value: config.transparent ? 1 : 0 },
        uScale: { value: config.scale },
        uFrequency: { value: config.frequency },
        uWarpStrength: { value: config.warpStrength },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uMouseInfluence: { value: config.mouseInfluence },
        uParallax: { value: config.parallax },
        uNoise: { value: config.noise }
      },
      premultipliedAlpha: true,
      transparent: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: false,
      powerPreference: 'high-performance',
      alpha: true
    });
    rendererRef.current = renderer;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, config.transparent ? 0 : 1);

    // Helper function to convert hex to vec3
    const hexToVec3 = (hex) => {
      const h = hex.replace('#', '').trim();
      const v = h.length === 3
        ? [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)]
        : [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
      return new THREE.Vector3(v[0] / 255, v[1] / 255, v[2] / 255);
    };

    // Set colors
    const colorVecs = config.colors.map(hexToVec3);
    for (let i = 0; i < MAX_COLORS; i++) {
      if (i < colorVecs.length) {
        material.uniforms.uColors.value[i].copy(colorVecs[i]);
      }
    }
    material.uniforms.uColorCount.value = colorVecs.length;

    // Mouse tracking
    const handleMouseMove = (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      pointerTargetRef.current.set(x, y);
    };

    canvasRef.current.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      material.uniforms.uCanvas.value.set(w, h);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation loop
    const clock = new THREE.Clock();
    clockRef.current = clock;

    let animationId;
    const animate = () => {
      const dt = clock.getDelta();
      const elapsed = clock.elapsedTime;

      material.uniforms.uTime.value = elapsed;

      const deg = (config.rotation % 360) + config.autoRotate * elapsed;
      const rad = (deg * Math.PI) / 180;
      const c = Math.cos(rad);
      const s = Math.sin(rad);
      material.uniforms.uRot.value.set(c, s);

      // Smooth pointer interpolation
      const amt = Math.min(1, dt * 8);
      pointerCurrentRef.current.lerp(pointerTargetRef.current, amt);
      material.uniforms.uPointer.value.copy(pointerCurrentRef.current);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}
    />
  );
};

export default BackgroundCanvas;
