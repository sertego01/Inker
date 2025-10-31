// Email Verification using EmailJS

// Generate verification code
function generateVerificationCode() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Send verification email via EmailJS
async function sendVerificationEmail(userId, email, userName) {
    console.log('Sending verification email via EmailJS...');
    
    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        // Load EmailJS if not already loaded
        await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    // Check if EmailJS config is loaded
    if (typeof window.EMAILJS_CONFIG === 'undefined') {
        throw new Error('EmailJS config not loaded');
    }
    
    const config = window.EMAILJS_CONFIG;
    
    // Initialize EmailJS
    emailjs.init(config.publicKey);
    
    // Generate verification code
    const verificationCode = generateVerificationCode();
    
    // Store verification code in Firestore
    try {
        await db.collection('emailVerifications').doc(userId).set({
            code: verificationCode,
            email: email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
        });
    } catch (error) {
        console.error('Error storing verification code:', error);
        // Fallback to localStorage
        localStorage.setItem(`verification_${userId}`, verificationCode);
        localStorage.setItem(`verification_email_${userId}`, email);
        localStorage.setItem(`verification_timestamp_${userId}`, Date.now().toString());
    }
    
    // Create verification link
    const baseUrl = window.location.origin;
    const verificationLink = `${baseUrl}/pages/verify-email.html?userId=${userId}&code=${verificationCode}`;
    
    // Prepare template parameters
    const templateParams = {
        ...config.verificationParams,
        to_email: email,
        user_name: userName || email.split('@')[0],
        verification_link: verificationLink,
        app_name: config.verificationParams.app_name || 'Inker',
        support_email: config.verificationParams.support_email || 'sergioteja15@gmail.com'
    };
    
    // Send email
    const result = await emailjs.send(
        config.serviceId,
        config.verificationTemplateId,
        templateParams
    );
    
    console.log('Verification email sent via EmailJS:', result);
    return result;
}

// Resend verification email
async function resendVerificationEmail(userId, email, userName) {
    return await sendVerificationEmail(userId, email, userName);
}

// Verify email code
async function verifyEmailCode(userId, code) {
    try {
        // First, try localStorage (most reliable for unauthenticated users)
        const storedCode = localStorage.getItem(`verification_${userId}`);
        const timestamp = parseInt(localStorage.getItem(`verification_timestamp_${userId}`) || '0');
        const storedEmail = localStorage.getItem(`verification_email_${userId}`);
        
        if (storedCode && storedCode === code) {
            // Check if expired (24 hours)
            if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
                throw new Error('Verification code expired');
            }
            
            // Always save verification status in localStorage first (most reliable)
            localStorage.setItem(`email_verified_${userId}`, 'true');
            console.log('✅ Verification status saved to localStorage for userId:', userId);
            
            // Try to update Firestore, but don't fail if it doesn't work
            if (typeof db !== 'undefined' && db) {
                try {
                    await db.collection('users').doc(userId).update({
                        emailVerified: true,
                        verifiedAt: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    
                    // Try to delete verification code from Firestore
                    try {
                        await db.collection('emailVerifications').doc(userId).delete();
                    } catch (deleteError) {
                        console.warn('Could not delete verification code from Firestore:', deleteError);
                    }
                } catch (updateError) {
                    console.warn('Could not update Firestore, using localStorage only:', updateError);
                    // Already saved in localStorage, so continue
                }
            }
            
            // Clean up localStorage
            localStorage.removeItem(`verification_${userId}`);
            localStorage.removeItem(`verification_email_${userId}`);
            localStorage.removeItem(`verification_timestamp_${userId}`);
            
            return true;
        }
        
        // If not in localStorage, try Firestore (if available)
        if (typeof db !== 'undefined' && db) {
            try {
                const verificationDoc = await db.collection('emailVerifications').doc(userId).get();
                
                if (verificationDoc.exists) {
                    const data = verificationDoc.data();
                    
                    // Check if code matches
                    if (data.code === code) {
                        // Check if expired
                        const expiresAt = data.expiresAt?.toDate ? data.expiresAt.toDate() : new Date(data.expiresAt);
                        if (expiresAt && expiresAt < new Date()) {
                            throw new Error('Verification code expired');
                        }
                        
                        // Always save verification status in localStorage first
                        localStorage.setItem(`email_verified_${userId}`, 'true');
                        console.log('✅ Verification status saved to localStorage for userId:', userId);
                        
                        // Mark email as verified in Firestore
                        try {
                            await db.collection('users').doc(userId).update({
                                emailVerified: true,
                                verifiedAt: firebase.firestore.FieldValue.serverTimestamp()
                            });
                        } catch (updateError) {
                            console.warn('Could not update users collection:', updateError);
                            // Already saved in localStorage, so continue
                        }
                        
                        // Delete verification code
                        try {
                            await db.collection('emailVerifications').doc(userId).delete();
                        } catch (deleteError) {
                            console.warn('Could not delete verification code:', deleteError);
                        }
                        
                        return true;
                    } else {
                        throw new Error('Invalid verification code');
                    }
                }
            } catch (firestoreError) {
                console.warn('Firestore verification failed, checking localStorage:', firestoreError);
                // If Firestore fails, we already checked localStorage above
            }
        }
        
        // Code not found in either location
        throw new Error('Verification code not found');
        
    } catch (error) {
        console.error('Error verifying email code:', error);
        throw error;
    }
}

// Export functions
window.emailVerification = {
    sendVerificationEmail,
    resendVerificationEmail,
    verifyEmailCode
};

