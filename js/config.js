// Configuración de Firebase (debes reemplazar con tus propias credenciales)
const firebaseConfig = {
    apiKey: "AIzaSyBSAe9SNKGBhFW-uZIo9bIexNWJ0AaaKgI",
    authDomain: "inker-1d07a.firebaseapp.com",
    projectId: "inker-1d07a",
    storageBucket: "inker-1d07a.firebasestorage.app",
    messagingSenderId: "130625677872",
    appId: "1:130625677872:web:87b693a492cbe78da19bf5"
};

// Variables globales para Firebase
let auth, db, storage;

// Función para inicializar Firebase cuando esté disponible
function initializeFirebase() {
    if (typeof firebase !== 'undefined') {
        console.log("Initializing Firebase...");
        
        // Inicializar Firebase
        firebase.initializeApp(firebaseConfig);
        
        // Inicializar servicios de Firebase
        auth = firebase.auth();
        db = firebase.firestore();
        
        // Inicializar storage solo si está disponible
        if (firebase.storage) {
            storage = firebase.storage();
        } else {
            console.warn('Firebase Storage not available');
            storage = null;
        }
        
        // Configuración de persistencia de autenticación
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                console.log("Auth persistence set to LOCAL");
            })
            .catch((error) => {
                console.error("Error setting auth persistence:", error);
            });
        
        // Verificar si ya hay un usuario autenticado al cargar la página
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("User is signed in:", user.uid);
            } else {
                console.log("User is signed out");
            }
        });
        
        console.log("Firebase initialized successfully");
    } else {
        console.log("Firebase not available yet, retrying...");
        setTimeout(initializeFirebase, 100);
    }
}

// Inicializar Firebase cuando esté disponible
initializeFirebase();