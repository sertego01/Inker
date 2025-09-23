// Email Verification Functions
// This file handles email verification for user accounts

// Generate a verification token
function generateVerificationToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Send verification email using EmailJS
async function sendVerificationEmail(userEmail, userName, verificationToken) {
    try {
        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS not loaded');
        }

        // Check if config is loaded
        if (typeof window.EMAILJS_CONFIG === 'undefined') {
            throw new Error('EmailJS config not loaded');
        }

        const config = window.EMAILJS_CONFIG;

        // Initialize EmailJS
        emailjs.init(config.publicKey);

        // Create verification link
        const verificationLink = `${window.location.origin}/Inker/pages/verify-email.html?token=${verificationToken}&email=${encodeURIComponent(userEmail)}`;

        // Send verification email
        const result = await emailjs.send(
            config.serviceId,
            config.verificationTemplateId,
            {
                to_email: userEmail,
                user_email: userEmail,
                user_name: userName,
                verification_link: verificationLink,
                app_name: config.verificationParams.app_name,
                support_email: config.verificationParams.support_email
            }
        );

        if (result.status !== 200) {
            throw new Error('Failed to send verification email');
        }

        console.log('Verification email sent successfully');
        return result;

    } catch (error) {
        console.error('Error sending verification email:', error);
        throw error;
    }
}

// Save verification token to Firestore
async function saveVerificationToken(userId, token) {
    try {
        if (typeof db === 'undefined') {
            throw new Error('Firestore not initialized');
        }

        await db.collection('emailVerifications').doc(userId).set({
            token: token,
            email: auth.currentUser.email,
            createdAt: new Date(),
            verified: false
        });

        console.log('Verification token saved to database');
    } catch (error) {
        console.error('Error saving verification token:', error);
        throw error;
    }
}

// Verify email token
async function verifyEmailToken(token, email) {
    try {
        if (typeof db === 'undefined') {
            throw new Error('Firestore not initialized');
        }

        console.log('Verifying token:', token, 'for email:', email);

        // First, find the user by email
        const userQuery = await db.collection('users')
            .where('email', '==', email)
            .get();

        if (userQuery.empty) {
            throw new Error('User not found');
        }

        const userDoc = userQuery.docs[0];
        const userId = userDoc.id;

        // Check if already verified
        const userData = userDoc.data();
        if (userData.emailVerified === true) {
            console.log('Email already verified');
            return true;
        }

        // Find the verification document
        const verificationQuery = await db.collection('emailVerifications')
            .where('token', '==', token)
            .where('email', '==', email)
            .get();

        console.log('Verification query results:', verificationQuery.docs.length);

        if (verificationQuery.empty) {
            throw new Error('Invalid verification token');
        }

        const verificationDoc = verificationQuery.docs[0];
        const verificationData = verificationDoc.data();

        // Check if already verified
        if (verificationData.verified === true) {
            console.log('Token already used');
            return true;
        }

        // Check if token is not older than 24 hours
        const tokenAge = new Date() - verificationData.createdAt.toDate();
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        if (tokenAge > maxAge) {
            throw new Error('Verification token has expired');
        }

        // Mark verification as verified
        await verificationDoc.ref.update({
            verified: true,
            verifiedAt: new Date()
        });

        // Update user document
        await userDoc.ref.update({
            emailVerified: true,
            emailVerifiedAt: new Date()
        });

        console.log('Email verified successfully');
        return true;

    } catch (error) {
        console.error('Error verifying email token:', error);
        throw error;
    }
}

// Check if user's email is verified
async function isEmailVerified(userId) {
    try {
        if (typeof db === 'undefined') {
            console.log('Firestore not initialized');
            return false;
        }

        const userDoc = await db.collection('users').doc(userId).get();
        
        if (userDoc.exists) {
            const userData = userDoc.data();
            console.log('User data for verification check:', userData);
            const isVerified = userData.emailVerified === true;
            console.log('Email verification status:', isVerified);
            return isVerified;
        }

        console.log('User document not found for userId:', userId);
        return false;
    } catch (error) {
        console.error('Error checking email verification status:', error);
        return false;
    }
}

// Resend verification email
async function resendVerificationEmail(userId, userEmail, userName) {
    try {
        // Generate new token
        const newToken = generateVerificationToken();
        
        // Save new token
        await saveVerificationToken(userId, newToken);
        
        // Send email
        await sendVerificationEmail(userEmail, userName, newToken);
        
        console.log('Verification email resent successfully');
        return true;
    } catch (error) {
        console.error('Error resending verification email:', error);
        throw error;
    }
}

// Debug function to check verification status
async function debugVerificationStatus(email) {
    try {
        console.log('=== DEBUG VERIFICATION STATUS ===');
        console.log('Email:', email);
        
        // Check user
        const userQuery = await db.collection('users').where('email', '==', email).get();
        console.log('User query results:', userQuery.docs.length);
        
        if (!userQuery.empty) {
            const userData = userQuery.docs[0].data();
            console.log('User data:', userData);
            console.log('Email verified:', userData.emailVerified);
        }
        
        // Check verification tokens
        const verificationQuery = await db.collection('emailVerifications').where('email', '==', email).get();
        console.log('Verification tokens found:', verificationQuery.docs.length);
        
        verificationQuery.docs.forEach((doc, index) => {
            console.log(`Token ${index + 1}:`, doc.data());
        });
        
        console.log('=== END DEBUG ===');
    } catch (error) {
        console.error('Debug error:', error);
    }
}

// Export functions for use in other files
window.emailVerification = {
    generateVerificationToken,
    sendVerificationEmail,
    saveVerificationToken,
    verifyEmailToken,
    isEmailVerified,
    resendVerificationEmail,
    debugVerificationStatus
};
