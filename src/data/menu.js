// Menu Data - Popular items for landing page
const MENU_DATA = {
    popular: [
        // Шаурма
        {
            id: 1,
            name: 'Шаурма Курка (звичайна)',
            category: 'shawarma',
            price: 125,
            description: 'Ніжна курка в ароматному лаваші з свіжими овочами та соусом',
            image: 'https://placehold.in/400x300/e63946/ffffff?text=Шаурма+Курка&font=opensans',
            ingredients: ['курка', 'лаваш', 'помідори', 'огірки', 'соус'],
            isPopular: true,
            isVegetarian: false,
            spiceLevel: 1
        },
        {
            id: 2,
            name: 'Шаурма Свинина (подвійна)',
            category: 'shawarma',
            price: 170,
            description: 'Подвійна порція соковитої свинини для справжніх гурманів',
            image: 'https://placehold.in/400x300/f77f00/ffffff?text=Шаурма+Свинина&font=opensans',
            ingredients: ['свинина', 'лаваш', 'капуста', 'морква', 'соус'],
            isPopular: true,
            isVegetarian: false,
            spiceLevel: 2
        },

        // Кебаб
        {
            id: 3,
            name: 'Люля-кебаб у лаваші Курка',
            category: 'kebab',
            price: 100,
            description: 'Традиційний вірменський люля-кебаб з курки в м\'якому лаваші',
            image: 'https://placehold.in/400x300/c5303b/ffffff?text=Кебаб+Курка&font=opensans',
            ingredients: ['люля-кебаб курка', 'лаваш', 'цибуля', 'зелень'],
            isPopular: true,
            isVegetarian: false,
            spiceLevel: 2
        },
        {
            id: 4,
            name: 'Люля-кебаб у лаваші Телятина',
            category: 'kebab',
            price: 120,
            description: 'Ніжний люля-кебаб з телятини за автентичним рецептом',
            image: 'https://placehold.in/400x300/d86e00/ffffff?text=Кебаб+Телятина&font=opensans',
            ingredients: ['люля-кебаб телятина', 'лаваш', 'цибуля', 'зелень', 'спеції'],
            isPopular: true,
            isVegetarian: false,
            spiceLevel: 3
        },

        // Бургери
        {
            id: 5,
            name: 'Бургер Свинина (м\'ясо)',
            category: 'burger',
            price: 95,
            description: 'Соковитий бургер з домашньою котлетою зі свинини',
            image: 'https://placehold.in/400x300/e63946/ffffff?text=Бургер+Свинина&font=opensans',
            ingredients: ['котлета свинина', 'булочка', 'салат', 'помідор', 'соус'],
            isPopular: true,
            isVegetarian: false,
            spiceLevel: 1
        },
        {
            id: 6,
            name: 'Бургер Курка (м\'ясо)',
            category: 'burger',
            price: 85,
            description: 'Легкий та смачний бургер з куркою для поціновувачів здорової їжі',
            image: 'https://placehold.in/400x300/f77f00/ffffff?text=Бургер+Курка&font=opensans',
            ingredients: ['котлета курка', 'булочка', 'салат', 'огірок', 'соус'],
            isPopular: true,
            isVegetarian: false,
            spiceLevel: 1
        },

        // Гриль
        {
            id: 7,
            name: 'Свинина Шия (100г)',
            category: 'grill',
            price: 65,
            description: 'Ароматна свиняча шия, приготована на відкритому вогні',
            image: 'https://placehold.in/400x300/c5303b/ffffff?text=Свинина+Шия&font=opensans',
            ingredients: ['свиняча шия', 'спеції', 'маринад'],
            isPopular: true,
            isVegetarian: false,
            spiceLevel: 2
        },
        {
            id: 8,
            name: 'Куриний стейк (100г)',
            category: 'grill',
            price: 55,
            description: 'Ніжний куриний стейк з димком від мангалу',
            image: 'https://placehold.in/400x300/d86e00/ffffff?text=Куриний+Стейк&font=opensans',
            ingredients: ['куриний стейк', 'спеції', 'маринад'],
            isPopular: true,
            isVegetarian: false,
            spiceLevel: 1
        },

        // Додаткові страви
        {
            id: 9,
            name: 'Хот-дог Мисливська сосиска',
            category: 'hotdog',
            price: 90,
            description: 'Класичний хот-дог з мисливською сосискою та соусами',
            image: 'https://placehold.in/400x300/e63946/ffffff?text=Хот-дог&font=opensans',
            ingredients: ['мисливська сосиска', 'булочка', 'кетчуп', 'гірчиця'],
            isPopular: false,
            isVegetarian: false,
            spiceLevel: 2
        },
        {
            id: 10,
            name: 'Картопля фрі',
            category: 'sides',
            price: 45,
            description: 'Хрустка золотиста картопля фрі',
            image: 'https://placehold.in/400x300/f77f00/ffffff?text=Картопля+Фрі&font=opensans',
            ingredients: ['картопля', 'олія', 'сіль'],
            isPopular: true,
            isVegetarian: true,
            spiceLevel: 0
        },

        // Додаткові нові страви для розширення меню
        {
            id: 11,
            name: 'Хачапурі по-аджарськи',
            category: 'bread',
            price: 110,
            description: 'Традиційна грузинська випічка з сиром і яйцем',
            image: 'https://placehold.in/400x300/c5303b/ffffff?text=Хачапурі&font=opensans',
            ingredients: ['тісто', 'сулугуні', 'яйце', 'масло'],
            isPopular: true,
            isVegetarian: true,
            spiceLevel: 0
        },
        {
            id: 12,
            name: 'Лаваш з овочами',
            category: 'vegetarian',
            price: 75,
            description: 'Свіжий лаваш з грилльованими овочами та зеленню',
            image: 'https://placehold.in/400x300/28a745/ffffff?text=Овочевий+Лаваш&font=opensans',
            ingredients: ['лаваш', 'цукіні', 'баклажан', 'перець', 'зелень'],
            isPopular: false,
            isVegetarian: true,
            spiceLevel: 1
        }
    ],

    // Categories for filtering
    categories: [
        { id: 'all', name: 'Всі', icon: 'fas fa-utensils' },
        { id: 'shawarma', name: 'Шаурма', icon: 'fas fa-bread-slice' },
        { id: 'kebab', name: 'Кебаб', icon: 'fas fa-fire' },
        { id: 'burger', name: 'Бургери', icon: 'fas fa-hamburger' },
        { id: 'grill', name: 'Гриль', icon: 'fas fa-bacon' },
        { id: 'sides', name: 'Гарніри', icon: 'fas fa-leaf' },
        { id: 'vegetarian', name: 'Вегетаріанське', icon: 'fas fa-seedling' },
        { id: 'bread', name: 'Випічка', icon: 'fas fa-cookie-bite' }
    ],

    // Additional info for each category
    categoryInfo: {
        shawarma: {
            description: 'Автентична вірменська шаурма, приготована за традиційними рецептами',
            specialOffer: 'При замовленні 2 шаурми - знижка 10%',
            image: 'https://placehold.in/600x300/e63946/ffffff?text=Шаурма+Категорія&font=opensans'
        },
        kebab: {
            description: 'Люля-кебаб від досвідчених майстрів вірменської кухні',
            specialOffer: 'Безкоштовний лаваш до кожного кебабу',
            image: 'https://placehold.in/600x300/c5303b/ffffff?text=Кебаб+Категорія&font=opensans'
        },
        burger: {
            description: 'Домашні бургери з свіжими інгредієнтами',
            specialOffer: 'Картопля фрі у подарунок до бургера',
            image: 'https://placehold.in/600x300/f77f00/ffffff?text=Бургери+Категорія&font=opensans'
        },
        grill: {
            description: 'М\'ясо на мангалі - справжній смак димку',
            specialOffer: 'При замовленні від 200г - овочі гриль безкоштовно',
            image: 'https://placehold.in/600x300/d86e00/ffffff?text=Гриль+Категорія&font=opensans'
        },
        vegetarian: {
            description: 'Смачні та корисні страви для вегетаріанців',
            specialOffer: 'Свіжевичавлений сік у подарунок',
            image: 'https://placehold.in/600x300/28a745/ffffff?text=Вегетаріанське&font=opensans'
        },
        bread: {
            description: 'Традиційна кавказька випічка',
            specialOffer: 'Чай або кава безкоштовно до випічки',
            image: 'https://placehold.in/600x300/6f42c1/ffffff?text=Випічка&font=opensans'
        }
    },

    // Daily specials or promotional items
    dailySpecials: [
        {
            day: 'monday',
            name: 'Понеділок - День Шаурми',
            discount: 15,
            items: [1, 2]
        },
        {
            day: 'friday',
            name: 'П\'ятниця - Гриль Вечір',
            discount: 20,
            items: [7, 8]
        }
    ],

    // Combo deals
    combos: [
        {
            id: 'combo1',
            name: 'Сімейний комбо',
            description: '2 шаурми + картопля фрі + 2 напої',
            price: 280,
            originalPrice: 320,
            items: [1, 2, 10],
            image: 'https://placehold.in/400x300/e63946/ffffff?text=Сімейний+Комбо&font=opensans'
        },
        {
            id: 'combo2',
            name: 'Обідній комбо',
            description: 'Кебаб + картопля фрі + напій',
            price: 150,
            originalPrice: 170,
            items: [3, 10],
            image: 'https://placehold.in/400x300/f77f00/ffffff?text=Обідній+Комбо&font=opensans'
        }
    ]
};

