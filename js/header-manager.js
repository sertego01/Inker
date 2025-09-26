// Header Manager - Centralized header state management
class HeaderManager {
    constructor() {
        this.isInitialized = false;
        this.currentUser = null;
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        this.isInitialized = true;

        // Wait for Firebase to be ready
        this.waitForFirebase().then(() => {
            this.setupAuthListener();
        });
    }

    waitForFirebase() {
        return new Promise((resolve) => {
            let attempts = 0;
            const maxAttempts = 100; // 10 seconds max
            
            const checkFirebase = () => {
                attempts++;
                if (typeof auth !== 'undefined' && auth) {
                    console.log('Firebase auth found, proceeding with auth');
                    resolve();
                } else if (attempts < maxAttempts) {
                    setTimeout(checkFirebase, 100);
                } else {
                    console.warn('Firebase auth not available after 10 seconds, proceeding without auth');
                    resolve(); // Continue without auth
                }
            };
            checkFirebase();
        });
    }

    setupAuthListener() {
        if (typeof auth === 'undefined') {
            console.log('Firebase auth not available, showing unauthenticated header');
            this.currentUser = null;
            this.updateHeader();
            return;
        }

        // Check current auth state immediately
        const currentUser = auth.currentUser;
        if (currentUser) {
            console.log('Header Manager - User already logged in:', currentUser.email);
            this.currentUser = currentUser;
            this.updateHeader();
        }

        // Listen for auth state changes
        auth.onAuthStateChanged((user) => {
            console.log('Header Manager - Auth state changed:', user ? `User logged in: ${user.email}` : 'User logged out');
            this.currentUser = user;
            this.updateHeader();
        });
    }

    updateHeader() {
        const navMenu = document.querySelector('.nav-menu');
        if (!navMenu) return;

        // Clear existing menu items
        navMenu.innerHTML = '';

        // Determine the correct path based on current location
        const isInPagesFolder = window.location.pathname.includes('/pages/');
        const basePath = isInPagesFolder ? '../' : '';

        // Common menu items for both states
        const commonItems = [
            { href: '#', dataNav: 'blog', text: 'Blog' },
            { href: `${basePath}pages/find-styles.html`, dataNav: 'find-styles', text: 'Styles' },
            { href: `${basePath}pages/find-artists.html`, dataNav: 'find-artist', text: 'Artist' },
            { href: '#', dataNav: 'map', text: 'Map' }
        ];

        // Add common items
        commonItems.forEach(item => {
            const li = document.createElement('li');
            li.className = 'nav-item';
            
            const a = document.createElement('a');
            a.href = item.href;
            a.className = 'nav-link';
            a.setAttribute('data-nav', item.dataNav);
            a.textContent = item.text;
            
            li.appendChild(a);
            navMenu.appendChild(li);
        });

        if (this.currentUser) {
            // Logged in state: Blog Styles Artist Map Messages Dashboard Logout
            const loggedInItems = [
                { href: '#', dataNav: 'messages', text: 'Messages' },
                { href: this.getDashboardUrl(), dataNav: 'dashboard', text: 'Dashboard' },
                { href: '#', dataNav: 'logout', text: 'Logout', isButton: true, id: 'logoutBtn' }
            ];

            loggedInItems.forEach(item => {
                const li = document.createElement('li');
                li.className = 'nav-item';
                
                const a = document.createElement('a');
                a.href = item.href;
                a.className = item.isButton ? 'nav-button' : 'nav-link';
                a.setAttribute('data-nav', item.dataNav);
                a.textContent = item.text;
                
                if (item.id) {
                    a.id = item.id;
                }
                
                li.appendChild(a);
                navMenu.appendChild(li);
            });

            // Add logout event listener
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.handleLogout();
                });
            }
        } else {
            // Not logged in state: Blog Styles Artist Map Login
            const notLoggedInItems = [
                { href: `${basePath}pages/login.html`, dataNav: 'login', text: 'Login', isButton: true }
            ];

            notLoggedInItems.forEach(item => {
                const li = document.createElement('li');
                li.className = 'nav-item';
                
                const a = document.createElement('a');
                a.href = item.href;
                a.className = item.isButton ? 'nav-button' : 'nav-link';
                a.setAttribute('data-nav', item.dataNav);
                a.textContent = item.text;
                
                li.appendChild(a);
                navMenu.appendChild(li);
            });
        }

        // Update translations
        if (window.i18n) {
            window.i18n.updateNavigation();
        }
    }

    getDashboardUrl() {
        const currentPath = window.location.pathname;
        const isInPagesFolder = window.location.pathname.includes('/pages/');
        const basePath = isInPagesFolder ? '' : 'pages/';
        
        if (currentPath.includes('dashboard-artist')) {
            return `${basePath}dashboard-artist.html`;
        } else if (currentPath.includes('dashboard-user')) {
            return `${basePath}dashboard-user.html`;
        } else {
            // Default to user dashboard
            return `${basePath}dashboard-user.html`;
        }
    }

    handleLogout() {
        if (typeof logoutUser === 'function') {
            logoutUser().then(() => {
                console.log('User logged out successfully');
                // The auth state change will trigger header update
            }).catch((error) => {
                console.error('Error signing out:', error);
            });
        }
    }

    // Force update header (useful for debugging)
    forceUpdate() {
        this.updateHeader();
    }
}

// Initialize header manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other scripts to load
    setTimeout(() => {
        if (!window.headerManager) {
            window.headerManager = new HeaderManager();
        }
    }, 100);
});

// Also initialize if DOM is already ready
if (document.readyState !== 'loading') {
    setTimeout(() => {
        if (!window.headerManager) {
            window.headerManager = new HeaderManager();
        }
    }, 100);
}
