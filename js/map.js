// Google Maps Integration for Tattoo Artists

let map;
let markers = [];
let infoWindow;
let searchBox;
let artists = [];
let filteredArtists = [];
let currentActiveArtist = null;

// Initialize Google Map
function initMap() {
    console.log('Initializing Google Map...');
    
    // Default location (Asturias, Spain)
    const defaultLocation = { lat: 43.3619, lng: -5.8493 };
    
    // Create map
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: defaultLocation,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });
    
    // Create info window
    infoWindow = new google.maps.InfoWindow();
    
    // Initialize search box for location
    initLocationSearchBox();
    
    // Set up style filter
    setupStyleFilter();
    
    // Set up artist search
    setupArtistSearch();
    
    // Set up rating filters
    setupRatingFilters();
    
    // Wait for Firebase to be ready before loading artists
    waitForFirebase().then(() => {
        console.log('Firebase is ready, loading artists...');
        loadArtists();
    }).catch((error) => {
        console.error('Firebase initialization failed:', error);
        showErrorMessage('Error al conectar con la base de datos');
    });
}

// Wait for Firebase to be ready
function waitForFirebase() {
    return new Promise((resolve, reject) => {
        const maxAttempts = 50; // 5 seconds max
        let attempts = 0;
        
        const checkFirebase = () => {
            attempts++;
            
            if (typeof db !== 'undefined' && db) {
                console.log('Firebase is ready!');
                resolve();
            } else if (attempts >= maxAttempts) {
                reject(new Error('Firebase initialization timeout'));
        } else {
                console.log(`Waiting for Firebase... attempt ${attempts}`);
                setTimeout(checkFirebase, 100);
            }
        };
        
        checkFirebase();
    });
}

// Show error message
function showErrorMessage(message) {
    const artistsList = document.getElementById('artistsList');
    if (artistsList) {
        artistsList.innerHTML = `<div style="color: white; text-align: center; padding: 20px;">${message}</div>`;
    }
}

// Get artist styles as a formatted string
function getArtistStyles(artist) {
    if (artist.styles && Array.isArray(artist.styles) && artist.styles.length > 0) {
        return artist.styles[0]; // Solo el primer estilo
    } else if (artist.style) {
        return artist.style;
    } else {
        return 'No especificado';
    }
}