// Helper functions for working with menu data
const MenuHelpers = {
    // Get items by category
    getByCategory(category) {
        if (category === 'all') {
            return MENU_DATA.popular;
        }
        return MENU_DATA.popular.filter(item => item.category === category);
    },

    // Get popular items only
    getPopularItems() {
        return MENU_DATA.popular.filter(item => item.isPopular);
    },

    // Get vegetarian items
    getVegetarianItems() {
        return MENU_DATA.popular.filter(item => item.isVegetarian);
    },

    // Get items by spice level
    getBySpiceLevel(level) {
        return MENU_DATA.popular.filter(item => item.spiceLevel === level);
    },

    // Get items by price range
    getByPriceRange(min, max) {
        return MENU_DATA.popular.filter(item => item.price >= min && item.price <= max);
    },

    // Search items by name or ingredients
    searchItems(query) {
        const searchTerm = query.toLowerCase();
        return MENU_DATA.popular.filter(item => {
            return item.name.toLowerCase().includes(searchTerm) ||
                   item.description.toLowerCase().includes(searchTerm) ||
                   item.ingredients.some(ingredient => 
                       ingredient.toLowerCase().includes(searchTerm)
                   );
        });
    },

    // Get item by ID
    getItemById(id) {
        return MENU_DATA.popular.find(item => item.id === id);
    },

    // Get combo by ID
    getComboById(id) {
        return MENU_DATA.combos.find(combo => combo.id === id);
    },

    // Get daily special for today
    getTodaySpecial() {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const today = days[new Date().getDay()];
        return MENU_DATA.dailySpecials.find(special => special.day === today);
    },

    // Format price
    formatPrice(price) {
        return `${price} грн`;
    },

    // Get spice level text and emoji
    getSpiceLevelText(level) {
        const levels = {
            0: { text: 'Не гостре', emoji: '' },
            1: { text: 'Легко гостре', emoji: '🌶️' },
            2: { text: 'Середньо гостре', emoji: '🌶️🌶️' },
            3: { text: 'Гостре', emoji: '🌶️🌶️🌶️' }
        };
        return levels[level] || { text: '', emoji: '' };
    },

    // Get category name by ID
    getCategoryName(categoryId) {
        const category = MENU_DATA.categories.find(cat => cat.id === categoryId);
        return category ? category.name : '';
    },

    // Get category info
    getCategoryInfo(categoryId) {
        return MENU_DATA.categoryInfo[categoryId] || {};
    },

    // Calculate total for items
    calculateTotal(items) {
        return items.reduce((total, item) => {
            const menuItem = this.getItemById(item.id);
            return total + (menuItem ? menuItem.price * (item.quantity || 1) : 0);
        }, 0);
    },

    // Get recommended items based on category
    getRecommendedItems(categoryId, limit = 3) {
        const categoryItems = this.getByCategory(categoryId);
        return categoryItems
            .filter(item => item.isPopular)
            .slice(0, limit);
    },

    // Get new items (last week)
    getNewItems() {
        // В реальному додатку це буде базуватися на датах додавання
        return MENU_DATA.popular.slice(-2);
    },

    // Generate menu statistics
    getMenuStatistics() {
        const allItems = MENU_DATA.popular;
        const categories = [...new Set(allItems.map(item => item.category))];
        
        return {
            totalItems: allItems.length,
            categories: categories.length,
            popularItems: allItems.filter(item => item.isPopular).length,
            vegetarianItems: allItems.filter(item => item.isVegetarian).length,
            averagePrice: Math.round(allItems.reduce((sum, item) => sum + item.price, 0) / allItems.length),
            priceRange: {
                min: Math.min(...allItems.map(item => item.price)),
                max: Math.max(...allItems.map(item => item.price))
            },
            spiceLevelDistribution: {
                mild: allItems.filter(item => item.spiceLevel <= 1).length,
                medium: allItems.filter(item => item.spiceLevel === 2).length,
                hot: allItems.filter(item => item.spiceLevel >= 3).length
            }
        };
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MENU_DATA, MenuHelpers };
} else {
    window.MENU_DATA = MENU_DATA;
    window.MenuHelpers = MenuHelpers;
}