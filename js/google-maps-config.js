// Google Maps Configuration
// Reemplaza 'TU_API_KEY' con tu API key de Google Maps

const GOOGLE_MAPS_CONFIG = {
    // Tu API key de Google Maps
    API_KEY: 'AIzaSyCSRNa474aLCqhgojwJzcF6Dk4kSmtsDVg',
    
    // Configuración del mapa
    DEFAULT_LOCATION: {
        lat: 40.4168,  // Madrid, Spain
        lng: -3.7038
    },
    
    DEFAULT_ZOOM: 12,
    
    // Estilos del mapa
    MAP_STYLES: [
        {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
        }
    ],
    
    // Iconos de marcadores
    MARKER_ICONS: {
        artist: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        search: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
    }
};

// Función para obtener la API key
function getGoogleMapsApiKey() {
    return GOOGLE_MAPS_CONFIG.API_KEY;
}

// Función para verificar si la API key está configurada
function isApiKeyConfigured() {
    return GOOGLE_MAPS_CONFIG.API_KEY !== 'TU_API_KEY' && GOOGLE_MAPS_CONFIG.API_KEY.length > 0;
}
