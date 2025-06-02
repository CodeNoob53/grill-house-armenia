// Application Configuration
const CONFIG = {
    // Restaurant Information
    restaurant: {
        name: 'Grill House Armenia',
        tagline: 'Автентична вірменська кухня',
        phone: '+38 (012) 345-67-89',
        address: 'вул. В\'ячеслава Зайцева 19, Запоріжжя',
        coordinates: {
            lat: 47.8388,
            lng: 35.1396
        },
        workingHours: {
            start: '10:00',
            end: '22:00',
            everyday: true
        }
    },

    // Social Media Links
    social: {
        instagram: '#',
        facebook: '#',
        telegram: '#'
    },

    // Delivery Settings
    delivery: {
        freeDeliveryMinAmount: 300,
        deliveryFee: 50,
        estimatedTime: '30-45 хв',
        maxDistance: 15 // km
    },

    // Animation Settings
    animations: {
        duration: {
            fast: 300,
            normal: 600,
            slow: 1000
        },
        easing: 'easeOutQuart',
        stagger: 100
    },

    // API Settings
    api: {
        googleMapsKey: 'YOUR_GOOGLE_MAPS_API_KEY',
        telegramBotToken: 'YOUR_TELEGRAM_BOT_TOKEN',
        formspreeEndpoint: 'YOUR_FORMSPREE_ENDPOINT'
    },

    // UI Settings
    ui: {
        breakpoints: {
            mobile: 480,
            tablet: 768,
            desktop: 1024,
            wide: 1200
        },
        scrollOffset: 80,
        headerScrollThreshold: 100
    },

    // Menu Categories
    menuCategories: {
        all: 'Всі',
        shawarma: 'Шаурма',
        kebab: 'Кебаб',
        burger: 'Бургери',
        grill: 'Гриль',
        drinks: 'Напої'
    },

    // Form Validation
    validation: {
        name: {
            minLength: 2,
            maxLength: 50
        },
        phone: {
            pattern: /^[\+]?[0-9\(\)\-\s]+$/,
            minLength: 10
        },
        address: {
            maxLength: 200
        },
        order: {
            minLength: 5,
            maxLength: 500
        }
    },

    // Error Messages
    messages: {
        validation: {
            required: 'Це поле обов\'язкове',
            invalidPhone: 'Невірний формат телефону',
            minLength: 'Мінімум {min} символів',
            maxLength: 'Максимум {max} символів',
            invalidEmail: 'Невірний формат email'
        },
        success: {
            orderSent: 'Замовлення відправлено! Ми зв\'яжемось з вами найближчим часом.',
            subscribed: 'Дякуємо за підписку!'
        },
        error: {
            networkError: 'Помилка мережі. Спробуйте пізніше.',
            serverError: 'Помилка сервера. Зверніться по телефону.',
            unknownError: 'Сталася невідома помилка.'
        }
    },

    // Google Maps Settings
    maps: {
        zoom: 15,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [{"weight": "2.00"}]
            },
            {
                "featureType": "all",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#9c9c9c"}]
            },
            {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [{"visibility": "on"}]
            }
        ]
    },

    // Cache Settings
    cache: {
        menuTTL: 3600000, // 1 hour in ms
        imagesTTL: 86400000 // 24 hours in ms
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}