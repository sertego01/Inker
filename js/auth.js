// Funciones de autenticación

// Función para esperar a que Firebase esté inicializado
function waitForFirebaseAuth() {
    return new Promise((resolve) => {
        const checkAuth = () => {
            if (typeof auth !== 'undefined' && auth) {
                resolve(auth);
            } else {
                setTimeout(checkAuth, 100);
            }
        };
        checkAuth();
    });
}

// Registrar nuevo usuario
function registerUser(email, password, userData) {
    return waitForFirebaseAuth().then(() => {
        return auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Guardar datos adicionales del usuario en Firestore
                const userId = userCredential.user.uid;
                return saveUserData(userId, userData);
            });
    });
}

// Iniciar sesión
function loginUser(email, password) {
    return waitForFirebaseAuth().then(() => {
        return auth.signInWithEmailAndPassword(email, password);
    });
}

// Cerrar sesión
function logoutUser() {
    return waitForFirebaseAuth().then(() => {
        return auth.signOut();
    });
}

// Restablecer contraseña
function resetPassword(email) {
    return waitForFirebaseAuth().then(() => {
        return auth.sendPasswordResetEmail(email);
    });
}

// Cambiar contraseña
function changePassword(newPassword) {
    return waitForFirebaseAuth().then(() => {
        return auth.currentUser.updatePassword(newPassword);
    });
}

// Cambiar email
function changeEmail(newEmail) {
    return waitForFirebaseAuth().then(() => {
        return auth.currentUser.updateEmail(newEmail);
    });
}

// Verificar si el usuario está autenticado
function checkAuthState(callback) {
    waitForFirebaseAuth().then(() => {
        auth.onAuthStateChanged(callback);
    });
}

// Obtener usuario actual
function getCurrentUser() {
    return waitForFirebaseAuth().then(() => {
        return auth.currentUser;
    });
}

// Función para proteger rutas - redirigir si no está autenticado
function requireAuth() {
    return new Promise((resolve, reject) => {
        checkAuthState((user) => {
            if (user) {
                resolve(user);
            } else {
                // Redirigir a login si no está autenticado
                window.location.href = "pages/login.html";
                reject(new Error("Usuario no autenticado"));
            }
        });
    });
}