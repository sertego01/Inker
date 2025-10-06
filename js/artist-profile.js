// Artist Profile Page JavaScript

// Todos los datos del perfil se cargarán desde la DB

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Obtener ID desde la URL y cargar desde DB
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');
    
    if (artistId) {
        // Pintar de inmediato si hay caché en sessionStorage
        try {
            const cached = sessionStorage.getItem('selectedArtist');
            if (cached) {
                const artist = convertArtistData(JSON.parse(cached));
                updateArtistInfo(artist);
                updateArtistStats(artist.stats);
                updateSpecialties(artist.specialties);
                updateStudioInfo(artist.studio);
                updateSocialMedia(artist.social);
                updatePortfolio(artist.portfolio);
                updateReviews(artist.reviews);
                setAvailabilityToggle(artist);
            }
        } catch (_) {}
        // Actualizar en segundo plano desde la DB
        loadArtistProfileFromDB(artistId);
    } else {
        // Si no hay id, mostrar estado vacío
        showArtistNotFound();
    }
    
    // Eventos
    setupEventListeners();
});

// Convertir documento de DB a formato del perfil
function convertArtistData(artist) {
    return {
        id: artist.id,
        name: artist.name,
        avatar: artist.imageData || artist.image || artist.avatar || '../images/artist-avatar.png',
        rating: artist.rating || 0,
        reviewCount: artist.reviewCount || artist.reviews || 0,
        location: artist.location || [artist.city, artist.region || artist.country].filter(Boolean).join(', '),
        bio: artist.bio || '',
        specialties: Array.isArray(artist.styles) ? artist.styles : (artist.style ? [artist.style] : []),
        stats: {
            yearsExperience: artist.yearsExperience || 0,
            likes: artist.likes || 0,
            hourlyRate: artist.hourlyRate || '',
            availability: artist.isAvailable === true ? 'Available' : 'Not available',
            rating: typeof artist.rating === 'number' ? artist.rating : 0,
            reviewCount: typeof artist.reviewCount === 'number' ? artist.reviewCount : (typeof artist.reviews === 'number' ? artist.reviews : 0)
        },
        studio: {
            name: artist.studio?.name || '',
            address: artist.studio?.address || artist.location || '',
            phone: artist.studio?.phone || '',
            email: artist.studio?.email || ''
        },
        social: {
            instagram: artist.social?.instagram || '',
            website: artist.social?.website || ''
        },
        portfolio: Array.isArray(artist.portfolio) ? artist.portfolio : [],
        reviews: Array.isArray(artist.reviews) ? artist.reviews : []
    };
}

// Cargar perfil desde DB
async function loadArtistProfileFromDB(artistId) {
    try {
        const doc = await getArtistData(artistId);
        if (doc && doc.exists) {
            const data = doc.data();
            const artist = convertArtistData({ id: artistId, ...data });
            updateArtistInfo(artist);
            updateArtistStats(artist.stats);
            updateSpecialties(artist.specialties);
            updateStudioInfo(artist.studio);
            updateSocialMedia(artist.social);
            updatePortfolio(artist.portfolio);
            updateReviews(artist.reviews);
            setAvailabilityToggle(artist);
        } else {
            showArtistNotFound();
        }
    } catch (_) {
        showArtistNotFound();
    }
}

function showArtistNotFound() {
    const nameEl = document.getElementById('artistName');
    if (nameEl) nameEl.textContent = 'Artist not found';
}

// Update artist basic information
function updateArtistInfo(artist) {
    const elements = {
        avatar: document.getElementById('artistAvatar'),
        name: document.getElementById('artistName'),
        rating: document.getElementById('artistRating'),
        location: document.getElementById('artistLocation'),
        bio: document.getElementById('artistBio')
    };

    if (elements.avatar) {
        elements.avatar.src = artist.avatar;
    }
    if (elements.name) {
        elements.name.textContent = artist.name;
    }
    if (elements.rating) {
        elements.rating.textContent = `${artist.rating} (${artist.reviewCount} reviews)`;
    }
    if (elements.location) elements.location.textContent = artist.location;
    if (elements.bio) {
        elements.bio.textContent = artist.bio;
    }
}

// Update artist statistics
function updateArtistStats(stats) {
    const elements = {
        yearsExperience: document.getElementById('yearsExperience'),
        likes: document.getElementById('likes'),
        ratingStat: document.getElementById('ratingStat'),
        availability: document.getElementById('availability')
    };
    
    if (elements.yearsExperience) elements.yearsExperience.textContent = stats.yearsExperience;
    if (elements.likes) elements.likes.textContent = formatLikes(stats);
    if (elements.ratingStat) elements.ratingStat.textContent = formatRating(stats);
    if (elements.availability) {
        elements.availability.textContent = stats.availability;
        elements.availability.style.color = stats.availability === 'Available' ? '#10b981' : '#ef4444';
    }
}

