// dashboard-artist.js
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    requireAuth().then((user) => {
        loadArtistData(user.uid);
        setupNavigation();
        setupEventListeners();
    }).catch(error => {
        console.error("Authentication error:", error);
    });
});

function loadArtistData(userId) {
    // Load user and artist data
    Promise.all([getUserData(userId), getArtistData(userId)])
        .then(([userDoc, artistDoc]) => {
            if (userDoc.exists) {
                const userData = userDoc.data();
                displayArtistProfile(userData, artistDoc.exists ? artistDoc.data() : {});
                
                // Load specific data
                loadArtistAppointments(userId);
                loadPortfolio(userId);
            }
        })
        .catch(error => {
            console.error("Error loading data:", error);
        });
}

function displayArtistProfile(userData, artistData) {
    // Update information in sidebar
    document.getElementById('artistName').textContent = artistData.name || userData.name || 'Artista';
    document.getElementById('artistStudio').textContent = artistData.studio || 'Estudio no especificado';
    document.getElementById('artistEmail').textContent = userData.email || '';
    
    // Update rating if exists
    if (artistData.rating) {
        document.querySelector('.rating-value').textContent = artistData.rating.toFixed(1);
    }
    
    // Fill profile form
    document.getElementById('profileName').value = artistData.name || userData.name || '';
    document.getElementById('profileStudio').value = artistData.studio || '';
    document.getElementById('profileLocation').value = artistData.location || '';
    document.getElementById('profileInstagram').value = artistData.instagram || '';
    document.getElementById('profileBio').value = artistData.bio || '';
    
    // Load selected styles
    if (artistData.styles) {
        artistData.styles.forEach(style => {
            const checkbox = document.querySelector(`input[value="${style}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    }
}

function loadArtistAppointments(artistId) {
    getArtistAppointments(artistId).then((querySnapshot) => {
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
                        <h3>Appointment with ${appointment.userName}</h3>
                        <p>Date: ${new Date(appointment.date.seconds * 1000).toLocaleDateString()}</p>
                        <p>Time: ${appointment.time}</p>
                        <p>Status: ${appointment.status}</p>
                    </div>
                    <div class="appointment-actions">
                        <button class="btn-success">Confirm</button>
                        <button class="btn-danger">Reject</button>
                        <button class="btn-secondary">Details</button>
                    </div>
                </div>
            `;
        });
        
        appointmentsList.innerHTML = appointmentsHTML;
    }).catch(error => {
        console.error("Error loading appointments:", error);
    });
}

function loadPortfolio(artistId) {
    // This function would load portfolio images from Firebase Storage
    // For now, show sample portfolio items
    setTimeout(() => {
        const portfolioGrid = document.querySelector('.portfolio-grid');
        portfolioGrid.innerHTML = `
            <div class="portfolio-item">
                <img src="../images/artist1.jpg" alt="Portfolio work 1">
                <div class="portfolio-overlay">
                    <button class="portfolio-actions-btn" onclick="deletePortfolioItem(this)">Delete</button>
                    <button class="portfolio-actions-btn" onclick="editPortfolioItem(this)">Edit</button>
                </div>
            </div>
            <div class="portfolio-item">
                <img src="../images/artist2.jpg" alt="Portfolio work 2">
                <div class="portfolio-overlay">
                    <button class="portfolio-actions-btn" onclick="deletePortfolioItem(this)">Delete</button>
                    <button class="portfolio-actions-btn" onclick="editPortfolioItem(this)">Edit</button>
                </div>
            </div>
            <div class="portfolio-item">
                <img src="../images/artist3.jpg" alt="Portfolio work 3">
                <div class="portfolio-overlay">
                    <button class="portfolio-actions-btn" onclick="deletePortfolioItem(this)">Delete</button>
                    <button class="portfolio-actions-btn" onclick="editPortfolioItem(this)">Edit</button>
                </div>
            </div>
        `;
    }, 1000);
}

