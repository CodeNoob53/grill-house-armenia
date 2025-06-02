// Utility Helper Functions

const Utils = {
    // DOM Utilities
    dom: {
        // Get element by selector
        $(selector) {
            return document.querySelector(selector);
        },

        // Get all elements by selector
        $$(selector) {
            return document.querySelectorAll(selector);
        },

        // Create element with attributes
        createElement(tag, attributes = {}, content = '') {
            const element = document.createElement(tag);
            
            Object.keys(attributes).forEach(key => {
                if (key === 'className') {
                    element.className = attributes[key];
                } else if (key === 'innerHTML') {
                    element.innerHTML = attributes[key];
                } else {
                    element.setAttribute(key, attributes[key]);
                }
            });
            
            if (content) {
                element.textContent = content;
            }
            
            return element;
        },

        // Add class to element
        addClass(element, className) {
            if (element) {
                element.classList.add(className);
            }
        },

        // Remove class from element
        removeClass(element, className) {
            if (element) {
                element.classList.remove(className);
            }
        },

        // Toggle class on element
        toggleClass(element, className) {
            if (element) {
                element.classList.toggle(className);
            }
        },

        // Check if element has class
        hasClass(element, className) {
            return element ? element.classList.contains(className) : false;
        }
    },

    // Event Utilities
    events: {
        // Add event listener with optional delegation
        on(element, event, selector, handler) {
            if (typeof selector === 'function') {
                handler = selector;
                element.addEventListener(event, handler);
            } else {
                element.addEventListener(event, (e) => {
                    if (e.target.matches(selector)) {
                        handler(e);
                    }
                });
            }
        },

        // Remove event listener
        off(element, event, handler) {
            element.removeEventListener(event, handler);
        },

        // Trigger custom event
        trigger(element, eventName, data = {}) {
            const event = new CustomEvent(eventName, { detail: data });
            element.dispatchEvent(event);
        },

        // Debounce function execution
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Throttle function execution
        throttle(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        }
    },

    // Validation Utilities
    validation: {
        // Validate required field
        required(value) {
            return value !== null && value !== undefined && value.trim() !== '';
        },

        // Validate email format
        email(value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        },

        // Validate phone format
        phone(value) {
            const phoneRegex = /^[\+]?[0-9\(\)\-\s]+$/;
            return phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10;
        },

        // Validate minimum length
        minLength(value, min) {
            return value.length >= min;
        },

        // Validate maximum length
        maxLength(value, max) {
            return value.length <= max;
        },

        // Validate number range
        numberRange(value, min, max) {
            const num = parseFloat(value);
            return !isNaN(num) && num >= min && num <= max;
        }
    },

    // String Utilities
    string: {
        // Capitalize first letter
        capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },

        // Convert to slug (URL-friendly)
        slugify(str) {
            return str
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
        },

        // Truncate text
        truncate(str, length, suffix = '...') {
            if (str.length <= length) return str;
            return str.substring(0, length) + suffix;
        },

        // Format template string
        template(str, data) {
            return str.replace(/\{(\w+)\}/g, (match, key) => {
                return data[key] !== undefined ? data[key] : match;
            });
        },

        // Remove HTML tags
        stripHtml(str) {
            return str.replace(/<[^>]*>/g, '');
        }
    },

    // Number Utilities
    number: {
        // Format currency
        formatCurrency(amount, currency = 'грн') {
            return `${amount} ${currency}`;
        },

        // Format percentage
        formatPercent(value, decimals = 0) {
            return `${(value * 100).toFixed(decimals)}%`;
        },

        // Generate random number in range
        random(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        // Round to decimal places
        round(num, decimals = 2) {
            return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
        }
    },

    // Date Utilities
    date: {
        // Format date
        format(date, format = 'DD.MM.YYYY') {
            const d = new Date(date);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');

            return format
                .replace('DD', day)
                .replace('MM', month)
                .replace('YYYY', year)
                .replace('HH', hours)
                .replace('mm', minutes);
        },

        // Get time ago string
        timeAgo(date) {
            const now = new Date();
            const diff = now - new Date(date);
            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            if (days > 0) return `${days} днів тому`;
            if (hours > 0) return `${hours} годин тому`;
            if (minutes > 0) return `${minutes} хвилин тому`;
            return 'щойно';
        },

        // Check if date is today
        isToday(date) {
            const today = new Date();
            const checkDate = new Date(date);
            return today.toDateString() === checkDate.toDateString();
        }
    },

    // Storage Utilities
    storage: {
        // Set item in localStorage
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.warn('localStorage not available:', e);
                return false;
            }
        },

        // Get item from localStorage
        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (e) {
                console.warn('localStorage not available:', e);
                return defaultValue;
            }
        },

        // Remove item from localStorage
        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.warn('localStorage not available:', e);
                return false;
            }
        },

        // Clear all localStorage
        clear() {
            try {
                localStorage.clear();
                return true;
            } catch (e) {
                console.warn('localStorage not available:', e);
                return false;
            }
        }
    },

    // URL Utilities
    url: {
        // Get URL parameter
        getParam(name) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        },

        // Set URL parameter
        setParam(name, value) {
            const url = new URL(window.location);
            url.searchParams.set(name, value);
            window.history.pushState({}, '', url);
        },

        // Remove URL parameter
        removeParam(name) {
            const url = new URL(window.location);
            url.searchParams.delete(name);
            window.history.pushState({}, '', url);
        }
    },

    // Animation Utilities
    animation: {
        // Smooth scroll to element
        scrollTo(element, offset = 0, duration = 800) {
            const targetPosition = element.offsetTop - offset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;

            function animateScroll(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animateScroll);
            }

            requestAnimationFrame(animateScroll);
        },

        // Easing function
        easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        },

        // Fade in element
        fadeIn(element, duration = 300) {
            element.style.opacity = 0;
            element.style.display = 'block';
            
            const start = performance.now();
            
            function fade(timestamp) {
                const elapsed = timestamp - start;
                const progress = elapsed / duration;
                
                if (progress < 1) {
                    element.style.opacity = progress;
                    requestAnimationFrame(fade);
                } else {
                    element.style.opacity = 1;
                }
            }
            
            requestAnimationFrame(fade);
        },

        // Fade out element
        fadeOut(element, duration = 300) {
            const start = performance.now();
            const startOpacity = parseFloat(element.style.opacity) || 1;
            
            function fade(timestamp) {
                const elapsed = timestamp - start;
                const progress = elapsed / duration;
                
                if (progress < 1) {
                    element.style.opacity = startOpacity * (1 - progress);
                    requestAnimationFrame(fade);
                } else {
                    element.style.opacity = 0;
                    element.style.display = 'none';
                }
            }
            
            requestAnimationFrame(fade);
        }
    },

    // Device Detection
    device: {
        isMobile() {
            return window.innerWidth <= 768;
        },

        isTablet() {
            return window.innerWidth > 768 && window.innerWidth <= 1024;
        },

        isDesktop() {
            return window.innerWidth > 1024;
        },

        isTouchDevice() {
            return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        }
    }
};

// Global function for smooth scrolling to sections
function scrollToSection(sectionId, offset = 80) {
    const section = Utils.dom.$(`#${sectionId}`);
    if (section) {
        Utils.animation.scrollTo(section, offset);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
} else {
    window.Utils = Utils;
    window.scrollToSection = scrollToSection;
}