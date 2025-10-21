// Find Artists Page JavaScript

// Style translation mapping
function getStyleTranslation(style) {
    // Get current language
    const currentLang = localStorage.getItem('language') || 'en';
    
    // Direct translation mapping
    const translations = {
        en: {
            'Watercolor': 'Watercolor',
            'Traditional': 'Traditional',
            'Realistic': 'Realistic',
            'Geometric': 'Geometric',
            'Japanese': 'Japanese',
            'Minimalist': 'Minimalist',
            'Neo-traditional': 'Neo-Traditional',
            'Blackwork': 'Blackwork',
            'Dotwork': 'Dotwork',
            'Biomechanical': 'Biomechanical',
            'Tribal': 'Tribal',
            'Henna': 'Henna',
            'Portraits': 'Realistic',
            'American': 'Traditional',
            'Cultural': 'Tribal',
            'Temporary': 'Henna',
            'Sci-fi': 'Biomechanical',
            'Mandalas': 'Geometric',
            'Sacred': 'Geometric',
            'Puntillismo': 'Dotwork'
        },
        es: {
            'Watercolor': 'Acuarela',
            'Traditional': 'Tradicional',
            'Realistic': 'Realista',
            'Geometric': 'Geométrico',
            'Japanese': 'Japonés',
            'Minimalist': 'Minimalista',
            'Neo-traditional': 'Neo-Tradicional',
            'Blackwork': 'Blackwork',
            'Dotwork': 'Dotwork',
            'Biomechanical': 'Biomecánico',
            'Tribal': 'Tribal',
            'Henna': 'Henna',
            'Portraits': 'Realista',
            'American': 'Tradicional',
            'Cultural': 'Tribal',
            'Temporary': 'Henna',
            'Sci-fi': 'Biomecánico',
            'Mandalas': 'Geométrico',
            'Sacred': 'Geométrico',
            'Puntillismo': 'Dotwork'
        }
    };
    
    // Return translated style or original if not found
    return translations[currentLang] && translations[currentLang][style] 
        ? translations[currentLang][style] 
        : style;
}

// Datos desde DB
let allArtists = [];
let filteredArtists = [];

// Cargar artistas desde Firestore
async function loadArtistsFromDB(limit = 100) {
    try {
        const snapshot = await getAllArtists(limit);
        allArtists = snapshot.docs.map(doc => {
            const d = doc.data();
            const locationText = d.location || [d.city, d.region || d.country].filter(Boolean).join(', ');
            return {
                id: d.id || doc.id,
                name: d.name || '',
                style: d.style || (Array.isArray(d.styles) && d.styles.length ? d.styles.join(' & ') : ''),
                location: locationText || '',
                country: d.country || '',
                region: d.region || '',
                city: d.city || '',
                rating: d.rating || 0,
                reviewCount: d.reviewCount || d.reviews || 0,
                image: d.image || d.avatar || '../images/artist-avatar.png',
                styles: Array.isArray(d.styles) ? d.styles : (d.style ? [d.style] : []),
            bio: d.bio || '',
            isAvailable: d.isAvailable === true
            };
        });
        filteredArtists = [...allArtists];
        
        // Actualizar la interfaz después de cargar los datos
        loadArtists();
        
        console.log('Artists loaded from DB:', allArtists.length);
    } catch (error) {
        console.error('Error loading artists from DB:', error);
        allArtists = [];
        filteredArtists = [];
        loadArtists();
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', async () => {
    // Set default sort to name
    const sortBySelect = document.getElementById('sortBy');
    if (sortBySelect) {
        sortBySelect.value = 'name';
    }
    
    setupEventListeners();
    
    // Cargar artistas desde DB y aplicar filtros iniciales
    try {
        await loadArtistsFromDB();
        
        // Check if there's a style or search parameter in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const styleParam = urlParams.get('style');
        const searchParam = urlParams.get('search');
        const seedParam = urlParams.get('seed');
        
        // Sembrar datos de ejemplo si se solicita explícitamente con ?seed=1
        if (seedParam === '1') {
            await seedArtistsToDB();
            await loadArtistsFromDB();
        }
        
        if (styleParam) {
            applyStyleFilterFromURL(styleParam);
        } else if (searchParam) {
            setTimeout(() => {
                applySearchFromURL(searchParam);
            }, 200);
        } else {
            sortArtists();
        }
    } catch (_) {
        // En caso de error cargando desde DB, dejar listas vacías visibles
        filteredArtists = [];
        loadArtists();
    }
    
});

