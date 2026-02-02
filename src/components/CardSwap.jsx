import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});
const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);
  const currentHoveredRef = useRef(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
      
      return tl;
    };

    const swapWithDelay = () => {
      const tl = swap();
      if (!tl) return;
      
      // Wait for animation to complete before scheduling next swap
      tl.then(() => {
        intervalRef.current = window.setTimeout(swapWithDelay, delay);
      });
    };

    swapWithDelay();

    // Add hover listeners to individual cards
    refs.forEach((ref, idx) => {
      const el = ref.current;
      if (!el) return;
      
      const handleMouseEnter = () => {
        // Reset previously hovered card if exists
        if (currentHoveredRef.current !== null && currentHoveredRef.current !== idx) {
          const prevEl = refs[currentHoveredRef.current].current;
          const prevIndex = order.current.indexOf(currentHoveredRef.current);
          const prevSlot = makeSlot(prevIndex, cardDistance, verticalDistance, refs.length);
          gsap.to(prevEl, {
            y: prevSlot.y,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
        
        // Set current as hovered
        currentHoveredRef.current = idx;
        
        gsap.to(el, {
          y: '-=30',
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out'
        });
      };
      
      const handleMouseLeave = () => {
        currentHoveredRef.current = null;
        const currentIndex = order.current.indexOf(idx);
        const slot = makeSlot(currentIndex, cardDistance, verticalDistance, refs.length);
        gsap.to(el, {
          y: slot.y,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        });
      };
      
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
      
      el._hoverCleanup = () => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      };
    });

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearTimeout(intervalRef.current);
      };
      const resume = () => {
        if (tlRef.current?.paused()) {
          tlRef.current?.play();
        } else {
          swapWithDelay();
        }
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        refs.forEach(ref => ref.current?._hoverCleanup?.());
        clearTimeout(intervalRef.current);
      };
    }
    return () => {
      refs.forEach(ref => ref.current?._hoverCleanup?.());
      clearTimeout(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const bringToFront = (clickedIndex) => {
    const currentPos = order.current.indexOf(clickedIndex);
    if (currentPos === 0) return; // Already at front

    // Reorder: clicked card goes to front, others shift
    const newOrder = [clickedIndex, ...order.current.filter(idx => idx !== clickedIndex)];
    
    const tl = gsap.timeline();
    tlRef.current = tl;

    // Animate all cards to their new positions
    newOrder.forEach((idx, i) => {
      const el = refs[idx].current;
      const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
      tl.set(el, { zIndex: slot.zIndex }, 0);
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out'
        },
        0
      );
    });

    tl.call(() => {
      order.current = newOrder;
    });
  };

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e);
            onCardClick?.(i);
            bringToFront(i);
          }
        })
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