function formatRating(stats) {
    const rating = typeof stats.rating === 'number' ? stats.rating : 0;
    return `${rating.toFixed(1)} ★`;
}

function formatLikes(stats) {
    const likes = typeof stats.likes === 'number' ? stats.likes : 0;
    return `${likes} ♥`;
}

// Setup availability toggle state and handler
function setAvailabilityToggle(artist) {
    const toggle = document.getElementById('availabilityToggle');
    if (!toggle) return;
    toggle.checked = artist.stats.availability === 'Available';
    toggle.onchange = async function() {
        const isAvailable = !!toggle.checked;
        const urlParams = new URLSearchParams(window.location.search);
        const artistId = urlParams.get('id');
        try {
            await updateArtistAvailability(artistId, isAvailable);
            // Refrescar etiqueta
            const availabilityEl = document.getElementById('availability');
            if (availabilityEl) availabilityEl.textContent = isAvailable ? 'Available' : 'Not available';
        } catch (e) {
            toggle.checked = !isAvailable; // revertir si falla
            alert('No se pudo actualizar la disponibilidad');
        }
    };
}

// Update specialties tags
function updateSpecialties(specialties) {
    const container = document.getElementById('specialtiesGrid');
    if (!container) return;
    
    container.innerHTML = '';
    
    specialties.forEach(specialty => {
        const tag = document.createElement('span');
        tag.className = `specialty-tag ${specialty.toLowerCase()}`;
        tag.textContent = specialty;
        // Add translation attribute
        const translationKey = `artist-profile.specialty-${specialty.toLowerCase()}`;
        tag.setAttribute('data-i18n', translationKey);
        // Navegar a find-styles con el modal de este estilo abierto
        const styleId = mapStyleNameToId(specialty);
        tag.style.cursor = 'pointer';
        tag.addEventListener('click', () => {
            const isInPagesFolder = window.location.pathname.includes('/pages/');
            const basePath = isInPagesFolder ? '' : 'pages/';
            window.location.href = `${basePath}find-styles.html?style=${encodeURIComponent(styleId)}`;
        });
        container.appendChild(tag);
    });
    
    // Apply translations to dynamically created specialty tags
    if (window.i18n) {
        window.i18n.updateLanguage();
    }
}

// Mapear nombres visibles a IDs canónicos usados en find-styles
function mapStyleNameToId(name) {
    const n = (name || '').toLowerCase();
    const map = {
        'traditional': 'traditional',
        'tradicional': 'traditional',
        'realistic': 'realistic',
        'realista': 'realistic',
        'japanese': 'japanese',
        'japonés': 'japanese',
        'blackwork': 'blackwork',
        'watercolor': 'watercolor',
        'acuarela': 'watercolor',
        'geometric': 'geometric',
        'geométrico': 'geometric',
        'tribal': 'tribal',
        'neo-traditional': 'neo-traditional',
        'neo-tradicional': 'neo-traditional',
        'minimalist': 'minimalist',
        'minimalista': 'minimalist',
        'biomechanical': 'biomechanical',
        'biomecánico': 'biomechanical',
        'dotwork': 'puntillismo',
        'puntillismo': 'puntillismo',
        'henna': 'henna',
        'portraits': 'realistic',
        'american': 'traditional',
        'cultural': 'tribal',
        'temporary': 'henna',
        'sci-fi': 'biomechanical',
        'mandalas': 'geometric',
        'sacred': 'geometric'
    };
    return map[n] || n;
}

// Update studio information
function updateStudioInfo(studio) {
    const elements = {
        studioName: document.getElementById('studioName'),
        studioAddress: document.getElementById('studioAddress')
    };
    
    if (elements.studioName) elements.studioName.textContent = studio.name;
    if (elements.studioAddress) elements.studioAddress.textContent = studio.address;
}

// Update social media links
function updateSocialMedia(social) {
    const elements = {
        instagramHandle: document.getElementById('instagramHandle'),
        website: document.getElementById('website')
    };
    
    if (elements.instagramHandle) elements.instagramHandle.textContent = social.instagram;
    if (elements.website) elements.website.textContent = social.website;
}

