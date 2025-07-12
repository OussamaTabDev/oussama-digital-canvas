
// Configuration de l'animation typewriter avec support multilingue
const texts = {
    en: [
        "Web Developer & AI Specialist.",
        "Creator of innovative solutions.",
        "Python & JavaScript Expert.",
        "Passionate about Artificial Intelligence."
    ],
    ar: [
        "مطور ويب ومتخصص في الذكاء الاصطناعي.",
        "مبدع حلول مبتكرة.",
        "خبير في Python و JavaScript.",
        "شغوف بالذكاء الاصطناعي."
    ]
};

let currentLanguage = 'en';
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

// Animation typewriter
function typeWriter() {
    const typewriterElement = document.getElementById('typewriter');
    const currentTexts = texts[currentLanguage];
    const currentText = currentTexts[textIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % currentTexts.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Gestion des langues
function initLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    const currentLangSpan = document.getElementById('current-lang');
    
    // Toggle dropdown
    langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('active');
        }
    });
    
    // Handle language selection
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedLang = option.dataset.lang;
            if (selectedLang !== currentLanguage) {
                switchLanguage(selectedLang);
                
                // Update active state
                langOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                // Update current language display
                currentLangSpan.textContent = selectedLang.toUpperCase();
                
                // Close dropdown
                langDropdown.classList.remove('active');
            }
        });
    });
}

// Fonction pour changer de langue
function switchLanguage(lang) {
    currentLanguage = lang;
    const html = document.documentElement;
    
    // Update HTML lang and dir attributes
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update all elements with language data attributes
    const elements = document.querySelectorAll('[data-en][data-ar]');
    elements.forEach(element => {
        element.classList.add('loading');
        
        setTimeout(() => {
            if (lang === 'en') {
                element.textContent = element.getAttribute('data-en');
            } else if (lang === 'ar') {
                element.textContent = element.getAttribute('data-ar');
            }
            element.classList.remove('loading');
        }, 150);
    });
    
    // Restart typewriter animation with new language
    textIndex = 0;
    charIndex = 0;
    isDeleting = false;
    
    // Save language preference
    localStorage.setItem('preferred-language', lang);
    
    console.log(`🌐 Language switched to: ${lang}`);
}

// Load saved language preference
function loadLanguagePreference() {
    const savedLang = localStorage.getItem('preferred-language');
    if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
        // Update the active option
        const activeOption = document.querySelector(`[data-lang="${savedLang}"]`);
        if (activeOption) {
            document.querySelectorAll('.lang-option').forEach(opt => opt.classList.remove('active'));
            activeOption.classList.add('active');
            document.getElementById('current-lang').textContent = savedLang.toUpperCase();
        }
        
        // Switch to saved language
        switchLanguage(savedLang);
    }
}

// Navigation mobile
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fermer le menu lors du clic sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Toggle thème clair/sombre
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Vérifier le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
        updateThemeIcon(savedTheme);
    }
    
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.className = 'light-theme';
            localStorage.setItem('theme', 'light-theme');
            updateThemeIcon('light-theme');
        } else {
            body.className = 'dark-theme';
            localStorage.setItem('theme', 'dark-theme');
            updateThemeIcon('dark-theme');
        }
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#theme-toggle i');
    if (theme === 'light-theme') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
}

// Navigation fluide et navbar transparence
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        // Effet de transparence de la navbar
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(10, 10, 11, 0.95)';
            if (document.body.classList.contains('light-theme')) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        } else {
            navbar.style.background = 'rgba(10, 10, 11, 0.9)';
            if (document.body.classList.contains('light-theme')) {
                navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            }
        }
        
        // Animation des éléments au scroll
        animateOnScroll();
    });
}

// Animation des éléments lors du scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Gestion du formulaire de contact
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData);
        
        // Messages multilingues
        const messages = {
            en: {
                success: 'Message sent successfully! I will reply to you quickly.',
                error: 'Error sending message. Please try again.'
            },
            ar: {
                success: 'تم إرسال الرسالة بنجاح! سأرد عليك قريباً.',
                error: 'خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.'
            }
        };
        
        try {
            // Simuler un délai d'envoi
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Afficher un message de succès
            showNotification(messages[currentLanguage].success, 'success');
            
            // Réinitialiser le formulaire
            contactForm.reset();
            
        } catch (error) {
            showNotification(messages[currentLanguage].error, 'error');
        }
    });
}

// Système de notifications
function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        ${currentLanguage === 'ar' ? 'left: 20px;' : 'right: 20px;'}
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        transform: translateX(${currentLanguage === 'ar' ? '-100%' : '100%'});
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
        direction: ${currentLanguage === 'ar' ? 'rtl' : 'ltr'};
    `;
    
    document.body.appendChild(notification);
    
    // Animer l'apparition
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Supprimer après 5 secondes
    setTimeout(() => {
        notification.style.transform = `translateX(${currentLanguage === 'ar' ? '-100%' : '100%'})`;
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Smooth scroll pour les liens d'ancrage
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Ajout des classes fade-in aux éléments
function addFadeInClasses() {
    const elementsToAnimate = [
        '.about-content',
        '.project-card',
        '.contact-content',
        '.skill-category',
        '.education-item',
        '.bio-section',
        '.languages-section'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.classList.add('fade-in');
        });
    });
}

// Effet parallax léger sur le hero
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Animation des barres de niveau de langue
function animateLanguageBars() {
    const languageItems = document.querySelectorAll('.language-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const levelFill = entry.target.querySelector('.level-fill');
                if (levelFill) {
                    const width = levelFill.style.width;
                    levelFill.style.width = '0%';
                    setTimeout(() => {
                        levelFill.style.width = width;
                    }, 200);
                }
            }
        });
    }, { threshold: 0.5 });
    
    languageItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    // Charger les préférences de langue
    loadLanguagePreference();
    
    // Démarrer l'animation typewriter
    typeWriter();
    
    // Initialiser toutes les fonctionnalités
    initLanguageToggle();
    initMobileNavigation();
    initThemeToggle();
    initScrollEffects();
    initContactForm();
    initSmoothScroll();
    addFadeInClasses();
    initParallaxEffect();
    animateLanguageBars();
    
    // Animation initiale des éléments visibles
    setTimeout(animateOnScroll, 100);
    
    console.log('🚀 Portfolio Oussama - All systems operational! 🌟');
});

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    // Fermer le menu mobile si ouvert lors du redimensionnement
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const langDropdown = document.getElementById('lang-dropdown');
    
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Fermer le dropdown de langue
    langDropdown.classList.remove('active');
});

// Easter egg - Konami Code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

// Load the audio (ensure the file path is correct)
const konamiSound = new Audio('konami.mp3'); // Replace with your actual sound file

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        const easterEggMessages = {
            en: '🎉 Konami Code activated! You are a true geek!',
            ar: '🎉 تم تفعيل كود كونامي! أنت مبرمج حقيقي!'
        };
        
        showNotification(easterEggMessages[currentLanguage], 'success');
        // Play the Konami sound
        konamiSound.play().catch(err => console.error('Sound error:', err));
        // Petit effet visuel amusant
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
        
        konamiCode = [];
    }
});

// Animation rainbow pour l'easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);
