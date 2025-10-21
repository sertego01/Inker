// dashboard-user.js
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    requireAuth().then((user) => {
        loadUserData(user.uid);
        setupNavigation();
        setupEventListeners();
    }).catch(error => {
        console.error("Authentication error:", error);
    });
});

function loadUserData(userId) {
    getUserData(userId).then((userDoc) => {
        if (userDoc.exists) {
            const userData = userDoc.data();
            displayUserProfile(userData);
            
            // Load specific data according to sections
            loadUserProfile(userData);
            loadUserAppointments(userId);
            loadRecommendations(userData);
        } else {
            console.error("No user data found");
        }
    }).catch(error => {
        console.error("Error loading user data:", error);
    });
}

function displayUserProfile(userData) {
    // Update information in sidebar
    document.getElementById('userName').textContent = userData.name || 'Usuario';
    document.getElementById('userEmail').textContent = userData.email || '';
    
    // Fill profile form
    document.getElementById('profileName').value = userData.name || '';
    document.getElementById('profileEmail').value = userData.email || '';
    document.getElementById('profileStyles').value = userData.preferredStyles ? userData.preferredStyles.join(', ') : '';
    document.getElementById('profileLocation').value = userData.location || '';
}

function loadUserAppointments(userId) {
    getUserAppointments(userId).then((querySnapshot) => {
        const appointmentsList = document.querySelector('#appointments .appointments-list');
        
        if (querySnapshot.empty) {
            appointmentsList.innerHTML = '<p class="empty-state">You have no scheduled appointments.</p>';
            return;
        }
        
        let appointmentsHTML = '';
        querySnapshot.forEach((doc) => {
            const appointment = doc.data();
            appointmentsHTML += `
                <div class="appointment-card">
                    <div class="appointment-info">
                        <h3>Appointment with ${appointment.artistName}</h3>
                        <p>Date: ${new Date(appointment.date.seconds * 1000).toLocaleDateString()}</p>
                        <p>Time: ${appointment.time}</p>
                        <p>Status: ${appointment.status}</p>
                    </div>
                    <div class="appointment-actions">
                        <button class="btn-secondary">View details</button>
                        <button class="btn-danger">Cancel</button>
                    </div>
                </div>
            `;
        });
        
        appointmentsList.innerHTML = appointmentsHTML;
    }).catch(error => {
        console.error("Error loading appointments:", error);
        document.querySelector('#appointments .appointments-list').innerHTML = 
            '<p class="empty-state">Error loading appointments.</p>';
    });
}

function loadRecommendations(userData) {
    // Get recommendations based on preferred styles
    const preferredStyles = userData.preferredStyles || [];
    
    if (preferredStyles.length === 0) {
        document.querySelector('#recommendations .recommendations-list').innerHTML = 
            '<p class="empty-state">Add styles you\'re interested in to get recommendations.</p>';
        return;
    }
    
    // Show sample recommendations for now
    setTimeout(() => {
        const recommendationsList = document.querySelector('#recommendations .recommendations-list');
        recommendationsList.innerHTML = `
            <div class="artist-card">
                <img src="../images/artist1.jpg" alt="Alex Rivera">
                <div class="artist-card-content">
                    <h3>Alex Rivera</h3>
                    <p>Traditional, Realistic</p>
                    <p>Ink Studio</p>
                    <div class="artist-card-actions">
                        <span class="stars">★★★★★</span>
                        <button class="btn-primary" onclick="viewArtistProfile('alex-rivera')">View profile</button>
                    </div>
                </div>
            </div>
            <div class="artist-card">
                <img src="../images/artist2.jpg" alt="Maya Chen">
                <div class="artist-card-content">
                    <h3>Maya Chen</h3>
                    <p>Watercolor, Geometric</p>
                    <p>Creative Tattoo Co.</p>
                    <div class="artist-card-actions">
                        <span class="stars">★★★★☆</span>
                        <button class="btn-primary" onclick="viewArtistProfile('maya-chen')">View profile</button>
                    </div>
                </div>
            </div>
            <div class="artist-card">
                <img src="../images/artist3.jpg" alt="Jake Thompson">
                <div class="artist-card-content">
                    <h3>Jake Thompson</h3>
                    <p>Japanese, Blackwork</p>
                    <p>Dragon Ink</p>
                    <div class="artist-card-actions">
                        <span class="stars">★★★★★</span>
                        <button class="btn-primary" onclick="viewArtistProfile('jake-thompson')">View profile</button>
                    </div>
                </div>
            </div>
        `;
    }, 1000);
}

// Load favorites
function loadFavorites(userId) {
    setTimeout(() => {
        const favoritesList = document.querySelector('#favorites .favorites-list');
        favoritesList.innerHTML = `
            <div class="favorite-item">
                <img src="../images/artist1.jpg" alt="Alex Rivera">
                <div class="favorite-info">
                    <h3>Alex Rivera</h3>
                    <p>Traditional, Realistic</p>
                    <p>Ink Studio</p>
                    <div class="favorite-actions">
                        <span class="stars">★★★★★</span>
                        <button class="btn-primary" onclick="viewArtistProfile('alex-rivera')">View profile</button>
                        <button class="btn-secondary" onclick="removeFavorite('alex-rivera')">Remove</button>
                    </div>
                </div>
            </div>
            <div class="favorite-item">
                <img src="../images/artist2.jpg" alt="Maya Chen">
                <div class="favorite-info">
                    <h3>Maya Chen</h3>
                    <p>Watercolor, Geometric</p>
                    <p>Creative Tattoo Co.</p>
                    <div class="favorite-actions">
                        <span class="stars">★★★★☆</span>
                        <button class="btn-primary" onclick="viewArtistProfile('maya-chen')">View profile</button>
                        <button class="btn-secondary" onclick="removeFavorite('maya-chen')">Remove</button>
                    </div>
                </div>
            </div>
        `;
    }, 1000);
}

