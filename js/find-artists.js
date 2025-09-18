// Find Artists Page JavaScript

// Sample artists data
const allArtists = [
    {
        id: 'sarah-chen',
        name: 'Sarah Chen',
        style: 'Watercolor & Realistic',
        location: 'Los Angeles, CA',
        rating: 4.9,
        reviewCount: 1245,
        image: '../images/artist1.jpg',
        styles: ['Watercolor', 'Realistic', 'Portraits'],
        bio: 'Specialized in watercolor and realistic tattoos with over 8 years of experience.'
    },
    {
        id: 'marcus-rodriguez',
        name: 'Marcus Rodriguez',
        style: 'Traditional & Neo-traditional',
        location: 'Austin, TX',
        rating: 4.8,
        reviewCount: 987,
        image: '../images/artist2.jpg',
        styles: ['Traditional', 'Neo-traditional', 'American'],
        bio: 'Expert in traditional and neo-traditional styles with bold, vibrant designs.'
    },
    {
        id: 'elena-volkov',
        name: 'Elena Volkov',
        style: 'Blackwork & Geometric',
        location: 'Portland, OR',
        rating: 4.9,
        reviewCount: 1456,
        image: '../images/artist3.jpg',
        styles: ['Blackwork', 'Geometric', 'Minimalist'],
        bio: 'Master of blackwork and geometric designs with intricate patterns.'
    },
    {
        id: 'alex-rivera',
        name: 'Alex Rivera',
        style: 'Traditional & Realistic',
        location: 'New York, NY',
        rating: 4.7,
        reviewCount: 892,
        image: '../images/artist1.jpg',
        styles: ['Traditional', 'Realistic', 'Portraits'],
        bio: 'Versatile artist specializing in traditional and realistic tattoo styles.'
    },
    {
        id: 'maya-chen',
        name: 'Maya Chen',
        style: 'Japanese & Watercolor',
        location: 'Miami, FL',
        rating: 4.8,
        reviewCount: 756,
        image: '../images/artist2.jpg',
        styles: ['Japanese', 'Watercolor', 'Traditional'],
        bio: 'Expert in Japanese traditional and watercolor tattoo techniques.'
    },
    {
        id: 'jake-thompson',
        name: 'Jake Thompson',
        style: 'Blackwork & Tribal',
        location: 'San Francisco, CA',
        rating: 4.6,
        reviewCount: 634,
        image: '../images/artist3.jpg',
        styles: ['Blackwork', 'Tribal', 'Geometric'],
        bio: 'Specialized in blackwork and tribal tattoo designs with bold aesthetics.'
    },
    {
        id: 'luna-rodriguez',
        name: 'Luna Rodriguez',
        style: 'Puntillismo & Dotwork',
        location: 'Los Angeles, CA',
        rating: 4.8,
        reviewCount: 523,
        image: '../images/artist1.jpg',
        styles: ['Puntillismo', 'Dotwork', 'Geometric'],
        bio: 'Master of dotwork and pointillism techniques creating intricate designs.'
    },
    {
        id: 'priya-patel',
        name: 'Priya Patel',
        style: 'Henna & Cultural',
        location: 'Austin, TX',
        rating: 4.7,
        reviewCount: 445,
        image: '../images/artist2.jpg',
        styles: ['Henna', 'Cultural', 'Temporary'],
        bio: 'Specialized in henna-inspired designs and cultural tattoo art.'
    },
    {
        id: 'david-chen',
        name: 'David Chen',
        style: 'Minimalist & Tribal',
        location: 'Portland, OR',
        rating: 4.5,
        reviewCount: 378,
        image: '../images/artist3.jpg',
        styles: ['Minimalist', 'Tribal', 'Geometric'],
        bio: 'Expert in minimalist and tribal tattoo designs with clean aesthetics.'
    },
    {
        id: 'sophia-martinez',
        name: 'Sophia Martinez',
        style: 'Biomechanical & Realistic',
        location: 'New York, NY',
        rating: 4.9,
        reviewCount: 1123,
        image: '../images/artist1.jpg',
        styles: ['Biomechanical', 'Realistic', 'Sci-fi'],
        bio: 'Specialized in biomechanical and realistic sci-fi tattoo designs.'
    },
    {
        id: 'carlos-vega',
        name: 'Carlos Vega',
        style: 'Geometric & Mandalas',
        location: 'Miami, FL',
        rating: 4.6,
        reviewCount: 567,
        image: '../images/artist2.jpg',
        styles: ['Geometric', 'Mandalas', 'Sacred'],
        bio: 'Expert in geometric patterns and sacred mandala tattoo designs.'
    },
    {
        id: 'emma-wilson',
        name: 'Emma Wilson',
        style: 'Japanese & Blackwork',
        location: 'San Francisco, CA',
        rating: 4.8,
        reviewCount: 789,
        image: '../images/artist3.jpg',
        styles: ['Japanese', 'Blackwork', 'Traditional'],
        bio: 'Master of Japanese traditional and blackwork tattoo techniques.'
    }
];

