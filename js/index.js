// перевод EN/ES

class LanguageManager {
    constructor() {
        this.translatableElements = document.querySelectorAll('[data-es]');
        this.langToggle = document.getElementById('langToggle');
        this.currentLang = localStorage.getItem('lang') || 'en';
        this.pageKey = window.location.pathname; // Уникальный ключ для страницы

        this.init();
    }

    init() {
        // Сохраняем текст для страницы
        if (!localStorage.getItem(`${this.pageKey}_enTexts`)) {
            this.saveEnglishTexts();
        }

        this.applyLanguage();
        this.setupEventListeners();
    }

    saveEnglishTexts() {
        const enTexts = {};
        this.translatableElements.forEach((element, index) => {
            enTexts[index] = element.textContent;
        });
        localStorage.setItem(`${this.pageKey}_enTexts`, JSON.stringify(enTexts));
    }

    applyLanguage() {
        const enTexts = JSON.parse(localStorage.getItem(`${this.pageKey}_enTexts`)) || {};

        this.translatableElements.forEach((element, index) => {
            element.textContent = this.currentLang === 'es'
                ? element.dataset.es
                : enTexts[index];
        });

        this.langToggle.textContent = this.currentLang === 'en' ? 'ES' : 'EN';
        document.documentElement.lang = this.currentLang;
    }

    toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'es' : 'en';
        localStorage.setItem('lang', this.currentLang);
        this.applyLanguage();
    }

    setupEventListeners() {
        this.langToggle.addEventListener('click', () => this.toggleLanguage());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LanguageManager();
});

// навигация

const menuToggler = document.querySelector('.menu_toggler');
const nav = document.querySelector('.nav__block');

menuToggler.addEventListener('click', () => {
    menuToggler.classList.toggle('toggle_active');
    nav.classList.toggle('toggle_nav');
});

const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        menuToggler.classList.remove('toggle_active');
        nav.classList.remove('toggle_nav');
    });
});

// to-top

totop = document.querySelector('.to-top');
addEventListener('scroll', () => {
    // console.log(this.scrollY)
    if (this.scrollY > 1500) {
        totop.style.opacity = '0.4'
    } else {
        totop.style.opacity = '0'
    }
}, {passive: true})

totop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})