// artist-profile.js
document.addEventListener('DOMContentLoaded', function() {
    // Get artist ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id') || 'alex-rivera'; // Default artist for demo
    
    // Load artist data
    loadArtistProfile(artistId);
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup modal functionality
    setupModal();
});

function loadArtistProfile(artistId) {
    // For now, we'll use sample data
    // In a real app, this would fetch from Firebase
    const sampleArtists = {
        'alex-rivera': {
            name: 'Alex Rivera',
            studio: 'Ink Studio',
            location: 'New York, NY',
            bio: 'With over 8 years of experience in the tattoo industry, Alex specializes in traditional and realistic styles. Known for attention to detail and creating meaningful pieces that tell a story. Based in New York, Alex works at Ink Studio and has completed over 500+ tattoos.',
            styles: ['Traditional', 'Realistic', 'Blackwork', 'Puntillismo'],
            rating: 4.9,
            reviewCount: 127,
            avatar: '../images/artist1.jpg',
            phone: '+1 (555) 123-4567',
            email: 'alex@inkstudio.com',
            address: '123 Ink Street, New York, NY 10001',
            socialMedia: {
                instagram: 'https://instagram.com/alexrivera',
                facebook: 'https://facebook.com/alexrivera',
                twitter: 'https://twitter.com/alexrivera'
            }
        },
        'maya-chen': {
            name: 'Maya Chen',
            studio: 'Creative Tattoo Co.',
            location: 'Los Angeles, CA',
            bio: 'Maya is a watercolor and geometric tattoo specialist with 6 years of experience. Her unique style combines vibrant colors with precise geometric patterns, creating stunning pieces that stand out.',
            styles: ['Watercolor', 'Geometric', 'Minimalist'],
            rating: 4.8,
            reviewCount: 89,
            avatar: '../images/artist2.jpg',
            phone: '+1 (555) 987-6543',
            email: 'maya@creativetattoo.com',
            address: '456 Art Avenue, Los Angeles, CA 90210',
            socialMedia: {
                instagram: 'https://instagram.com/mayachen',
                facebook: 'https://facebook.com/mayachen',
                twitter: 'https://twitter.com/mayachen'
            }
        },
        'jake-thompson': {
            name: 'Jake Thompson',
            studio: 'Dragon Ink',
            location: 'Chicago, IL',
            bio: 'Jake specializes in Japanese and blackwork tattoos. With 10 years of experience, he brings traditional Japanese techniques to modern tattoo art, creating bold and striking pieces.',
            styles: ['Japanese', 'Blackwork', 'Tribal'],
            rating: 4.9,
            reviewCount: 156,
            avatar: '../images/artist3.jpg',
            phone: '+1 (555) 456-7890',
            email: 'jake@dragonink.com',
            address: '789 Dragon Street, Chicago, IL 60601',
            socialMedia: {
                instagram: 'https://instagram.com/jakethompson',
                facebook: 'https://facebook.com/jakethompson',
                twitter: 'https://twitter.com/jakethompson'
            }
        },
        'luna-rodriguez': {
            name: 'Luna Rodriguez',
            studio: 'Dot Art Studio',
            location: 'Miami, FL',
            bio: 'Luna is a master of dotwork and puntillismo techniques. Her intricate dot-based designs create stunning geometric patterns and mandalas. With 6 years of experience, she specializes in creating mesmerizing pointillism tattoos.',
            styles: ['Puntillismo', 'Dotwork', 'Geometric', 'Mandalas'],
            rating: 4.8,
            reviewCount: 94,
            avatar: '../images/artist4.jpg',
            phone: '+1 (555) 321-9876',
            email: 'luna@dotartstudio.com',
            address: '456 Dot Street, Miami, FL 33101',
            socialMedia: {
                instagram: 'https://instagram.com/lunarodriguez',
                facebook: 'https://facebook.com/lunarodriguez',
                twitter: 'https://twitter.com/lunarodriguez'
            }
        },
        'priya-patel': {
            name: 'Priya Patel',
            studio: 'Henna Heritage',
            location: 'San Francisco, CA',
            bio: 'Priya brings the ancient art of henna to modern tattoo culture. Specializing in henna-inspired designs and temporary tattoos, she creates beautiful, intricate patterns that celebrate cultural heritage while embracing contemporary aesthetics.',
            styles: ['Henna', 'Temporary', 'Cultural', 'Intricate'],
            rating: 4.7,
            reviewCount: 78,
            avatar: '../images/artist5.jpg',
            phone: '+1 (555) 654-3210',
            email: 'priya@hennaheritage.com',
            address: '789 Heritage Lane, San Francisco, CA 94102',
            socialMedia: {
                instagram: 'https://instagram.com/priyapatel',
                facebook: 'https://facebook.com/priyapatel',
                twitter: 'https://twitter.com/priyapatel'
            }
        }
    };
    
    const artist = sampleArtists[artistId] || sampleArtists['alex-rivera'];
    
    // Update page title
    document.title = `${artist.name} - Artist Profile - Inker`;
    
    // Update artist information
    document.getElementById('artistName').textContent = artist.name;
    document.getElementById('artistStudio').textContent = artist.studio;
    document.getElementById('artistLocation').textContent = `📍 ${artist.location}`;
    document.getElementById('artistBio').textContent = artist.bio;
    document.getElementById('artistAvatar').src = artist.avatar;
    document.getElementById('artistAvatar').alt = artist.name;
    
    // Update rating
    const ratingElement = document.querySelector('.rating-text');
    ratingElement.textContent = `${artist.rating} (${artist.reviewCount} reviews)`;
    
    // Update styles
    const stylesContainer = document.querySelector('.artist-styles');
    stylesContainer.innerHTML = artist.styles.map(style => 
        `<span class="style-tag">${style}</span>`
    ).join('');
    
    // Update contact information
    updateContactInfo(artist);
    
    // Load portfolio images
    loadPortfolioImages(artistId);
    
    // Load reviews
    loadReviews(artistId);
}

