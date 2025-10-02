// Find Styles Page JavaScript

// Sample styles data
const allStyles = [
    {
        id: 'traditional',
        name: 'Traditional',
        description: 'Classic American tattoo style with bold lines and vibrant colors',
        difficulty: 'Beginner',
        popularity: 'Classic',
        image: '../images/traditional.jpg',
        characteristics: ['Bold lines', 'Vibrant colors', 'Simple designs', 'American classic'],
        history: 'Originated in the early 1900s in American tattoo shops'
    },
    {
        id: 'realistic',
        name: 'Realistic',
        description: 'Photorealistic tattoos that look like photographs',
        difficulty: 'Expert',
        popularity: 'Trending',
        image: '../images/realistic.jpg',
        characteristics: ['Photorealistic', 'Detailed shading', 'Portrait work', 'High contrast'],
        history: 'Modern style focusing on photographic accuracy'
    },
    {
        id: 'japanese',
        name: 'Japanese',
        description: 'Traditional Japanese art with dragons, koi fish, and cherry blossoms',
        difficulty: 'Advanced',
        popularity: 'Popular',
        image: '../images/japanese.jpg',
        characteristics: ['Dragons', 'Koi fish', 'Cherry blossoms', 'Traditional motifs'],
        history: 'Based on traditional Japanese art and mythology'
    },
    {
        id: 'blackwork',
        name: 'Blackwork',
        description: 'Bold black ink designs with strong contrast and geometric patterns',
        difficulty: 'Intermediate',
        popularity: 'Trending',
        image: '../images/blackwork.jpg',
        characteristics: ['Black ink only', 'Bold contrast', 'Geometric patterns', 'Strong lines'],
        history: 'Modern style emphasizing black ink and contrast'
    },
    {
        id: 'watercolor',
        name: 'Watercolor',
        description: 'Soft, flowing designs that mimic watercolor paintings',
        difficulty: 'Advanced',
        popularity: 'Popular',
        image: '../images/watercolor.jpg',
        characteristics: ['Soft edges', 'Flowing colors', 'Painterly effect', 'Abstract forms'],
        history: 'Contemporary style inspired by watercolor painting'
    },
    {
        id: 'geometric',
        name: 'Geometric',
        description: 'Mathematical patterns and shapes with precise lines',
        difficulty: 'Intermediate',
        popularity: 'Trending',
        image: '../images/geometric.jpg',
        characteristics: ['Mathematical patterns', 'Precise lines', 'Sacred geometry', 'Symmetrical designs'],
        history: 'Modern style based on mathematical principles'
    },
    {
        id: 'tribal',
        name: 'Tribal',
        description: 'Bold black patterns inspired by indigenous cultures',
        difficulty: 'Beginner',
        popularity: 'Classic',
        image: '../images/tribal.jpg',
        characteristics: ['Bold patterns', 'Black ink', 'Cultural motifs', 'Strong lines'],
        history: 'Inspired by indigenous tattoo traditions worldwide'
    },
    {
        id: 'neo-traditional',
        name: 'Neo-traditional',
        description: 'Modern take on traditional style with more detail and depth',
        difficulty: 'Intermediate',
        popularity: 'Popular',
        image: '../images/neo-traditional.jpg',
        characteristics: ['Traditional base', 'Modern details', 'Enhanced shading', 'Contemporary colors'],
        history: 'Evolution of traditional American tattoo style'
    },
    {
        id: 'minimalist',
        name: 'Minimalist',
        description: 'Simple, clean designs with minimal detail',
        difficulty: 'Beginner',
        popularity: 'Trending',
        image: '../images/minimalist.jpg',
        characteristics: ['Simple lines', 'Minimal detail', 'Clean design', 'Subtle shading'],
        history: 'Contemporary style emphasizing simplicity'
    },
    {
        id: 'biomechanical',
        name: 'Biomechanical',
        description: 'Fusion of organic and mechanical elements',
        difficulty: 'Expert',
        popularity: 'Rare',
        image: '../images/biomechanical.jpg',
        characteristics: ['Mechanical elements', 'Organic fusion', 'Complex details', 'Sci-fi inspired'],
        history: 'Inspired by science fiction and mechanical design'
    },
    {
        id: 'puntillismo',
        name: 'Dotwork',
        description: 'Dotwork technique creating images through thousands of dots',
        difficulty: 'Advanced',
        popularity: 'Rare',
        image: '../images/dotwork.jpg',
        characteristics: ['Dotwork technique', 'Intricate patterns', 'Black ink', 'Time intensive'],
        history: 'Traditional technique adapted for modern tattoo art'
    },
    {
        id: 'henna',
        name: 'Henna',
        description: 'Inspired by traditional henna designs with flowing patterns',
        difficulty: 'Intermediate',
        popularity: 'Popular',
        image: '../images/henna.jpg',
        characteristics: ['Flowing patterns', 'Cultural inspiration', 'Delicate lines', 'Temporary style'],
        history: 'Inspired by traditional henna body art'
    }
];