// Si no hay datos en Firestore, puedes poblarlos accediendo a find-artists.html?seed=1
async function seedArtistsToDB() {
    const sample = [
        { id: 'carmen-garcia', name: 'Carmen García', country: 'España', region: 'Asturias', city: 'Oviedo', location: 'Oviedo, Asturias', rating: 4.7, reviewCount: 1245, image: '../images/artist1.jpg', styles: ['Watercolor', 'Realistic', 'Portraits'], bio: 'Especializada en tatuajes de acuarela y realistas con más de 8 años de experiencia.' },
        { id: 'marcos-rodriguez', name: 'Marcos Rodríguez', country: 'España', region: 'Asturias', city: 'Gijón', location: 'Gijón, Asturias', rating: 3.5, reviewCount: 987, image: '../images/artist2.jpg', styles: ['Traditional', 'Neo-traditional', 'American'], bio: 'Experto en estilos tradicionales y neo-tradicionales con diseños audaces y vibrantes.' },
        { id: 'elena-martinez', name: 'Elena Martínez', country: 'España', region: 'Asturias', city: 'Avilés', location: 'Avilés, Asturias', rating: 4.8, reviewCount: 1456, image: '../images/artist3.jpg', styles: ['Blackwork', 'Geometric', 'Minimalist'], bio: 'Maestra del blackwork y diseños geométricos con patrones intrincados.' },
        { id: 'alejandro-rivera', name: 'Alejandro Rivera', country: 'España', region: 'Asturias', city: 'Mieres', location: 'Mieres, Asturias', rating: 4.1, reviewCount: 892, image: '../images/artist4.jpg', styles: ['Traditional', 'Realistic', 'Portraits'], bio: 'Artista versátil especializado en estilos tradicionales y realistas.' },
        { id: 'maria-lopez', name: 'María López', country: 'España', region: 'Asturias', city: 'Langreo', location: 'Langreo, Asturias', rating: 3.5, reviewCount: 756, image: '../images/artist5.jpg', styles: ['Japanese', 'Watercolor', 'Traditional'], bio: 'Experta en técnicas tradicionales japonesas y de acuarela.' },
        { id: 'javier-thompson', name: 'Javier Thompson', country: 'España', region: 'Asturias', city: 'Siero', location: 'Siero, Asturias', rating: 3.8, reviewCount: 634, image: '../images/artist6.jpg', styles: ['Blackwork', 'Tribal', 'Geometric'], bio: 'Especializado en diseños de blackwork y tribales con estética audaz.' },
        { id: 'luna-rodriguez', name: 'Luna Rodríguez', country: 'España', region: 'Asturias', city: 'Oviedo', location: 'Oviedo, Asturias', rating: 3.5, reviewCount: 523, image: '../images/artist7.jpg', styles: ['Puntillismo', 'Dotwork', 'Geometric'], bio: 'Maestra de técnicas de dotwork y puntillismo creando diseños intrincados.' },
        { id: 'patricia-patel', name: 'Patricia Patel', country: 'España', region: 'Asturias', city: 'Gijón', location: 'Gijón, Asturias', rating: 4.1, reviewCount: 445, image: '../images/artist8.jpg', styles: ['Henna', 'Cultural', 'Temporary'], bio: 'Especializada en diseños inspirados en henna y arte cultural.' },
        { id: 'david-garcia', name: 'David García', country: 'España', region: 'Asturias', city: 'Avilés', location: 'Avilés, Asturias', rating: 3.2, reviewCount: 378, image: '../images/artist9.jpg', styles: ['Minimalist', 'Tribal', 'Geometric'], bio: 'Experto en diseños minimalistas y tribales con estética limpia.' },
        { id: 'sofia-martinez', name: 'Sofía Martínez', country: 'España', region: 'Asturias', city: 'Mieres', location: 'Mieres, Asturias', rating: 4.6, reviewCount: 1123, image: '../images/artist10.jpg', styles: ['Biomechanical', 'Realistic', 'Sci-fi'], bio: 'Especializada en diseños biomecánicos y realistas de ciencia ficción.' }
    ];
    
    try {
        const writes = sample.map(artist => {
            const { id, ...data } = artist;
            return saveArtistData(id, data);
        });
        await Promise.all(writes);
        console.log('Artists seeded successfully');
    } catch (error) {
        console.error('Error seeding artists:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('artistSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(searchArtists, 300));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchArtists();
            }
        });
    }
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
    
    if (!artistsGrid) return; // Evitar error si no existe el contenedor
    
    artistsGrid.innerHTML = '';
    
    if (filteredArtists.length === 0) {
        artistsGrid.innerHTML = '<div class="no-results">No se encontraron artistas que coincidan con tus criterios.</div>';
        if (artistsCount) artistsCount.textContent = 'Se encontraron 0 artistas';
        return;
    }
    
    filteredArtists.forEach(artist => {
        const artistCard = createArtistCard(artist);
        artistsGrid.appendChild(artistCard);
    });
    
    if (artistsCount) artistsCount.textContent = `Se encontraron ${filteredArtists.length} artistas`;
    
    // Update style translations after cards are created
    updateStyleTranslations();
    
    // Update location filter options
    updateLocationFilters();
}

