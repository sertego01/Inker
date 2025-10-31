// Authentication Functions

// Wait for Firebase Auth to be available
function waitForFirebaseAuth() {
    return new Promise((resolve, reject) => {
        if (typeof auth !== 'undefined' && auth) {
            resolve(auth);
            return;
        }
        
        let attempts = 0;
        const maxAttempts = 50;
        
        const checkAuth = setInterval(() => {
            attempts++;
            if (typeof auth !== 'undefined' && auth) {
                clearInterval(checkAuth);
                resolve(auth);
            } else if (attempts >= maxAttempts) {
                clearInterval(checkAuth);
                reject(new Error('Firebase Auth initialization timeout'));
            }
        }, 100);
    });
}

// Get current user
function getCurrentUser() {
    if (typeof auth === 'undefined' || !auth) {
        throw new Error('Firebase Auth not initialized');
    }
    return auth.currentUser;
}

// Check authentication state (non-blocking, doesn't redirect)
function checkAuthState(callback) {
    waitForFirebaseAuth().then(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe();
            callback(user);
        });
    }).catch((error) => {
        console.error('Error checking auth state:', error);
        callback(null);
    });
}

// Require authentication - redirects to login if not authenticated
function requireAuth() {
    return waitForFirebaseAuth().then(() => {
        return new Promise((resolve, reject) => {
            const unsubscribe = auth.onAuthStateChanged((user) => {
                unsubscribe();
                if (user) {
                    resolve(user);
                } else {
                    // Determine correct login path
                    const currentPath = window.location.pathname;
                    const isInPagesFolder = currentPath.includes('/pages/');
                    const loginPath = isInPagesFolder ? 'login.html' : 'pages/login.html';
                    
                    window.location.href = loginPath;
                    reject(new Error('User not authenticated'));
                }
            });
        });
    });
}

// Register user
function registerUser(email, password, userData) {
    return waitForFirebaseAuth().then(() => {
        return auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                // Guardar datos adicionales del usuario en Firestore
                return saveUserData(user.uid, userData)
                    .then(() => {
                        // Enviar correo de verificación usando EmailJS
                        if (typeof window.emailVerification !== 'undefined' && window.emailVerification.sendVerificationEmail) {
                            return window.emailVerification.sendVerificationEmail(user.uid, email, userData.name || userData.email)
                                .then(() => {
                                    console.log('Verification email sent via EmailJS');
                                    // Cerrar sesión para forzar verificación antes de login
                                    return auth.signOut().then(() => {
                                        console.log('User registered successfully');
                                        return userCredential;
                                    });
                                })
                                .catch((emailError) => {
                                    console.error('Error sending verification email via EmailJS:', emailError);
                                    // Fallback to Firebase native method
                                    return user.sendEmailVerification()
                                        .then(() => {
                                            console.log('Verification email sent via Firebase (fallback)');
                                            return auth.signOut().then(() => {
                                                console.log('User registered successfully');
                                                return userCredential;
                                            });
                                        });
                                });
                        } else {
                            // Fallback to Firebase native method if EmailJS is not available
                            console.warn('EmailJS verification not available, using Firebase native method');
                            return user.sendEmailVerification()
                                .then(() => {
                                    console.log('Verification email sent via Firebase');
                                    return auth.signOut().then(() => {
                                        console.log('User registered successfully');
                                        return userCredential;
                                    });
                                });
                        }
                    })
                    .catch((error) => {
                        console.error('Error saving user data or sending verification:', error);
                        // Si falla al guardar datos, eliminar el usuario creado
                        user.delete().catch(() => {});
                        throw error;
                    });
            })
            .catch((error) => {
                console.error('Registration error:', error);
                throw error;
            });
    });
}

// Login user
function loginUser(email, password) {
    return waitForFirebaseAuth().then(() => {
        return auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                // Verificar si el email está verificado (Firebase Auth, Firestore, o localStorage)
                console.log('Checking email verification status for user:', user.uid);
                console.log('Firebase Auth emailVerified:', user.emailVerified);
                
                if (!user.emailVerified) {
                    // Check localStorage first (fastest)
                    const verifiedInStorage = localStorage.getItem(`email_verified_${user.uid}`);
                    console.log('localStorage verification status:', verifiedInStorage);
                    
                    if (verifiedInStorage === 'true') {
                        console.log('✅ Email verified in localStorage, allowing login');
                        return userCredential;
                    }
                    
                    // Check Firestore as backup (for EmailJS verification)
                    return getUserData(user.uid)
                        .then((userDoc) => {
                            if (userDoc.exists) {
                                const userData = userDoc.data();
                                console.log('Firestore userData.emailVerified:', userData.emailVerified);
                                
                                // If verified in Firestore but not in Auth, allow login
                                if (userData.emailVerified) {
                                    console.log('✅ Email verified in Firestore, allowing login');
                                    // Also save to localStorage for future logins
                                    localStorage.setItem(`email_verified_${user.uid}`, 'true');
                                    return userCredential;
                                }
                            } else {
                                console.log('User document does not exist in Firestore');
                            }
                            
                            // Email not verified in any place
                            console.log('❌ Email not verified anywhere, denying login');
                            auth.signOut();
                            const error = new Error('EMAIL_NOT_VERIFIED');
                            error.code = 'auth/email-not-verified';
                            throw error;
                        })
                        .catch((dataError) => {
                            console.warn('Error checking Firestore, checking localStorage again:', dataError);
                            
                            // If we can't check Firestore, check localStorage again
                            const verifiedInStorage = localStorage.getItem(`email_verified_${user.uid}`);
                            if (verifiedInStorage === 'true') {
                                console.log('✅ Email verified in localStorage (fallback), allowing login');
                                return userCredential;
                            }
                            
                            // If still not verified, deny login
                            console.log('❌ Email not verified in localStorage or Firestore, denying login');
                            auth.signOut();
                            const error = new Error('EMAIL_NOT_VERIFIED');
                            error.code = 'auth/email-not-verified';
                            throw error;
                        });
                } else {
                    console.log('✅ Email verified in Firebase Auth, allowing login');
                }
                
                console.log('User signed in successfully');
                return userCredential;
            })
            .catch((error) => {
                console.error('Login error:', error);
                throw error;
            });
    });
}

// Logout user
function logoutUser() {
    return waitForFirebaseAuth().then(() => {
        return auth.signOut().then(() => {
            console.log('User signed out successfully');
            localStorage.removeItem('user');
            localStorage.removeItem('userToken');
            
            // Determine correct redirect path
            const currentPath = window.location.pathname;
            const isInPagesFolder = currentPath.includes('/pages/');
            const loginPath = isInPagesFolder ? 'login.html' : 'pages/login.html';
            
            // Only redirect if not already on login page
            if (!currentPath.includes('login.html')) {
                window.location.href = loginPath;
            }
        }).catch((error) => {
            console.error('Error signing out:', error);
            // Still clear local storage and redirect even if signout fails
            localStorage.removeItem('user');
            localStorage.removeItem('userToken');
            
            const currentPath = window.location.pathname;
            const isInPagesFolder = currentPath.includes('/pages/');
            const loginPath = isInPagesFolder ? 'login.html' : 'pages/login.html';
            
            if (!currentPath.includes('login.html')) {
                window.location.href = loginPath;
            }
            
            throw error;
        });
    });
}

