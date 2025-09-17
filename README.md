# 🎨 Inker - Tattoo Artist Platform

A modern web application that connects tattoo enthusiasts with talented artists. Built with HTML, CSS, JavaScript, and Firebase.

![Inker Logo](https://img.shields.io/badge/Inker-Tattoo%20Platform-purple?style=for-the-badge&logo=firebase)

## 📋 Table of Contents

- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Screenshots](#-screenshots)
- [API Reference](#-api-reference)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🔐 Authentication System
- **User Registration & Login** - Secure authentication with Firebase
- **Role-based Access** - Separate dashboards for users and artists
- **Profile Management** - Complete user and artist profile customization

### 👥 User Features
- **Artist Discovery** - Browse artists by style, location, and ratings
- **Favorites System** - Save favorite artists for easy access
- **Appointment Booking** - Schedule appointments with preferred artists
- **Recommendations** - Get personalized artist recommendations
- **Profile Dashboard** - Manage personal information and preferences

### 🎨 Artist Features
- **Portfolio Management** - Upload and manage tattoo portfolio
- **Availability Settings** - Set working hours and availability
- **Appointment Management** - Handle incoming appointment requests
- **Statistics Dashboard** - Track performance and earnings
- **Profile Customization** - Showcase skills, styles, and studio information

### 🎯 Core Features
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Modern UI/UX** - Clean, professional interface with smooth animations
- **Real-time Updates** - Live data synchronization with Firebase
- **Search & Filter** - Advanced search capabilities
- **Rating System** - User reviews and ratings for artists

## 🛠 Technologies Used

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript (ES6+)** - Interactive functionality and DOM manipulation
- **Responsive Design** - Mobile-first approach

### Backend & Services
- **Firebase Authentication** - User management and security
- **Firebase Firestore** - NoSQL database for data storage
- **Firebase Storage** - Image and file storage
- **Firebase Hosting** - Web hosting (ready for deployment)

### Design & UI
- **Custom CSS** - Tailored styling for optimal user experience
- **Color Palette** - Professional purple (#8b5cf6) and dark theme
- **Typography** - Clean, readable fonts
- **Icons & Images** - Professional visual elements

## 📁 Project Structure

```
Inker/
├── css/
│   ├── auth.css          # Authentication page styles
│   ├── dashboard.css     # Dashboard-specific styles
│   └── style.css         # Main application styles
├── images/
│   ├── artist*.jpg       # Artist profile images
│   ├── *-icon.png        # Social media icons
│   └── *-avatar.png      # Default avatar images
├── js/
│   ├── auth.js           # Authentication logic
│   ├── config.js         # Firebase configuration
│   ├── dashboard-artist.js # Artist dashboard functionality
│   ├── dashboard-user.js  # User dashboard functionality
│   ├── database.js       # Database operations
│   └── main.js           # Main application logic
├── pages/
│   ├── dashboard-artist.html # Artist dashboard page
│   ├── dashboard-user.html   # User dashboard page
│   ├── login.html            # Login page
│   └── register.html         # Registration page
├── index.html            # Main homepage
└── README.md            # Project documentation
```

## 🚀 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for Firebase services
- Basic knowledge of web development (for customization)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/inker.git
   cd inker
   ```

2. **Open in your preferred way**
   - **Option A**: Open `index.html` directly in your browser
   - **Option B**: Use a local server (recommended)
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```

3. **Access the application**
   - Open your browser and navigate to `http://localhost:8000`
   - Or simply double-click `index.html`

## ⚙️ Configuration

### Firebase Setup

1. **Create a Firebase project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication, Firestore, and Storage

2. **Update configuration**
   - Open `js/config.js`
   - Replace the Firebase configuration with your own:

   ```javascript
   const firebaseConfig = {
       apiKey: "your-api-key",
       authDomain: "your-project.firebaseapp.com",
       projectId: "your-project-id",
       storageBucket: "your-project.appspot.com",
       messagingSenderId: "your-sender-id",
       appId: "your-app-id"
   };
   ```

3. **Configure Authentication**
   - Enable Email/Password authentication in Firebase Console
   - Set up Firestore security rules
   - Configure Storage rules for image uploads

### Database Structure

The application uses the following Firestore collections:

```
users/
├── {userId}/
    ├── name: string
    ├── email: string
    ├── userType: "user" | "artist"
    ├── location: string
    ├── bio: string
    ├── avatar: string (URL)
    └── createdAt: timestamp

artists/
├── {artistId}/
    ├── name: string
    ├── studio: string
    ├── styles: string[]
    ├── location: string
    ├── bio: string
    ├── socialMedia: string[]
    ├── rating: number
    └── portfolio: string[] (image URLs)

appointments/
├── {appointmentId}/
    ├── userId: string
    ├── artistId: string
    ├── date: timestamp
    ├── time: string
    ├── status: "pending" | "confirmed" | "completed" | "cancelled"
    └── notes: string
```

## 📱 Usage

### For Users

1. **Registration**
   - Click "Sign up" on the homepage
   - Fill in your details and select "User" as account type
   - Verify your email and log in

2. **Finding Artists**
   - Browse the homepage to see featured artists
   - Use the search bar to find specific styles or locations
   - Click on artist cards to view detailed profiles

3. **Managing Your Account**
   - Access your dashboard from the navigation menu
   - Update your profile information
   - View and manage your appointments
   - Add artists to your favorites

### For Artists

1. **Registration**
   - Click "Sign up" and select "Tattoo Artist" as account type
   - Complete your profile with studio information
   - Upload portfolio images

2. **Managing Your Business**
   - Access the artist dashboard
   - Set your availability and working hours
   - Manage incoming appointment requests
   - Upload and organize your portfolio
   - Track your statistics and earnings

## 📸 Screenshots

### Homepage
- Modern hero section with search functionality
- Featured artists showcase
- Tattoo style categories with emoji icons
- "How it works" section explaining the process

### User Dashboard
- Profile management
- Appointment history and booking
- Favorites list
- Personalized recommendations

### Artist Dashboard
- Portfolio management
- Availability settings
- Appointment management
- Performance statistics

## 🔧 API Reference

### Authentication Functions
```javascript
// User registration
registerUser(email, password, userData)

// User login
loginUser(email, password)

// User logout
logoutUser()

// Get current user
getCurrentUser()
```

### Database Functions
```javascript
// User data
getUserData(userId)
updateUserData(userId, data)
saveUserData(userId, data)

// Artist data
getArtistData(artistId)
updateArtistData(artistId, data)
saveArtistData(userId, data)

// Appointments
getUserAppointments(userId)
getArtistAppointments(artistId)
createAppointment(appointmentData)
```

### Storage Functions
```javascript
// Image upload
uploadImage(file, path)

// Get image URL
getImageURL(path)
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Add comments for complex functionality
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Firebase** - For providing excellent backend services
- **Modern Web Standards** - For making responsive design possible
- **Open Source Community** - For inspiration and best practices

## 📞 Support

If you have any questions or need help:

- **Email**: support@inker.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/inker/issues)
- **Documentation**: [Wiki](https://github.com/yourusername/inker/wiki)

---

**Made with ❤️ for the tattoo community**

*Connect with talented artists and create amazing tattoos together!*
