// Global translations object
let translations = {};
let currentLanguage = 'en';

// Load translations from JSON file
async function loadTranslations() {
    try {
        const response = await fetch('translations.json');
        translations = await response.json();
    } catch (error) {
        console.log('Error loading translations.json');
    }
}

// Generate language buttons dynamically based on translations
function generateLanguageButtons() {
    const languageList = document.getElementById('languageList');
    if (!languageList) return;
    
    languageList.innerHTML = '';
    
    const languageNames = {
        'en': 'English',
        'es': 'Español',
        'fr': 'Français',
        'de': 'Deutsch',
        'ja': '日本語',
        'ko': '한국어',
        'zh': '中文',
        'ru': 'Русский'
    };

    for (const lang in translations) {
        const langName = languageNames[lang] || lang;
        const button = document.createElement('button');
        button.textContent = langName;
        button.onclick = function(e) {
            e.preventDefault();
            setLanguage(lang);
        };
        
        if (lang === currentLanguage) {
            button.classList.add('active');
        }
        
        const li = document.createElement('li');
        li.appendChild(button);
        languageList.appendChild(li);
    }
}

// Apply translations to the page
function applyTranslations(lang) {
    if (!translations || !translations[lang]) {
        console.error('Language not found:', lang);
        return;
    }

    currentLanguage = lang;
    const langData = translations[lang];

    // Update page title
    const titleElement = document.getElementById('heroTitle');
    if (titleElement) {
        titleElement.textContent = langData.title || 'Grand Campaigns';
    }

    // Update company name
    const companyElement = document.getElementById('companyName');
    if (companyElement) {
        companyElement.textContent = langData.title || 'Grand Campaigns';
    }

    // Update current language display
    const currentLangSpan = document.getElementById('currentLang');
    if (currentLangSpan) {
        const langNames = {
            'en': 'English',
            'es': 'Español',
            'fr': 'Français',
            'de': 'Deutsch',
            'ja': '日本語',
            'ko': '한국어',
            'zh': '中文',
            'ru': 'Русский'
        };
        currentLangSpan.textContent = langNames[lang] || lang;
    }

    // Update footer links
    const privacyLink = document.getElementById('privacyLink');
    if (privacyLink) {
        privacyLink.textContent = langData.privacy || 'Privacy Policy';
    }

    const termsLink = document.getElementById('termsLink');
    if (termsLink) {
        termsLink.textContent = langData.terms || 'Terms of Service';
    }

    // Update copyright
    const copyrightText = document.getElementById('copyrightText');
    if (copyrightText) {
        copyrightText.textContent = langData.copyright || '© 2026 Grand Campaigns. All rights reserved.';
    }

    // Update select language title
    const selectLanguageTitle = document.getElementById('selectLanguageTitle');
    if (selectLanguageTitle) {
        selectLanguageTitle.textContent = langData.language || 'Select Language';
    }

    // Update language buttons
    updateLanguageButtons(lang);
    
    // Save preference to localStorage
    localStorage.setItem('selectedLanguage', lang);
}

// Update active state for language buttons
function updateLanguageButtons(lang) {
    const buttons = document.querySelectorAll('.language-list button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Find and mark the current language
    const languageNames = {
        'en': 'English',
        'es': 'Español',
        'fr': 'Français',
        'de': 'Deutsch',
        'ja': '日本語',
        'ko': '한국어',
        'zh': '中文',
        'ru': 'Русский'
    };

    buttons.forEach(button => {
        if (button.textContent === languageNames[lang]) {
            button.classList.add('active');
        }
    });
}

// Toggle language dropdown
function toggleLanguageDropdown() {
    const overlay = document.getElementById('languageOverlay');
    const dropdown = document.getElementById('languageDropdown');
    
    overlay.classList.toggle('active');
    dropdown.classList.toggle('active');
}

// Close language dropdown
function closeLanguageDropdown() {
    const overlay = document.getElementById('languageOverlay');
    const dropdown = document.getElementById('languageDropdown');
    
    overlay.classList.remove('active');
    dropdown.classList.remove('active');
}

// Set language and apply translations
function setLanguage(lang) {
    applyTranslations(lang);
    closeLanguageDropdown();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    await loadTranslations();
    
    // Get saved language or default to English
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    
    // Generate language buttons from available translations
    generateLanguageButtons();
    
    // Apply the saved language
    applyTranslations(savedLang);
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const btn = document.querySelector('.language-btn');
        const dropdown = document.getElementById('languageDropdown');
        const overlay = document.getElementById('languageOverlay');
        
        if (btn && dropdown && overlay && !dropdown.contains(event.target) && !btn.contains(event.target)) {
            if (dropdown.classList.contains('active')) {
                closeLanguageDropdown();
            }
        }
    });
});
