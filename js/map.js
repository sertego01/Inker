// Map functionality
class MapManager {
    constructor() {
        this.map = null;
        this.markers = [];
        this.markerCluster = null;
        this.artists = [];
        this.filteredArtists = [];
        this.currentArtist = null;
        this.isInitialized = false;
        
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        this.isInitialized = true;

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeMap();
                this.loadArtists();
                this.setupEventListeners();
            });
        } else {
            // DOM is already ready
            this.initializeMap();
            this.loadArtists();
            this.setupEventListeners();
        }
    }

    initializeMap() {
        // Show loading overlay
        const loadingOverlay = document.getElementById('mapLoading');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'flex';
        }

        // Small delay to ensure map container is ready
        setTimeout(() => {
            // Initialize map centered on Asturias where most artists are located
            this.map = L.map('map').setView([43.3603, -5.8448], 8);
            this.setupMapLayers();
        }, 100);
    }

    setupMapLayers() {
        const loadingOverlay = document.getElementById('mapLoading');

        // Add OpenStreetMap tiles
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(this.map);

        // Initialize marker cluster group
        this.markerCluster = L.markerClusterGroup({
            chunkedLoading: true,
            maxClusterRadius: 50,
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true
        });

        this.map.addLayer(this.markerCluster);

        // Hide loading overlay when map is ready
        this.map.whenReady(() => {
            console.log('Map is ready, hiding loading overlay');
            if (loadingOverlay) {
                loadingOverlay.style.display = 'none';
            }
            // Add markers after map is ready
            this.addMarkersToMap();
        });

        // Fallback: hide loading overlay after 3 seconds max
        setTimeout(() => {
            if (loadingOverlay && loadingOverlay.style.display !== 'none') {
                console.log('Fallback: hiding loading overlay after timeout');
                loadingOverlay.style.display = 'none';
            }
        }, 3000);
    }

    loadArtists() {
        // Sample artist data - in a real app, this would come from Firebase
        this.artists = [
            {
                id: 'carmen-garcia',
                name: 'Carmen García',
                email: 'carmen@example.com',
                location: 'Oviedo, Asturias',
                coordinates: [43.3603, -5.8448], // Oviedo, Asturias
                rating: 4.7,
                reviews: 1245,
                style: 'Watercolor',
                specialties: ['Watercolor', 'Realistic', 'Portraits'],
                avatar: '../images/artist1.jpg',
                availability: 'available',
                hourlyRate: '€80-150/hr',
                bio: 'Especializada en tatuajes de acuarela y realistas con más de 8 años de experiencia.'
            },
            {
                id: 'marcos-rodriguez',
                name: 'Marcos Rodríguez',
                email: 'marcos@example.com',
                location: 'Gijón, Asturias',
                coordinates: [43.5453, -5.6619], // Gijón, Asturias
                rating: 3.5,
                reviews: 987,
                style: 'Traditional',
                specialties: ['Traditional', 'Neo-traditional', 'American'],
                avatar: '../images/artist2.jpg',
                availability: 'busy',
                hourlyRate: '€60-120/hr',
                bio: 'Experto en estilos tradicionales y neo-tradicionales con diseños audaces y vibrantes.'
            },
            {
                id: 'elena-martinez',
                name: 'Elena Martínez',
                email: 'elena@example.com',
                location: 'Avilés, Asturias',
                coordinates: [43.5556, -5.9244], // Avilés, Asturias
                rating: 4.8,
                reviews: 1456,
                style: 'Blackwork',
                specialties: ['Blackwork', 'Geometric', 'Minimalist'],
                avatar: '../images/artist3.jpg',
                availability: 'available',
                hourlyRate: '€100-200/hr',
                bio: 'Maestra del blackwork y diseños geométricos con patrones intrincados.'
            },
            {
                id: 'alejandro-rivera',
                name: 'Alejandro Rivera',
                email: 'alejandro@example.com',
                location: 'Mieres, Asturias',
                coordinates: [43.2500, -5.7667], // Mieres, Asturias
                rating: 4.1,
                reviews: 892,
                style: 'Traditional',
                specialties: ['Traditional', 'Realistic', 'Portraits'],
                avatar: '../images/artist4.jpg',
                availability: 'this-week',
                hourlyRate: '€70-140/hr',
                bio: 'Artista versátil especializado en estilos tradicionales y realistas.'
            },
            {
                id: 'maria-lopez',
                name: 'María López',
                email: 'maria@example.com',
                location: 'Langreo, Asturias',
                coordinates: [43.3000, -5.6833], // Langreo, Asturias
                rating: 3.5,
                reviews: 756,
                style: 'Japanese',
                specialties: ['Japanese', 'Watercolor', 'Traditional'],
                avatar: '../images/artist2.jpg',
                availability: 'available',
                hourlyRate: '€90-180/hr',
                bio: 'Experta en técnicas tradicionales japonesas y de acuarela.'
            },
            {
                id: 'javier-thompson',
                name: 'Javier Thompson',
                email: 'javier@example.com',
                location: 'Siero, Asturias',
                coordinates: [43.4000, -5.6667], // Siero, Asturias
                rating: 3.8,
                reviews: 634,
                style: 'Blackwork',
                specialties: ['Blackwork', 'Tribal', 'Geometric'],
                avatar: '../images/artist4.jpg',
                availability: 'this-month',
                hourlyRate: '€80-160/hr',
                bio: 'Especializado en diseños de blackwork y tribales con estética audaz.'
            },
            {
                id: 'luna-rodriguez',
                name: 'Luna Rodríguez',
                email: 'luna@example.com',
                location: 'Oviedo, Asturias',
                coordinates: [43.3603, -5.8448], // Oviedo, Asturias
                rating: 3.5,
                reviews: 523,
                style: 'Puntillismo',
                specialties: ['Puntillismo', 'Dotwork', 'Geometric'],
                avatar: '../images/artist1.jpg',
                availability: 'available',
                hourlyRate: '€100-200/hr',
                bio: 'Maestra de técnicas de dotwork y puntillismo creando diseños intrincados.'
            },
            {
                id: 'patricia-patel',
                name: 'Patricia Patel',
                email: 'patricia@example.com',
                location: 'Gijón, Asturias',
                coordinates: [43.5453, -5.6619], // Gijón, Asturias
                rating: 4.1,
                reviews: 445,
                style: 'Henna',
                specialties: ['Henna', 'Cultural', 'Temporary'],
                avatar: '../images/artist2.jpg',
                availability: 'this-week',
                hourlyRate: '€50-100/hr',
                bio: 'Especializada en diseños inspirados en henna y arte cultural.'
            },
            {
                id: 'david-garcia',
                name: 'David García',
                email: 'david@example.com',
                location: 'Avilés, Asturias',
                coordinates: [43.5556, -5.9244], // Avilés, Asturias
                rating: 3.2,
                reviews: 378,
                style: 'Minimalist',
                specialties: ['Minimalist', 'Tribal', 'Geometric'],
                avatar: '../images/artist4.jpg',
                availability: 'offline',
                hourlyRate: '€60-120/hr',
                bio: 'Experto en diseños minimalistas y tribales con estética limpia.'
            },
            {
                id: 'sofia-martinez',
                name: 'Sofía Martínez',
                email: 'sofia@example.com',
                location: 'Mieres, Asturias',
                coordinates: [43.2500, -5.7667], // Mieres, Asturias
                rating: 4.6,
                reviews: 1123,
                style: 'Biomechanical',
                specialties: ['Biomechanical', 'Realistic', 'Sci-fi'],
                avatar: '../images/artist1.jpg',
                availability: 'available',
                hourlyRate: '€120-250/hr',
                bio: 'Especializada en diseños biomecánicos y realistas de ciencia ficción.'
            },
            {
                id: 'carlos-vega',
                name: 'Carlos Vega',
                email: 'carlos@example.com',
                location: 'Langreo, Asturias',
                coordinates: [43.3000, -5.6833], // Langreo, Asturias
                rating: 3.8,
                reviews: 567,
                style: 'Geometric',
                specialties: ['Geometric', 'Mandalas', 'Sacred'],
                avatar: '../images/artist2.jpg',
                availability: 'busy',
                hourlyRate: '€90-180/hr',
                bio: 'Experto en patrones geométricos y diseños de mandalas sagradas.'
            },
            {
                id: 'emma-wilson',
                name: 'Emma Wilson',
                email: 'emma@example.com',
                location: 'Siero, Asturias',
                coordinates: [43.4000, -5.6667], // Siero, Asturias
                rating: 3.5,
                reviews: 789,
                style: 'Japanese',
                specialties: ['Japanese', 'Blackwork', 'Traditional'],
                avatar: '../images/artist3.jpg',
                availability: 'this-month',
                hourlyRate: '€100-200/hr',
                bio: 'Maestra de técnicas tradicionales japonesas y blackwork.'
            },
            {
                id: 'john-smith',
                name: 'John Smith',
                email: 'john@example.com',
                location: 'London, England',
                coordinates: [51.5074, -0.1278], // London, England
                rating: 4.1,
                reviews: 892,
                style: 'Traditional',
                specialties: ['Traditional', 'Realistic', 'Portraits'],
                avatar: '../images/artist4.jpg',
                availability: 'available',
                hourlyRate: '£80-160/hr',
                bio: 'Expert in traditional British and realistic tattoo styles.'
            },
            {
                id: 'marie-dubois',
                name: 'Marie Dubois',
                email: 'marie@example.com',
                location: 'Paris, Île-de-France',
                coordinates: [48.8566, 2.3522], // Paris, France
                rating: 4.2,
                reviews: 1123,
                style: 'Watercolor',
                specialties: ['Watercolor', 'Geometric', 'Minimalist'],
                avatar: '../images/artist2.jpg',
                availability: 'this-week',
                hourlyRate: '€100-200/hr',
                bio: 'Specialized in watercolor and geometric tattoo designs.'
            },
            {
                id: 'hans-muller',
                name: 'Hans Müller',
                email: 'hans@example.com',
                location: 'Berlin, Brandenburg',
                coordinates: [52.5200, 13.4050], // Berlin, Germany
                rating: 3.8,
                reviews: 567,
                style: 'Blackwork',
                specialties: ['Blackwork', 'Dotwork', 'Geometric'],
                avatar: '../images/artist3.jpg',
                availability: 'available',
                hourlyRate: '€90-180/hr',
                bio: 'Master of blackwork and dotwork techniques with German precision.'
            }
        ];

        this.filteredArtists = [...this.artists];
    }

    addMarkersToMap() {
        // Clear existing markers
        this.markerCluster.clearLayers();
        this.markers = [];

        this.filteredArtists.forEach(artist => {
            const marker = this.createMarker(artist);
            this.markers.push(marker);
            this.markerCluster.addLayer(marker);
        });
    }

    createMarker(artist) {
        // Create custom marker icon
        const markerIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div class="marker-content ${artist.availability}">${artist.name.charAt(0)}</div>`,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [0, -20]
        });

        const marker = L.marker(artist.coordinates, { icon: markerIcon });
        
        // Add popup
        marker.bindPopup(`
            <div class="marker-popup">
                <div class="panel-header">
                    <div class="artist-avatar">
                        <img src="${artist.avatar}" alt="${artist.name} Avatar">
                    </div>
                    <h3 class="artist-name">${artist.name}</h3>
                </div>
                <div class="panel-content">
                    <div class="info-row">
                        <div class="info-label">
                            <span class="rating-stars">★★★★★</span>
                            <span>Rating</span>
                        </div>
                        <div class="info-value">
                            <span class="rating-text">${artist.rating} (${artist.reviews} reviews)</span>
                        </div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>Location</span>
                        </div>
                        <div class="info-value">
                            <span class="location-text">${artist.location}</span>
                        </div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">
                            <span>Style</span>
                        </div>
                        <div class="info-value">
                            <span class="style-tag">${artist.style}</span>
                        </div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">
                            <span>Rate</span>
                        </div>
                        <div class="info-value">
                            <span>${artist.hourlyRate}</span>
                        </div>
                    </div>
                    <div class="artist-actions">
                        <button onclick="mapManager.showArtistInfo('${artist.id}')" class="btn-view-details">View Profile</button>
                    </div>
                </div>
            </div>
        `);

        // No click event needed - Leaflet will automatically open the popup

        return marker;
    }

    showArtistInfo(artistId) {
        const artist = this.artists.find(a => a.id === artistId);
        if (!artist) return;

        this.currentArtist = artist;
        // Redirect to artist profile page
        this.viewArtistProfile();
    }

    viewArtistProfile() {
        if (this.currentArtist) {
            // Only add pages/ if we're not already in the pages folder
            const isInPagesFolder = window.location.pathname.includes('/pages/');
            const basePath = isInPagesFolder ? '' : 'pages/';
            window.location.href = `${basePath}artist-profile.html?id=${this.currentArtist.id}`;
        }
    }


    setupEventListeners() {
        // Filter functionality
        const styleFilter = document.getElementById('mapStyleFilter');

        if (styleFilter) {
            styleFilter.addEventListener('change', () => {
                this.applyFilters();
            });
        }
    }


    applyFilters() {
        const styleFilter = document.getElementById('mapStyleFilter').value;

        this.filteredArtists = this.artists.filter(artist => {
            const matchesStyle = !styleFilter || artist.style === styleFilter || artist.specialties.includes(styleFilter);

            return matchesStyle;
        });

        this.addMarkersToMap();
    }

    clearFilters() {
        document.getElementById('mapStyleFilter').value = '';
        
        this.filteredArtists = [...this.artists];
        this.addMarkersToMap();
    }
}

// Global functions for HTML onclick events
function toggleMapFilters() {
    const dropdown = document.getElementById('mapFilterDropdown');
    const btn = document.querySelector('.filters-btn');
    
    if (dropdown && btn) {
        dropdown.classList.toggle('show');
        btn.classList.toggle('active');
    }
}

function viewArtistProfile() {
    if (window.mapManager) {
        window.mapManager.viewArtistProfile();
    }
}


function clearMapFilters() {
    if (window.mapManager) {
        window.mapManager.clearFilters();
    }
}

function applyMapFilters() {
    if (window.mapManager) {
        window.mapManager.applyFilters();
    }
}

// Initialize map manager
let mapManager;
document.addEventListener('DOMContentLoaded', () => {
    mapManager = new MapManager();
    window.mapManager = mapManager;
});

// Close filters dropdown when clicking outside
document.addEventListener('click', (e) => {
    const filtersDropdown = document.getElementById('mapFilterDropdown');
    
    if (filtersDropdown && !filtersDropdown.contains(e.target) && !e.target.closest('.filters-btn')) {
        filtersDropdown.classList.remove('show');
        document.querySelector('.filters-btn').classList.remove('active');
    }
});
