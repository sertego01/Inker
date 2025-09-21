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
                
                // User Type Selection
                'auth.user-type-label': 'I want to join as a...',
                'auth.user-type-client': 'Client',
                'auth.user-type-client-desc': 'Looking for a tattoo artist',
                'auth.user-type-artist': 'Artist',
                'auth.user-type-artist-desc': 'Showcase my work',
                
                // Reset Password
                'reset-password.title': 'Reset Password',
                'reset-password.subtitle': 'Enter your email address and we\'ll send you a link to reset your password',
                'reset-password.send-reset-link': 'Send Reset Link',
                'reset-password.remember-password': 'Remember your password?',
                'reset-password-confirm.title': 'Set New Password',
                'reset-password-confirm.subtitle': 'Enter your new password below',
                'reset-password-confirm.confirm-password': 'Confirm New Password',
                'reset-password-confirm.confirm-password-placeholder': 'Confirm your new password',
                'reset-password-confirm.password-requirements': 'Password must contain:',
                'reset-password-confirm.requirement-length': 'At least 8 characters',
                'reset-password-confirm.requirement-uppercase': 'One uppercase letter',
                'reset-password-confirm.requirement-lowercase': 'One lowercase letter',
                'reset-password-confirm.requirement-number': 'One number',
                'reset-password-confirm.update-password': 'Update Password',
                'reset-password-confirm.remember-password': 'Remember your password?',
                
                // Terms and Conditions
                'terms.title': 'Terms and Conditions',
                'terms.subtitle': 'Please read these terms and conditions carefully before using our platform',
                'terms.section1-title': '1. Acceptance of Terms',
                'terms.section1-content': 'By accessing and using Inker, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
                'terms.section2-title': '2. Use License',
                'terms.section2-content': 'Permission is granted to temporarily download one copy of the materials on Inker for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:',
                'terms.section2-list1': 'modify or copy the materials',
                'terms.section2-list2': 'use the materials for any commercial purpose or for any public display',
                'terms.section2-list3': 'attempt to reverse engineer any software contained on the website',
                'terms.section2-list4': 'remove any copyright or other proprietary notations from the materials',
                'terms.section3-title': '3. User Accounts',
                'terms.section3-1-title': '3.1 Account Creation',
                'terms.section3-1-content': 'To access certain features of our platform, you must create an account. You agree to provide accurate, current, and complete information during the registration process.',
                'terms.section3-2-title': '3.2 Account Security',
                'terms.section3-2-content': 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
                'terms.section3-3-title': '3.3 Account Termination',
                'terms.section3-3-content': 'We reserve the right to suspend or terminate your account at any time for violation of these terms or for any other reason at our sole discretion.',
                'terms.section4-title': '4. Content and Intellectual Property',
                'terms.section4-1-title': '4.1 User Content',
                'terms.section4-1-content': 'You retain ownership of any content you upload to our platform, including tattoo designs, photos, and other materials. By uploading content, you grant us a non-exclusive, royalty-free license to use, display, and distribute your content on our platform.',
                'terms.section4-2-title': '4.2 Platform Content',
                'terms.section4-2-content': 'All content on our platform, including text, graphics, logos, and software, is the property of Inker or its content suppliers and is protected by copyright and other intellectual property laws.',
                'terms.section5-title': '5. Prohibited Uses',
                'terms.section5-content': 'You may not use our platform:',
                'terms.section5-list1': 'For any unlawful purpose or to solicit others to perform unlawful acts',
                'terms.section5-list2': 'To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances',
                'terms.section5-list3': 'To infringe upon or violate our intellectual property rights or the intellectual property rights of others',
                'terms.section5-list4': 'To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate',
                'terms.section5-list5': 'To submit false or misleading information',
                'terms.section5-list6': 'To upload or transmit viruses or any other type of malicious code',
                'terms.section6-title': '6. Privacy Policy',
                'terms.section6-content': 'Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service. By using our service, you agree to the collection and use of information in accordance with our Privacy Policy.',
                'terms.section7-title': '7. Disclaimers',
                'terms.section7-important': 'Important: Inker is a platform that connects clients with tattoo artists. We do not provide tattoo services directly and are not responsible for the quality, safety, or outcome of any tattoo work performed by artists on our platform.',
                'terms.section7-content': 'The information on this platform is provided on an "as is" basis. To the fullest extent permitted by law, this Company:',
                'terms.section7-list1': 'excludes all representations and warranties relating to this platform and its contents',
                'terms.section7-list2': 'excludes all liability for damages arising out of or in connection with your use of this platform',
                'terms.section8-title': '8. Limitation of Liability',
                'terms.section8-content': 'In no event shall Inker, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the platform.',
                'terms.section9-title': '9. Indemnification',
                'terms.section9-content': 'You agree to defend, indemnify, and hold harmless Inker and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney\'s fees).',
                'terms.section10-title': '10. Governing Law',
                'terms.section10-content': 'These terms shall be interpreted and governed by the laws of the jurisdiction in which Inker operates, without regard to its conflict of law provisions.',
                'terms.section11-title': '11. Changes to Terms',
                'terms.section11-content': 'We reserve the right, at our sole discretion, to modify or replace these terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.',
                'terms.section12-title': '12. Contact Information',
                'terms.section12-questions': 'Questions about these Terms?',
                'terms.section12-content': 'If you have any questions about these Terms and Conditions, please contact us:',
                'terms.section12-email': 'Email: legal@inker.com',
                'terms.section12-phone': 'Phone: +1 (555) 123-4567',
                'terms.section12-address': 'Address: 123 Tattoo Street, Art District, City, State 12345',
                'terms.last-updated': 'Last updated: December 2025',
                
                // Cookie Consent
                'cookies.title': 'Cookie Policy',
                'cookies.message': 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
                'cookies.accept-all': 'Accept All',
                'cookies.accept-necessary': 'Accept Necessary Only',
                'cookies.settings': 'Cookie Settings',
                'cookies.learn-more': 'Learn More',
                'cookies.necessary': 'Necessary Cookies',
                'cookies.necessary-desc': 'These cookies are essential for the website to function properly. They cannot be disabled.',
                'cookies.analytics': 'Analytics Cookies',
                'cookies.analytics-desc': 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
                'cookies.functional': 'Functional Cookies',
                'cookies.functional-desc': 'These cookies enable enhanced functionality and personalization, such as remembering your preferences.',
                'cookies.marketing': 'Marketing Cookies',
                'cookies.marketing-desc': 'These cookies are used to track visitors across websites to display relevant and engaging advertisements.',
                'cookies.save-preferences': 'Save Preferences',
                'cookies.close': 'Close',
                
                // Privacy Policy
                'privacy.title': 'Privacy Policy',
                'privacy.last-updated': 'Last updated: December 2024',
                'privacy.introduction.title': '1. Introduction',
                'privacy.introduction.content': 'Welcome to Inker, the premier platform connecting tattoo artists with clients. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.',
                'privacy.information-collection.title': '2. Information We Collect',
                'privacy.information-collection.personal.title': 'Personal Information',
                'privacy.information-collection.personal.content': 'We may collect personal information that you voluntarily provide to us when you register for an account, create a profile, or use our services, including:',
                'privacy.information-collection.personal.name': 'Name and contact information',
                'privacy.information-collection.personal.email': 'Email address',
                'privacy.information-collection.personal.phone': 'Phone number',
                'privacy.information-collection.personal.location': 'Location information',
                'privacy.information-collection.personal.profile': 'Profile information and preferences',
                'privacy.information-collection.personal.portfolio': 'Portfolio images and descriptions',
                'privacy.information-collection.automatic.title': 'Automatically Collected Information',
                'privacy.information-collection.automatic.content': 'We automatically collect certain information when you visit our website, including:',
                'privacy.information-collection.automatic.ip': 'IP address and device information',
                'privacy.information-collection.automatic.browser': 'Browser type and version',
                'privacy.information-collection.automatic.pages': 'Pages visited and time spent',
                'privacy.information-collection.automatic.referrer': 'Referring website',
                'privacy.information-collection.automatic.cookies': 'Cookies and similar tracking technologies',
                'privacy.information-use.title': '3. How We Use Your Information',
                'privacy.information-use.content': 'We use the information we collect to:',
                'privacy.information-use.provide': 'Provide, operate, and maintain our services',
                'privacy.information-use.communicate': 'Communicate with you about our services',
                'privacy.information-use.personalize': 'Personalize your experience and content',
                'privacy.information-use.analytics': 'Analyze usage patterns and improve our services',
                'privacy.information-use.marketing': 'Send marketing communications (with your consent)',
                'privacy.information-use.legal': 'Comply with legal obligations',
                'privacy.information-sharing.title': '4. Information Sharing and Disclosure',
                'privacy.information-sharing.content': 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:',
                'privacy.information-sharing.service': 'With service providers who assist us in operating our website',
                'privacy.information-sharing.legal': 'When required by law or to protect our rights',
                'privacy.information-sharing.business': 'In connection with a business transfer or merger',
                'privacy.information-sharing.consent': 'With your explicit consent',
                'privacy.data-security.title': '5. Data Security',
                'privacy.data-security.content': 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.',
                'privacy.cookies.title': '6. Cookies and Tracking Technologies',
                'privacy.cookies.content': 'We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences or our cookie consent banner.',
                'privacy.user-rights.title': '7. Your Rights',
                'privacy.user-rights.content': 'Depending on your location, you may have the following rights regarding your personal information:',
                'privacy.user-rights.access': 'Right to access your personal information',
                'privacy.user-rights.rectify': 'Right to rectify inaccurate information',
                'privacy.user-rights.erase': 'Right to erase your personal information',
                'privacy.user-rights.portability': 'Right to data portability',
                'privacy.user-rights.object': 'Right to object to processing',
                'privacy.user-rights.withdraw': 'Right to withdraw consent',
                'privacy.data-retention.title': '8. Data Retention',
                'privacy.data-retention.content': 'We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law.',
                'privacy.children.title': '9. Children\'s Privacy',
                'privacy.children.content': 'Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.',
                'privacy.changes.title': '10. Changes to This Privacy Policy',
                'privacy.changes.content': 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date. Your continued use of our services after any modifications constitutes acceptance of the updated privacy policy.',
                'privacy.contact.title': '11. Contact Us',
                'privacy.contact.content': 'If you have any questions about this privacy policy or our privacy practices, please contact us at:',
                'privacy.contact.email': 'Email:',
                'privacy.contact.address': 'Address:',
                'privacy.contact.phone': 'Phone:',
                
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
                
                // User Type Selection
                'auth.user-type-label': 'Quiero unirme como...',
                'auth.user-type-client': 'Cliente',
                'auth.user-type-client-desc': 'Busco un tatuador',
                'auth.user-type-artist': 'Tatuador',
                'auth.user-type-artist-desc': 'Mostrar mi trabajo',
                
                // Reset Password
                'reset-password.title': 'Restablecer Contraseña',
                'reset-password.subtitle': 'Ingresa tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña',
                'reset-password.send-reset-link': 'Enviar Enlace de Restablecimiento',
                'reset-password.remember-password': '¿Recuerdas tu contraseña?',
                'reset-password-confirm.title': 'Establecer Nueva Contraseña',
                'reset-password-confirm.subtitle': 'Ingresa tu nueva contraseña a continuación',
                'reset-password-confirm.confirm-password': 'Confirmar Nueva Contraseña',
                'reset-password-confirm.confirm-password-placeholder': 'Confirma tu nueva contraseña',
                'reset-password-confirm.password-requirements': 'La contraseña debe contener:',
                'reset-password-confirm.requirement-length': 'Al menos 8 caracteres',
                'reset-password-confirm.requirement-uppercase': 'Una letra mayúscula',
                'reset-password-confirm.requirement-lowercase': 'Una letra minúscula',
                'reset-password-confirm.requirement-number': 'Un número',
                'reset-password-confirm.update-password': 'Actualizar Contraseña',
                'reset-password-confirm.remember-password': '¿Recuerdas tu contraseña?',
                
                // Terms and Conditions
                'terms.title': 'Términos y Condiciones',
                'terms.subtitle': 'Por favor lee estos términos y condiciones cuidadosamente antes de usar nuestra plataforma',
                'terms.section1-title': '1. Aceptación de Términos',
                'terms.section1-content': 'Al acceder y usar Inker, aceptas y te comprometes a cumplir con los términos y disposiciones de este acuerdo. Si no estás de acuerdo con lo anterior, por favor no uses este servicio.',
                'terms.section2-title': '2. Licencia de Uso',
                'terms.section2-content': 'Se otorga permiso para descargar temporalmente una copia de los materiales en Inker solo para visualización personal y no comercial. Esta es la concesión de una licencia, no una transferencia de título, y bajo esta licencia no puedes:',
                'terms.section2-list1': 'modificar o copiar los materiales',
                'terms.section2-list2': 'usar los materiales para cualquier propósito comercial o para cualquier exhibición pública',
                'terms.section2-list3': 'intentar hacer ingeniería inversa de cualquier software contenido en el sitio web',
                'terms.section2-list4': 'eliminar cualquier copyright u otras notaciones propietarias de los materiales',
                'terms.section3-title': '3. Cuentas de Usuario',
                'terms.section3-1-title': '3.1 Creación de Cuenta',
                'terms.section3-1-content': 'Para acceder a ciertas funciones de nuestra plataforma, debes crear una cuenta. Te comprometes a proporcionar información precisa, actual y completa durante el proceso de registro.',
                'terms.section3-2-title': '3.2 Seguridad de la Cuenta',
                'terms.section3-2-content': 'Eres responsable de mantener la confidencialidad de las credenciales de tu cuenta y de todas las actividades que ocurran bajo tu cuenta.',
                'terms.section3-3-title': '3.3 Terminación de Cuenta',
                'terms.section3-3-content': 'Nos reservamos el derecho de suspender o terminar tu cuenta en cualquier momento por violación de estos términos o por cualquier otra razón a nuestra sola discreción.',
                'terms.section4-title': '4. Contenido y Propiedad Intelectual',
                'terms.section4-1-title': '4.1 Contenido del Usuario',
                'terms.section4-1-content': 'Mantienes la propiedad de cualquier contenido que subas a nuestra plataforma, incluyendo diseños de tatuajes, fotos y otros materiales. Al subir contenido, nos otorgas una licencia no exclusiva y libre de regalías para usar, mostrar y distribuir tu contenido en nuestra plataforma.',
                'terms.section4-2-title': '4.2 Contenido de la Plataforma',
                'terms.section4-2-content': 'Todo el contenido en nuestra plataforma, incluyendo texto, gráficos, logos y software, es propiedad de Inker o sus proveedores de contenido y está protegido por leyes de copyright y otras leyes de propiedad intelectual.',
                'terms.section5-title': '5. Usos Prohibidos',
                'terms.section5-content': 'No puedes usar nuestra plataforma:',
                'terms.section5-list1': 'Para cualquier propósito ilegal o para solicitar a otros que realicen actos ilegales',
                'terms.section5-list2': 'Para violar cualquier regulación, regla, ley o ordenanza internacional, federal, provincial o estatal',
                'terms.section5-list3': 'Para infringir o violar nuestros derechos de propiedad intelectual o los derechos de propiedad intelectual de otros',
                'terms.section5-list4': 'Para acosar, abusar, insultar, dañar, difamar, calumniar, menospreciar, intimidar o discriminar',
                'terms.section5-list5': 'Para enviar información falsa o engañosa',
                'terms.section5-list6': 'Para subir o transmitir virus o cualquier otro tipo de código malicioso',
                'terms.section6-title': '6. Política de Privacidad',
                'terms.section6-content': 'Tu privacidad es importante para nosotros. Nuestra Política de Privacidad explica cómo recopilamos, usamos y protegemos tu información cuando usas nuestro servicio. Al usar nuestro servicio, aceptas la recopilación y uso de información de acuerdo con nuestra Política de Privacidad.',
                'terms.section7-title': '7. Descargos de Responsabilidad',
                'terms.section7-important': 'Importante: Inker es una plataforma que conecta clientes con tatuadores. No proporcionamos servicios de tatuaje directamente y no somos responsables de la calidad, seguridad o resultado de cualquier trabajo de tatuaje realizado por artistas en nuestra plataforma.',
                'terms.section7-content': 'La información en esta plataforma se proporciona "tal como está". En la medida máxima permitida por la ley, esta Compañía:',
                'terms.section7-list1': 'excluye todas las representaciones y garantías relacionadas con esta plataforma y su contenido',
                'terms.section7-list2': 'excluye toda responsabilidad por daños que surjan de o en conexión con tu uso de esta plataforma',
                'terms.section8-title': '8. Limitación de Responsabilidad',
                'terms.section8-content': 'En ningún caso Inker, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán responsables por daños indirectos, incidentales, especiales, consecuenciales o punitivos, incluyendo sin limitación, pérdida de ganancias, datos, uso, buena voluntad u otras pérdidas intangibles, resultantes de tu uso de la plataforma.',
                'terms.section9-title': '9. Indemnización',
                'terms.section9-content': 'Te comprometes a defender, indemnizar y mantener indemne a Inker y sus licenciantes, y sus empleados, contratistas, agentes, oficiales y directores, de y contra cualquier y todas las reclamaciones, daños, obligaciones, pérdidas, responsabilidades, costos o deudas, y gastos (incluyendo pero no limitado a honorarios de abogados).',
                'terms.section10-title': '10. Ley Aplicable',
                'terms.section10-content': 'Estos términos serán interpretados y gobernados por las leyes de la jurisdicción en la que opera Inker, sin consideración a sus disposiciones de conflicto de leyes.',
                'terms.section11-title': '11. Cambios a los Términos',
                'terms.section11-content': 'Nos reservamos el derecho, a nuestra sola discreción, de modificar o reemplazar estos términos en cualquier momento. Si una revisión es material, intentaremos proporcionar al menos 30 días de aviso antes de que cualquier nuevo término entre en vigor.',
                'terms.section12-title': '12. Información de Contacto',
                'terms.section12-questions': '¿Preguntas sobre estos Términos?',
                'terms.section12-content': 'Si tienes alguna pregunta sobre estos Términos y Condiciones, por favor contáctanos:',
                'terms.section12-email': 'Email: legal@inker.com',
                'terms.section12-phone': 'Teléfono: +1 (555) 123-4567',
                'terms.section12-address': 'Dirección: 123 Tattoo Street, Art District, City, State 12345',
                'terms.last-updated': 'Última actualización: Diciembre 2025',
                
                // Cookie Consent
                'cookies.title': 'Política de Cookies',
                'cookies.message': 'Utilizamos cookies para mejorar tu experiencia de navegación, ofrecer contenido personalizado y analizar nuestro tráfico. Al hacer clic en "Aceptar Todo", consientes nuestro uso de cookies.',
                'cookies.accept-all': 'Aceptar Todo',
                'cookies.accept-necessary': 'Solo Necesarias',
                'cookies.settings': 'Configuración de Cookies',
                'cookies.learn-more': 'Saber Más',
                'cookies.necessary': 'Cookies Necesarias',
                'cookies.necessary-desc': 'Estas cookies son esenciales para que el sitio web funcione correctamente. No se pueden desactivar.',
                'cookies.analytics': 'Cookies de Análisis',
                'cookies.analytics-desc': 'Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web recopilando y reportando información de forma anónima.',
                'cookies.functional': 'Cookies Funcionales',
                'cookies.functional-desc': 'Estas cookies permiten funcionalidades mejoradas y personalización, como recordar tus preferencias.',
                'cookies.marketing': 'Cookies de Marketing',
                'cookies.marketing-desc': 'Estas cookies se utilizan para rastrear visitantes a través de sitios web para mostrar anuncios relevantes y atractivos.',
                'cookies.save-preferences': 'Guardar Preferencias',
                'cookies.close': 'Cerrar',
                
                // Privacy Policy
                'privacy.title': 'Política de Privacidad',
                'privacy.last-updated': 'Última actualización: Diciembre 2024',
                'privacy.introduction.title': '1. Introducción',
                'privacy.introduction.content': 'Bienvenido a Inker, la plataforma líder que conecta artistas de tatuajes con clientes. Esta Política de Privacidad explica cómo recopilamos, utilizamos, divulgamos y protegemos su información cuando visita nuestro sitio web o utiliza nuestros servicios. Por favor, lea esta política de privacidad cuidadosamente. Si no está de acuerdo con los términos de esta política de privacidad, no acceda al sitio.',
                'privacy.information-collection.title': '2. Información que Recopilamos',
                'privacy.information-collection.personal.title': 'Información Personal',
                'privacy.information-collection.personal.content': 'Podemos recopilar información personal que usted nos proporcione voluntariamente cuando se registre para una cuenta, cree un perfil o utilice nuestros servicios, incluyendo:',
                'privacy.information-collection.personal.name': 'Nombre e información de contacto',
                'privacy.information-collection.personal.email': 'Dirección de correo electrónico',
                'privacy.information-collection.personal.phone': 'Número de teléfono',
                'privacy.information-collection.personal.location': 'Información de ubicación',
                'privacy.information-collection.personal.profile': 'Información del perfil y preferencias',
                'privacy.information-collection.personal.portfolio': 'Imágenes del portafolio y descripciones',
                'privacy.information-collection.automatic.title': 'Información Recopilada Automáticamente',
                'privacy.information-collection.automatic.content': 'Recopilamos automáticamente cierta información cuando visita nuestro sitio web, incluyendo:',
                'privacy.information-collection.automatic.ip': 'Dirección IP e información del dispositivo',
                'privacy.information-collection.automatic.browser': 'Tipo y versión del navegador',
                'privacy.information-collection.automatic.pages': 'Páginas visitadas y tiempo invertido',
                'privacy.information-collection.automatic.referrer': 'Sitio web de referencia',
                'privacy.information-collection.automatic.cookies': 'Cookies y tecnologías de seguimiento similares',
                'privacy.information-use.title': '3. Cómo Utilizamos Su Información',
                'privacy.information-use.content': 'Utilizamos la información que recopilamos para:',
                'privacy.information-use.provide': 'Proporcionar, operar y mantener nuestros servicios',
                'privacy.information-use.communicate': 'Comunicarnos con usted sobre nuestros servicios',
                'privacy.information-use.personalize': 'Personalizar su experiencia y contenido',
                'privacy.information-use.analytics': 'Analizar patrones de uso y mejorar nuestros servicios',
                'privacy.information-use.marketing': 'Enviar comunicaciones de marketing (con su consentimiento)',
                'privacy.information-use.legal': 'Cumplir con obligaciones legales',
                'privacy.information-sharing.title': '4. Compartir y Divulgar Información',
                'privacy.information-sharing.content': 'No vendemos, intercambiamos o transferimos de otra manera su información personal a terceros sin su consentimiento, excepto en las siguientes circunstancias:',
                'privacy.information-sharing.service': 'Con proveedores de servicios que nos ayudan a operar nuestro sitio web',
                'privacy.information-sharing.legal': 'Cuando sea requerido por ley o para proteger nuestros derechos',
                'privacy.information-sharing.business': 'En conexión con una transferencia de negocio o fusión',
                'privacy.information-sharing.consent': 'Con su consentimiento explícito',
                'privacy.data-security.title': '5. Seguridad de Datos',
                'privacy.data-security.content': 'Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ningún método de transmisión por internet o almacenamiento electrónico es 100% seguro.',
                'privacy.cookies.title': '6. Cookies y Tecnologías de Seguimiento',
                'privacy.cookies.content': 'Utilizamos cookies y tecnologías de seguimiento similares para mejorar su experiencia de navegación, analizar el tráfico del sitio y personalizar el contenido. Puede controlar la configuración de cookies a través de las preferencias de su navegador o nuestro banner de consentimiento de cookies.',
                'privacy.user-rights.title': '7. Sus Derechos',
                'privacy.user-rights.content': 'Dependiendo de su ubicación, puede tener los siguientes derechos con respecto a su información personal:',
                'privacy.user-rights.access': 'Derecho a acceder a su información personal',
                'privacy.user-rights.rectify': 'Derecho a rectificar información inexacta',
                'privacy.user-rights.erase': 'Derecho a borrar su información personal',
                'privacy.user-rights.portability': 'Derecho a la portabilidad de datos',
                'privacy.user-rights.object': 'Derecho a objetar el procesamiento',
                'privacy.user-rights.withdraw': 'Derecho a retirar el consentimiento',
                'privacy.data-retention.title': '8. Retención de Datos',
                'privacy.data-retention.content': 'Retenemos su información personal solo durante el tiempo necesario para cumplir con los propósitos descritos en esta política de privacidad, a menos que se requiera o permita un período de retención más largo por ley.',
                'privacy.children.title': '9. Privacidad de Menores',
                'privacy.children.content': 'Nuestros servicios no están destinados a niños menores de 13 años. No recopilamos conscientemente información personal de niños menores de 13 años. Si es padre o tutor y cree que su hijo nos ha proporcionado información personal, por favor contáctenos.',
                'privacy.changes.title': '10. Cambios a Esta Política de Privacidad',
                'privacy.changes.content': 'Podemos actualizar esta política de privacidad de vez en cuando. Le notificaremos de cualquier cambio publicando la nueva política de privacidad en esta página y actualizando la fecha de "Última actualización". Su uso continuo de nuestros servicios después de cualquier modificación constituye la aceptación de la política de privacidad actualizada.',
                'privacy.contact.title': '11. Contáctanos',
                'privacy.contact.content': 'Si tiene alguna pregunta sobre esta política de privacidad o nuestras prácticas de privacidad, por favor contáctenos en:',
                'privacy.contact.email': 'Email:',
                'privacy.contact.address': 'Dirección:',
                'privacy.contact.phone': 'Teléfono:',
                
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
