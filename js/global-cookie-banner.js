// Global Cookie Banner - Include this in all pages
(function() {
    'use strict';
    
    // Check if cookie banner already exists
    if (document.getElementById('cookieConsent')) {
        return;
    }
    
    // Create cookie banner HTML
    const cookieBannerHTML = `
        <!-- Cookie Consent Banner -->
        <div id="cookieConsent" class="cookie-consent">
            <div class="cookie-consent-content">
                <div class="cookie-consent-text">
                    <h3>Política de Cookies</h3>
                    <p>Usamos cookies para mejorar tu experiencia de navegación, ofrecer contenido personalizado y analizar el tráfico. Al hacer clic en "Aceptar todas", consientes el uso de cookies.</p>
                </div>
                <div class="cookie-consent-buttons">
                    <button id="acceptAllCookies" class="cookie-btn cookie-btn-primary">Aceptar todas</button>
                    <button id="acceptNecessaryCookies" class="cookie-btn cookie-btn-secondary">Aceptar solo necesarias</button>
                    <button id="cookieSettings" class="cookie-btn cookie-btn-tertiary">Configuración de cookies</button>
                    <a href="cookie-policy.html" class="cookie-btn cookie-btn-tertiary">Saber más</a>
                </div>
            </div>
        </div>

        <!-- Cookie Settings Modal -->
        <div id="cookieSettingsModal" class="cookie-settings-modal">
            <div class="cookie-settings-content">
                <div class="cookie-settings-header">
                    <h2>Configuración de cookies</h2>
                    <button id="closeCookieSettings" class="cookie-settings-close">&times;</button>
                </div>
                
                <div class="cookie-settings-description">
                    <p>Usamos cookies para mejorar tu experiencia, ofrecer contenido personalizado y analizar el tráfico. Puedes personalizar tus preferencias abajo.</p>
                </div>
                
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <h3 class="cookie-category-title">Cookies necesarias</h3>
                        <label class="cookie-toggle">
                            <input type="checkbox" id="cookie-necessary" checked disabled>
                            <span class="cookie-slider"></span>
                        </label>
                    </div>
                    <p class="cookie-category-description">Estas cookies son esenciales para el funcionamiento del sitio. No se pueden desactivar.</p>
                </div>
                
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <h3 class="cookie-category-title">Cookies de analítica</h3>
                        <label class="cookie-toggle">
                            <input type="checkbox" id="cookie-analytics">
                            <span class="cookie-slider"></span>
                        </label>
                    </div>
                    <p class="cookie-category-description">Ayudan a entender cómo interactúan los usuarios recopilando información de forma anónima.</p>
                </div>
                
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <h3 class="cookie-category-title">Cookies funcionales</h3>
                        <label class="cookie-toggle">
                            <input type="checkbox" id="cookie-functional">
                            <span class="cookie-slider"></span>
                        </label>
                    </div>
                    <p class="cookie-category-description">Habilitan funcionalidades mejoradas y personalización, como recordar tus preferencias.</p>
                </div>
                
                <div class="cookie-category">
                    <div class="cookie-category-header">
                        <h3 class="cookie-category-title">Cookies de marketing</h3>
                        <label class="cookie-toggle">
                            <input type="checkbox" id="cookie-marketing">
                            <span class="cookie-slider"></span>
                        </label>
                    </div>
                    <p class="cookie-category-description">Se usan para rastrear visitantes y mostrar publicidad relevante.</p>
                </div>
                
                <div class="cookie-settings-footer">
                    <button id="saveCookiePreferences" class="cookie-btn cookie-btn-primary">Guardar preferencias</button>
                    <button id="closeCookieSettings" class="cookie-btn cookie-btn-secondary">Cerrar</button>
                </div>
            </div>
        </div>
    `;
    
    // Insert cookie banner before closing body tag - Solo si no hay un sistema de inicialización centralizado
    if (typeof window.initApp === 'undefined') {
        document.addEventListener('DOMContentLoaded', function() {
            // Wait a bit to avoid conflicts with other scripts
            setTimeout(() => {
                // Insert the HTML before the closing body tag
                document.body.insertAdjacentHTML('beforeend', cookieBannerHTML);
                
                // Initialize cookie consent if the script is available
                if (typeof CookieConsent !== 'undefined') {
                    window.cookieConsent = new CookieConsent();
                }
            }, 200);
        });
    }
})();
