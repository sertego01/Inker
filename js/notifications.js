// Notification System
// Modern, beautiful notifications to replace browser alerts

class NotificationSystem {
    constructor() {
        this.container = null;
        this.notifications = new Map();
        this.init();
    }

    init() {
        // Create notification container
        this.container = document.createElement('div');
        this.container.className = 'notification-container';
        document.body.appendChild(this.container);
    }

    show(options) {
        const {
            type = 'info',
            title = '',
            message = '',
            duration = 5000,
            closable = true,
            icon = null
        } = options;

        // Generate unique ID
        const id = Date.now() + Math.random().toString(36).substr(2, 9);
        
        // Get icon based on type
        const defaultIcons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        const notificationIcon = icon || defaultIcons[type] || defaultIcons.info;

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.id = `notification-${id}`;

        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">${notificationIcon}</div>
                <div class="notification-text">
                    ${title ? `<div class="notification-title">${title}</div>` : ''}
                    <div class="notification-message">${message}</div>
                </div>
            </div>
            ${closable ? '<button class="notification-close" onclick="window.notificationSystem.close(\'' + id + '\')">×</button>' : ''}
            <div class="notification-progress"></div>
        `;

        // Add to container
        this.container.appendChild(notification);
        this.notifications.set(id, notification);

        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Auto close after duration
        if (duration > 0) {
            this.autoClose(id, duration);
        }

        return id;
    }

    close(id) {
        const notification = this.notifications.get(id);
        if (!notification) return;

        notification.classList.add('hide');
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            this.notifications.delete(id);
        }, 300);
    }

    autoClose(id, duration) {
        const notification = this.notifications.get(id);
        if (!notification) return;

        const progressBar = notification.querySelector('.notification-progress');
        if (progressBar) {
            progressBar.style.width = '100%';
            progressBar.style.transition = `width ${duration}ms linear`;
        }

        setTimeout(() => {
            this.close(id);
        }, duration);
    }

    // Convenience methods
    success(title, message, duration = 5000) {
        return this.show({ type: 'success', title, message, duration });
    }

    error(title, message, duration = 7000) {
        return this.show({ type: 'error', title, message, duration });
    }

    warning(title, message, duration = 6000) {
        return this.show({ type: 'warning', title, message, duration });
    }

    info(title, message, duration = 5000) {
        return this.show({ type: 'info', title, message, duration });
    }

    // Replace browser alert
    alert(message, title = 'Alert') {
        return this.info(title, message);
    }

    // Replace browser confirm (simplified)
    confirm(message, title = 'Confirm') {
        return new Promise((resolve) => {
            const id = this.show({
                type: 'warning',
                title,
                message: `${message}<br><br><div style="display: flex; gap: 10px; margin-top: 10px;">
                    <button onclick="window.notificationSystem.close('${id}'); window.confirmCallback(true);" 
                            style="background: #22c55e; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 0.9rem;">Yes</button>
                    <button onclick="window.notificationSystem.close('${id}'); window.confirmCallback(false);" 
                            style="background: #6b7280; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 0.9rem;">No</button>
                </div>`,
                duration: 0,
                closable: false
            });

            window.confirmCallback = (result) => {
                resolve(result);
                delete window.confirmCallback;
            };
        });
    }

    // Replace browser prompt (simplified)
    prompt(message, title = 'Input') {
        return new Promise((resolve) => {
            const inputId = 'prompt-input-' + Date.now();
            const id = this.show({
                type: 'info',
                title,
                message: `${message}<br><br><div style="margin-top: 10px;">
                    <input type="text" id="${inputId}" 
                           style="width: 100%; padding: 8px 12px; border: 1px solid #4b5563; border-radius: 6px; background: #374151; color: white; font-size: 0.9rem; box-sizing: border-box;">
                    <div style="display: flex; gap: 10px; margin-top: 10px;">
                        <button onclick="window.notificationSystem.close('${id}'); window.promptCallback(document.getElementById('${inputId}').value);" 
                                style="background: #8b5cf6; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 0.9rem;">OK</button>
                        <button onclick="window.notificationSystem.close('${id}'); window.promptCallback(null);" 
                                style="background: #6b7280; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 0.9rem;">Cancel</button>
                    </div>
                </div>`,
                duration: 0,
                closable: false
            });

            // Focus input
            setTimeout(() => {
                const input = document.getElementById(inputId);
                if (input) input.focus();
            }, 100);

            window.promptCallback = (result) => {
                resolve(result);
                delete window.promptCallback;
            };
        });
    }

    // Clear all notifications
    clear() {
        this.notifications.forEach((notification, id) => {
            this.close(id);
        });
    }
}

// Initialize notification system immediately
(function() {
    // Create notification system
    window.notificationSystem = new NotificationSystem();
    
    // Create Notifications object
    window.Notifications = {
        success: (title, message, duration) => window.notificationSystem.success(title, message, duration),
        error: (title, message, duration) => window.notificationSystem.error(title, message, duration),
        warning: (title, message, duration) => window.notificationSystem.warning(title, message, duration),
        info: (title, message, duration) => window.notificationSystem.info(title, message, duration),
        show: (options) => window.notificationSystem.show(options),
        close: (id) => window.notificationSystem.close(id),
        clear: () => window.notificationSystem.clear()
    };

    // Replace global alert function
    window.originalAlert = window.alert;
    window.alert = function(message) {
        window.notificationSystem.alert(message);
    };

    // Replace global confirm function
    window.originalConfirm = window.confirm;
    window.confirm = function(message) {
        return window.notificationSystem.confirm(message);
    };

    // Replace global prompt function
    window.originalPrompt = window.prompt;
    window.prompt = function(message, defaultValue = '') {
        return window.notificationSystem.prompt(message, 'Input');
    };

    console.log('Notification system initialized');
})();
