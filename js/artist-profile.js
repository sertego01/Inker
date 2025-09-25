// Artist Profile Page JavaScript

// Sample artist data
const sampleArtist = {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    avatar: '../images/artist1.jpg',
    rating: 4.9,
    reviewCount: 89,
    location: 'Los Angeles, CA',
    bio: 'Specialized in watercolor and realistic tattoos with over 8 years of experience. I love creating unique, custom pieces that tell your story.',
    specialties: ['Watercolor', 'Realistic', 'Traditional', 'Japanese'],
    stats: {
        yearsExperience: 8,
        likes: 1245,
        hourlyRate: '$150-300/hr',
        availability: 'Available'
    },
    studio: {
        name: 'Ink & Canvas Studio',
        address: '123 Art District, Los Angeles, CA 90013'
    },
    social: {
        instagram: '@sarahchen_tattoo',
        website: 'www.sarahchentattoo.com'
    },
    portfolio: [
        '../images/watercolor.jpg',
        '../images/realistic.jpg',
        '../images/traditional.jpg',
        '../images/japanese.jpg',
        '../images/geometric.jpg',
        '../images/minimalist.jpg'
    ],
    reviews: [
        {
            id: 1,
            name: 'Jessica Martinez',
            initials: 'JM',
            rating: 5,
            text: 'Sarah is absolutely amazing! She created the most beautiful watercolor tattoo for me. Her attention to detail and artistic vision is incredible.',
            date: 'February 15, 2024'
        },
        {
            id: 2,
            name: 'Michael Johnson',
            initials: 'MJ',
            rating: 5,
            text: 'Professional, clean, and incredibly talented. Sarah made me feel comfortable throughout the entire process. Highly recommend!',
            date: 'February 10, 2024'
        },
        {
            id: 3,
            name: 'Emily Davis',
            initials: 'ED',
            rating: 4,
            text: 'Great experience overall. The tattoo turned out exactly as I envisioned. Sarah is very skilled and the studio is beautiful.',
            date: 'February 5, 2024'
        }
    ]
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Artist Profile Page Loaded');
    
    // Get artist ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');
    
    console.log('URL:', window.location.href);
    console.log('Artist ID from URL:', artistId);
    console.log('Available artists:', Object.keys(artistDataMap));
    
    if (artistId && artistDataMap[artistId]) {
        console.log('Loading artist:', artistId);
        loadArtistProfile(artistId);
    } else {
        console.log('Artist not found, loading default');
        // Load sample artist if no ID provided
        loadArtistProfile('sarah-chen');
    }
    
    // Setup event listeners
    setupEventListeners();
});

// Artist data mapping - populated from find-artists.js data
const artistDataMap = {};

// Function to convert find-artists data to artist-profile format
function convertArtistData(artist) {
    return {
        id: artist.id,
        name: artist.name,
        avatar: artist.image,
        rating: artist.rating,
        reviewCount: artist.reviewCount,
        location: artist.location,
        bio: artist.bio,
        specialties: artist.styles,
        stats: {
            yearsExperience: Math.floor(Math.random() * 10) + 3, // Random 3-12 years
            likes: artist.reviewCount * 2, // Estimate likes based on reviews
            hourlyRate: artist.country === 'España' ? `€${Math.floor(Math.random() * 100) + 80}-${Math.floor(Math.random() * 100) + 200}/hora` : `$${Math.floor(Math.random() * 100) + 100}-${Math.floor(Math.random() * 100) + 300}/hr`,
            availability: artist.country === 'España' ? 'Disponible' : 'Available'
        },
        studio: {
            name: artist.country === 'España' ? `Estudio ${artist.name.split(' ')[0]}` : `${artist.name.split(' ')[0]}'s Studio`,
            address: artist.location,
            phone: artist.country === 'España' ? `+34 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100}` : `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}`,
            email: `${artist.id.replace('-', '')}@studio.com`
        },
        social: {
            instagram: `@${artist.id.replace('-', '_')}_tattoo`,
            website: `www.${artist.id.replace('-', '')}tattoo.com`
        },
        portfolio: [
            '../images/watercolor.jpg',
            '../images/realistic.jpg',
            '../images/traditional.jpg',
            '../images/japanese.jpg',
            '../images/geometric.jpg',
            '../images/minimalist.jpg'
        ],
        reviews: [
            {
                id: 1,
                name: artist.country === 'España' ? 'Ana López' : 'Jessica Martinez',
                initials: artist.country === 'España' ? 'AL' : 'JM',
                rating: 5,
                comment: artist.country === 'España' ? `${artist.name} es una artista excepcional. Su trabajo es simplemente hermoso.` : `${artist.name} is absolutely amazing! Her work is stunning and she made me feel so comfortable throughout the entire process.`,
                date: '2024-01-15'
            }
        ]
    };
}

