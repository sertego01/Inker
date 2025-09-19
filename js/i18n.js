// Sistema de internacionalización
class I18n {
    constructor() {
        // Usar el idioma guardado o inglés por defecto
        this.currentLanguage = localStorage.getItem('language') || 'en';
        console.log('I18n constructor - currentLanguage:', this.currentLanguage);
        this.translations = {
            en: {
                // Navigation
                'nav.find-styles': 'Styles',
                'nav.find-artist': 'Artist',
                'nav.login': 'Login',
                'nav.signup': 'Sign up',
                'nav.messages': 'Messages',
                'nav.dashboard': 'Dashboard',
                'nav.logout': 'Logout',
                
                // Hero Section
                'hero.title': 'Find Your Perfect',
                'hero.title-highlight': 'Tattoo Artist',
                'hero.subtitle': 'Connect with talented tattoo artists in your area. Browse styles, read reviews and book your next piece with confidence.',
                'hero.search-placeholder': 'Search by artist name, style, or location...',
                'hero.search-button': 'Search',
                
                // Features
                'features.browse-styles': 'Browse Styles',
                'features.browse-styles-desc': 'Explore different tattoo styles and find inspiration for your next piece.',
                'features.find-near': 'Find Near You',
                'features.find-near-desc': 'Discover talented artists in your local area.',
                'features.most-popular': 'Most Popular',
                'features.most-popular-desc': 'See the most popular artists and trending styles.',
                
                // Popular Styles
                'styles.title': 'Popular Tattoo Styles',
                'styles.subtitle': 'Discover the most popular tattoo styles and find your perfect match',
                'styles.traditional': 'Traditional',
                'styles.realistic': 'Realistic',
                'styles.japanese': 'Japanese',
                'styles.blackwork': 'Blackwork',
                'styles.watercolor': 'Watercolor',
                'styles.geometric': 'Geometric',
                'styles.tribal': 'Tribal',
                'styles.neotraditional': 'Neo-traditional',
                'styles.minimalist': 'Minimalist',
                'styles.biomechanical': 'Biomechanical',
                'styles.dotwork': 'Dotwork',
                'styles.henna': 'Henna',
                
                // Featured Artists
                'artists.title': 'Featured Artists',
                'artists.subtitle': 'Discover some of our most talented and popular artists',
                
                // How it works
                'how-it-works.title': 'How It Works',
                'how-it-works.step1': 'Browse Artists',
                'how-it-works.step1-desc': 'Explore profiles of talented tattoo artists in your area',
                'how-it-works.step2': 'Choose Your Style',
                'how-it-works.step2-desc': 'Select from various tattoo styles and get inspired',
                'how-it-works.step3': 'Book Appointment',
                'how-it-works.step3-desc': 'Schedule your consultation and book your tattoo session',
                
                // Footer
                'footer.terms': 'Terms and Conditions',
                'footer.privacy': 'Privacy Policy',
                'footer.follow': 'Follow us',
                'footer.copyright': '© 2024 Inker. All rights reserved.',
                
                // Auth
                'auth.welcome-back': 'Welcome back',
                'auth.signin-subtitle': 'Sign in to your account to continue',
                'auth.email': 'Email address',
                'auth.email-placeholder': 'Enter your email',
                'auth.password': 'Password',
                'auth.password-placeholder': 'Enter your password',
                'auth.remember-me': 'Remember me',
                'auth.forgot-password': 'Forgot password?',
                'auth.signin-button': 'Sign in',
                'auth.no-account': "Don't have an account?",
                'auth.signup-link': 'Sign up',
                
                'auth.create-account': 'Create Account',
                'auth.signup-subtitle': 'Sign up to start your tattoo journey',
                'auth.full-name': 'Full name',
                'auth.full-name-placeholder': 'Enter your full name',
                'auth.confirm-password': 'Confirm password',
                'auth.confirm-password-placeholder': 'Confirm your password',
                'auth.create-account-button': 'Create Account',
                'auth.have-account': 'Already have an account?',
                'auth.signin-link': 'Sign in',
                
                // Dashboard
                'dashboard.my-profile': 'My Profile',
                'dashboard.my-appointments': 'My Appointments',
                'dashboard.favorites': 'Favorites',
                'dashboard.recommendations': 'Recommendations',
                'dashboard.portfolio': 'Portfolio',
                'dashboard.availability': 'Availability',
                'dashboard.statistics': 'Statistics',
                
                // Common
                'common.loading': 'Loading...',
                'common.error': 'Error',
                'common.success': 'Success',
                'common.cancel': 'Cancel',
                'common.save': 'Save',
                'common.edit': 'Edit',
                'common.delete': 'Delete',
                
                // Search Pages
                'discover-styles-title': 'Discover Tattoo Styles',
                'discover-styles-subtitle': 'Explore different artistic styles and find the perfect match for your next tattoo',
                'search-styles-placeholder': 'Search styles, techniques, or characteristics...',
                'search-artists-placeholder': 'Search artists, styles, or locations...',
                'search-btn': 'Search',
                'filters-text': 'Filters',
                'sort-by': 'Sort by:',
                'sort-name': 'Name',
                'sort-rating': 'Rating',
                'sort-location': 'Location',
                'find-artist-title': 'Find Your Perfect Tattoo Artist',
                'find-artist-subtitle': 'Discover talented artists in your area and find the perfect match for your next tattoo'
            },
            es: {
                // Navigation
                'nav.find-styles': 'Estilos',
                'nav.find-artist': 'Tatuadores',
                'nav.login': 'Iniciar sesión',
                'nav.signup': 'Registrarse',
                'nav.messages': 'Mensajes',
                'nav.dashboard': 'Panel',
                'nav.logout': 'Cerrar sesión',
                
                // Hero Section
                'hero.title': 'Encuentra tu',
                'hero.title-highlight': 'Tatuador Perfecto',
                'hero.subtitle': 'Conecta con talentosos tatuadores en tu área. Explora estilos, lee reseñas y reserva tu próxima pieza con confianza.',
                'hero.search-placeholder': 'Buscar por nombre de tatuador, estilo o ubicación...',
                'hero.search-button': 'Buscar',
                
                // Features
                'features.browse-styles': 'Explorar Estilos',
                'features.browse-styles-desc': 'Explora diferentes estilos de tatuajes y encuentra inspiración para tu próxima pieza.',
                'features.find-near': 'Encuentra Cerca',
                'features.find-near-desc': 'Descubre tatuadores talentosos en tu área local.',
                'features.most-popular': 'Más Populares',
                'features.most-popular-desc': 'Ve los tatuadores más populares y estilos en tendencia.',
                
                // Popular Styles
                'styles.title': 'Estilos de Tatuajes Populares',
                'styles.subtitle': 'Descubre los estilos de tatuajes más populares y encuentra tu coincidencia perfecta',
                'styles.traditional': 'Tradicional',
                'styles.realistic': 'Realista',
                'styles.japanese': 'Japonés',
                'styles.blackwork': 'Blackwork',
                'styles.watercolor': 'Acuarela',
                'styles.geometric': 'Geométrico',
                'styles.tribal': 'Tribal',
                'styles.neotraditional': 'Neo-tradicional',
                'styles.minimalist': 'Minimalista',
                'styles.biomechanical': 'Biomecánico',
                'styles.dotwork': 'Puntillismo',
                'styles.henna': 'Henna',
                
                // Featured Artists
                'artists.title': 'Tatuadores Destacados',
                'artists.subtitle': 'Descubre algunos de nuestros tatuadores más talentosos y populares',
                
                // How it works
                'how-it-works.title': 'Cómo Funciona',
                'how-it-works.step1': 'Explora tatuadores',
                'how-it-works.step1-desc': 'Explora perfiles de talentosos tatuadores de tatuajes en tu área',
                'how-it-works.step2': 'Elige tu Estilo',
                'how-it-works.step2-desc': 'Selecciona entre varios estilos de tatuajes e inspírate',
                'how-it-works.step3': 'Reserva Cita',
                'how-it-works.step3-desc': 'Programa tu consulta y reserva tu sesión de tatuaje',
                
                // Footer
                'footer.terms': 'Términos y Condiciones',
                'footer.privacy': 'Política de Privacidad',
                'footer.follow': 'Síguenos',
                'footer.copyright': '© 2024 Inker. Todos los derechos reservados.',
                
                // Auth
                'auth.welcome-back': 'Bienvenido de vuelta',
                'auth.signin-subtitle': 'Inicia sesión en tu cuenta para continuar',
                'auth.email': 'Correo electrónico',
                'auth.email-placeholder': 'Ingresa tu correo electrónico',
                'auth.password': 'Contraseña',
                'auth.password-placeholder': 'Ingresa tu contraseña',
                'auth.remember-me': 'Recordarme',
                'auth.forgot-password': '¿Olvidaste tu contraseña?',
                'auth.signin-button': 'Iniciar sesión',
                'auth.no-account': '¿No tienes una cuenta?',
                'auth.signup-link': 'Regístrate',
                
                'auth.create-account': 'Crear Cuenta',
                'auth.signup-subtitle': 'Regístrate para comenzar tu viaje de tatuajes',
                'auth.full-name': 'Nombre completo',
                'auth.full-name-placeholder': 'Ingresa tu nombre completo',
                'auth.confirm-password': 'Confirmar contraseña',
                'auth.confirm-password-placeholder': 'Confirma tu contraseña',
                'auth.create-account-button': 'Crear Cuenta',
                'auth.have-account': '¿Ya tienes una cuenta?',
                'auth.signin-link': 'Iniciar sesión',
                
                // Dashboard
                'dashboard.my-profile': 'Mi Perfil',
                'dashboard.my-appointments': 'Mis Citas',
                'dashboard.favorites': 'Favoritos',
                'dashboard.recommendations': 'Recomendaciones',
                'dashboard.portfolio': 'Portafolio',
                'dashboard.availability': 'Disponibilidad',
                'dashboard.statistics': 'Estadísticas',
                
                // Common
                'common.loading': 'Cargando...',
                'common.error': 'Error',
                'common.success': 'Éxito',
                'common.cancel': 'Cancelar',
                'common.save': 'Guardar',
                'common.edit': 'Editar',
                'common.delete': 'Eliminar',
                
                // Search Pages
                'discover-styles-title': 'Descubre Estilos de Tatuajes',
                'discover-styles-subtitle': 'Explora diferentes estilos artísticos y encuentra la combinación perfecta para tu próximo tatuaje',
                'search-styles-placeholder': 'Estilos, técnicas o características...',
                'search-artists-placeholder': 'Tatuadoreses, estilos o ubicaciones...',
                'search-btn': 'Buscar',
                'filters-text': 'Filtros',
                'sort-by': 'Ordenar por:',
                'sort-name': 'Nombre',
                'sort-rating': 'Valoración',
                'sort-location': 'Ubicación',
                'find-artist-title': 'Encuentra tu Tatuador Perfecto',
                'find-artist-subtitle': 'Descubre tatuadores talentosos en tu área y encuentra la combinación perfecta para tu próximo tatuaje'
            }
        };
        
        this.init();
    }
    