// Update style translations for all artist cards
function updateStyleTranslations() {
    const styleElements = document.querySelectorAll('.artist-style[data-style]');
    styleElements.forEach(element => {
        const originalStyle = element.getAttribute('data-style');
        const translatedStyle = getStyleTranslation(originalStyle);
        element.textContent = translatedStyle;
    });
    
    // Update location translations
    const locationElements = document.querySelectorAll('.artist-location span');
    locationElements.forEach(element => {
        const originalLocation = element.textContent;
        const translatedLocation = getLocationTranslation(originalLocation);
        element.textContent = translatedLocation;
    });
    
    // Update country filter options
    updateCountryFilter();
}

// Get country translation
function getCountryTranslation(country) {
    // i18n system removed
    
    const countryTranslations = {
        'España': 'countries.spain',
        'Spain': 'countries.spain',
        'United Kingdom': 'countries.united-kingdom',
        'France': 'countries.france',
        'Germany': 'countries.germany'
    };
    
    const translationKey = countryTranslations[country];
    if (translationKey) {
        return translationKey; // i18n system removed
    }
    
    return country; // Fallback to original name if no translation found
}

// Get location translation (city, country)
function getLocationTranslation(location) {
    // i18n system removed
    
    // Split location into city and country parts
    const parts = location.split(', ');
    if (parts.length === 2) {
        const city = parts[0];
        const country = parts[1];
        const translatedCountry = getCountryTranslation(country);
        return `${city}, ${translatedCountry}`;
    }
    
    return location; // Fallback to original location if format is unexpected
}

// Get tattoo image based on artist's style
function getTattooImageForStyle(style) {
    const styleToImage = {
        'Traditional': '../images/traditional.jpg',
        'Realistic': '../images/realistic.jpg',
        'Japanese': '../images/japanese.jpg',
        'Blackwork': '../images/blackwork.jpg',
        'Watercolor': '../images/watercolor.jpg',
        'Geometric': '../images/geometric.jpg',
        'Tribal': '../images/tribal.jpg',
        'Neo-traditional': '../images/neotraditional.jpg',
        'Minimalist': '../images/minimalist.jpg',
        'Biomechanical': '../images/biomechanical.jpg',
        'Puntillismo': '../images/dotwork.jpg',
        'Henna': '../images/henna.jpg'
    };
    
    return styleToImage[style] || '../images/traditional.jpg'; // Default fallback
}

// Update hierarchical location filters
function updateLocationFilters() {
    updateCountryFilter();
    updateRegionFilter();
    updateCityFilter();
}