let filteredStyles = [...allStyles];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadStyles();
    setupEventListeners();
});

// Check for URL parameters after page is loaded
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const styleParam = urlParams.get('style');
    const searchParam = urlParams.get('search');
    
    if (styleParam) {
        // Find the style with the matching ID
        const targetStyle = allStyles.find(style => style.id === styleParam);
        
        if (targetStyle) {
            // Wait a bit for the page to load, then show the modal
            setTimeout(() => {
                showStyleDetails(targetStyle);
            }, 500);
        }
    } else if (searchParam) {
        // Apply search filter
        // Wait a bit for the page to load, then apply search
        setTimeout(() => {
            applySearchFromURL(searchParam);
        }, 200);
    }
});

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('styleSearch');
    
    // Only setup listeners if we're on the find-styles page
    if (!searchInput) return;
    
    searchInput.addEventListener('input', debounce(searchStyles, 300));
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchStyles();
        }
    });
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

// Load styles into the grid
function loadStyles() {
    const stylesGrid = document.getElementById('stylesGrid');
    
    // Only execute if we're on the find-styles page
    if (!stylesGrid) return;
    
    stylesGrid.innerHTML = '';
    
    if (filteredStyles.length === 0) {
        stylesGrid.innerHTML = '<div class="no-results">No styles found matching your criteria.</div>';
        return;
    }
    
    // Always sort by name
    const sortedStyles = [...filteredStyles].sort((a, b) => a.name.localeCompare(b.name));
    
    sortedStyles.forEach(style => {
        const styleCard = createStyleCard(style);
        stylesGrid.appendChild(styleCard);
    });
}

// Create style card HTML
function createStyleCard(style) {
    const card = document.createElement('div');
    card.classList.add('style-card');
    
    card.innerHTML = `
        <div class="style-image">
            <img src="${style.image}" alt="${style.name}">
        </div>
        <div class="style-info">
            <h3 class="style-name">${style.name}</h3>
            <p class="style-description">${style.description}</p>
        </div>
    `;
    
    // Add click event to view style details
    card.addEventListener('click', () => {
        showStyleDetails(style);
    });
    
    return card;
}