// Create custom marker icon with favicon
function createCustomMarkerIcon(isHover = false) {
    return new Promise((resolve) => {
        const size = isHover ? 45 : 40;
        const center = size / 2;
        const radius = isHover ? 20 : 18;
        
        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = size;
        canvas.height = size;
        
        // Draw circular background with gradient
        const gradient = ctx.createRadialGradient(center, center, 0, center, center, radius);
        gradient.addColorStop(0, '#8b5cf6');
        gradient.addColorStop(1, '#8b5cf6');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(center, center, radius, 0, 2 * Math.PI);
        ctx.fill();
        
        // Add white border
        ctx.strokeStyle = 'white';
        ctx.lineWidth = isHover ? 4 : 3;
        ctx.stroke();
        
        // Add shadow effect
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = isHover ? 4 : 3;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        
        // Load and draw the favicon
        const img = new Image();
        img.onload = function() {
            const iconSize = isHover ? 28 : 24;
            const iconOffset = (size - iconSize) / 2;
            
            ctx.drawImage(img, iconOffset, iconOffset, iconSize, iconSize);
            resolve(canvas.toDataURL());
        };
        
        img.onerror = function() {
            // Fallback: draw letter "I" if image fails to load
            ctx.fillStyle = 'white';
            ctx.font = `bold ${isHover ? '16' : '14'}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('I', center, center);
            resolve(canvas.toDataURL());
        };
        
        img.src = '../images/favicon.png';
    });
}

// Geocode cities for artists that need it (optimized)
async function geocodeArtistsCities() {
    console.log('Starting geocoding for artists with cities...');
    
    const artistsToGeocode = artists.filter(artist => artist.needsGeocoding);
    console.log(`Found ${artistsToGeocode.length} artists that need geocoding`);
    
    // Process geocoding in parallel batches for faster loading
    const batchSize = 5; // Process 5 artists at a time
    const batches = [];
    
    for (let i = 0; i < artistsToGeocode.length; i += batchSize) {
        batches.push(artistsToGeocode.slice(i, i + batchSize));
    }
    
    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
        const batch = batches[batchIndex];
        console.log(`Processing batch ${batchIndex + 1}/${batches.length} (${batch.length} artists)`);
        
        // Process batch in parallel
        const promises = batch.map(async (artist) => {
            try {
                const coordinates = await geocodeCity(artist.cityToGeocode);
                if (coordinates) {
                    artist.lat = coordinates.lat;
                    artist.lng = coordinates.lng;
                    artist.geocoded = true;
                    console.log(`Geocoded ${artist.name}: ${coordinates.lat}, ${coordinates.lng}`);
                } else {
                    console.log(`Failed to geocode ${artist.name}, using Asturias fallback`);
                    artist.lat = 43.3619 + (Math.random() - 0.5) * 0.2;
                    artist.lng = -5.8493 + (Math.random() - 0.5) * 0.2;
                    artist.hasRandomLocation = true;
                }
            } catch (error) {
                console.error(`Error geocoding ${artist.name}:`, error);
                artist.lat = 43.3619 + (Math.random() - 0.5) * 0.2;
                artist.lng = -5.8493 + (Math.random() - 0.5) * 0.2;
                artist.hasRandomLocation = true;
            }
        });
        
        // Wait for current batch to complete
        await Promise.all(promises);
        
        // Update display after each batch
        displayArtistsOnMap();
        displayArtistsInList();
        
        // Small delay between batches to avoid rate limiting
        if (batchIndex < batches.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    }
    
    console.log('Geocoding completed');
}

// Geocode a city name to coordinates (optimized)
function geocodeCity(cityName) {
    return new Promise((resolve) => {
        if (!cityName) {
            resolve(null);
            return;
        }
        
        // Add "Spain" to the city name for better geocoding
        const searchQuery = `${cityName}, Spain`;
        console.log(`Geocoding: ${searchQuery}`);
        
        const geocoder = new google.maps.Geocoder();
        
        // Set timeout for faster failure handling
        const timeout = setTimeout(() => {
            console.log(`Geocoding timeout for ${cityName}`);
            resolve(null);
        }, 5000); // 5 second timeout
        
        geocoder.geocode({ 
            address: searchQuery,
            region: 'ES' // Restrict to Spain for faster results
        }, (results, status) => {
            clearTimeout(timeout);
            
            if (status === 'OK' && results[0]) {
                const location = results[0].geometry.location;
                resolve({
                    lat: location.lat(),
                    lng: location.lng()
                });
            } else {
                console.log(`Geocoding failed for ${cityName}: ${status}`);
                resolve(null);
            }
        });
    });
}

// Initialize location search functionality
function initLocationSearchBox() {
    const input = document.getElementById('locationSearchInput');
    if (!input) return;
    
    searchBox = new google.maps.places.SearchBox(input);
    
    // Bias the SearchBox results towards current map's viewport
    map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds());
    });
    
    // Listen for the event fired when the user selects a prediction
    searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        
        if (places.length === 0) return;
        
        // For each place, get the icon, name and location
        const bounds = new google.maps.LatLngBounds();
        places.forEach(place => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }
            
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        
        map.fitBounds(bounds);
    });
}

// Load artists from Firestore
async function loadArtists() {
    try {
        console.log('Loading artists from database...');
        
        // Check if Firebase is ready
        if (typeof db === 'undefined' || !db) {
            throw new Error('Firebase not initialized');
        }
        
        if (typeof getAllArtists === 'function') {
            const snapshot = await getAllArtists();
            console.log('Snapshot received:', snapshot);
            artists = [];
            
            snapshot.forEach(doc => {
                const data = doc.data();
                console.log('Processing artist:', doc.id, data);
                console.log('Artist data:', {
                    name: data.name,
                    location: data.location,
                    city: data.city,
                    style: data.style,
                    styles: data.styles,
                    lat: data.lat,
                    lng: data.lng
                });
                
                // Check if artist has precise coordinates
                const hasPreciseLocation = data.lat && data.lng && 
                    typeof data.lat === 'number' && typeof data.lng === 'number' &&
                    data.lat !== 0 && data.lng !== 0;
                
                if (hasPreciseLocation) {
                    console.log('Artist has precise coordinates:', data.name, 'lat:', data.lat, 'lng:', data.lng);
                    artists.push({
                        id: doc.id,
                        ...data
                    });
                } else if (data.location || data.city) {
                    console.log('Artist has city data, will geocode:', data.name, 'location:', data.location || data.city);
                    // Add artist with city data - we'll geocode it later
                    artists.push({
                        id: doc.id,
                        ...data,
                        needsGeocoding: true,
                        cityToGeocode: data.location || data.city
                    });
                } else {
                    console.log('Artist has no location data, adding to Asturias:', data.name);
                    // Add random location in Asturias if no location at all
                    artists.push({
                        id: doc.id,
                        ...data,
                        lat: 43.3619 + (Math.random() - 0.5) * 0.2,
                        lng: -5.8493 + (Math.random() - 0.5) * 0.2,
                        hasRandomLocation: true
                    });
                }
            });
            
            console.log(`Loaded ${artists.length} artists total`);
            console.log('Artists array:', artists);
            
            filteredArtists = [...artists];
            
            // Hide loading message
            const loadingMessage = document.getElementById('loadingMessage');
            if (loadingMessage) {
                loadingMessage.style.display = 'none';
            }
            
            // Display artists immediately with current data
            displayArtistsOnMap();
            displayArtistsInList();
            
            // Geocode cities in background (non-blocking)
            const geocodingMessage = document.getElementById('geocodingMessage');
            if (geocodingMessage) {
                geocodingMessage.style.display = 'block';
            }
            
            geocodeArtistsCities().then(() => {
                console.log('Background geocoding completed, updating display...');
                if (geocodingMessage) {
                    geocodingMessage.style.display = 'none';
                }
                displayArtistsOnMap();
                displayArtistsInList();
            });
            
            // Show message if no artists found
            if (artists.length === 0) {
                showErrorMessage('No se encontraron tatuadores.');
            }
        } else {
            console.error('getAllArtists function not available');
            showErrorMessage('Error: Función de base de datos no disponible.');
        }
    } catch (error) {
        console.error('Error loading artists:', error);
        showErrorMessage('Error al cargar los tatuadores: ' + error.message);
    }
}

// Display artists on map
function displayArtistsOnMap() {
    console.log('Displaying artists on map...');
    console.log('Filtered artists:', filteredArtists);
    
        // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];
    
    // Create markers for each artist
    filteredArtists.forEach(async (artist) => {
        console.log('Creating marker for artist:', artist.name, 'lat:', artist.lat, 'lng:', artist.lng);
        
        if (artist.lat && artist.lng) {
            const iconUrl = await createCustomMarkerIcon();
            const marker = new google.maps.Marker({
                position: { lat: artist.lat, lng: artist.lng },
                map: map,
                title: artist.name,
                icon: {
                    url: iconUrl,
                    scaledSize: new google.maps.Size(40, 40),
                    anchor: new google.maps.Point(20, 20)
                }
            });
            
            // Create info window content
            const infoContent = createArtistInfoContent(artist);
            
            // Add click listener
            marker.addListener('click', () => {
                infoWindow.setContent(infoContent);
                infoWindow.open(map, marker);
                highlightArtistInList(artist.id);
            });
            
            // Add hover effects
            marker.addListener('mouseover', async () => {
                const hoverIconUrl = await createCustomMarkerIcon(true);
                marker.setIcon({
                    url: hoverIconUrl,
                    scaledSize: new google.maps.Size(45, 45),
                    anchor: new google.maps.Point(22.5, 22.5)
                });
            });
            
            marker.addListener('mouseout', async () => {
                const normalIconUrl = await createCustomMarkerIcon(false);
                marker.setIcon({
                    url: normalIconUrl,
                    scaledSize: new google.maps.Size(40, 40),
                    anchor: new google.maps.Point(20, 20)
                });
            });
            
            markers.push(marker);
            console.log('Marker created for:', artist.name);
        } else {
            console.log('Skipping artist without coordinates:', artist.name);
        }
    });
    
    console.log(`Displayed ${markers.length} artist markers on map`);
}

// Display artists in the left sidebar list
function displayArtistsInList() {
    console.log('Displaying artists in list...');
    console.log('Filtered artists for list:', filteredArtists);
    
    const artistsList = document.getElementById('artistsList');
    if (!artistsList) {
        console.error('Artists list element not found');
        return;
    }
    
    artistsList.innerHTML = '';
    
    filteredArtists.forEach(artist => {
        console.log('Creating list item for artist:', artist.name);
        const artistItem = createArtistListItem(artist);
        artistsList.appendChild(artistItem);
    });
    
    console.log(`Displayed ${filteredArtists.length} artists in list`);
}

// Create artist list item
function createArtistListItem(artist) {
    const div = document.createElement('div');
    div.className = 'artist-item';
    div.dataset.artistId = artist.id;
    
    const imageUrl = artist.image || artist.avatar || artist.profileImage || '../images/artist-avatar.png';
    
    div.innerHTML = `
        <div class="artist-item-header">
            <img src="${imageUrl}" 
                 class="artist-avatar" 
                 onerror="this.src='../images/artist-avatar.png'">
            <div class="artist-name">${artist.name}</div>
                    </div>
        <div class="artist-details">
            <div class="artist-detail-item">
                <strong>Estilo:</strong> ${getArtistStyles(artist)}
                </div>
            <div class="artist-detail-item">
                <strong>Valoración:</strong> ${artist.rating || 'N/A'} ⭐
                        </div>
            <div class="artist-detail-item">
                <strong>Ubicación:</strong> ${artist.location || artist.city || 'No especificada'}
            </div>
            ${artist.hasRandomLocation ? '<div class="location-indicator approximate">📍 Ubicación aproximada</div>' : ''}
        </div>
    `;
    
    // Add click listener
    div.addEventListener('click', () => {
        goToArtistOnMap(artist);
        highlightArtistInList(artist.id);
    });
    
    return div;
}

// Go to artist on map
function goToArtistOnMap(artist) {
    if (artist.lat && artist.lng) {
        const position = { lat: artist.lat, lng: artist.lng };
        
        // Center map on artist
        map.setCenter(position);
        map.setZoom(15);
        
        // Find and click the marker
        const marker = markers.find(m => 
            m.getPosition().lat() === artist.lat && 
            m.getPosition().lng() === artist.lng
        );
        
        if (marker) {
            const infoContent = createArtistInfoContent(artist);
            infoWindow.setContent(infoContent);
            infoWindow.open(map, marker);
        }
    }
}

// Highlight artist in list
function highlightArtistInList(artistId) {
    // Remove active class from all items
    document.querySelectorAll('.artist-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to selected item
    const artistItem = document.querySelector(`[data-artist-id="${artistId}"]`);
    if (artistItem) {
        artistItem.classList.add('active');
    }
    
    currentActiveArtist = artistId;
}

// Setup style filter select
function setupStyleFilter() {
    const styleSelect = document.getElementById('styleFilter');
    if (!styleSelect) return;
    
    // Load styles from database
    loadStylesFromDatabase();
    
    // Add event listener
    styleSelect.addEventListener('change', () => {
        const selectedStyle = styleSelect.value;
        filterArtistsByStyle(selectedStyle);
    });
}

// Load all unique styles from database
async function loadStylesFromDatabase() {
    try {
        // Get styles from the styles collection in database
        const stylesSnapshot = await getAllStyles();
        const allStyles = [];
        
        stylesSnapshot.forEach(doc => {
            const data = doc.data();
            allStyles.push({
                id: doc.id,
                name: data.name || doc.id
            });
        });
        
        // Get styles that have artists assigned
        const dbStyles = new Set();
        if (typeof getAllArtists === 'function') {
            const artistsSnapshot = await getAllArtists();
            artistsSnapshot.forEach(doc => {
                const data = doc.data();
                const artistStyles = getArtistStyles(data);
                if (artistStyles && artistStyles !== 'No especificado') {
                    dbStyles.add(artistStyles);
                }
            });
        }
        
        // Populate select with styles
        const styleSelect = document.getElementById('styleFilter');
        if (styleSelect) {
            // Clear existing options
            styleSelect.innerHTML = '<option value="all">Todos los estilos</option>';
            
        // Add all styles from database
        const sortedStyles = allStyles.sort((a, b) => a.name.localeCompare(b.name));
        console.log('Available styles from database:', sortedStyles.map(s => s.name));
        console.log('Styles with artists:', Array.from(dbStyles));
        
        sortedStyles.forEach(style => {
            const option = document.createElement('option');
            option.value = style.name;
            option.textContent = style.name;
            styleSelect.appendChild(option);
        });
        }
    } catch (error) {
        console.error('Error loading styles from database:', error);
    }
}

// Filter artists by style
function filterArtistsByStyle(style) {
    console.log(`Filtering artists by style: ${style}`);
    
    if (style === 'all') {
        filteredArtists = [...artists];
    } else {
        filteredArtists = artists.filter(artist => {
            const artistStyle = getArtistStyles(artist);
            console.log(`Artist: ${artist.name}, Style: ${artistStyle}, Filter: ${style}`);
            return artistStyle && artistStyle.toLowerCase() === style.toLowerCase();
        });
    }
    
    console.log(`Found ${filteredArtists.length} artists with style: ${style}`);
    
    // Display the filtered results directly
    displayArtistsOnMap();
    displayArtistsInList();
}

// Setup artist search
function setupArtistSearch() {
    const searchInput = document.getElementById('artistSearchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        if (searchTerm === '') {
            filteredArtists = [...artists];
        } else {
            filteredArtists = artists.filter(artist => 
                artist.name.toLowerCase().includes(searchTerm) ||
                artist.location.toLowerCase().includes(searchTerm) ||
                (artist.style && artist.style.toLowerCase().includes(searchTerm))
            );
        }
        
        applyAllFilters();
    });
}

// Setup rating filters
function setupRatingFilters() {
    const ratingCheckboxes = document.querySelectorAll('.rating-filter input[type="checkbox"]');
    
    ratingCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            applyAllFilters();
        });
    });
}

// Apply all filters
function applyAllFilters() {
    let filtered = [...filteredArtists]; // Use the already filtered artists from style filter
    
    // Style filter is already applied in filterArtistsByStyle, so we don't need to apply it again here
    
    // Apply search filter
    const searchInput = document.getElementById('artistSearchInput');
    if (searchInput && searchInput.value) {
        const searchTerm = searchInput.value.toLowerCase();
        filtered = filtered.filter(artist => 
            artist.name.toLowerCase().includes(searchTerm) ||
            artist.location.toLowerCase().includes(searchTerm) ||
            (artist.style && artist.style.toLowerCase().includes(searchTerm))
        );
    }
    
    // Apply rating filter
    const rating4Plus = document.getElementById('rating4plus');
    const rating3Plus = document.getElementById('rating3plus');
    
    if (rating4Plus && rating4Plus.checked) {
        filtered = filtered.filter(artist => artist.rating >= 4);
    } else if (rating3Plus && rating3Plus.checked) {
        filtered = filtered.filter(artist => artist.rating >= 3);
    }
    
    filteredArtists = filtered;
    displayArtistsOnMap();
    displayArtistsInList();
}

// Create info window content for artist
function createArtistInfoContent(artist) {
    const imageUrl = artist.image || artist.avatar || artist.profileImage || '../images/artist-avatar.png';
    
    return `
        <div style="padding: 10px; max-width: 300px;">
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
                <img src="${imageUrl}" 
                     style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px; object-fit: cover;"
                     onerror="this.src='../images/artist-avatar.png'">
                <div>
                    <h3 style="margin: 0; font-size: 16px; color: #333;">${artist.name}</h3>
                    <p style="margin: 0; font-size: 12px; color: #666;">${artist.location}</p>
                </div>
            </div>
            <div style="margin-bottom: 10px;">
                <p style="margin: 0; font-size: 14px; color: #333;">
                    <strong>Estilo:</strong> ${getArtistStyles(artist)}
                </p>
                <p style="margin: 0; font-size: 14px; color: #333;">
                    <strong>Valoración:</strong> ${artist.rating || 'N/A'} ⭐
                </p>
                ${artist.hasRandomLocation ? '<p style="margin: 0; font-size: 12px; color: #ffa500;">📍 Ubicación aproximada</p>' : ''}
            </div>
            <div style="text-align: center;">
                <button onclick="goToArtistProfile('${artist.id}')" 
                        style="background: #ec4899; color: white; border: none; padding: 8px 16px; border-radius: 5px; cursor: pointer; font-size: 12px;">
                    Ver Perfil
                </button>
            </div>
        </div>
    `;
}

// Navigate to artist profile
function goToArtistProfile(artistId) {
    console.log('Navigating to artist profile:', artistId);
    window.location.href = `artist-profile.html?id=${artistId}`;
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Map page loaded');
    
    // Check if Google Maps API is loaded
    if (typeof google === 'undefined') {
        console.error('Google Maps API not loaded');
        document.getElementById('map').innerHTML = 
            '<div style="display: flex; justify-content: center; align-items: center; height: 100%; background: #f0f0f0; color: #666;">' +
            '<p>Error: Google Maps API no está cargada. Verifica tu API key.</p>' +
            '</div>';
    }
});