function updateContactInfo(artist) {
    // Update contact items
    const contactItems = document.querySelectorAll('.contact-item');
    
    // Address
    contactItems[0].querySelector('p').textContent = artist.address;
    
    // Phone
    contactItems[1].querySelector('p').textContent = artist.phone;
    
    // Email
    contactItems[2].querySelector('p').textContent = artist.email;
    
    // Social Media
    const socialLinks = contactItems[3].querySelectorAll('.social-link');
    socialLinks[0].href = artist.socialMedia.instagram;
    socialLinks[1].href = artist.socialMedia.facebook;
    socialLinks[2].href = artist.socialMedia.twitter;
}

function loadPortfolioImages(artistId) {
    // For demo purposes, we'll use the same images
    // In a real app, this would fetch from Firebase Storage
    const portfolioImages = [
        '../images/artist1.jpg',
        '../images/artist2.jpg',
        '../images/artist3.jpg',
        '../images/artist4.jpg',
        '../images/artist5.jpg',
        '../images/artist6.jpg'
    ];
    
    const portfolioGrid = document.getElementById('portfolioGrid');
    portfolioGrid.innerHTML = portfolioImages.map((image, index) => `
        <div class="portfolio-item">
            <img src="${image}" alt="Portfolio work ${index + 1}">
            <div class="portfolio-overlay">
                <button class="portfolio-btn" onclick="openImageModal(this)">View</button>
            </div>
        </div>
    `).join('');
}

function loadReviews(artistId) {
    // Sample reviews data
    const sampleReviews = [
        {
            name: 'Sarah Johnson',
            date: '2 weeks ago',
            rating: 5,
            text: 'Amazing work! Alex was very professional and the tattoo exceeded my expectations. The attention to detail is incredible.'
        },
        {
            name: 'Mike Chen',
            date: '1 month ago',
            rating: 5,
            text: 'Great experience from start to finish. Clean studio, professional service, and beautiful results. Highly recommended!'
        },
        {
            name: 'Emma Davis',
            date: '2 months ago',
            rating: 4,
            text: 'Very happy with my tattoo. Alex took the time to understand what I wanted and delivered exactly that. Will definitely come back!'
        },
        {
            name: 'David Wilson',
            date: '3 months ago',
            rating: 5,
            text: 'Outstanding work! The design was exactly what I envisioned and the execution was flawless. Highly recommend this artist.'
        },
        {
            name: 'Lisa Martinez',
            date: '4 months ago',
            rating: 5,
            text: 'Professional, clean, and talented. The tattoo looks amazing and the healing process was smooth. Will be back for more!'
        }
    ];
    
    const reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = sampleReviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <div class="reviewer-info">
                    <img src="../images/user-avatar.png" alt="Reviewer" class="reviewer-avatar">
                    <div>
                        <h4>${review.name}</h4>
                        <span class="review-date">${review.date}</span>
                    </div>
                </div>
                <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            </div>
            <p class="review-text">${review.text}</p>
        </div>
    `).join('');
}

function setupEventListeners() {
    // Book appointment button
    document.getElementById('bookAppointmentBtn').addEventListener('click', function() {
        // Check if user is logged in
        const currentUser = getCurrentUser();
        if (!currentUser) {
            alert('Please log in to book an appointment');
            window.location.href = 'login.html';
            return;
        }
        
        // Redirect to booking page or show booking modal
        alert('Booking appointment feature will be implemented soon!');
    });
    
    // Add to favorites button
    document.getElementById('favoriteBtn').addEventListener('click', function() {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            alert('Please log in to add to favorites');
            window.location.href = 'login.html';
            return;
        }
        
        // Toggle favorite status
        const isFavorited = this.classList.contains('favorited');
        if (isFavorited) {
            this.classList.remove('favorited');
            this.textContent = '❤️ Add to Favorites';
            alert('Removed from favorites');
        } else {
            this.classList.add('favorited');
            this.textContent = '❤️ Remove from Favorites';
            alert('Added to favorites');
        }
    });
    
    // Share button
    document.getElementById('shareBtn').addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: document.getElementById('artistName').textContent + ' - Artist Profile',
                text: 'Check out this amazing tattoo artist on Inker!',
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Profile link copied to clipboard!');
            });
        }
    });
}

function setupModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('close')[0];
    
    // Close modal when clicking X
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };
    
    // Close modal when clicking outside the image
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
}

function openImageModal(button) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const img = button.closest('.portfolio-item').querySelector('img');
    
    modal.style.display = 'block';
    modalImg.src = img.src;
    modalImg.alt = img.alt;
}

// Helper function to get current user (if available)
function getCurrentUser() {
    try {
        return firebase.auth().currentUser;
    } catch (error) {
        return null;
    }
}

// Make functions globally available
window.openImageModal = openImageModal;
