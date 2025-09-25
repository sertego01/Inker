// Centralized initialization script to prevent conflicts
(function() {
    'use strict';
    
    let isInitialized = false;
    
    function initializeApp() {
        if (isInitialized) return;
        isInitialized = true;
        
        console.log('Initializing application...');
        
        // Initialize i18n first
        if (typeof window.i18n === 'undefined' && typeof I18n !== 'undefined') {
            window.i18n = new I18n();
        }
        
        // Initialize cookie consent
        if (typeof CookieConsent !== 'undefined' && !window.cookieConsent) {
            window.cookieConsent = new CookieConsent();
        }
        
        // Initialize notification system
        if (typeof NotificationSystem !== 'undefined' && !window.notificationSystem) {
            window.notificationSystem = new NotificationSystem();
        }
        
        console.log('Application initialized successfully');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        // DOM is already ready
        initializeApp();
    }
    
    // Also initialize after a delay to catch any late-loading scripts
    setTimeout(initializeApp, 1000);
})();
