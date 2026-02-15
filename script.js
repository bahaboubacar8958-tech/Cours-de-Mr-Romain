/**
 * Script.js - Cours de Français de Mr Romain
 * Fonctionnalités interactives pour le site éducatif
 */

// ==========================================
// 1. PRÉCHARGEMENT ET INITIALISATION
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser toutes les fonctionnalités
    initLoader();
    initSmoothScroll();
    initMobileMenu();
    initNavbarScroll();
    initTabs();
    initScrollAnimations();
    initBackToTop();
    initCounterAnimation();
    initTypingEffect();
    initProgressBar();
    initSearchFilter();
    initDarkMode();
    initTooltips();
});

// ==========================================
// 2. ÉCRAN DE CHARGEMENT
// ==========================================

function initLoader() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        // Masquer immédiatement le loader
        loader.classList.add('loaded');
        loader.style.display = 'none';
    }
}

// ==========================================
// 3. DÉFILEMENT FLUIDE
// ==========================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Fermer le menu mobile si ouvert
                document.querySelector('.nav-links')?.classList.remove('active');
                
                // Défiler vers la cible
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Mettre à jour la navigation active
                updateActiveNav(targetId);
            }
        });
    });
}

function updateActiveNav(targetId) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// ==========================================
// 4. MENU MOBILE
// ==========================================

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Animation de l'icône hamburger
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Fermer le menu en cliquant à l'extérieur
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// ==========================================
// 5. EFFET NAVBAR AU SCROLL
// ==========================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Ajouter/retirer la classe scrolled
        if (currentScroll > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        // Masquer/afficher la navbar selon la direction du scroll
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar?.classList.add('navbar-hidden');
        } else {
            navbar?.classList.remove('navbar-hidden');
        }
        
        lastScroll = currentScroll;

        // Mettre à jour la navigation active selon la section visible
        updateNavOnScroll();
    });
}

function updateNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ==========================================
// 6. SYSTÈME D'ONGLETS (NIVEAUX)
// ==========================================

function initTabs() {
    const tabButtons = document.querySelectorAll('.level-tab');
    const tabContents = document.querySelectorAll('.level-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const level = button.dataset.level;
            
            // Retirer les classes actives
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.classList.remove('fade-in');
            });
            
            // Activer l'onglet cliqué
            button.classList.add('active');
            
            // Afficher le contenu correspondant avec animation
            const targetContent = document.getElementById(level);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.classList.add('fade-in');
            }
        });
    });
}

// ==========================================
// 7. ANIMATIONS AU SCROLL
// ==========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animation spéciale pour les stats uniquement
                if (entry.target.classList.contains('stat-item')) {
                    animateStatNumber(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observer uniquement les stats pour l'animation des compteurs
    document.querySelectorAll('.stat-item').forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// 8. BOUTON RETOUR EN HAUT
// ==========================================

function initBackToTop() {
    // Créer le bouton s'il n'existe pas
    let backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) {
        backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTop.setAttribute('aria-label', 'Retour en haut');
        document.body.appendChild(backToTop);
    }
    
    // Afficher/masquer selon le scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Action au clic
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// 9. ANIMATION DES COMPTEURS
// ==========================================

function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        counter.setAttribute('data-target', counter.innerText);
    });
}

function animateStatNumber(element) {
    const counter = element.querySelector('.stat-number');
    if (!counter || counter.classList.contains('counted')) return;
    
    counter.classList.add('counted');
    const target = counter.getAttribute('data-target');
    const isPercentage = target.includes('%');
    const targetNumber = parseInt(target.replace(/\D/g, ''));
    
    let current = 0;
    const increment = targetNumber / 50;
    const duration = 1500;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
            counter.innerText = isPercentage ? targetNumber + '%' : targetNumber;
            clearInterval(timer);
        } else {
            counter.innerText = isPercentage ? Math.floor(current) + '%' : Math.floor(current);
        }
    }, stepTime);
}

// ==========================================
// 10. EFFET DE FRAPPE (TYPING) - Désactivé pour éviter les sections vides
// ==========================================

function initTypingEffect() {
    // Effet désactivé - le texte reste visible
    return;
}

// ==========================================
// 11. BARRE DE PROGRESSION
// ==========================================

function initProgressBar() {
    // Créer la barre de progression
    let progressBar = document.querySelector('.scroll-progress');
    
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ==========================================
// 12. FILTRE DE RECHERCHE DES COURS
// ==========================================

function initSearchFilter() {
    const searchInput = document.querySelector('.course-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.discipline-card');
        
        cards.forEach(card => {
            const title = card.querySelector('h4')?.innerText.toLowerCase() || '';
            const content = card.querySelector('p')?.innerText.toLowerCase() || '';
            const topics = card.querySelector('.topics-list')?.innerText.toLowerCase() || '';
            
            const matches = title.includes(searchTerm) || 
                          content.includes(searchTerm) || 
                          topics.includes(searchTerm);
            
            card.style.display = matches ? '' : 'none';
            
            // Animation
            if (matches) {
                card.style.animation = 'fadeIn 0.3s ease';
            }
        });
    });
}

// ==========================================
// 13. MODE SOMBRE
// ==========================================

function initDarkMode() {
    let darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (!darkModeToggle) {
        darkModeToggle = document.createElement('button');
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeToggle.setAttribute('aria-label', 'Basculer le mode sombre');
        document.body.appendChild(darkModeToggle);
    }
    
    // Vérifier la préférence sauvegardée
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// ==========================================
// 14. TOOLTIPS
// ==========================================

function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.innerText = element.getAttribute('data-tooltip');
        element.appendChild(tooltip);
        element.classList.add('has-tooltip');
    });
}

// ==========================================
// 15. UTILITAIRES
// ==========================================

// Fonction de debounce pour optimiser les performances
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Fonction pour vérifier si un élément est visible
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Effet parallaxe pour le hero
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', debounce(() => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }, 10));
}

// Animation des cartes au survol avec effet 3D
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.discipline-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        }
    });
});

// Réinitialiser les cartes quand la souris quitte
document.querySelectorAll('.discipline-card').forEach(card => {
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// ==========================================
// 16. IMPRESSION DES COURS
// ==========================================

function printCourse(courseId) {
    const course = document.getElementById(courseId);
    if (course) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head>
                <title>Cours de Français - Mr Romain</title>
                <style>
                    body { font-family: 'Poppins', sans-serif; padding: 20px; }
                    h1, h2, h3 { color: #333; }
                    .print-header { text-align: center; margin-bottom: 30px; }
                </style>
            </head>
            <body>
                <div class="print-header">
                    <h1>Groupe Scolaire Cheick Cherif Sagale</h1>
                    <p>Cours de Français - Mr Romain A. ASSOGBA</p>
                </div>
                ${course.innerHTML}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// ==========================================
// 17. NOTIFICATIONS TOAST
// ==========================================

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==========================================
// 18. RACCOURCIS CLAVIER
// ==========================================

document.addEventListener('keydown', (e) => {
    // Ctrl + D : Mode sombre
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        document.querySelector('.dark-mode-toggle')?.click();
    }
    
    // Échap : Fermer le menu mobile
    if (e.key === 'Escape') {
        document.querySelector('.nav-links')?.classList.remove('active');
    }
    
    // Ctrl + Haut : Retour en haut
    if (e.ctrlKey && e.key === 'ArrowUp') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

console.log('🎓 Site de Mr Romain - Script chargé avec succès!');