// Update country filter options
function updateCountryFilter() {
    const countryFilter = document.getElementById('countryFilter');
    if (!countryFilter) return;
    
    const uniqueCountries = [...new Set(allArtists.map(artist => artist.country))];
    uniqueCountries.sort();
    
    countryFilter.innerHTML = '<option value="">Todos los países</option>';
    uniqueCountries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = getCountryTranslation(country);
        countryFilter.appendChild(option);
    });
    
    // Translation system removed
}

// Update region filter options based on selected country
function updateRegionFilter() {
    const countryFilter = document.getElementById('countryFilter');
    const regionFilter = document.getElementById('regionFilter');
    if (!regionFilter || !countryFilter) return;
    
    const selectedCountry = countryFilter.value;
    let regions = [];
    
    if (selectedCountry) {
        regions = [...new Set(allArtists
            .filter(artist => artist.country === selectedCountry)
            .map(artist => artist.region))];
    } else {
        regions = [...new Set(allArtists.map(artist => artist.region))];
    }
    
    regions.sort();
    
    regionFilter.innerHTML = '<option value="">Todas las regiones</option>';
    regions.forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionFilter.appendChild(option);
    });
    
    // Translation system removed
    
    // Clear city filter when region changes
    updateCityFilter();
}

// Update city filter options based on selected country and region
function updateCityFilter() {
    const countryFilter = document.getElementById('countryFilter');
    const regionFilter = document.getElementById('regionFilter');
    const cityFilter = document.getElementById('cityFilter');
    if (!cityFilter || !countryFilter || !regionFilter) return;
    
    const selectedCountry = countryFilter.value;
    const selectedRegion = regionFilter.value;
    let cities = [];
    
    if (selectedCountry && selectedRegion) {
        cities = [...new Set(allArtists
            .filter(artist => artist.country === selectedCountry && artist.region === selectedRegion)
            .map(artist => artist.city))];
    } else if (selectedCountry) {
        cities = [...new Set(allArtists
            .filter(artist => artist.country === selectedCountry)
            .map(artist => artist.city))];
    } else if (selectedRegion) {
        cities = [...new Set(allArtists
            .filter(artist => artist.region === selectedRegion)
            .map(artist => artist.city))];
    } else {
        cities = [...new Set(allArtists.map(artist => artist.city))];
    }
    
    cities.sort();
    
    cityFilter.innerHTML = '<option value="">Todas las ciudades</option>';
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        cityFilter.appendChild(option);
    });
    
    // Translation system removed
}

// Filter functions for hierarchical location filters
function filterByCountry() {
    const countryFilter = document.getElementById('countryFilter');
    const regionFilter = document.getElementById('regionFilter');
    const cityFilter = document.getElementById('cityFilter');
    
    // Clear dependent filters
    regionFilter.value = '';
    cityFilter.value = '';
    
    // Update region and city options
    updateRegionFilter();
    
    // Apply filters
    applyLocationFilters();
}

function filterByRegion() {
    const cityFilter = document.getElementById('cityFilter');
    
    // Clear dependent filter
    cityFilter.value = '';
    
    // Update city options
    updateCityFilter();
    
    // Apply filters
    applyLocationFilters();
}

function filterByCity() {
    // Apply filters
    applyLocationFilters();
}

// Apply all location filters
function applyLocationFilters() {
    const countryFilter = document.getElementById('countryFilter');
    const regionFilter = document.getElementById('regionFilter');
    const cityFilter = document.getElementById('cityFilter');
    
    const selectedCountry = countryFilter ? countryFilter.value : '';
    const selectedRegion = regionFilter ? regionFilter.value : '';
    const selectedCity = cityFilter ? cityFilter.value : '';
    
    filteredArtists = allArtists.filter(artist => {
        const matchesCountry = !selectedCountry || artist.country === selectedCountry;
        const matchesRegion = !selectedRegion || artist.region === selectedRegion;
        const matchesCity = !selectedCity || artist.city === selectedCity;
        
        return matchesCountry && matchesRegion && matchesCity;
    });
    
    // Apply current sorting after filtering
    sortArtists();
}

// Add new artist and update filters automatically
function addNewArtist(artist) {
    // Add to allArtists array
    allArtists.push(artist);
    
    // Update filtered artists
    filteredArtists = [...allArtists];
    
    // Reload artists display
    loadArtists();
    
    // Update location filters with new location
    updateLocationFilters();
    
    console.log('New artist added:', artist.name, 'from', artist.location);
}

