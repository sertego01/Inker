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
    // Add click event listeners to view profile buttons
    document.querySelectorAll('.view-profile-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const artistIds = ['sarah-chen', 'marcus-rodriguez', 'elena-volkov'];
            const artistId = artistIds[index] || 'sarah-chen';
            window.location.href = `pages/artist-profile.html?id=${artistId}`;
        });
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