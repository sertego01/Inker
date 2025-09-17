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

// Load featured artists (sample data)
document.addEventListener("DOMContentLoaded", () => {
    const artistsGrid = document.querySelector('.artists-grid');
    
    // Sample data - will be replaced with Firebase data
    const featuredArtists = [
        {
            name: "Alex Martinez",
            style: "Realistic & Portraits",
            image: "images/artist1.jpg",
            rating: 4.9
        },
        {
            name: "Carlos Vega",
            style: "Geometric & Mandalas",
            image: "images/artist2.jpg",
            rating: 4.8
        },
        {
            name: "Sarah Kim",
            style: "Watercolor & Abstract",
            image: "images/artist3.jpg",
            rating: 4.7
        },
        {
            name: "Mike Johnson",
            style: "Traditional & Neo-traditional",
            image: "images/artist4.jpg",
            rating: 4.9
        },
        {
            name: "Emma Wilson",
            style: "Japanese & Blackwork",
            image: "images/artist5.jpg",
            rating: 4.8
        },
        {
            name: "David Chen",
            style: "Minimalist & Tribal",
            image: "images/artist6.jpg",
            rating: 4.6
        }
    ];
    
    // Generate HTML for artists
    featuredArtists.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');
        
        // Generate rating stars
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(artist.rating)) {
                stars += '★';
            } else {
                stars += '☆';
            }
        }
        
        artistCard.innerHTML = `
            <img src="${artist.image}" alt="${artist.name}">
            <div class="artist-info">
                <h3 class="artist-name">${artist.name}</h3>
                <p class="artist-style">${artist.style}</p>
                <div class="artist-rating">
                    <span>${stars}</span>
                    <span>${artist.rating}</span>
                </div>
                <button class="view-profile-btn">View Profile</button>
            </div>
        `;
        
        artistsGrid.appendChild(artistCard);
    });
});

// Artist search (basic functionality)
const searchInput = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        // Redirect to search page (to be implemented)
        alert(`Searching for: ${searchTerm}`);
        // window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});



// Test code to verify Firebase connection
document.addEventListener('DOMContentLoaded', () => {
    console.log('Connecting to Firebase...');
    
    // Check authentication state
    checkAuthState((user) => {
        if (user) {
            console.log('User authenticated:', user.email);
        } else {
            console.log('User not authenticated');
        }
    });
    
    // Test Firestore connection
    db.collection('test').add({
        test: 'Connection successful',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => console.log('Firestore connection successful'))
    .catch(error => console.error('Error connecting to Firestore:', error));
});