function setupNavigation() {
    // Navigation between sections (similar to user dashboard)
    const navItems = document.querySelectorAll('.dashboard-nav .nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
            
            contentSections.forEach(section => section.classList.remove('active'));
            const targetSection = this.getAttribute('href').substring(1);
            document.getElementById(targetSection).classList.add('active');
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
    // Save artist profile
    document.getElementById('saveArtistProfileBtn').addEventListener('click', function() {
        const userId = getCurrentUser().uid;
        const instagram = document.getElementById('profileInstagram').value;
        
        // Validar Instagram
        if (!validateInstagram(instagram)) {
            alert('Por favor, ingresa un nombre de usuario de Instagram válido (solo letras, números, puntos y guiones bajos)');
            return;
        }
        
        const updatedData = {
            name: document.getElementById('profileName').value,
            studio: document.getElementById('profileStudio').value,
            location: document.getElementById('profileLocation').value,
            instagram: instagram,
            bio: document.getElementById('profileBio').value,
            styles: getSelectedStyles(),
            updatedAt: new Date()
        };
        
        // Guardar en la colección de artists
        saveArtistData(userId, updatedData)
            .then(() => {
                alert('Artist profile updated successfully');
                // Update sidebar
                document.getElementById('artistName').textContent = updatedData.name;
                document.getElementById('artistStudio').textContent = updatedData.studio;
            })
            .catch(error => {
                alert('Error updating profile: ' + error.message);
            });
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
                    document.getElementById('artistAvatar').src = url;
                    alert('Avatar updated successfully');
                })
                .catch(error => {
                    alert('Error uploading avatar: ' + error.message);
                });
        }
    });
    
    // Upload images to portfolio
    document.getElementById('portfolioUpload').addEventListener('change', function(e) {
        const files = e.target.files;
        if (files.length > 0) {
            alert(`You have selected ${files.length} images for your portfolio. This feature will be implemented soon.`);
            // Here would go the logic to upload multiple images to Firebase Storage
        }
    });
    
    // Filter appointments
    document.getElementById('appointmentFilter').addEventListener('change', function() {
        alert(`Filtering appointments by: ${this.value}. This feature will be implemented soon.`);
    });
}

// Portfolio functions
function deletePortfolioItem(button) {
    if (confirm('Are you sure you want to delete this portfolio item?')) {
        button.closest('.portfolio-item').remove();
        alert('Portfolio item deleted successfully');
    }
}

function editPortfolioItem(button) {
    alert('Edit portfolio item feature will be implemented soon');
}

// Helper function for viewing artist profiles
function viewArtistProfile(artistId) {
    // Redirect to artist profile page
    // Only add pages/ if we're not already in the pages folder
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    const basePath = isInPagesFolder ? '' : 'pages/';
    window.location.href = `${basePath}artist-profile.html?id=${artistId}`;
}

// Load availability settings
function loadAvailability() {
    const availabilitySection = document.querySelector('#availability .availability-settings');
    availabilitySection.innerHTML = `
        <div class="availability-form">
            <h3>Set Your Availability</h3>
            <div class="form-group">
                <label>Monday</label>
                <div class="time-slots">
                    <input type="time" id="monday-start" value="09:00">
                    <span>to</span>
                    <input type="time" id="monday-end" value="18:00">
                    <label><input type="checkbox" id="monday-available" checked> Available</label>
                </div>
            </div>
            <div class="form-group">
                <label>Tuesday</label>
                <div class="time-slots">
                    <input type="time" id="tuesday-start" value="09:00">
                    <span>to</span>
                    <input type="time" id="tuesday-end" value="18:00">
                    <label><input type="checkbox" id="tuesday-available" checked> Available</label>
                </div>
            </div>
            <div class="form-group">
                <label>Wednesday</label>
                <div class="time-slots">
                    <input type="time" id="wednesday-start" value="09:00">
                    <span>to</span>
                    <input type="time" id="wednesday-end" value="18:00">
                    <label><input type="checkbox" id="wednesday-available" checked> Available</label>
                </div>
            </div>
            <div class="form-group">
                <label>Thursday</label>
                <div class="time-slots">
                    <input type="time" id="thursday-start" value="09:00">
                    <span>to</span>
                    <input type="time" id="thursday-end" value="18:00">
                    <label><input type="checkbox" id="thursday-available" checked> Available</label>
                </div>
            </div>
            <div class="form-group">
                <label>Friday</label>
                <div class="time-slots">
                    <input type="time" id="friday-start" value="09:00">
                    <span>to</span>
                    <input type="time" id="friday-end" value="18:00">
                    <label><input type="checkbox" id="friday-available" checked> Available</label>
                </div>
            </div>
            <div class="form-group">
                <label>Saturday</label>
                <div class="time-slots">
                    <input type="time" id="saturday-start" value="10:00">
                    <span>to</span>
                    <input type="time" id="saturday-end" value="16:00">
                    <label><input type="checkbox" id="saturday-available"> Available</label>
                </div>
            </div>
            <div class="form-group">
                <label>Sunday</label>
                <div class="time-slots">
                    <input type="time" id="sunday-start" value="10:00">
                    <span>to</span>
                    <input type="time" id="sunday-end" value="16:00">
                    <label><input type="checkbox" id="sunday-available"> Available</label>
                </div>
            </div>
            <button class="btn-primary" onclick="saveAvailability()">Save Availability</button>
        </div>
    `;
}