let filteredArtists = [...allArtists];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadArtists();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('artistSearch');
    searchInput.addEventListener('input', debounce(searchArtists, 300));
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchArtists();
        }
    });
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Load artists into the grid
function loadArtists() {
    const artistsGrid = document.getElementById('artistsGrid');
    const artistsCount = document.getElementById('artistsCount');
    
    artistsGrid.innerHTML = '';
    
    if (filteredArtists.length === 0) {
        artistsGrid.innerHTML = '<div class="no-results">No artists found matching your criteria.</div>';
        artistsCount.textContent = 'Found 0 artists';
        return;
    }
    
    filteredArtists.forEach(artist => {
        const artistCard = createArtistCard(artist);
        artistsGrid.appendChild(artistCard);
    });
    
    artistsCount.textContent = `Found ${filteredArtists.length} artists`;
}

// Create artist card HTML
function createArtistCard(artist) {
    const card = document.createElement('div');
    card.classList.add('artist-card');
    
    card.innerHTML = `
        <div class="artist-image">
            <img src="${artist.image}" alt="${artist.name}">
        </div>
        <div class="artist-info">
            <h3 class="artist-name">${artist.name}</h3>
            <p class="artist-style">${artist.style}</p>
            <div class="artist-details">
                <div class="artist-location">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin h-4 w-4 mr-1"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>${artist.location}</span>
                </div>
                <div class="artist-rating">
                    <span class="star-icon">⭐</span>
                    <span>${artist.reviewCount}</span>
                </div>
            </div>
        </div>
    `;
    
    // Add click event to view profile
    card.addEventListener('click', () => {
        window.location.href = `artist-profile.html?id=${artist.id}`;
    });
    
    return card;
}

// Search artists function
function searchArtists() {
    const searchTerm = document.getElementById('artistSearch').value.toLowerCase().trim();
    const styleFilter = document.getElementById('styleFilter').value;
    const locationFilter = document.getElementById('locationFilter').value;
    
    filteredArtists = allArtists.filter(artist => {
        const matchesSearch = !searchTerm || 
            artist.name.toLowerCase().includes(searchTerm) ||
            artist.location.toLowerCase().includes(searchTerm) ||
            artist.style.toLowerCase().includes(searchTerm) ||
            artist.styles.some(style => style.toLowerCase().includes(searchTerm));
        
        const matchesStyle = !styleFilter || artist.styles.includes(styleFilter);
        const matchesLocation = !locationFilter || artist.location.includes(locationFilter);
        
        return matchesSearch && matchesStyle && matchesLocation;
    });
    
    loadArtists();
}

// Toggle filters dropdown
function toggleFilters() {
    const filterDropdown = document.getElementById('filterDropdown');
    const filtersBtn = document.querySelector('.filters-btn');
    
    if (filterDropdown.classList.contains('show')) {
        filterDropdown.classList.remove('show');
        filtersBtn.classList.remove('active');
    } else {
        filterDropdown.classList.add('show');
        filtersBtn.classList.add('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const filterDropdown = document.getElementById('filterDropdown');
    const filtersBtn = document.querySelector('.filters-btn');
    
    if (!filtersBtn.contains(event.target) && !filterDropdown.contains(event.target)) {
        filterDropdown.classList.remove('show');
        filtersBtn.classList.remove('active');
    }
});

// Filter by style
function filterByStyle() {
    searchArtists();
}

// Filter by location
function filterByLocation() {
    searchArtists();
}

// Clear all filters
function clearFilters() {
    document.getElementById('styleFilter').value = '';
    document.getElementById('locationFilter').value = '';
    document.getElementById('artistSearch').value = '';
    searchArtists();
}

// Sort artists
function sortArtists() {
    const sortBy = document.getElementById('sortBy').value;
    
    filteredArtists.sort((a, b) => {
        switch (sortBy) {
            case 'relevance':
                // Default order (as loaded)
                return 0;
            case 'name':
                return a.name.localeCompare(b.name);
            case 'rating':
                return b.rating - a.rating;
            case 'location':
                return a.location.localeCompare(b.location);
            default:
                return 0;
        }
    });
    
    loadArtists();
}

// Logout function
function logout() {
    // Add logout logic here
    alert('Logout functionality will be implemented');
}
