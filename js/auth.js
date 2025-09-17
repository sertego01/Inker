// Funciones de autenticación

// Registrar nuevo usuario
function registerUser(email, password, userData) {
    return auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Guardar datos adicionales del usuario en Firestore
            const userId = userCredential.user.uid;
            return saveUserData(userId, userData);
        });
}

// Iniciar sesión
function loginUser(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
}

// Cerrar sesión
function logoutUser() {
    return auth.signOut();
}

// Restablecer contraseña
function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
}

// Cambiar contraseña
function changePassword(newPassword) {
    return auth.currentUser.updatePassword(newPassword);
}

// Cambiar email
function changeEmail(newEmail) {
    return auth.currentUser.updateEmail(newEmail);
}

// Verificar si el usuario está autenticado
function checkAuthState(callback) {
    auth.onAuthStateChanged(callback);
}

// Obtener usuario actual
function getCurrentUser() {
    return auth.currentUser;
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