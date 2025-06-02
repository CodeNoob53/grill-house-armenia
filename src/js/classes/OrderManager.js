// Order Manager Class
class OrderManager {
    constructor(animationManager) {
        this.animationManager = animationManager;
        this.orderForm = null;
        this.orderItems = [];
        this.customerData = {};
        this.isSubmitting = false;
        this.init();
    }

    init() {
        this.orderForm = Utils.dom.$('#orderForm');
        
        if (!this.orderForm) {
            console.warn('Order form not found');
            return;
        }

        this.bindEvents();
        this.loadSavedData();
    }

    // Bind event listeners
    bindEvents() {
        // Form submission
        Utils.events.on(this.orderForm, 'submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Real-time validation
        Utils.events.on(this.orderForm, 'blur', 'input, textarea', (e) => {
            this.validateField(e.target);
        }, true);

        // Auto-save form data
        Utils.events.on(this.orderForm, 'input', 'input, textarea', 
            Utils.events.debounce(() => {
                this.saveFormData();
            }, 1000)
        );

        // Listen for menu item additions
        Utils.events.on(document, 'menu:item-added', (e) => {
            this.addItemToOrder(e.detail.item);
        });

        // Phone number formatting
        const phoneInput = Utils.dom.$('#customerPhone');
        if (phoneInput) {
            Utils.events.on(phoneInput, 'input', (e) => {
                this.formatPhoneNumber(e.target);
            });
        }
    }

    // Handle form submission
    async handleFormSubmit() {
        if (this.isSubmitting) return;

        // Validate form
        if (!this.validateForm()) {
            this.showValidationErrors();
            return;
        }

        this.isSubmitting = true;
        this.showLoadingState();

        try {
            const orderData = this.collectFormData();
            const success = await this.submitOrder(orderData);
            
            if (success) {
                this.handleSuccessfulSubmission();
            } else {
                this.handleFailedSubmission();
            }
        } catch (error) {
            console.error('Order submission error:', error);
            this.handleFailedSubmission(error.message);
        } finally {
            this.isSubmitting = false;
            this.hideLoadingState();
        }
    }

    // Validate entire form
    validateForm() {
        const requiredFields = this.orderForm.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Validate individual field
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous errors
        this.clearFieldError(field);

        // Required field validation
        if (field.required && !Utils.validation.required(value)) {
            errorMessage = CONFIG.messages.validation.required;
            isValid = false;
        }
        // Phone validation
        else if (fieldName === 'customerPhone' && value && !Utils.validation.phone(value)) {
            errorMessage = CONFIG.messages.validation.invalidPhone;
            isValid = false;
        }
        // Name validation
        else if (fieldName === 'customerName' && value && !Utils.validation.minLength(value, CONFIG.validation.name.minLength)) {
            errorMessage = Utils.string.template(CONFIG.messages.validation.minLength, {
                min: CONFIG.validation.name.minLength
            });
            isValid = false;
        }
        // Order items validation
        else if (fieldName === 'orderItems' && value && !Utils.validation.minLength(value, CONFIG.validation.order.minLength)) {
            errorMessage = Utils.string.template(CONFIG.messages.validation.minLength, {
                min: CONFIG.validation.order.minLength
            });
            isValid = false;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    // Show field error
    showFieldError(field, message) {
        Utils.dom.addClass(field, 'error');
        
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = Utils.dom.createElement('div', {
                className: 'field-error'
            });
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        
        // Animate error appearance
        if (this.animationManager && this.animationManager.isAnimeLoaded) {
            anime({
                targets: errorElement,
                opacity: [0, 1],
                translateY: [-10, 0],
                duration: 200,
                easing: 'easeOutQuart'
            });
        }
    }

    // Clear field error
    clearFieldError(field) {
        Utils.dom.removeClass(field, 'error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // Show validation errors summary
    showValidationErrors() {
        const firstErrorField = this.orderForm.querySelector('.error');
        if (firstErrorField) {
            firstErrorField.focus();
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Animate form shake
        if (this.animationManager) {
            this.animationManager.animateFormSubmission(this.orderForm, false);
        }
    }

    // Collect form data
    collectFormData() {
        const formData = new FormData(this.orderForm);
        const orderData = {
            customer: {
                name: formData.get('customerName'),
                phone: formData.get('customerPhone'),
                address: formData.get('customerAddress') || ''
            },
            order: {
                items: formData.get('orderItems'),
                notes: formData.get('orderNotes') || '',
                itemsList: this.orderItems
            },
            metadata: {
                timestamp: new Date().toISOString(),
                source: 'website',
                userAgent: navigator.userAgent
            }
        };

        return orderData;
    }

    // Submit order to server/service
    async submitOrder(orderData) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // For demo purposes, we'll simulate different outcomes
        const shouldSucceed = Math.random() > 0.1; // 90% success rate

        if (shouldSucceed) {
            // Save to localStorage as backup
            this.saveOrderToStorage(orderData);
            
            // Send to Telegram bot (if configured)
            this.sendToTelegramBot(orderData);
            
            // Send to email service (if configured)
            this.sendToEmailService(orderData);
            
            return true;
        } else {
            throw new Error(CONFIG.messages.error.serverError);
        }
    }

    // Send order to Telegram bot
    async sendToTelegramBot(orderData) {
        if (!CONFIG.api.telegramBotToken) return;

        const message = this.formatTelegramMessage(orderData);
        
        try {
            // This would be the actual Telegram API call
            // For demo, we just log it
            console.log('Telegram message:', message);
            
            // Actual implementation would be:
            // const response = await fetch(`https://api.telegram.org/bot${CONFIG.api.telegramBotToken}/sendMessage`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         chat_id: CHAT_ID,
            //         text: message,
            //         parse_mode: 'HTML'
            //     })
            // });
        } catch (error) {
            console.error('Telegram send error:', error);
        }
    }

    // Format order for Telegram message
    formatTelegramMessage(orderData) {
        const { customer, order, metadata } = orderData;
        
        return `
🍽️ <b>Нове замовлення Grill House Armenia</b>

👤 <b>Клієнт:</b>
Ім'я: ${customer.name}
Телефон: ${customer.phone}
${customer.address ? `Адреса: ${customer.address}` : ''}

📋 <b>Замовлення:</b>
${order.items}

${order.notes ? `💬 <b>Коментар:</b>\n${order.notes}` : ''}

🕐 <b>Час замовлення:</b> ${Utils.date.format(metadata.timestamp, 'DD.MM.YYYY HH:mm')}
        `.trim();
    }

    // Send to email service (Formspree or similar)
    async sendToEmailService(orderData) {
        if (!CONFIG.api.formspreeEndpoint) return;

        try {
            const response = await fetch(CONFIG.api.formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: orderData.customer.name,
                    phone: orderData.customer.phone,
                    address: orderData.customer.address,
                    order: orderData.order.items,
                    notes: orderData.order.notes,
                    timestamp: orderData.metadata.timestamp
                })
            });

            if (!response.ok) {
                throw new Error('Email service error');
            }
        } catch (error) {
            console.error('Email send error:', error);
        }
    }

    // Handle successful order submission
    handleSuccessfulSubmission() {
        // Show success message
        this.showSuccessMessage();
        
        // Clear form
        this.clearForm();
        
        // Clear saved data
        this.clearSavedData();
        
        // Reset order items
        this.orderItems = [];
        
        // Animate success
        if (this.animationManager) {
            this.animationManager.animateFormSubmission(this.orderForm, true);
        }
    }

    // Handle failed order submission
    handleFailedSubmission(errorMessage = null) {
        const message = errorMessage || CONFIG.messages.error.unknownError;
        this.showErrorMessage(message);
        
        // Animate error
        if (this.animationManager) {
            this.animationManager.animateFormSubmission(this.orderForm, false);
        }
    }

    // Show success message
    showSuccessMessage() {
        const messageContainer = this.createMessageContainer('success');
        messageContainer.innerHTML = `
            <div class="message-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="message-content">
                <h3>Замовлення відправлено!</h3>
                <p>${CONFIG.messages.success.orderSent}</p>
                <p>Очікуйте дзвінка протягом 10-15 хвилин.</p>
            </div>
        `;
        
        this.showMessage(messageContainer);
    }

    // Show error message
    showErrorMessage(errorText) {
        const messageContainer = this.createMessageContainer('error');
        messageContainer.innerHTML = `
            <div class="message-icon">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <div class="message-content">
                <h3>Помилка відправки</h3>
                <p>${errorText}</p>
                <p>Спробуйте ще раз або зателефонуйте нам: <a href="tel:${CONFIG.restaurant.phone}">${CONFIG.restaurant.phone}</a></p>
            </div>
        `;
        
        this.showMessage(messageContainer);
    }

    // Create message container
    createMessageContainer(type) {
        const container = Utils.dom.createElement('div', {
            className: `order-message order-message--${type}`
        });
        
        return container;
    }

    // Show message
    showMessage(messageContainer) {
        // Remove existing messages
        const existingMessages = Utils.dom.$('.order-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Insert message
        this.orderForm.parentNode.insertBefore(messageContainer, this.orderForm);
        
        // Animate appearance
        if (this.animationManager && this.animationManager.isAnimeLoaded) {
            anime({
                targets: messageContainer,
                opacity: [0, 1],
                scale: [0.9, 1],
                duration: 400,
                easing: 'easeOutQuart'
            });
        }
        
        // Auto-hide after 10 seconds for success messages
        if (messageContainer.classList.contains('order-message--success')) {
            setTimeout(() => {
                this.hideMessage(messageContainer);
            }, 10000);
        }
        
        // Scroll to message
        messageContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Hide message
    hideMessage(messageContainer) {
        if (this.animationManager && this.animationManager.isAnimeLoaded) {
            anime({
                targets: messageContainer,
                opacity: [1, 0],
                scale: [1, 0.9],
                duration: 300,
                easing: 'easeOutQuart',
                complete: () => messageContainer.remove()
            });
        } else {
            messageContainer.remove();
        }
    }

    // Show loading state
    showLoadingState() {
        const submitButton = this.orderForm.querySelector('button[type="submit"]');
        if (!submitButton) return;

        submitButton.disabled = true;
        submitButton.dataset.originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = `
            <span class="loading-spinner"></span>
            Відправляємо...
        `;

        Utils.dom.addClass(submitButton, 'loading');
    }

    // Hide loading state
    hideLoadingState() {
        const submitButton = this.orderForm.querySelector('button[type="submit"]');
        if (!submitButton) return;

        submitButton.disabled = false;
        submitButton.innerHTML = submitButton.dataset.originalText || submitButton.innerHTML;
        
        Utils.dom.removeClass(submitButton, 'loading');
    }

    // Add item to order list
    addItemToOrder(item) {
        // Check if item already exists
        const existingIndex = this.orderItems.findIndex(orderItem => orderItem.id === item.id);
        
        if (existingIndex >= 0) {
            // Increase quantity
            this.orderItems[existingIndex].quantity += 1;
        } else {
            // Add new item
            this.orderItems.push({
                ...item,
                quantity: 1,
                addedAt: Date.now()
            });
        }
        
        this.updateOrderDisplay();
    }

    // Update order display in form
    updateOrderDisplay() {
        const orderItemsTextarea = Utils.dom.$('#orderItems');
        if (!orderItemsTextarea) return;

        const orderText = this.orderItems.map(item => {
            const quantityText = item.quantity > 1 ? ` x${item.quantity}` : '';
            return `${item.name}${quantityText} - ${MenuHelpers.formatPrice(item.price * item.quantity)}`;
        }).join('\n');

        orderItemsTextarea.value = orderText;
        
        // Update total price display (if exists)
        this.updateOrderTotal();
    }

    // Calculate and display order total
    updateOrderTotal() {
        const totalAmount = this.orderItems.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        
        const totalElement = Utils.dom.$('.order-total');
        if (totalElement) {
            totalElement.textContent = `Всього: ${MenuHelpers.formatPrice(totalAmount)}`;
        }
    }

    // Format phone number input
    formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, ''); // Remove non-digits
        
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

    // Save form data to localStorage
    saveFormData() {
        const formData = {
            customerName: Utils.dom.$('#customerName')?.value || '',
            customerPhone: Utils.dom.$('#customerPhone')?.value || '',
            customerAddress: Utils.dom.$('#customerAddress')?.value || '',
            orderNotes: Utils.dom.$('#orderNotes')?.value || '',
            timestamp: Date.now()
        };
        
        Utils.storage.set('orderFormData', formData);
    }

    // Load saved form data
    loadSavedData() {
        const savedData = Utils.storage.get('orderFormData');
        if (!savedData) return;
        
        // Don't load data older than 24 hours
        const dayInMs = 24 * 60 * 60 * 1000;
        if (Date.now() - savedData.timestamp > dayInMs) {
            Utils.storage.remove('orderFormData');
            return;
        }
        
        // Fill form fields
        Object.keys(savedData).forEach(key => {
            if (key === 'timestamp') return;
            const field = Utils.dom.$(`#${key}`);
            if (field) {
                field.value = savedData[key];
            }
        });
    }

    // Clear saved form data
    clearSavedData() {
        Utils.storage.remove('orderFormData');
    }

    // Save order to localStorage as backup
    saveOrderToStorage(orderData) {
        const orders = Utils.storage.get('submittedOrders', []);
        orders.push({
            ...orderData,
            id: Date.now(),
            status: 'submitted'
        });
        
        // Keep only last 10 orders
        if (orders.length > 10) {
            orders.splice(0, orders.length - 10);
        }
        
        Utils.storage.set('submittedOrders', orders);
    }

    // Clear form
    clearForm() {
        this.orderForm.reset();
        
        // Clear any error states
        const errorFields = this.orderForm.querySelectorAll('.error');
        errorFields.forEach(field => this.clearFieldError(field));
        
        // Clear order items display
        this.updateOrderDisplay();
    }

    // Get order history from localStorage
    getOrderHistory() {
        return Utils.storage.get('submittedOrders', []);
    }

    // Destroy order manager
    destroy() {
        this.orderItems = [];
        this.customerData = {};
        this.isSubmitting = false;
        
        // Clear any pending auto-save
        clearTimeout(this.autoSaveTimeout);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OrderManager;
} else {
    window.OrderManager = OrderManager;
}