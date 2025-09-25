// Cookie Consent Management
class CookieConsent {
    constructor() {
        this.consent = this.getStoredConsent();
        this.categories = {
            necessary: true, // Always true, cannot be disabled
            analytics: false,
            functional: false,
            marketing: false
        };
        
        this.init();
    }
    
    init() {
        // Load stored preferences
        this.loadStoredPreferences();
        
        // Show consent banner if no consent given
        if (!this.consent) {
            this.showConsentBanner();
        }
        
        // Initialize toggles
        this.initializeToggles();
        
        // Bind events
        this.bindEvents();
    }
    
    getStoredConsent() {
        return localStorage.getItem('cookieConsent');
    }
    
    setStoredConsent(consent) {
        localStorage.setItem('cookieConsent', consent);
    }
    
    loadStoredPreferences() {
        const stored = localStorage.getItem('cookiePreferences');
        if (stored) {
            try {
                const preferences = JSON.parse(stored);
                this.categories = { ...this.categories, ...preferences };
            } catch (e) {
                console.warn('Failed to parse stored cookie preferences');
            }
        }
    }
    
    savePreferences() {
        localStorage.setItem('cookiePreferences', JSON.stringify(this.categories));
    }
    
    showConsentBanner() {
        const banner = document.getElementById('cookieConsent');
        if (banner) {
            banner.classList.add('show');
        }
    }
    
    hideConsentBanner() {
        const banner = document.getElementById('cookieConsent');
        if (banner) {
            banner.classList.remove('show');
        }
    }
    
    showSettingsModal() {
        const modal = document.getElementById('cookieSettingsModal');
        if (modal) {
            modal.classList.add('show');
        }
    }
    
    hideSettingsModal() {
        const modal = document.getElementById('cookieSettingsModal');
        if (modal) {
            modal.classList.remove('show');
        }
    }
    
    initializeToggles() {
        // Set initial toggle states
        Object.keys(this.categories).forEach(category => {
            const toggle = document.getElementById(`cookie-${category}`);
            if (toggle) {
                toggle.checked = this.categories[category];
                toggle.disabled = category === 'necessary';
            }
        });
    }
    
    bindEvents() {
        // Accept all button
        const acceptAllBtn = document.getElementById('acceptAllCookies');
        if (acceptAllBtn) {
            acceptAllBtn.addEventListener('click', () => this.acceptAll());
        }
        
        // Accept necessary only button
        const acceptNecessaryBtn = document.getElementById('acceptNecessaryCookies');
        if (acceptNecessaryBtn) {
            acceptNecessaryBtn.addEventListener('click', () => this.acceptNecessary());
        }
        
        // Settings button
        const settingsBtn = document.getElementById('cookieSettings');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.showSettingsModal());
        }
        
        // Learn more button - now it's a link, no event listener needed
        // const learnMoreBtn = document.getElementById('learnMoreCookies');
        // if (learnMoreBtn) {
        //     learnMoreBtn.addEventListener('click', () => this.showSettingsModal());
        // }
        
        // Close settings modal
        const closeBtn = document.getElementById('closeCookieSettings');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideSettingsModal());
        }
        
        // Save preferences button
        const saveBtn = document.getElementById('saveCookiePreferences');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => this.saveCookiePreferences());
        }
        
        // Toggle changes
        Object.keys(this.categories).forEach(category => {
            const toggle = document.getElementById(`cookie-${category}`);
            if (toggle) {
                toggle.addEventListener('change', (e) => {
                    if (category !== 'necessary') {
                        this.categories[category] = e.target.checked;
                    }
                });
            }
        });
        
        // Close modal on backdrop click
        const modal = document.getElementById('cookieSettingsModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideSettingsModal();
                }
            });
        }
    }
    
    acceptAll() {
        this.categories = {
            necessary: true,
            analytics: true,
            functional: true,
            marketing: true
        };
        
        this.setStoredConsent('accepted');
        this.savePreferences();
        this.hideConsentBanner();
        this.initializeAnalytics();
        this.initializeFunctional();
        this.initializeMarketing();
    }
    
    acceptNecessary() {
        this.categories = {
            necessary: true,
            analytics: false,
            functional: false,
            marketing: false
        };
        
        this.setStoredConsent('accepted');
        this.savePreferences();
        this.hideConsentBanner();
    }
    
    saveCookiePreferences() {
        this.setStoredConsent('accepted');
        this.savePreferences();
        this.hideSettingsModal();
        this.hideConsentBanner();
        
        // Initialize based on preferences
        if (this.categories.analytics) {
            this.initializeAnalytics();
        }
        if (this.categories.functional) {
            this.initializeFunctional();
        }
        if (this.categories.marketing) {
            this.initializeMarketing();
        }
    }
    
    initializeAnalytics() {
        // Google Analytics or other analytics tools
        console.log('Analytics cookies initialized');
        
        // Example: Initialize Google Analytics
        // gtag('config', 'GA_MEASUREMENT_ID');
    }
    
    initializeFunctional() {
        // Functional cookies for enhanced user experience
        console.log('Functional cookies initialized');
        
        // Example: Initialize user preferences
        // this.initializeUserPreferences();
    }
    
    initializeMarketing() {
        // Marketing cookies for advertising
        console.log('Marketing cookies initialized');
        
        // Example: Initialize Facebook Pixel
        // fbq('init', 'PIXEL_ID');
    }
    
    // Utility methods
    hasConsent(category) {
        return this.categories[category] || false;
    }
    
    revokeConsent() {
        this.setStoredConsent(null);
        localStorage.removeItem('cookiePreferences');
        this.categories = {
            necessary: true,
            analytics: false,
            functional: false,
            marketing: false
        };
        this.showConsentBanner();
    }
}

// Initialize cookie consent when DOM is loaded - Solo si no hay un sistema de inicialización centralizado
if (typeof window.initApp === 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        // Wait a bit to avoid conflicts with other scripts
        setTimeout(() => {
            window.cookieConsent = new CookieConsent();
        }, 300);
    });
}

// Export for use in other scripts
window.CookieConsent = CookieConsent;