// Update portfolio grid
function updatePortfolio(portfolio) {
    const container = document.getElementById('portfolioGrid');
    if (!container) return;
    
    container.innerHTML = '';
    
    const styleNames = ['Watercolor', 'Realistic', 'Traditional', 'Japanese', 'Geometric', 'Minimalist'];
    
    portfolio.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'portfolio-item';
        item.innerHTML = `
            <img src="${image}" alt="${styleNames[index] || 'Portfolio'} Tattoo">
            <div class="portfolio-overlay">
                <button class="btn-view" data-i18n="artist-profile.view" onclick="viewPortfolioItem(${index})">View</button>
            </div>
        `;
        container.appendChild(item);
    });
    
    // Apply translations to dynamically created buttons
    if (window.i18n) {
        window.i18n.updateLanguage();
    }
}

// Update reviews list
function updateReviews(reviews) {
    const container = document.getElementById('reviewsList');
    if (!container) return;
    
    container.innerHTML = '';
    
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-item';
        reviewElement.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${review.initials}</div>
                    <div class="reviewer-details">
                        <div class="reviewer-name">${review.name}</div>
                        <div class="review-date">${review.date}</div>
                    </div>
                </div>
                <div class="review-rating">
                    ${generateStarRating(review.rating)}
                </div>
            </div>
            <div class="review-text">${review.text}</div>
        `;
        container.appendChild(reviewElement);
    });
}

// Generate star rating HTML
function generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<span class="star">★</span>';
        } else {
            stars += '<span class="star">☆</span>';
        }
    }
    return stars;
}

// Setup event listeners
function setupEventListeners() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    // Book appointment button
    const bookButton = document.querySelector('.btn-book');
    if (bookButton) {
        bookButton.addEventListener('click', handleBookAppointment);
    }
    
    // Message button
    const messageButton = document.querySelector('.btn-message');
    if (messageButton) {
        messageButton.addEventListener('click', handleMessage);
    }
    
    // Social action buttons
    const likeButton = document.querySelector('.btn-like');
    if (likeButton) {
        likeButton.addEventListener('click', handleLike);
    }
    
    const shareButton = document.querySelector('.btn-share');
    if (shareButton) {
        shareButton.addEventListener('click', handleShare);
    }
    
    const moreButton = document.querySelector('.btn-more');
    if (moreButton) {
        moreButton.addEventListener('click', handleMore);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeImageModal();
        }
    });
}

// Switch between tabs
function switchTab(tabName) {
    // Remove active class from all tabs and panels
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Add active class to selected tab and panel
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    const activePanel = document.getElementById(`${tabName}Panel`);
    
    if (activeTab) activeTab.classList.add('active');
    if (activePanel) activePanel.classList.add('active');
}

// Event handlers
function handleBookAppointment() {
    // In a real app, this would open a booking modal or redirect to booking page
    alert('Booking functionality would be implemented here');
}

function handleMessage() {
    // In a real app, this would open a messaging interface
    alert('Messaging functionality would be implemented here');
}

function handleLike() {
    const likeButton = document.querySelector('.btn-like');
    const likesElement = document.getElementById('likes');
    const likeImage = likeButton.querySelector('img');
    
    // Toggle like state
    likeButton.classList.toggle('liked');
    
    if (likeButton.classList.contains('liked')) {
        // Change to red heart
        likeImage.style.filter = 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)'; // Red color
        if (likesElement) {
            const currentLikes = parseInt(likesElement.textContent);
            likesElement.textContent = currentLikes + 1;
        }
    } else {
        // Change back to white
        likeImage.style.filter = 'brightness(0) invert(1)'; // White color
        if (likesElement) {
            const currentLikes = parseInt(likesElement.textContent);
            likesElement.textContent = currentLikes - 1;
        }
    }
}

function handleShare() {
    if (navigator.share) {
        navigator.share({
            title: 'Artist Profile',
            text: 'Check out this amazing tattoo artist!',
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Link copied to clipboard!');
        });
    }
}

function handleMore() {
    // In a real app, this would show a dropdown menu with more options
    alert('More options would be shown here');
}

function viewPortfolioItem(index) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    if (modal && modalImage) {
        // Get the image source from the portfolio item
        const portfolioItems = document.querySelectorAll('.portfolio-item img');
        if (portfolioItems[index]) {
            modalImage.src = portfolioItems[index].src;
            modalImage.alt = portfolioItems[index].alt;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }
}

// Close image modal
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Handle navigation updates for authenticated users - DEPRECATED: Now handled by header-manager.js
/*function updateNavigation(user) {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;
    
    if (user) {
        // User is authenticated - get user data and show appropriate dashboard
        getUserData(user.uid).then((userDoc) => {
            if (userDoc.exists) {
                const userData = userDoc.data();
                console.log('User data loaded:', userData.userType);
                
                const currentLang = localStorage.getItem('language') || 'en';
                const translations = {
                    en: {
                        'find-styles': 'Styles',
                        'find-artist': 'Artist',
                        'messages': 'Messages',
                        'dashboard': 'Dashboard',
                        'logout': 'Logout'
                    },
                    es: {
                        'find-styles': 'Estilos',
                        'find-artist': 'Tatuadores',
                        'messages': 'Mensajes',
                        'dashboard': 'Perfil',
                        'logout': 'Cerrar sesión'
                    }
                };
                
                navMenu.innerHTML = `
                    <li class="nav-item">
                        <a href="find-styles.html" class="nav-link" data-nav="find-styles">${translations[currentLang]['find-styles']}</a>
                    </li>
                    <li class="nav-item">
                        <a href="find-artists.html" class="nav-link" data-nav="find-artist">${translations[currentLang]['find-artist']}</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link" data-nav="messages">${translations[currentLang]['messages']}</a>
                    </li>
                    <li class="nav-item">
                        <a href="dashboard-${userData.userType}.html" class="nav-link" data-nav="dashboard">${translations[currentLang]['dashboard']}</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" id="logoutBtn" class="nav-button" data-nav="logout">${translations[currentLang]['logout']}</a>
                    </li>
                `;
                
                // Add logout event listener
                const logoutBtn = document.getElementById('logoutBtn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', logout);
                }
            }
        }).catch((error) => {
            console.error('Error loading user data:', error);
            // Fallback to basic authenticated navigation
            showBasicAuthenticatedNav();
        });
    } else {
        // User not authenticated - show login
        showUnauthenticatedNav();
    }
}*/

// Show basic authenticated navigation (fallback)
function showBasicAuthenticatedNav() {
    const navMenu = document.querySelector('.nav-menu');
    const currentLang = localStorage.getItem('language') || 'en';
    const translations = {
        en: {
            'find-styles': 'Styles',
            'find-artist': 'Artist',
            'messages': 'Messages',
            'dashboard': 'Dashboard',
            'logout': 'Logout'
        },
        es: {
            'find-styles': 'Estilos',
            'find-artist': 'Tatuadores',
            'messages': 'Mensajes',
            'dashboard': 'Perfil',
            'logout': 'Cerrar sesión'
        }
    };
    
    navMenu.innerHTML = `
        <li class="nav-item">
            <a href="find-styles.html" class="nav-link" data-nav="find-styles">${translations[currentLang]['find-styles']}</a>
        </li>
        <li class="nav-item">
            <a href="find-artists.html" class="nav-link" data-nav="find-artist">${translations[currentLang]['find-artist']}</a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-link" data-nav="messages">${translations[currentLang]['messages']}</a>
        </li>
        <li class="nav-item">
            <a href="dashboard-user.html" class="nav-link" data-nav="dashboard">${translations[currentLang]['dashboard']}</a>
        </li>
        <li class="nav-item">
            <a href="#" class="nav-button" onclick="logout()" data-nav="logout">${translations[currentLang]['logout']}</a>
        </li>
    `;
}

// Show unauthenticated navigation
function showUnauthenticatedNav() {
    const navMenu = document.querySelector('.nav-menu');
    const currentLang = localStorage.getItem('language') || 'en';
    const translations = {
        en: {
            'find-styles': 'Styles',
            'find-artist': 'Artist',
            'login': 'Login'
        },
        es: {
            'find-styles': 'Estilos',
            'find-artist': 'Tatuadores',
            'login': 'Iniciar sesión'
        }
    };
    
    navMenu.innerHTML = `
        <li class="nav-item">
            <a href="find-styles.html" class="nav-link" data-nav="find-styles">${translations[currentLang]['find-styles']}</a>
        </li>
        <li class="nav-item">
            <a href="find-artists.html" class="nav-link" data-nav="find-artist">${translations[currentLang]['find-artist']}</a>
        </li>
        <li class="nav-item">
            <a href="login.html" class="nav-button" data-nav="login">${translations[currentLang]['login']}</a>
        </li>
    `;
}

// Logout function
function logout() {
    waitForFirebaseAuth().then(() => {
        auth.signOut().then(() => {
            console.log('User signed out successfully');
            localStorage.removeItem('user');
            localStorage.removeItem('userToken');
            window.location.href = 'login.html';
        }).catch((error) => {
            console.error('Error signing out:', error);
            // Still redirect to login even if signout fails
            localStorage.removeItem('user');
            localStorage.removeItem('userToken');
            window.location.href = 'login.html';
        });
    });
}