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

    async loadArtists() {
        try {
            const snapshot = await getAllArtists(500);
            this.artists = snapshot.docs.map(doc => {
                const d = doc.data();
                const lat = d.latitude || (d.coordinates && d.coordinates[0]);
                const lng = d.longitude || (d.coordinates && d.coordinates[1]);
                const coords = (typeof lat === 'number' && typeof lng === 'number') ? [lat, lng] : null;
                const locationText = d.location || [d.city, d.region || d.country].filter(Boolean).join(', ');
                return {
                    id: d.id || doc.id,
                    name: d.name || '',
                    email: d.email || '',
                    location: locationText || '',
                    coordinates: coords,
                    rating: d.rating || 0,
                    reviews: d.reviewCount || d.reviews || 0,
                    style: d.style || (Array.isArray(d.styles) && d.styles.length ? d.styles[0] : ''),
                    specialties: Array.isArray(d.styles) ? d.styles : (d.style ? [d.style] : []),
                    avatar: d.image || d.avatar || '../images/artist-avatar.png',
                    availability: d.isAvailable === true ? 'available' : 'offline',
                    hourlyRate: d.hourlyRate || '',
                    bio: d.bio || ''
                };
            }).filter(a => Array.isArray(a.coordinates));

            this.filteredArtists = [...this.artists];
        } catch (_) {
            this.artists = [];
            this.filteredArtists = [];
        }
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
