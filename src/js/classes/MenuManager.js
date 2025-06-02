// Menu Manager Class
class MenuManager {
    constructor(animationManager) {
        this.animationManager = animationManager;
        this.currentCategory = 'all';
        this.menuData = MENU_DATA;
        this.menuGrid = null;
        this.categoryButtons = null;
        this.searchQuery = '';
        this.init();
    }

    init() {
        this.menuGrid = Utils.dom.$('#menuGrid');
        this.categoryButtons = Utils.dom.$$('.category-btn');
        
        if (!this.menuGrid) {
            console.warn('Menu grid not found');
            return;
        }

        this.bindEvents();
        this.renderMenu();
    }

    // Bind event listeners
    bindEvents() {
        // Category filter buttons
        Utils.events.on(document, 'click', '.category-btn', (e) => {
            e.preventDefault();
            const category = e.target.dataset.category;
            this.filterByCategory(category);
        });

        // Search functionality (if implemented)
        const searchInput = Utils.dom.$('#menuSearch');
        if (searchInput) {
            Utils.events.on(searchInput, 'input', Utils.events.debounce((e) => {
                this.searchQuery = e.target.value;
                this.renderMenu();
            }, 300));
        }

        // Menu item interactions
        Utils.events.on(document, 'click', '.menu-item__add-btn', (e) => {
            e.preventDefault();
            const itemId = parseInt(e.target.closest('.menu-item').dataset.itemId);
            this.addToOrder(itemId);
        });
    }

    // Filter menu by category
    filterByCategory(category) {
        this.currentCategory = category;
        this.updateCategoryButtons();
        this.renderMenu();
        
        // Animate the change
        if (this.animationManager) {
            this.animationManager.animateCategoryChange();
        }
    }

    // Update active category button
    updateCategoryButtons() {
        this.categoryButtons.forEach(btn => {
            Utils.dom.removeClass(btn, 'active');
            if (btn.dataset.category === this.currentCategory) {
                Utils.dom.addClass(btn, 'active');
            }
        });
    }

    // Get filtered menu items
    getFilteredItems() {
        let items = MenuHelpers.getByCategory(this.currentCategory);
        
        // Apply search filter if exists
        if (this.searchQuery.trim()) {
            items = MenuHelpers.searchItems(this.searchQuery);
        }
        
        return items;
    }

    // Render menu items
    renderMenu() {
        if (!this.menuGrid) return;

        const items = this.getFilteredItems();
        
        // Clear current items
        this.menuGrid.innerHTML = '';
        
        if (items.length === 0) {
            this.renderEmptyState();
            return;
        }

        // Render items
        items.forEach(item => {
            const menuItemElement = this.createMenuItemElement(item);
            this.menuGrid.appendChild(menuItemElement);
        });

        // Animate new items
        if (this.animationManager) {
            setTimeout(() => {
                this.animationManager.animateMenuItems();
            }, 50);
        }
    }

    // Create menu item HTML element
    createMenuItemElement(item) {
        const menuItem = Utils.dom.createElement('div', {
            className: 'menu-item scroll-fade',
            'data-item-id': item.id,
            'data-category': item.category
        });

        menuItem.innerHTML = `
            <div class="menu-item__image">
                <img src="${item.image}" alt="${item.name}" loading="lazy" 
                     onerror="this.src='assets/images/menu/placeholder.jpg'">
                ${item.isPopular ? '<div class="menu-item__badge">Популярне</div>' : ''}
                ${item.isVegetarian ? '<div class="menu-item__badge menu-item__badge--vegetarian">Вегетаріанське</div>' : ''}
            </div>
            <div class="menu-item__content">
                <div class="menu-item__header">
                    <h3 class="menu-item__title">${item.name}</h3>
                    <div class="menu-item__price">${MenuHelpers.formatPrice(item.price)}</div>
                </div>
                <p class="menu-item__description">${item.description}</p>
                <div class="menu-item__details">
                    <div class="menu-item__ingredients">
                        <strong>Склад:</strong> ${item.ingredients.join(', ')}
                    </div>
                    ${item.spiceLevel > 0 ? `
                        <div class="menu-item__spice">
                            <span class="spice-indicator">
                                ${'🌶️'.repeat(item.spiceLevel)}
                            </span>
                            <span class="spice-text">${MenuHelpers.getSpiceLevelText(item.spiceLevel)}</span>
                        </div>
                    ` : ''}
                </div>
                <div class="menu-item__footer">
                    <button class="btn btn-primary menu-item__add-btn" data-item-id="${item.id}">
                        <i class="fas fa-plus"></i>
                        Додати до замовлення
                    </button>
                </div>
            </div>
        `;

        return menuItem;
    }

