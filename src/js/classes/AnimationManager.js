// Animation Manager Class
class AnimationManager {
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
        this.isAnimeLoaded = typeof anime !== 'undefined';
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupIntersectionObserver();
        this.bindEvents();
    }

    // Initialize scroll-based animations
    setupScrollAnimations() {
        const scrollElements = Utils.dom.$$('.scroll-fade');
        
        scrollElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
        });
    }

    // Setup Intersection Observer for scroll animations
    setupIntersectionObserver() {
        if (!window.IntersectionObserver) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateScrollElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        Utils.dom.$$('.scroll-fade').forEach(el => {
            observer.observe(el);
        });

        this.observers.set('scroll', observer);
    }

    // Animate element when it comes into view
    animateScrollElement(element) {
        if (this.isAnimeLoaded) {
            anime({
                targets: element,
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 600,
                easing: 'easeOutQuart',
                delay: anime.stagger(100)
            });
        } else {
            // Fallback animation without anime.js
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    }

    // Animate hero section on page load
    animateHero() {
        if (!this.isAnimeLoaded) {
            // Fallback without anime.js
            const heroTitle = Utils.dom.$('.hero__title');
            const heroDescription = Utils.dom.$('.hero__description');
            const heroButtons = Utils.dom.$('.hero__buttons');
            const heroImage = Utils.dom.$('.hero__image');

            if (heroTitle) {
                heroTitle.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
            if (heroDescription) {
                heroDescription.style.animation = 'fadeInUp 0.8s ease-out 0.2s forwards';
            }
            if (heroButtons) {
                heroButtons.style.animation = 'fadeInUp 0.8s ease-out 0.4s forwards';
            }
            if (heroImage) {
                heroImage.style.animation = 'fadeInRight 0.8s ease-out 0.6s forwards';
            }
            return;
        }

        // Anime.js animations
        const timeline = anime.timeline({
            easing: 'easeOutQuart'
        });

        timeline
            .add({
                targets: '.hero__title',
                opacity: [0, 1],
                translateY: [50, 0],
                duration: 800
            })
            .add({
                targets: '.hero__description',
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 600
            }, '-=400')
            .add({
                targets: '.hero__buttons .btn',
                opacity: [0, 1],
                translateY: [20, 0],
                scale: [0.8, 1],
                duration: 500,
                delay: anime.stagger(100)
            }, '-=300')
            .add({
                targets: '.hero__image',
                opacity: [0, 1],
                translateX: [50, 0],
                rotate: [5, 0],
                duration: 800
            }, '-=600');

        this.animations.set('hero', timeline);
    }

    // Animate menu items
    animateMenuItems() {
        const menuItems = Utils.dom.$('.menu-item');
        
        if (!this.isAnimeLoaded) {
            // Fallback animation
            menuItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }, index * 100);
            });
            return;
        }

        anime({
            targets: menuItems,
            opacity: [0, 1],
            translateY: [30, 0],
            scale: [0.9, 1],
            duration: 600,
            delay: anime.stagger(100),
            easing: 'easeOutQuart'
        });
    }

    // Animate category filter
    animateCategoryChange() {
        const menuGrid = Utils.dom.$('#menuGrid');
        
        if (!menuGrid) return;

        if (!this.isAnimeLoaded) {
            // Simple fallback
            menuGrid.style.animation = 'fadeIn 0.4s ease-out';
            return;
        }

        anime({
            targets: menuGrid,
            opacity: [0.3, 1],
            scale: [0.95, 1],
            duration: 400,
            easing: 'easeOutQuart'
        });
    }

    // Animate form submission
    animateFormSubmission(form, success = true) {
        if (!this.isAnimeLoaded) {
            // Simple fallback
            if (success) {
                form.style.animation = 'pulse 0.5s ease-out';
            } else {
                form.style.animation = 'shake 0.5s ease-out';
            }
            return;
        }

        if (success) {
            anime({
                targets: form,
                scale: [1, 1.02, 1],
                duration: 500,
                easing: 'easeOutQuart'
            });
        } else {
            anime({
                targets: form,
                translateX: [-10, 10, -10, 10, 0],
                duration: 400,
                easing: 'easeOutQuart'
            });
        }
    }

    // Animate button click
    animateButtonClick(button) {
        if (!this.isAnimeLoaded) {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
            return;
        }

        anime({
            targets: button,
            scale: [1, 0.95, 1],
            duration: 200,
            easing: 'easeOutQuart'
        });
    }

    // Animate mobile menu
    animateMobileMenu(isOpen) {
        const mobileMenu = Utils.dom.$('.header__nav.mobile-menu');
        
        if (!mobileMenu) return;

        if (!this.isAnimeLoaded) {
            // CSS fallback
            if (isOpen) {
                Utils.dom.addClass(mobileMenu, 'active');
            } else {
                Utils.dom.removeClass(mobileMenu, 'active');
            }
            return;
        }

        if (isOpen) {
            mobileMenu.style.display = 'flex';
            anime({
                targets: mobileMenu,
                opacity: [0, 1],
                translateY: [-20, 0],
                duration: 300,
                easing: 'easeOutQuart',
                complete: () => {
                    Utils.dom.addClass(mobileMenu, 'active');
                }
            });

            // Animate menu items
            anime({
                targets: '.mobile-menu .nav-link',
                opacity: [0, 1],
                translateY: [-10, 0],
                duration: 200,
                delay: anime.stagger(50, {start: 100}),
                easing: 'easeOutQuart'
            });
        } else {
            anime({
                targets: mobileMenu,
                opacity: [1, 0],
                translateY: [0, -20],
                duration: 200,
                easing: 'easeOutQuart',
                complete: () => {
                    mobileMenu.style.display = 'none';
                    Utils.dom.removeClass(mobileMenu, 'active');
                }
            });
        }
    }

    // Animate loading states
    showLoading(container) {
        const loader = Utils.dom.createElement('div', {
            className: 'loading-spinner'
        });
        
        container.appendChild(loader);

        if (this.isAnimeLoaded) {
            anime({
                targets: loader,
                opacity: [0, 1],
                scale: [0.5, 1],
                duration: 300,
                easing: 'easeOutQuart'
            });
        }

        return loader;
    }

    hideLoading(loader) {
        if (!loader) return;

        if (this.isAnimeLoaded) {
            anime({
                targets: loader,
                opacity: [1, 0],
                scale: [1, 0.5],
                duration: 200,
                easing: 'easeOutQuart',
                complete: () => loader.remove()
            });
        } else {
            loader.remove();
        }
    }

    // Animate counters/numbers
    animateCounter(element, start = 0, end, duration = 2000) {
        if (!this.isAnimeLoaded) {
            element.textContent = end;
            return;
        }

        const obj = { count: start };
        
        anime({
            targets: obj,
            count: end,
            duration: duration,
            easing: 'easeOutQuart',
            update: () => {
                element.textContent = Math.floor(obj.count);
            }
        });
    }

    // Stagger animation for multiple elements
    staggerAnimation(selector, animationType = 'fadeInUp', delay = 100) {
        const elements = Utils.dom.$(selector);
        
        if (!elements.length) return;

        if (!this.isAnimeLoaded) {
            elements.forEach((el, index) => {
                setTimeout(() => {
                    Utils.dom.addClass(el, `animate-${animationType}`);
                }, index * delay);
            });
            return;
        }

        const animations = {
            fadeInUp: {
                opacity: [0, 1],
                translateY: [30, 0]
            },
            fadeInLeft: {
                opacity: [0, 1],
                translateX: [-30, 0]
            },
            fadeInRight: {
                opacity: [0, 1],
                translateX: [30, 0]
            },
            scaleIn: {
                opacity: [0, 1],
                scale: [0.8, 1]
            }
        };

        anime({
            targets: elements,
            ...animations[animationType],
            duration: 600,
            delay: anime.stagger(delay),
            easing: 'easeOutQuart'
        });
    }

    // Bind event listeners
    bindEvents() {
        // Animate buttons on click
        Utils.events.on(document, 'click', '.btn', (e) => {
            this.animateButtonClick(e.target);
        });

        // Animate hover effects
        Utils.events.on(document, 'mouseenter', '.menu-item', (e) => {
            if (this.isAnimeLoaded) {
                anime({
                    targets: e.target,
                    scale: 1.05,
                    duration: 200,
                    easing: 'easeOutQuart'
                });
            }
        });

        Utils.events.on(document, 'mouseleave', '.menu-item', (e) => {
            if (this.isAnimeLoaded) {
                anime({
                    targets: e.target,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutQuart'
                });
            }
        });
    }

    // Clean up animations and observers
    destroy() {
        // Stop all animations
        this.animations.forEach(animation => {
            if (animation.pause) animation.pause();
        });
        this.animations.clear();

        // Disconnect observers
        this.observers.forEach(observer => {
            if (observer.disconnect) observer.disconnect();
        });
        this.observers.clear();
    }

    // Utility method to check if animations should be reduced
    shouldReduceMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // Initialize all page animations
    initPageAnimations() {
        if (this.shouldReduceMotion()) {
            // Skip animations for users who prefer reduced motion
            return;
        }

        // Animate hero on page load
        setTimeout(() => this.animateHero(), 100);

        // Animate sections as they come into view
        this.staggerAnimation('.scroll-fade', 'fadeInUp', 100);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationManager;
} else {
    window.AnimationManager = AnimationManager;
}