// Show style details modal
function showStyleDetails(style) {
    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        backdrop-filter: blur(10px);
        animation: fadeIn 0.3s ease-out;
    `;
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #1f2937, #374151);
            border-radius: 20px;
            padding: 0;
            max-width: 800px;
            width: 95%;
            max-height: 90vh;
            overflow: hidden;
            position: relative;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(139, 92, 246, 0.3);
            animation: slideIn 0.4s ease-out;
        ">
            <!-- Header with gradient background -->
            <div style="
                background: linear-gradient(135deg, #8b5cf6, #ec4899);
                padding: 30px;
                position: relative;
                overflow: hidden;
            ">
                <div style="
                    position: absolute;
                    top: -50%;
                    right: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                    animation: rotate 20s linear infinite;
                "></div>
                
                
                <h2 style="
                    color: white; 
                    margin: 0 0 10px 0; 
                    font-size: 2.5rem; 
                    text-align: center;
                    font-weight: 800;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
                    position: relative;
                    z-index: 1;
                ">${style.name}</h2>
                
                <p style="
                    color: rgba(255, 255, 255, 0.9); 
                    margin: 0; 
                    font-size: 1.2rem;
                    text-align: center;
                    position: relative;
                    z-index: 1;
                ">${style.description}</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px; max-height: 60vh; overflow-y: auto;">
                <!-- Characteristics Section -->
                <div style="margin-bottom: 30px;">
                    <h3 style="
                        color: #8b5cf6; 
                        margin-bottom: 15px; 
                        font-size: 1.4rem;
                        font-weight: 700;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    ">
                        <span style="
                            background: linear-gradient(135deg, #8b5cf6, #ec4899);
                            color: white;
                            padding: 5px 12px;
                            border-radius: 20px;
                            font-size: 0.9rem;
                        ">✨</span>
                        Key Characteristics
                    </h3>
                    <div style="
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 12px;
                    ">
                        ${style.characteristics.map(char => `
                            <div style="
                                background: linear-gradient(135deg, #374151, #4b5563);
                                padding: 12px 16px;
                                border-radius: 12px;
                                color: #e5e7eb;
                                font-weight: 500;
                                border-left: 4px solid #8b5cf6;
                                transition: transform 0.2s ease;
                            " onmouseover="this.style.transform='translateX(5px)'" onmouseout="this.style.transform='translateX(0)'">
                                ${char}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <!-- History Section -->
                <div style="margin-bottom: 30px;">
                    <h3 style="
                        color: #8b5cf6; 
                        margin-bottom: 15px; 
                        font-size: 1.4rem;
                        font-weight: 700;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    ">
                        <span style="
                            background: linear-gradient(135deg, #8b5cf6, #ec4899);
                            color: white;
                            padding: 5px 12px;
                            border-radius: 20px;
                            font-size: 0.9rem;
                        ">📚</span>
                        History & Origins
                    </h3>
                    <p style="
                        color: #d1d5db; 
                        line-height: 1.6;
                        font-size: 1.1rem;
                        background: linear-gradient(135deg, #374151, #4b5563);
                        padding: 20px;
                        border-radius: 12px;
                        border-left: 4px solid #ec4899;
                    ">${style.history}</p>
                </div>
                
                <!-- Action Buttons -->
                <div style="
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                ">
                    <button onclick="closeStyleModal()" style="
                        background: linear-gradient(135deg, #6b7280, #4b5563);
                        color: white;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 12px;
                        cursor: pointer;
                        font-weight: 600;
                        font-size: 1rem;
                        transition: all 0.3s ease;
                        flex: 1;
                        max-width: 200px;
                    " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                        Close
                    </button>
                    
                    <button onclick="
                        // Find artists with this style
                        // Only add pages/ if we're not already in the pages folder
                        const isInPagesFolder = window.location.pathname.includes('/pages/');
                        const basePath = isInPagesFolder ? '' : 'pages/';
                        window.location.href = basePath + 'find-artists.html?style=${style.id}';
                    " style="
                        background: linear-gradient(135deg, #8b5cf6, #ec4899);
                        color: white;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 12px;
                        cursor: pointer;
                        font-weight: 600;
                        font-size: 1rem;
                        transition: all 0.3s ease;
                        flex: 1;
                        max-width: 200px;
                        box-shadow: 0 10px 25px rgba(139, 92, 246, 0.3);
                    " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                        Find Artists
                    </button>
                </div>
            </div>
        </div>
        
        <style>
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideIn {
                from { 
                    opacity: 0;
                    transform: scale(0.9) translateY(20px);
                }
                to { 
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
            
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        </style>
    `;
    
    modal.classList.add('modal');
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Search styles function
function searchStyles() {
    const searchInput = document.getElementById('styleSearch');
    const difficultyFilter = document.getElementById('difficultyFilter');
    const popularityFilter = document.getElementById('popularityFilter');
    
    // Only execute if we're on the find-styles page
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    const difficultyValue = difficultyFilter ? difficultyFilter.value : '';
    const popularityValue = popularityFilter ? popularityFilter.value : '';
    
    filteredStyles = allStyles.filter(style => {
        const matchesSearch = !searchTerm || 
            style.name.toLowerCase().includes(searchTerm) ||
            style.description.toLowerCase().includes(searchTerm) ||
            style.characteristics.some(char => char.toLowerCase().includes(searchTerm));
        
        const matchesDifficulty = !difficultyValue || style.difficulty === difficultyValue;
        const matchesPopularity = !popularityValue || style.popularity === popularityValue;
        
        return matchesSearch && matchesDifficulty && matchesPopularity;
    });
    
    loadStyles();
}

// Toggle filters dropdown
function toggleFilters() {
    const filterDropdown = document.getElementById('filterDropdown');
    const filtersBtn = document.querySelector('.filters-btn');
    
    // Only execute if both elements exist (i.e., we're on the find-styles page)
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
    
    // Only execute if both elements exist (i.e., we're on the find-styles page)
    if (filterDropdown && filtersBtn) {
        if (!filtersBtn.contains(event.target) && !filterDropdown.contains(event.target)) {
            filterDropdown.classList.remove('show');
            filtersBtn.classList.remove('active');
        }
    }
});

// Filter by difficulty
function filterByDifficulty() {
    searchStyles();
}

// Filter by popularity
function filterByPopularity() {
    searchStyles();
}

// Clear all filters
function clearFilters() {
    const difficultyFilter = document.getElementById('difficultyFilter');
    const popularityFilter = document.getElementById('popularityFilter');
    const styleSearch = document.getElementById('styleSearch');
    
    // Only execute if we're on the find-styles page
    if (!styleSearch) return;
    
    if (difficultyFilter) difficultyFilter.value = '';
    if (popularityFilter) popularityFilter.value = '';
    styleSearch.value = '';
    searchStyles();
}


// Function to close the style modal
function closeStyleModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

// Apply search from URL parameter
function applySearchFromURL(searchTerm) {
    if (!searchTerm) {
        filteredStyles = [...allStyles];
        loadStyles();
        return;
    }
    
    if (!allStyles || allStyles.length === 0) {
        setTimeout(() => {
            applySearchFromURL(searchTerm);
        }, 100);
        return;
    }
    
    // Set the search input value
    const searchInput = document.getElementById('styleSearch');
    if (searchInput) {
        searchInput.value = searchTerm;
    }
    
    // Apply the search filter
    filteredStyles = allStyles.filter(style => {
        const matchesSearch = 
            style.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            style.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            style.characteristics.some(char => char.toLowerCase().includes(searchTerm.toLowerCase()));
        
        return matchesSearch;
    });
    
    // Reload the styles with the search applied
    loadStyles();
}

