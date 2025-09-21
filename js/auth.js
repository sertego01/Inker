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
            .then(async (userCredential) => {
                // Guardar datos adicionales del usuario en Firestore
                const userId = userCredential.user.uid;
                
                // Add email verification status to user data
                const userDataWithVerification = {
                    ...userData,
                    emailVerified: false,
                    createdAt: new Date()
                };
                
                await saveUserData(userId, userDataWithVerification);
                
                // Send verification email
                try {
                    const verificationToken = window.emailVerification.generateVerificationToken();
                    await window.emailVerification.saveVerificationToken(userId, verificationToken);
                    await window.emailVerification.sendVerificationEmail(email, userData.name, verificationToken);
                    console.log('Verification email sent successfully');
                } catch (error) {
                    console.error('Error sending verification email:', error);
                    // Don't throw error here, user is still registered
                }
                
                // Sign out the user immediately after registration
                // User must verify email and login manually
                await auth.signOut();
                
                return { success: true, message: 'User registered successfully' };
            });
    });
}

// Check if email is verified before login
async function checkEmailVerificationBeforeLogin(email) {
    try {
        console.log('=== CHECKING EMAIL VERIFICATION BEFORE LOGIN ===');
        console.log('Email:', email);
        
        if (typeof db === 'undefined') {
            console.log('Firestore not initialized');
            throw new Error('Firestore not initialized');
        }

        // Find user by email
        const userQuery = await db.collection('users').where('email', '==', email).get();
        console.log('User query results:', userQuery.docs.length);
        
        if (userQuery.empty) {
            console.log('User not found in database');
            throw new Error('User not found');
        }

        const userData = userQuery.docs[0].data();
        console.log('User data for verification check:', userData);
        console.log('Email verified status:', userData.emailVerified);
        
        const isVerified = userData.emailVerified === true;
        console.log('Final verification result:', isVerified);
        console.log('=== END EMAIL VERIFICATION CHECK ===');
        
        return isVerified;
    } catch (error) {
        console.error('Error checking email verification:', error);
        return false;
    }
}

// Iniciar sesión
function loginUser(email, password) {
    return waitForFirebaseAuth().then(async () => {
        console.log('=== STARTING LOGIN PROCESS ===');
        console.log('Email:', email);
        
        // First check if email is verified BEFORE attempting login
        const isVerified = await checkEmailVerificationBeforeLogin(email);
        console.log('Email verification result:', isVerified);
        
        if (!isVerified) {
            console.log('Email not verified, throwing EMAIL_NOT_VERIFIED error');
            throw new Error('EMAIL_NOT_VERIFIED');
        }
        
        console.log('Email is verified, proceeding with login');
        // If email is verified, proceed with login
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

// Cambiar contraseña con código de verificación (para reset)
function changePasswordWithCode(newPassword, code) {
    return waitForFirebaseAuth().then(() => {
        return auth.confirmPasswordReset(code, newPassword);
    });
}

// Verificar código de reset de contraseña
function verifyPasswordResetCode(code) {
    return waitForFirebaseAuth().then(() => {
        return auth.verifyPasswordResetCode(code);
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
                window.location.href = "login.html";
                reject(new Error("Usuario no autenticado"));
            }
        });
    });
}