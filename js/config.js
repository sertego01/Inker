// Configuración de Firebase (debes reemplazar con tus propias credenciales)
const firebaseConfig = {
    apiKey: "AIzaSyBSAe9SNKGBhFW-uZIo9bIexNWJ0AaaKgI",
    authDomain: "inker-1d07a.firebaseapp.com",
    projectId: "inker-1d07a",
    storageBucket: "inker-1d07a.firebasestorage.app",
    messagingSenderId: "130625677872",
    appId: "1:130625677872:web:87b693a492cbe78da19bf5"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Inicializar servicios de Firebase
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Configuración de persistencia de autenticación (opcional)
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .catch((error) => {
        console.error("Error setting auth persistence:", error);
    });