// Create artist card HTML
function createArtistCard(artist) {
    const card = document.createElement('div');
    card.classList.add('artist-card');
    
    // Get tattoo image based on artist's primary style
    const tattooImage = getTattooImageForStyle(artist.styles[0]);
    
    card.innerHTML = `
        <div class="artist-image" style="background-image: url('${tattooImage}');">
            <div class="artist-avatar-circle">
                <img src="${artist.image}" alt="${artist.name}">
            </div>
        </div>
        <div class="artist-info">
            <h3 class="artist-name">${artist.name}</h3>
            <p class="artist-style" data-style="${artist.styles[0]}">${getStyleTranslation(artist.styles[0])}</p>
            <div class="artist-details">
                <div class="artist-location">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin h-4 w-4 mr-1"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>${getLocationTranslation(artist.location)}</span>
                </div>
                <div class="artist-rating">
                    <span class="star-icon">⭐</span>
                    <span>${artist.rating}</span>
                </div>
            </div>
        </div>
    `;
    
    // Add click event to view profile
    card.addEventListener('click', () => {
        // Only add pages/ if we're not already in the pages folder
        const isInPagesFolder = window.location.pathname.includes('/pages/');
        const basePath = isInPagesFolder ? '' : 'pages/';
        try {
            sessionStorage.setItem('selectedArtist', JSON.stringify(artist));
        } catch (_) {}
        window.location.href = `${basePath}artist-profile.html?id=${artist.id}`;
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
        
        // Use the same logic as filterByStyle - check primary style only
        const matchesStyle = !styleFilter || artist.styles[0] === styleFilter;
        const matchesLocation = !locationFilter || artist.location.includes(locationFilter);
        
        return matchesSearch && matchesStyle && matchesLocation;
    });
    
    // Apply current sorting after filtering
    sortArtists();
}

// Toggle filters dropdown
function toggleFilters() {
    const filterDropdown = document.getElementById('filterDropdown');
    const filtersBtn = document.querySelector('.filters-btn');
    
    // Only execute if both elements exist (i.e., we're on the find-artists page)
    if (filterDropdown && filtersBtn) {
        if (filterDropdown.classList.contains('show')) {
            filterDropdown.classList.remove('show');
            filtersBtn.classList.remove('active');
        } else {
            filterDropdown.classList.add('show');
            filtersBtn.classList.add('active');
        }
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const filterDropdown = document.getElementById('filterDropdown');
    const filtersBtn = document.querySelector('.filters-btn');
    
    // Only execute if both elements exist (i.e., we're on the find-artists page)
    if (filterDropdown && filtersBtn) {
        if (!filtersBtn.contains(event.target) && !filterDropdown.contains(event.target)) {
            filterDropdown.classList.remove('show');
            filtersBtn.classList.remove('active');
        }
    }
});

// Filter by style
function filterByStyle() {
    const styleFilter = document.getElementById('styleFilter');
    const selectedStyle = styleFilter ? styleFilter.value : '';
    
    
    if (selectedStyle) {
        // Filter artists based on their primary style (first in the array)
        filteredArtists = allArtists.filter(artist => {
            const primaryStyle = artist.styles[0];
            const match = primaryStyle === selectedStyle;
            console.log(`Artist: ${artist.name}, Primary style: "${primaryStyle}", Selected: "${selectedStyle}", Match: ${match}`);
            return match;
        });
    } else {
        // Show all artists if no style selected
        filteredArtists = [...allArtists];
        console.log('No style selected, showing all artists');
    }
    
    console.log('Filtered artists count:', filteredArtists.length);
    console.log('Filtered artists:', filteredArtists.map(a => a.name));
    loadArtists();
}

// Filter by location
function filterByLocation() {
    searchArtists();
}

// Clear all filters
function clearFilters() {
    document.getElementById('styleFilter').value = '';
    document.getElementById('countryFilter').value = '';
    document.getElementById('regionFilter').value = '';
    document.getElementById('cityFilter').value = '';
    document.getElementById('artistSearch').value = '';
    
    // Reset filtered artists to all artists
    filteredArtists = [...allArtists];
    
    // Update location filters
    updateLocationFilters();
    
    // Apply current sorting after clearing filters
    sortArtists();
}