// Load statistics
function loadStatistics() {
    const statsGrid = document.querySelector('.stats-grid');
    statsGrid.innerHTML = `
        <div class="stat-card">
            <h3>Appointments this month</h3>
            <p class="stat-value">12</p>
        </div>
        <div class="stat-card">
            <h3>Average rating</h3>
            <p class="stat-value">4.8</p>
        </div>
        <div class="stat-card">
            <h3>Satisfied clients</h3>
            <p class="stat-value">45</p>
        </div>
        <div class="stat-card">
            <h3>Total earnings</h3>
            <p class="stat-value">$2,400</p>
        </div>
        <div class="stat-card">
            <h3>Portfolio views</h3>
            <p class="stat-value">1,234</p>
        </div>
        <div class="stat-card">
            <h3>New inquiries</h3>
            <p class="stat-value">8</p>
        </div>
    `;
}

function saveAvailability() {
    alert('Availability settings saved successfully!');
}

// Update navigation to load content when sections are clicked
function setupNavigation() {
    // Navigation between sections (similar to user dashboard)
    const navItems = document.querySelectorAll('.dashboard-nav .nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
            
            contentSections.forEach(section => section.classList.remove('active'));
            const targetSection = this.getAttribute('href').substring(1);
            document.getElementById(targetSection).classList.add('active');
            
            // Load specific content based on section
            if (targetSection === 'availability') {
                loadAvailability();
            } else if (targetSection === 'statistics') {
                loadStatistics();
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
    // Save artist profile
    document.getElementById('saveArtistProfileBtn').addEventListener('click', function() {
        const userId = getCurrentUser().uid;
        const instagram = document.getElementById('profileInstagram').value;
        
        // Validar Instagram
        if (!validateInstagram(instagram)) {
            alert('Por favor, ingresa un nombre de usuario de Instagram válido (solo letras, números, puntos y guiones bajos)');
            return;
        }
        
        const updatedData = {
            name: document.getElementById('profileName').value,
            studio: document.getElementById('profileStudio').value,
            location: document.getElementById('profileLocation').value,
            instagram: instagram,
            bio: document.getElementById('profileBio').value,
            styles: getSelectedStyles(),
            updatedAt: new Date()
        };
        
        // Save in artists collection
        saveArtistData(userId, updatedData)
            .then(() => {
                alert('Artist profile updated successfully');
                // Update sidebar
                document.getElementById('artistName').textContent = updatedData.name;
                document.getElementById('artistStudio').textContent = updatedData.studio;
            })
            .catch(error => {
                alert('Error updating profile: ' + error.message);
            });
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
                    document.getElementById('artistAvatar').src = url;
                    alert('Avatar updated successfully');
                })
                .catch(error => {
                    alert('Error uploading avatar: ' + error.message);
                });
        }
    });
    
    // Upload images to portfolio
    document.getElementById('portfolioUpload').addEventListener('change', function(e) {
        const files = e.target.files;
        if (files.length > 0) {
            alert(`You have selected ${files.length} images for your portfolio. This feature will be implemented soon.`);
            // Here would go the logic to upload multiple images to Firebase Storage
        }
    });
    
    // Filter appointments
    document.getElementById('appointmentFilter').addEventListener('change', function() {
        alert(`Filtering appointments by: ${this.value}. This feature will be implemented soon.`);
    });
}

function getSelectedStyles() {
    const checkboxes = document.querySelectorAll('.styles-checkboxes input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

function validateInstagram(instagram) {
    if (!instagram) return true; // Instagram es opcional
    
    // Remover @ si está presente
    const cleanInstagram = instagram.replace(/^@/, '');
    
    // Validar formato: solo letras, números, puntos y guiones bajos
    const instagramRegex = /^[a-zA-Z0-9._]+$/;
    
    if (!instagramRegex.test(cleanInstagram)) {
        return false;
    }
    
    // Debe tener entre 1 y 30 caracteres
    if (cleanInstagram.length < 1 || cleanInstagram.length > 30) {
        return false;
    }
    
    return true;
}

// Make functions globally available
window.deletePortfolioItem = deletePortfolioItem;
window.editPortfolioItem = editPortfolioItem;
window.saveAvailability = saveAvailability;