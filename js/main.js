// Funcionalidad del menú hamburguesa
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Load featured artists from Firestore
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('featuredArtistsGrid');
    if (!grid) return;

    console.log('Loading featured artists...');
    grid.innerHTML = '';

    // Try to load top artists by rating
    if (typeof getTopArtistsByRating === 'function') {
        getTopArtistsByRating(8)
            .then(snapshot => {
                const artists = [];
                snapshot.forEach(doc => {
                    const data = doc.data() || {};
                    artists.push({ id: doc.id, ...data });
                });
                console.log('Top artists by rating found:', artists.length);

                // If not enough artists with rating, use getAllArtists
                if (artists.length < 4 && typeof getAllArtists === 'function') {
                    console.log(`Only ${artists.length} top artists by rating found, trying getAllArtists...`);
                    return getAllArtists(12).then(s2 => {
                        const fallback = [];
                        s2.forEach(d => fallback.push({ id: d.id, ...d.data() }));
                        console.log('All artists found:', fallback.length);
                        
                        // Merge artists, prioritizing those with likes
                        const artistMap = new Map();
                        artists.forEach(a => artistMap.set(a.id, a));
                        fallback.forEach(a => {
                            if (!artistMap.has(a.id)) artistMap.set(a.id, a);
                        });
                        return Array.from(artistMap.values());
                    });
                }
                return artists;
            })
            .then(artists => {
                console.log('Final artists array:', artists);
                console.log('Number of artists:', artists.length);
                if (!Array.isArray(artists) || artists.length === 0) {
                    console.log('No artists to display');
                    grid.innerHTML = '<p>No hay artistas disponibles en este momento.</p>';
                    return;
                }
                const topFour = artists.slice(0, 4);
                console.log('Displaying artists:', topFour);
                console.log('Number of artists to display:', topFour.length);
                grid.innerHTML = topFour.map(a => createFeaturedArtistCard(a)).join('');
            })
            .catch(err => {
                console.error('Error loading featured artists:', err);
                grid.innerHTML = '<p>Error al cargar los artistas destacados.</p>';
            });
    } else {
        console.log('getTopArtistsByRating function not available');
        grid.innerHTML = '<p>Función no disponible.</p>';
    }
});

function createFeaturedArtistCard(artist) {
    const name = artist.name || artist.displayName || 'Artist';
    const primaryStyle = Array.isArray(artist.styles) && artist.styles.length ? artist.styles[0] : (artist.primaryStyle || 'Tattoo');
    const imgSrc = pickArtistImage(artist) || 'images/invisible.png';
    return `
        <div class="artist-card" onclick="goToArtistProfile('${artist.id}')">
            <div class="artist-image">
                <img src="${imgSrc}" alt="${name}">
            </div>
            <div class="artist-info">
                <h3 class="artist-name">${name}</h3>
                <p class="artist-style">${primaryStyle}</p>
            </div>
        </div>
    `;
}

function pickArtistImage(artist) {
    if (!artist || typeof artist !== 'object') return null;
    const candidates = [
        artist.imageData,          // Data URL base64
        artist.image,              // usado en find-artists
        artist.avatar,
        artist.avatarUrl,
        artist.profileImage,
        artist.photoURL,
        Array.isArray(artist.portfolio) && artist.portfolio.length > 0 ? artist.portfolio[0] : null
    ].filter(Boolean);

    for (const url of candidates) {
        const normalized = normalizeImageUrl(url);
        if (normalized) return normalized;
    }
    return null;
}

function normalizeImageUrl(url) {
    if (!url || typeof url !== 'string') return null;
    // Corrige rutas relativas sembradas con "../images" para el contexto de index.html
    if (url.startsWith('../images/')) return url.replace('../', ''); // -> images/...
    return url;
}

function goToArtistProfile(artistId) {
    console.log('Navigating to artist profile:', artistId);
    if (!artistId) {
        console.error('No artist ID provided');
        return;
    }
    window.location.href = `pages/artist-profile.html?id=${artistId}`;
}

// Artist search (basic functionality)
const searchInput = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // Redirect to search page (to be implemented)
        // window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});



// Test code to verify Firebase connection - Only run on index.html
document.addEventListener('DOMContentLoaded', () => {
    // Only run Firebase test on index.html to avoid conflicts
    if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        console.log('Connecting to Firebase...');
        
        // Wait for Firebase to be initialized before testing
        const testFirebaseConnection = () => {
            if (typeof db !== 'undefined' && db) {
                // Check authentication state
                if (typeof checkAuthState === 'function') {
                    checkAuthState((user) => {
                        if (user) {
                            console.log('User authenticated:', user.email);
                        } else {
                            console.log('User not authenticated');
                        }
                    });
                } else {
                    console.log('checkAuthState function not available');
                }
                
                // Test Firestore connection
                db.collection('test').add({
                    test: 'Connection successful',
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(() => console.log('Firestore connection successful'))
                .catch(error => console.error('Error connecting to Firestore:', error));
            } else {
                // Retry after a short delay
                setTimeout(testFirebaseConnection, 100);
            }
        };
        
        testFirebaseConnection();
    }
});