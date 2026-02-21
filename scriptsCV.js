/*!
    * Start Bootstrap - Resume v6.0.2 (https://startbootstrap.com/theme/resume)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
    */

// i18n functionality
window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage =  navigator.language || navigator.userLanguage;

    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
    console.log("User language: " + userPreferredLanguage)
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
