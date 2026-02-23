/**
 * TITLED GAMES WEBSITE JAVASCRIPT
 * 
 * This script handles all interactive features of the website:
 * - Mobile navigation menu
 * - Smooth scrolling
 * - Back to top button
 * - Particle animation system
 * - Scroll-based animations
 * - Seasonal decorations (Halloween in October, Christmas in December)
 * 
 * Well-documented for easy maintenance by the team
 */

// ============================================
// INITIALIZATION
// Wait for DOM to be fully loaded before running scripts
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initParticles();
    initScrollAnimations();
    initBackToTop();
    initSeasonalDecorations();
    initDarkMode();
});

// ============================================
// NAVIGATION FUNCTIONALITY
// Handles mobile menu toggle and smooth scrolling
// ============================================
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu on hamburger click
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (hamburger && navMenu) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });
}

// ============================================
// PARTICLE ANIMATION SYSTEM
// Creates floating particles in the hero section
// ============================================
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    
    if (!particlesContainer) return;
    
    // Configuration for particle system
    const particleCount = 50; // Number of particles to create
    const colors = [
        'rgba(255, 153, 102, 0.3)',  // Primary orange
        'rgba(255, 153, 102, 0.2)',  // Secondary orange lighter
        'rgba(255, 153, 102, 0.4)'   // Accent orange darker
    ];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, colors);
    }
}

/**
 * Creates a single particle with random properties
 * @param {HTMLElement} container - The container to add the particle to
 * @param {Array} colors - Array of possible colors for the particle
 */