// Load user profile data
function loadUserProfile(userData) {
    // Populate profile form with user data
    document.getElementById('userProfileName').value = userData.name || '';
    document.getElementById('userEmail').value = userData.email || '';
    document.getElementById('userLocation').value = userData.location || '';
    document.getElementById('userBio').value = userData.bio || '';
    document.getElementById('userPhone').value = userData.phone || '';
    document.getElementById('userSocial').value = userData.socialMedia ? userData.socialMedia.join(', ') : '';
    
    // Set avatar if available
    if (userData.avatar) {
        document.getElementById('userAvatar').src = userData.avatar;
    }
}

function setupNavigation() {
    // Navigation between sections
    const navItems = document.querySelectorAll('.dashboard-nav .nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all sections
            contentSections.forEach(section => section.classList.remove('active'));
            // Show corresponding section
            const targetSection = this.getAttribute('href').substring(1);
            document.getElementById(targetSection).classList.add('active');
            
            // Load specific content based on section
            const userId = getCurrentUser().uid;
            if (targetSection === 'favorites') {
                loadFavorites(userId);
            } else if (targetSection === 'recommendations') {
                // Get user data first
                getUserData(userId).then(userData => {
                    loadRecommendations(userData);
                });
            }
        });
    });
    
    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
        e.preventDefault();
        logoutUser().then(() => {
            window.location.href = "../index.html";
        });
    });
}

function setupEventListeners() {
    // Save profile
    document.getElementById('saveProfileBtn').addEventListener('click', async function() {
        try {
            const currentUser = await getCurrentUser();
            if (!currentUser) {
                alert('Not authenticated');
                return;
            }
            const userId = currentUser.uid;
            const updatedData = {
                name: document.getElementById('profileName').value,
                email: document.getElementById('profileEmail').value,
                preferredStyles: document.getElementById('profileStyles').value
                    ? document.getElementById('profileStyles').value.split(',').map(s => s.trim()).filter(Boolean)
                    : [],
                location: document.getElementById('profileLocation').value,
                updatedAt: new Date()
            };

            await updateUserData(userId, updatedData);

            // Refresh UI from Firestore to reflect persisted data
            const userDoc = await getUserData(userId);
            if (userDoc.exists) {
                const fresh = userDoc.data();
                displayUserProfile(fresh);
                loadUserProfile(fresh);
            }

            alert('Profile updated successfully');
        } catch (error) {
            alert('Error updating profile: ' + (error && error.message ? error.message : error));
        }
    });
    
    // Upload avatar image
    document.getElementById('avatarUpload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const userId = getCurrentUser().uid;
            const path = `avatars/${userId}/${file.name}`;
            
            uploadImage(file, path)
                .then(() => {
                    return getImageURL(path);
                })
                .then(url => {
                    document.getElementById('userAvatar').src = url;
                    alert('Avatar updated successfully');
                })
                .catch(error => {
                    alert('Error uploading avatar: ' + error.message);
                });
        }
    });
    
    // Filter appointments
    document.getElementById('appointmentFilter').addEventListener('change', function() {
        alert(`Filtering appointments by: ${this.value}. This feature will be implemented soon.`);
    });
}

// Helper functions for user dashboard
function viewArtistProfile(artistId) {
    // Redirect to artist profile page
    // Only add pages/ if we're not already in the pages folder
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    const basePath = isInPagesFolder ? '' : 'pages/';
    window.location.href = `${basePath}artist-profile.html?id=${artistId}`;
}

function removeFavorite(artistId) {
    if (confirm('Are you sure you want to remove this artist from your favorites?')) {
        alert(`Artist ${artistId} removed from favorites`);
        // Here would go the logic to remove from Firebase
        loadFavorites(getCurrentUser().uid); // Reload the list
    }
}

function bookAppointment(artistId) {
    alert(`Booking appointment with artist: ${artistId}. This feature will be implemented soon.`);
}

// Make functions globally available
window.viewArtistProfile = viewArtistProfile;
window.removeFavorite = removeFavorite;
window.bookAppointment = bookAppointment;
        // Here would go the logic to remove from Firebase
        loadFavorites(getCurrentUser().uid); // Reload the list
    }
}

function bookAppointment(artistId) {
    alert(`Booking appointment with artist: ${artistId}. This feature will be implemented soon.`);
}

// Make functions globally available
window.viewArtistProfile = viewArtistProfile;
window.removeFavorite = removeFavorite;
window.bookAppointment = bookAppointment;
        // Here would go the logic to remove from Firebase
        loadFavorites(getCurrentUser().uid); // Reload the list
    }
}

function bookAppointment(artistId) {
    alert(`Booking appointment with artist: ${artistId}. This feature will be implemented soon.`);
}

// Make functions globally available
window.viewArtistProfile = viewArtistProfile;
window.removeFavorite = removeFavorite;
window.bookAppointment = bookAppointment;
        // Here would go the logic to remove from Firebase
        loadFavorites(getCurrentUser().uid); // Reload the list
    }
}

function bookAppointment(artistId) {
    alert(`Booking appointment with artist: ${artistId}. This feature will be implemented soon.`);
}

// Make functions globally available
window.viewArtistProfile = viewArtistProfile;
window.removeFavorite = removeFavorite;
window.bookAppointment = bookAppointment;