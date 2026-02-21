/*!
    * Start Bootstrap - Resume v6.0.2 (https://startbootstrap.com/theme/resume)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
    */

// i18n functionality
window.addEventListener('DOMContentLoaded', async () => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    const userPreferredLanguage = savedLanguage || navigator.language || navigator.userLanguage;

    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
    console.log("User language: " + userPreferredLanguage);

    // Update language selector if present
    const langSelector = document.getElementById('lang-selector');
    if (langSelector) {
        langSelector.value = mapLanguage(userPreferredLanguage);
        
        // Language selector change handler
        langSelector.addEventListener('change', async (e) => {
            const lang = e.target.value;
            localStorage.setItem('selectedLanguage', lang);
            const newLangData = await fetchLanguageData(lang);
            updateContent(newLangData);
        });
    }

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    
    if (mobileMenuBtn && mobileMenu && closeMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
        });
        
        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
        });
        
        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            });
        });
    }
});

function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = langData[key];
    });
}

async function fetchLanguageData(lang) {
    const currentLanguage = mapLanguage(lang);
    const response = await fetch(`languages/${currentLanguage}.json`);
    return response.json();
}

function mapLanguage(lang){
    if(lang.includes('fr'))
        return 'fr';
    if(lang.includes('en'))
        return 'en';
    return 'es'
}
