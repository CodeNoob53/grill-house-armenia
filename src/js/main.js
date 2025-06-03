// Main Application Script - Restaurant Landing Page

// Application state
let app = {
    animationManager: null,
    menuManager: null,
    orderManager: null,
    isInitialized: false
};

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    try {
        // Initialize managers in order
        app.animationManager = new AnimationManager();
        app.menuManager = new MenuManager(app.animationManager);
        app.orderManager = new OrderManager(app.animationManager);
        
        // Initialize UI components
        initializeHeader();
        initializeMobileMenu();
        initializeScrollEffects();
        
        // Initialize animations
        app.animationManager.initPageAnimations();
        
        // Mark as initialized
        app.isInitialized = true;
        
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Application initialization failed:', error);
    }
}

// Header functionality
function initializeHeader() {
    const header = Utils.dom.$('#header');
    const burger = Utils.dom.$('#burger');
    const mobileMenu = Utils.dom.$('#mobileMenu');
    
    if (!header) return;
    
    // Scroll effect for header
    let lastScrollY = window.scrollY;
    
    const handleScroll = Utils.events.throttle(() => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > CONFIG.ui.headerScrollThreshold) {
            Utils.dom.addClass(header, 'scrolled');
        } else {
            Utils.dom.removeClass(header, 'scrolled');
        }
        
        lastScrollY = currentScrollY;
    }, 16);
    
    window.addEventListener('scroll', handleScroll);
    
    // Mobile menu toggle
    if (burger && mobileMenu) {
        Utils.events.on(burger, 'click', () => {
            toggleMobileMenu();
        });
        
        // Close mobile menu when clicking on links
        Utils.events.on(mobileMenu, 'click', '.nav-link', () => {
            closeMobileMenu();
        });
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenu = Utils.dom.$('#mobileMenu');
    
    if (!mobileMenu) return;
    
    // Close menu when clicking outside
    Utils.events.on(document, 'click', (e) => {
        const burger = Utils.dom.$('#burger');
        if (!burger || !mobileMenu) return;
        
        if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    Utils.events.on(document, 'keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    const burger = Utils.dom.$('#burger');
    const mobileMenu = Utils.dom.$('#mobileMenu');
    
    if (!burger || !mobileMenu) return;
    
    const isOpen = Utils.dom.hasClass(mobileMenu, 'active');
    
    if (isOpen) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

// Open mobile menu
function openMobileMenu() {
    const burger = Utils.dom.$('#burger');
    const mobileMenu = Utils.dom.$('#mobileMenu');
    
    if (!burger || !mobileMenu) return;
    
    Utils.dom.addClass(burger, 'active');
    Utils.dom.addClass(mobileMenu, 'active');
    Utils.dom.addClass(document.body, 'menu-open');
    
    // Animate menu
    if (app.animationManager) {
        app.animationManager.animateMobileMenu(true);
    }
}

// Close mobile menu
function closeMobileMenu() {
    const burger = Utils.dom.$('#burger');
    const mobileMenu = Utils.dom.$('#mobileMenu');
    
    if (!burger || !mobileMenu) return;
    
    Utils.dom.removeClass(burger, 'active');
    Utils.dom.removeClass(mobileMenu, 'active');
    Utils.dom.removeClass(document.body, 'menu-open');
    
    // Animate menu
    if (app.animationManager) {
        app.animationManager.animateMobileMenu(false);
    }
}

// Initialize scroll effects
function initializeScrollEffects() {
    // Smooth scroll for anchor links
    Utils.events.on(document, 'click', 'a[href^="#"]', (e) => {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        const targetId = href.substring(1);
        
        if (targetId) {
            scrollToSection(targetId);
        }
    });
    
    // Back to top functionality
    const backToTop = Utils.dom.$('.back-to-top');
    if (backToTop) {
        Utils.events.on(window, 'scroll', Utils.events.throttle(() => {
            if (window.scrollY > 500) {
                Utils.dom.addClass(backToTop, 'visible');
            } else {
                Utils.dom.removeClass(backToTop, 'visible');
            }
        }, 100));
        
        Utils.events.on(backToTop, 'click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Google Maps initialization (простий iframe без API)
function initializeMap() {
    const mapContainer = Utils.dom.$('#map');
    if (!mapContainer) return;
    
    // Використовуємо iframe замість API
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2632.8!2d35.1396!3d47.8388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDUwJzE5LjciTiAzNcKwMDgnMjIuNiJF!5e0!3m2!1suk!2sua!4v${Date.now()}!5m2!1suk!2sua`;
    iframe.width = '100%';
    iframe.height = '400';
    iframe.style.border = '0';
    iframe.style.borderRadius = '16px';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    
    mapContainer.innerHTML = '';
    mapContainer.appendChild(iframe);
}

// Form enhancements
function initializeForms() {
    // Add loading states to all forms
    Utils.events.on(document, 'submit', 'form', (e) => {
        const form = e.target;
        const submitButton = form.querySelector('button[type="submit"]');
        
        if (submitButton && !submitButton.disabled) {
            Utils.dom.addClass(submitButton, 'loading');
        }
    });
    
    // Phone number formatting for all phone inputs
    Utils.events.on(document, 'input', 'input[type="tel"]', (e) => {
        formatPhoneInput(e.target);
    });
}

// Format phone number input
function formatPhoneInput(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.startsWith('380')) {
        value = '+' + value;
    } else if (value.startsWith('80')) {
        value = '+3' + value;
    } else if (value.startsWith('0')) {
        value = '+38' + value;
    } else if (!value.startsWith('+')) {
        value = '+38' + value;
    }
    
    // Format: +38 (067) 123-45-67
    const formatted = value.replace(/(\+38)(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
    input.value = formatted;
}

// Image lazy loading and error handling
function initializeImages() {
    const images = Utils.dom.$$('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    // Handle image load errors
    Utils.events.on(document, 'error', 'img', (e) => {
        const img = e.target;
        if (!img.dataset.fallbackLoaded) {
            // img.src = 'assets/images/menu/placeholder.jpg'; // Видалено створення placeholder.jpg
            img.dataset.fallbackLoaded = 'true';
        }
    }, true);
}

// Performance optimizations
function initializePerformance() {
    // Preload critical images
    const criticalImages = [
        'assets/images/hero-bg.jpg'
        // 'assets/images/menu/placeholder.jpg' // Видалено створення placeholder.jpg
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
    
    // Remove unused CSS classes
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            // Clean up any unused classes or elements
            console.log('Idle time optimization complete');
        });
    }
}

// Analytics tracking (якщо потрібно)
function trackEvent(category, action, label = null) {
    // Google Analytics або інші трекери
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
    
    console.log('Event tracked:', { category, action, label });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    
    // Track error if analytics available
    trackEvent('Error', 'JavaScript Error', e.message);
});

// Window resize handler
window.addEventListener('resize', Utils.events.throttle(() => {
    if (app.menuManager && typeof app.menuManager.handleResize === 'function') {
        app.menuManager.handleResize();
    }
}, 250));

// Visibility change handler
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden
        console.log('Page hidden');
    } else {
        // Page is visible
        console.log('Page visible');
    }
});

// Initialize when everything is loaded
window.addEventListener('load', () => {
    // Initialize components that need full page load
    initializeMap();
    initializeImages();
    initializeForms();
    initializePerformance();
    
    // Hide loading overlay
    const loadingOverlay = Utils.dom.$('#loadingOverlay');
    if (loadingOverlay) {
        Utils.dom.removeClass(loadingOverlay, 'active');
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 300);
    }
    
    console.log('Application fully loaded');
});

// Export app object for debugging
window.app = app;