    // Render empty state when no items found
    renderEmptyState() {
        this.menuGrid.innerHTML = `
            <div class="empty-state">
                <div class="empty-state__icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3 class="empty-state__title">Нічого не знайдено</h3>
                <p class="empty-state__message">
                    ${this.searchQuery ? 
                        `За запитом "${this.searchQuery}" нічого не знайдено. Спробуйте інший пошук.` : 
                        'У цій категорії поки що немає страв.'
                    }
                </p>
                ${this.searchQuery ? `
                    <button class="btn btn-outline" onclick="this.clearSearch()">
                        Очистити пошук
                    </button>
                ` : ''}
            </div>
        `;
    }

    // Add item to order
    addToOrder(itemId) {
        const item = MenuHelpers.getItemById(itemId);
        if (!item) return;

        // Trigger custom event for order management
        Utils.events.trigger(document, 'menu:item-added', {
            item: item,
            timestamp: Date.now()
        });

        // Show visual feedback
        this.showAddToOrderFeedback(itemId);
    }

    // Show visual feedback when item is added to order
    showAddToOrderFeedback(itemId) {
        const menuItem = Utils.dom.$(`[data-item-id="${itemId}"]`);
        const button = menuItem?.querySelector('.menu-item__add-btn');
        
        if (!button) return;

        // Store original button content
        const originalContent = button.innerHTML;
        
        // Update button to show success
        button.innerHTML = '<i class="fas fa-check"></i> Додано!';
        Utils.dom.addClass(button, 'btn-success');
        button.disabled = true;

        // Animate button
        if (this.animationManager) {
            this.animationManager.animateButtonClick(button);
        }

        // Reset button after delay
        setTimeout(() => {
            button.innerHTML = originalContent;
            Utils.dom.removeClass(button, 'btn-success');
            button.disabled = false;
        }, 2000);
    }

    // Clear search
    clearSearch() {
        this.searchQuery = '';
        const searchInput = Utils.dom.$('#menuSearch');
        if (searchInput) {
            searchInput.value = '';
        }
        this.renderMenu();
    }

    // Get menu statistics
    getStatistics() {
        const allItems = this.menuData.popular;
        return {
            totalItems: allItems.length,
            categories: this.menuData.categories.length,
            popularItems: allItems.filter(item => item.isPopular).length,
            vegetarianItems: allItems.filter(item => item.isVegetarian).length,
            priceRange: {
                min: Math.min(...allItems.map(item => item.price)),
                max: Math.max(...allItems.map(item => item.price)),
                average: Math.round(allItems.reduce((sum, item) => sum + item.price, 0) / allItems.length)
            }
        };
    }

    // Load more items (for pagination if needed)
    loadMore() {
        // Implementation for loading more items if pagination is needed
        console.log('Load more items functionality');
    }

    // Update menu data (for dynamic loading)
    updateMenuData(newData) {
        this.menuData = newData;
        this.renderMenu();
    }

    // Export menu data for sharing
    exportMenu() {
        return {
            items: this.getFilteredItems(),
            category: this.currentCategory,
            search: this.searchQuery,
            timestamp: new Date().toISOString()
        };
    }

    // Handle window resize
    handleResize() {
        // Adjust menu grid layout if needed
        if (Utils.device.isMobile()) {
            Utils.dom.addClass(this.menuGrid, 'mobile-layout');
        } else {
            Utils.dom.removeClass(this.menuGrid, 'mobile-layout');
        }
    }

    // Initialize menu with featured items
    showFeaturedItems() {
        const featuredItems = this.menuData.popular.filter(item => item.isPopular);
        
        if (featuredItems.length === 0) return;

        // Create featured section
        const featuredSection = Utils.dom.createElement('div', {
            className: 'featured-menu'
        });

        featuredSection.innerHTML = `
            <h3 class="featured-menu__title">Рекомендуємо спробувати</h3>
            <div class="featured-menu__grid">
                ${featuredItems.slice(0, 3).map(item => `
                    <div class="featured-item" data-item-id="${item.id}">
                        <img src="${item.image}" alt="${item.name}" loading="lazy">
                        <h4>${item.name}</h4>
                        <span class="price">${MenuHelpers.formatPrice(item.price)}</span>
                    </div>
                `).join('')}
            </div>
        `;

        // Insert before main menu
        this.menuGrid.parentNode.insertBefore(featuredSection, this.menuGrid);
    }

    // Destroy menu manager
    destroy() {
        // Clean up event listeners and resources
        this.currentCategory = 'all';
        this.searchQuery = '';
        
        if (this.menuGrid) {
            this.menuGrid.innerHTML = '';
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MenuManager;
} else {
    window.MenuManager = MenuManager;
}