function createParticle(container, colors) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties for variety
    const size = Math.random() * 5 + 2; // 2-7px
    const color = colors[Math.floor(Math.random() * colors.length)];
    const startX = Math.random() * 100; // 0-100% from left
    const startY = Math.random() * 100; // 0-100% from top
    const duration = Math.random() * 20 + 15; // 15-35s animation
    const delay = Math.random() * 10; // 0-10s delay
    
    // Apply styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = color;
    particle.style.left = `${startX}%`;
    particle.style.top = `${startY}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    container.appendChild(particle);
}

// ============================================
// SCROLL ANIMATIONS
// Adds fade-in effects when elements come into view
// ============================================
function initScrollAnimations() {
    // Elements to animate on scroll
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before element enters viewport
    };
    
    // Callback function for intersection observer
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    };
    
    // Create observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.value-item, .game-card, .team-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ============================================
// BACK TO TOP BUTTON
// Shows/hides button based on scroll position
// ============================================
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// DARK MODE TOGGLE
// Allows users to switch between light and dark themes
// ============================================
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');
    const body = document.body;
    const navLogo = document.getElementById('logoImage');
    const heroLogo = document.getElementById('heroLogoImage');
    const footerLogo = document.getElementById('footerLogoImage');
    
    if (!darkModeToggle || !darkModeIcon) return;
    
    // Check for saved dark mode preference
    const darkModePreference = localStorage.getItem('darkMode');
    
    // Apply saved preference or system preference
    if (darkModePreference === 'enabled') {
        body.classList.add('dark-mode');
        darkModeIcon.textContent = '☀️';
        if (navLogo) navLogo.src = 'assets/logos/dark.png';
        if (heroLogo) heroLogo.src = 'assets/logos/dark.png';
        if (footerLogo) footerLogo.src = 'assets/logos/dark.png';
    } else if (darkModePreference === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
        darkModeIcon.textContent = '☀️';
        if (navLogo) navLogo.src = 'assets/logos/dark.png';
        if (heroLogo) heroLogo.src = 'assets/logos/dark.png';
        if (footerLogo) footerLogo.src = 'assets/logos/dark.png';
        localStorage.setItem('darkMode', 'enabled');
    }
    
    // Toggle dark mode on button click
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            darkModeIcon.textContent = '☀️';
            if (navLogo) navLogo.src = 'assets/logos/dark.png';
            if (heroLogo) heroLogo.src = 'assets/logos/dark.png';
            if (footerLogo) footerLogo.src = 'assets/logos/dark.png';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            darkModeIcon.textContent = '🌙';
            if (navLogo) navLogo.src = 'assets/logos/light.png';
            if (heroLogo) heroLogo.src = 'assets/logos/light.png';
            if (footerLogo) footerLogo.src = 'assets/logos/light.png';
            localStorage.setItem('darkMode', 'disabled');
        }
    });
}

// ============================================
// SEASONAL DECORATIONS
// Adds themed decorations based on the current month
// ============================================
function initSeasonalDecorations() {
    const currentMonth = new Date().getMonth(); // 0-11 (0 = January, 9 = October, 11 = December)
    
    // October = Halloween decorations
    if (currentMonth === 9) {
        applyHalloweenTheme();
    }
    // December = Christmas decorations
    else if (currentMonth === 11) {
        applyChristmasTheme();
    }
}

/**
 * Applies Halloween theme decorations
 * Active during October (month index 9)
 */
function applyHalloweenTheme() {
    document.body.classList.add('halloween-theme');
    
    // Add pumpkins to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const pumpkinLeft = createDecoration('🎃', 'halloween-pumpkin halloween-left');
        const pumpkinRight = createDecoration('🎃', 'halloween-pumpkin halloween-right');
        heroContent.appendChild(pumpkinLeft);
        heroContent.appendChild(pumpkinRight);
    }
    
    // Add floating bats
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 8; i++) {
            const bat = createDecoration('🦇', 'halloween-bat');
            const randomX = Math.random() * 100;
            const randomDelay = Math.random() * 5;
            const randomDuration = 15 + Math.random() * 10;
            
            bat.style.left = `${randomX}%`;
            bat.style.animationDelay = `${randomDelay}s`;
            bat.style.animationDuration = `${randomDuration}s`;
            
            particlesContainer.appendChild(bat);
        }
    }
    
    // Add spooky ghost
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const ghost = createDecoration('👻', 'halloween-ghost');
        navbar.appendChild(ghost);
    }
}

/**
 * Applies Christmas theme decorations
 * Active during December (month index 11)
 */
function applyChristmasTheme() {
    document.body.classList.add('christmas-theme');
    
    // Add Christmas trees to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const treeLeft = createDecoration('🎄', 'christmas-tree christmas-left');
        const treeRight = createDecoration('🎄', 'christmas-tree christmas-right');
        heroContent.appendChild(treeLeft);
        heroContent.appendChild(treeRight);
    }
    
    // Add snowflakes
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const snowflakeEmojis = ['❄️', '❅', '❆'];
        for (let i = 0; i < 20; i++) {
            const snowflake = createDecoration(
                snowflakeEmojis[Math.floor(Math.random() * snowflakeEmojis.length)],
                'christmas-snowflake'
            );
            const randomX = Math.random() * 100;
            const randomDelay = Math.random() * 5;
            const randomDuration = 10 + Math.random() * 10;
            
            snowflake.style.left = `${randomX}%`;
            snowflake.style.animationDelay = `${randomDelay}s`;
            snowflake.style.animationDuration = `${randomDuration}s`;
            
            particlesContainer.appendChild(snowflake);
        }
    }
    
    // Add Santa hat to logo
    const logo = document.querySelector('.nav-brand .logo');
    if (logo) {
        const santaHat = createDecoration('🎅', 'christmas-santa');
        logo.parentElement.classList.add('has-seasonal-decoration');
        logo.parentElement.appendChild(santaHat);
    }
    
    // Add presents
    const footer = document.querySelector('.footer-brand');
    if (footer) {
        const present = createDecoration('🎁', 'christmas-present');
        footer.appendChild(present);
    }
}

/**
 * Helper function to create a decoration element
 * @param {string} emoji - The emoji to use for decoration
 * @param {string} className - CSS class name for styling
 * @returns {HTMLElement} - The created decoration element
 */
function createDecoration(emoji, className) {
    const decoration = document.createElement('span');
    decoration.textContent = emoji;
    decoration.className = `seasonal-decoration ${className}`;
    decoration.setAttribute('aria-hidden', 'true'); // Hide from screen readers
    return decoration;
}

// ============================================
// UTILITY FUNCTIONS
// Helper functions that can be used throughout the site
// ============================================

/**
 * Debounce function to limit how often a function can be called
 * Useful for scroll and resize events
 * @param {Function} func - The function to debounce
 * @param {number} wait - Time to wait in milliseconds
 */
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

/**
 * Checks if an element is in the viewport
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} - True if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// PERFORMANCE OPTIMIZATION
// Optimize animations for better performance
// ============================================

// Pause animations when tab is not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause heavy animations when tab is hidden
        document.querySelectorAll('.particle').forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when tab is visible
        document.querySelectorAll('.particle').forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
    }
});

// ============================================
// CONSOLE MESSAGE
// Fun message for developers who inspect the site
// ============================================
console.log('%c🎮 Titled Games', 'font-size: 24px; font-weight: bold; color: #FF9966;');
console.log('%cWe Do Games', 'font-size: 16px; color: #FF9966;');
console.log('%cInterested in joining our team? Check out github.com/titledgames', 'font-size: 12px; color: #FF9966;');