// Populate artistDataMap with all artists from find-artists.js
// This would normally be imported, but for now we'll define the data here
const allArtistsData = [
    {
        id: 'carmen-garcia',
        name: 'Carmen García',
        image: '../images/artist1.jpg',
        rating: 4.7,
        reviewCount: 1245,
        location: 'Oviedo, Asturias',
        country: 'España',
        styles: ['Watercolor', 'Realistic', 'Portraits'],
        bio: 'Especializada en tatuajes de acuarela y realistas con más de 8 años de experiencia.'
    },
    {
        id: 'marcos-rodriguez',
        name: 'Marcos Rodríguez',
        image: '../images/artist2.jpg',
        rating: 3.5,
        reviewCount: 987,
        location: 'Gijón, Asturias',
        country: 'España',
        styles: ['Traditional', 'Neo-traditional', 'American'],
        bio: 'Experto en estilos tradicionales y neo-tradicionales con diseños audaces y vibrantes.'
    },
    {
        id: 'elena-martinez',
        name: 'Elena Martínez',
        image: '../images/artist3.jpg',
        rating: 4.8,
        reviewCount: 1456,
        location: 'Avilés, Asturias',
        country: 'España',
        styles: ['Blackwork', 'Geometric', 'Minimalist'],
        bio: 'Maestra del blackwork y diseños geométricos con patrones intrincados.'
    },
    {
        id: 'alejandro-rivera',
        name: 'Alejandro Rivera',
        image: '../images/artist4.jpg',
        rating: 4.1,
        reviewCount: 892,
        location: 'Mieres, Asturias',
        country: 'España',
        styles: ['Traditional', 'Realistic', 'Portraits'],
        bio: 'Artista versátil especializado en estilos tradicionales y realistas.'
    },
    {
        id: 'maria-lopez',
        name: 'María López',
        image: '../images/artist2.jpg',
        rating: 3.5,
        reviewCount: 756,
        location: 'Langreo, Asturias',
        country: 'España',
        styles: ['Japanese', 'Watercolor', 'Traditional'],
        bio: 'Experta en técnicas tradicionales japonesas y de acuarela.'
    },
    {
        id: 'javier-thompson',
        name: 'Javier Thompson',
        image: '../images/artist4.jpg',
        rating: 3.8,
        reviewCount: 634,
        location: 'Siero, Asturias',
        country: 'España',
        styles: ['Blackwork', 'Tribal', 'Geometric'],
        bio: 'Especializado en diseños de blackwork y tribales con estética audaz.'
    },
    {
        id: 'luna-rodriguez',
        name: 'Luna Rodríguez',
        image: '../images/artist1.jpg',
        rating: 3.5,
        reviewCount: 523,
        location: 'Oviedo, Asturias',
        country: 'España',
        styles: ['Puntillismo', 'Dotwork', 'Geometric'],
        bio: 'Maestra de técnicas de dotwork y puntillismo creando diseños intrincados.'
    },
    {
        id: 'patricia-patel',
        name: 'Patricia Patel',
        image: '../images/artist2.jpg',
        rating: 4.1,
        reviewCount: 445,
        location: 'Gijón, Asturias',
        country: 'España',
        styles: ['Henna', 'Cultural', 'Temporary'],
        bio: 'Especializada en diseños inspirados en henna y arte cultural.'
    },
    {
        id: 'david-garcia',
        name: 'David García',
        image: '../images/artist4.jpg',
        rating: 3.2,
        reviewCount: 378,
        location: 'Avilés, Asturias',
        country: 'España',
        styles: ['Minimalist', 'Tribal', 'Geometric'],
        bio: 'Experto en diseños minimalistas y tribales con estética limpia.'
    },
    {
        id: 'sofia-martinez',
        name: 'Sofía Martínez',
        image: '../images/artist1.jpg',
        rating: 4.6,
        reviewCount: 1123,
        location: 'Mieres, Asturias',
        country: 'España',
        styles: ['Biomechanical', 'Realistic', 'Sci-fi'],
        bio: 'Especializada en diseños biomecánicos y realistas de ciencia ficción.'
    },
    {
        id: 'carlos-vega',
        name: 'Carlos Vega',
        image: '../images/artist2.jpg',
        rating: 3.8,
        reviewCount: 567,
        location: 'Langreo, Asturias',
        country: 'España',
        styles: ['Geometric', 'Mandalas', 'Sacred'],
        bio: 'Experto en patrones geométricos y diseños de mandalas sagradas.'
    },
    {
        id: 'emma-wilson',
        name: 'Emma Wilson',
        image: '../images/artist3.jpg',
        rating: 3.5,
        reviewCount: 789,
        location: 'Siero, Asturias',
        country: 'España',
        styles: ['Japanese', 'Blackwork', 'Traditional'],
        bio: 'Maestra de técnicas tradicionales japonesas y blackwork.'
    },
    {
        id: 'john-smith',
        name: 'John Smith',
        image: '../images/artist4.jpg',
        rating: 4.1,
        reviewCount: 892,
        location: 'London, England',
        country: 'United Kingdom',
        styles: ['Traditional', 'Realistic', 'Portraits'],
        bio: 'Expert in traditional British and realistic tattoo styles.'
    },
    {
        id: 'marie-dubois',
        name: 'Marie Dubois',
        image: '../images/artist2.jpg',
        rating: 4.2,
        reviewCount: 1123,
        location: 'Paris, Île-de-France',
        country: 'France',
        styles: ['Watercolor', 'Geometric', 'Minimalist'],
        bio: 'Specialized in watercolor and geometric tattoo designs.'
    },
    {
        id: 'hans-muller',
        name: 'Hans Müller',
        image: '../images/artist1.jpg',
        rating: 4.0,
        reviewCount: 678,
        location: 'Berlin, Germany',
        country: 'Germany',
        styles: ['Traditional', 'Blackwork', 'Geometric'],
        bio: 'Specialized in traditional German and blackwork tattoo styles.'
    }
];