    init() {
        console.log('I18n initializing with language:', this.currentLanguage);
        this.updateLanguage();
        this.createLanguageSelector();
        console.log('I18n initialization complete');
    }
    
    createLanguageSelector() {
        console.log('Creating language selector for language:', this.currentLanguage);
        
        // Crear selector de idioma
        const languageSelector = document.createElement('div');
        languageSelector.className = 'language-selector';
        languageSelector.innerHTML = `
            <span class="language-option ${this.currentLanguage === 'es' ? 'active' : ''}" data-lang="es">ES</span>
            <span class="language-separator">/</span>
            <span class="language-option ${this.currentLanguage === 'en' ? 'active' : ''}" data-lang="en">EN</span>
        `;
        
        console.log('Language selector HTML:', languageSelector.innerHTML);
        
        // Insertar en el navbar
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            // Insertar después del logo
            const logo = navContainer.querySelector('.nav-logo');
            if (logo) {
                logo.insertAdjacentElement('afterend', languageSelector);
            }
        }
        
        // Agregar event listeners
        languageSelector.addEventListener('click', (e) => {
            if (e.target.classList.contains('language-option')) {
                const newLang = e.target.dataset.lang;
                this.changeLanguage(newLang);
            }
        });
    }
    
    changeLanguage(newLang) {
        if (newLang !== this.currentLanguage) {
            this.currentLanguage = newLang;
            localStorage.setItem('language', newLang);
            this.updateLanguage();
            this.updateLanguageSelector();
        }
    }
    
    updateLanguageSelector() {
        console.log('Updating language selector to:', this.currentLanguage);
        const options = document.querySelectorAll('.language-option');
        options.forEach(option => {
            if (option.dataset.lang === this.currentLanguage) {
                option.classList.add('active');
                console.log('Activated language option:', option.dataset.lang);
            } else {
                option.classList.remove('active');
            }
        });
    }
    
    updateLanguage() {
        // Actualizar atributo lang del HTML
        document.documentElement.lang = this.currentLanguage;
        
        // Actualizar todos los elementos con data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Actualizar elementos específicos por ID o clase
        this.updateSpecificElements();
        
        // Actualizar páginas de búsqueda
        this.updateSearchPages();
    }
    
    updateSpecificElements() {
        // Hero section
        const heroTitle = document.querySelector('.hero-content h1');
        if (heroTitle) {
            const title = this.translate('hero.title');
            const highlight = this.translate('hero.title-highlight');
            heroTitle.innerHTML = `${title} <br><span class="gradient-text">${highlight}</span>`;
        }
        
        const heroSubtitle = document.querySelector('.hero-content p');
        if (heroSubtitle) {
            heroSubtitle.textContent = this.translate('hero.subtitle');
        }
        
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.placeholder = this.translate('hero.search-placeholder');
        }
        
        const searchButton = document.querySelector('.search-btn');
        if (searchButton) {
            searchButton.textContent = this.translate('hero.search-button');
        }
        
        // Navigation
        this.updateNavigation();
        
        // Features
        this.updateFeatures();
        
        // Styles
        this.updateStyles();
        
        // Artists
        this.updateArtists();
        
        // How it works
        this.updateHowItWorks();
        
        // Footer
        this.updateFooter();
    }
    
    updateNavigation() {
        const navLinks = {
            'find-styles': this.translate('nav.find-styles'),
            'find-artist': this.translate('nav.find-artist'),
            'login': this.translate('nav.login'),
            'signup': this.translate('nav.signup'),
            'messages': this.translate('nav.messages'),
            'dashboard': this.translate('nav.dashboard'),
            'logout': this.translate('nav.logout')
        };
        
        Object.keys(navLinks).forEach(key => {
            const elements = document.querySelectorAll(`[data-nav="${key}"]`);
            elements.forEach(element => {
                element.textContent = navLinks[key];
            });
        });
    }
    
    updateFeatures() {
        const features = [
            { key: 'browse-styles', title: 'features.browse-styles', desc: 'features.browse-styles-desc' },
            { key: 'find-near', title: 'features.find-near', desc: 'features.find-near-desc' },
            { key: 'most-popular', title: 'features.most-popular', desc: 'features.most-popular-desc' }
        ];
        
        features.forEach(feature => {
            const titleElement = document.querySelector(`[data-feature="${feature.key}"] h3`);
            const descElement = document.querySelector(`[data-feature="${feature.key}"] p`);
            
            if (titleElement) titleElement.textContent = this.translate(feature.title);
            if (descElement) descElement.textContent = this.translate(feature.desc);
        });
    }
    
    updateStyles() {
        const stylesTitle = document.querySelector('.popular-styles h2');
        if (stylesTitle) {
            stylesTitle.textContent = this.translate('styles.title');
        }
        
        const stylesSubtitle = document.querySelector('.popular-styles p');
        if (stylesSubtitle) {
            stylesSubtitle.textContent = this.translate('styles.subtitle');
        }
        
        const styleButtons = document.querySelectorAll('.style-button');
        const styleKeys = ['traditional', 'realistic', 'japanese', 'blackwork', 'watercolor', 'geometric', 'tribal', 'neotraditional', 'minimalist', 'biomechanical', 'dotwork', 'henna'];
        
        styleButtons.forEach((button, index) => {
            if (styleKeys[index]) {
                button.textContent = this.translate(`styles.${styleKeys[index]}`);
            }
        });
    }
    
    updateArtists() {
        const artistsTitle = document.querySelector('.trending-artists h2');
        if (artistsTitle) {
            artistsTitle.textContent = this.translate('artists.title');
        }
        
        const artistsSubtitle = document.querySelector('.trending-artists p');
        if (artistsSubtitle) {
            artistsSubtitle.textContent = this.translate('artists.subtitle');
        }
    }
    
    updateHowItWorks() {
        const howItWorksTitle = document.querySelector('.how-it-works h2');
        if (howItWorksTitle) {
            howItWorksTitle.textContent = this.translate('how-it-works.title');
        }
        
        const steps = [
            { key: 'step1', title: 'how-it-works.step1', desc: 'how-it-works.step1-desc' },
            { key: 'step2', title: 'how-it-works.step2', desc: 'how-it-works.step2-desc' },
            { key: 'step3', title: 'how-it-works.step3', desc: 'how-it-works.step3-desc' }
        ];
        
        steps.forEach(step => {
            const titleElement = document.querySelector(`[data-step="${step.key}"] h3`);
            const descElement = document.querySelector(`[data-step="${step.key}"] p`);
            
            if (titleElement) titleElement.textContent = this.translate(step.title);
            if (descElement) descElement.textContent = this.translate(step.desc);
        });
    }
    
    updateFooter() {
        const footerLinks = {
            'terms': this.translate('footer.terms'),
            'privacy': this.translate('footer.privacy'),
            'follow': this.translate('footer.follow'),
            'copyright': this.translate('footer.copyright')
        };
        
        Object.keys(footerLinks).forEach(key => {
            const elements = document.querySelectorAll(`[data-footer="${key}"]`);
            elements.forEach(element => {
                element.textContent = footerLinks[key];
            });
        });
    }
    
    updateSearchPages() {
        // Títulos y subtítulos
        const discoverStylesTitle = document.querySelector('[data-nav="discover-styles-title"]');
        if (discoverStylesTitle) {
            discoverStylesTitle.textContent = this.translate('discover-styles-title');
        }
        
        const discoverStylesSubtitle = document.querySelector('[data-nav="discover-styles-subtitle"]');
        if (discoverStylesSubtitle) {
            discoverStylesSubtitle.textContent = this.translate('discover-styles-subtitle');
        }
        
        const findArtistTitle = document.querySelector('[data-nav="find-artist-title"]');
        if (findArtistTitle) {
            findArtistTitle.textContent = this.translate('find-artist-title');
        }
        
        const findArtistSubtitle = document.querySelector('[data-nav="find-artist-subtitle"]');
        if (findArtistSubtitle) {
            findArtistSubtitle.textContent = this.translate('find-artist-subtitle');
        }
        
        // Placeholders de búsqueda
        const searchStylesPlaceholder = document.querySelector('[data-nav="search-styles-placeholder"]');
        if (searchStylesPlaceholder) {
            searchStylesPlaceholder.placeholder = this.translate('search-styles-placeholder');
        }
        
        const searchArtistsPlaceholder = document.querySelector('[data-nav="search-artists-placeholder"]');
        if (searchArtistsPlaceholder) {
            searchArtistsPlaceholder.placeholder = this.translate('search-artists-placeholder');
        }
        
        // Botones
        const searchButtons = document.querySelectorAll('[data-nav="search-btn"]');
        searchButtons.forEach(button => {
            button.textContent = this.translate('search-btn');
        });
        
        const filtersText = document.querySelectorAll('[data-nav="filters-text"]');
        filtersText.forEach(span => {
            span.textContent = this.translate('filters-text');
        });
    }
    
    translate(key) {
        return this.translations[this.currentLanguage][key] || key;
    }
    
    // Método para obtener traducción programáticamente
    t(key) {
        return this.translate(key);
    }
}

// Inicializar i18n de forma simple
function initI18n() {
    if (window.i18n) {
        return;
    }
    console.log('Initializing i18n...');
    window.i18n = new I18n();
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initI18n);

// También inicializar si el DOM ya está listo
if (document.readyState !== 'loading') {
    initI18n();
}

// Inicializar cuando la ventana esté completamente cargada
window.addEventListener('load', initI18n);
