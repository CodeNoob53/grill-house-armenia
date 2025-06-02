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
            image: 'assets/images/menu/shawarma-chicken.jpg',
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
            image: 'assets/images/menu/shawarma-pork.jpg',
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
            image: 'assets/images/menu/kebab-chicken.jpg',
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
            image: 'assets/images/menu/kebab-veal.jpg',
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
            image: 'assets/images/menu/burger-pork.jpg',
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
            image: 'assets/images/menu/burger-chicken.jpg',
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
            image: 'assets/images/menu/grill-pork-neck.jpg',
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
            image: 'assets/images/menu/grill-chicken-steak.jpg',
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
            image: 'assets/images/menu/hotdog-hunting.jpg',
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
            image: 'assets/images/menu/fries.jpg',
            ingredients: ['картопля', 'олія', 'сіль'],
            isPopular: true,
            isVegetarian: true,
            spiceLevel: 0
        }
    ],

    // Categories for filtering
    categories: [
        { id: 'all', name: 'Всі', icon: 'fas fa-utensils' },
        { id: 'shawarma', name: 'Шаурма', icon: 'fas fa-bread-slice' },
        { id: 'kebab', name: 'Кебаб', icon: 'fas fa-fire' },
        { id: 'burger', name: 'Бургери', icon: 'fas fa-hamburger' },
        { id: 'grill', name: 'Гриль', icon: 'fas fa-bacon' },
        { id: 'sides', name: 'Гарніри', icon: 'fas fa-leaf' }
    ],

    // Additional info for each category
    categoryInfo: {
        shawarma: {
            description: 'Автентична вірменська шаурма, приготована за традиційними рецептами',
            specialOffer: 'При замовленні 2 шаурми - знижка 10%'
        },
        kebab: {
            description: 'Люля-кебаб від досвідчених майстрів вірменської кухні',
            specialOffer: 'Безкоштовний лаваш до кожного кебабу'
        },
        burger: {
            description: 'Домашні бургери з свіжими інгредієнтами',
            specialOffer: 'Картопля фрі у подарунок до бургера'
        },
        grill: {
            description: 'М\'ясо на мангалі - справжній смак димку',
            specialOffer: 'При замовленні від 200г - овочі гриль безкоштовно'
        }
    }
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

    // Format price
    formatPrice(price) {
        return `${price} грн`;
    },

    // Get spice level text
    getSpiceLevelText(level) {
        switch(level) {
            case 0: return 'Не гостре';
            case 1: return 'Легко гостре';
            case 2: return 'Середньо гостре';
            case 3: return 'Гостре';
            default: return '';
        }
    },

    // Get category name by ID
    getCategoryName(categoryId) {
        const category = MENU_DATA.categories.find(cat => cat.id === categoryId);
        return category ? category.name : '';
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MENU_DATA, MenuHelpers };
} else {
    window.MENU_DATA = MENU_DATA;
    window.MenuHelpers = MenuHelpers;
}