// Sort artists
function sortArtists() {
    const sortBy = document.getElementById('sortBy').value;
    
    
    filteredArtists.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'rating':
                // Sort by rating first, then by review count as tiebreaker
                if (b.rating !== a.rating) {
                    return b.rating - a.rating;
                }
                return b.reviewCount - a.reviewCount;
            case 'location':
                return a.location.localeCompare(b.location);
            default:
                // Default to name sorting
                return a.name.localeCompare(b.name);
        }
    });
    
    loadArtists();
}

// Apply style filter from URL parameter
function applyStyleFilterFromURL(styleId) {
    
    // Check if styleId is valid
    if (!styleId || styleId === 'undefined') {
        console.log('Invalid styleId, showing all artists');
        filteredArtists = [...allArtists];
        loadArtists();
        return;
    }
    
    // Map style IDs to style names (must match exactly with select options)
    const styleMap = {
        'traditional': 'Traditional',
        'realistic': 'Realistic',
        'japanese': 'Japanese',
        'blackwork': 'Blackwork',
        'watercolor': 'Watercolor',
        'geometric': 'Geometric',
        'tribal': 'Tribal',
        'neotraditional': 'Neo-traditional',
        'minimalist': 'Minimalist',
        'biomechanical': 'Biomechanical',
        'puntillismo': 'Puntillismo',
        'dotwork': 'Puntillismo',
        'henna': 'Henna'
    };
    
    const styleName = styleMap[styleId] || styleId;
    // Update the style filter select
    const styleFilter = document.getElementById('styleFilter');
    if (styleFilter) {
        styleFilter.value = styleName;
    }
    
    // Filter artists based on their primary style (first in the array)
    filteredArtists = allArtists.filter(artist => {
        const primaryStyle = artist.styles[0];
        const match = primaryStyle === styleName;
        return match;
    });
    
    // Reload the artists with the filter applied
    loadArtists();
}

// Apply search from URL parameter
function applySearchFromURL(searchTerm) {
    if (!searchTerm) {
        filteredArtists = [...allArtists];
        loadArtists();
        return;
    }
    
    if (!allArtists || allArtists.length === 0) {
        setTimeout(() => {
            applySearchFromURL(searchTerm);
        }, 100);
        return;
    }
    
    // Set the search input value
    const searchInput = document.getElementById('artistSearch');
    if (searchInput) {
        searchInput.value = searchTerm;
    }
    
    // Apply the search filter
    filteredArtists = allArtists.filter(artist => {
        const matchesSearch = 
            artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            artist.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            artist.style.toLowerCase().includes(searchTerm.toLowerCase()) ||
            artist.styles.some(style => style.toLowerCase().includes(searchTerm.toLowerCase()));
        
        return matchesSearch;
    });
    
    // Reload the artists with the search applied
    loadArtists();
}

// Logout function
function logout() {
    // Add logout logic here
    alert('Logout functionality will be implemented');
}

// Make functions globally available
window.addNewArtist = addNewArtist;
window.updateLocationFilters = updateLocationFilters;
window.filterByCountry = filterByCountry;
window.filterByRegion = filterByRegion;
window.filterByCity = filterByCity;

// Listen for language changes and update style translations
document.addEventListener('DOMContentLoaded', function() {
    // Update translations when language changes
    const languageSelect = document.getElementById('language');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            setTimeout(() => {
                updateStyleTranslations();
            }, 100); // Small delay to ensure system is updated
        });
    }
    
    // Also listen for custom language change events
    window.addEventListener('languageChanged', function() {
        setTimeout(() => {
            updateStyleTranslations();
            // Actualizar traducciones de filtros
            if (window.i18n && window.i18n.updateFilterElements) {
                window.i18n.updateFilterElements();
            }
        }, 100);
    });
    
    // Force update translations after a short delay to ensure everything is loaded
    setTimeout(() => {
        updateStyleTranslations();
        updateLocationFilters();
    }, 500);
});