// Convert all artists to the required format
allArtistsData.forEach(artist => {
    artistDataMap[artist.id] = convertArtistData(artist);
});

// Load artist profile data
function loadArtistProfile(artistId) {
    console.log('Loading artist profile for ID:', artistId);
    
    // Get artist data from mapping or fallback to sample
    const artist = artistDataMap[artistId] || sampleArtist;
    console.log('Artist data loaded:', artist);
    
    // Update all sections
    updateArtistInfo(artist);
    updateArtistStats(artist.stats);
    updateSpecialties(artist.specialties);
    updateStudioInfo(artist.studio);
    updateSocialMedia(artist.social);
    updatePortfolio(artist.portfolio);
    updateReviews(artist.reviews);
}

// Update artist basic information
function updateArtistInfo(artist) {
    console.log('Updating artist info for:', artist.name);
    
    const elements = {
        avatar: document.getElementById('artistAvatar'),
        name: document.getElementById('artistName'),
        rating: document.getElementById('artistRating'),
        location: document.getElementById('artistLocation'),
        bio: document.getElementById('artistBio')
    };
    
    console.log('Elements found:', elements);
    
    if (elements.avatar) {
        elements.avatar.src = artist.avatar;
        console.log('Updated avatar to:', artist.avatar);
    }
    if (elements.name) {
        elements.name.textContent = artist.name;
        console.log('Updated name to:', artist.name);
    }
    if (elements.rating) {
        elements.rating.textContent = `${artist.rating} (${artist.reviewCount} reviews)`;
        console.log('Updated rating to:', `${artist.rating} (${artist.reviewCount} reviews)`);
    }
    if (elements.location) elements.location.textContent = artist.location;
    if (elements.bio) {
        elements.bio.textContent = artist.bio;
        console.log('Updated bio to:', artist.bio);
    }
}

// Update artist statistics
function updateArtistStats(stats) {
    const elements = {
        yearsExperience: document.getElementById('yearsExperience'),
        likes: document.getElementById('likes'),
        hourlyRate: document.getElementById('hourlyRate'),
        availability: document.getElementById('availability')
    };
    
    if (elements.yearsExperience) elements.yearsExperience.textContent = stats.yearsExperience;
    if (elements.likes) elements.likes.textContent = stats.likes;
    if (elements.hourlyRate) elements.hourlyRate.textContent = stats.hourlyRate;
    if (elements.availability) elements.availability.textContent = stats.availability;
}

// Update specialties tags
function updateSpecialties(specialties) {
    console.log('Updating specialties:', specialties);
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
        container.appendChild(tag);
    });
    
    // Apply translations to dynamically created specialty tags
    if (window.i18n) {
        window.i18n.updateLanguage();
    }
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
    console.log('Viewing portfolio item:', index);
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