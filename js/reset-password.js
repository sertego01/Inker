// Reset Password functionality
// This file handles password reset requests and confirmation

// Global variables
let resetEmail = '';
let resetCode = '';

// Initialize reset password page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Reset password page loaded');
    
    // Check if we're on the reset password request page
    if (document.getElementById('resetPasswordForm')) {
        initializeResetRequest();
    }
    
    // Check if we're on the reset password confirmation page
    if (document.getElementById('confirmPasswordForm')) {
        initializeResetConfirmation();
    }
});

// Initialize reset password request page
function initializeResetRequest() {
    const form = document.getElementById('resetPasswordForm');
    const emailInput = document.getElementById('email');
    
    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (!email) {
            window.Notifications.error('Error', 'Please enter your email address');
            return;
        }
        
        if (!isValidEmail(email)) {
            window.Notifications.error('Error', 'Please enter a valid email address');
            return;
        }
        
        await sendPasswordResetEmail(email);
    });
}

// Initialize reset password confirmation page
function initializeResetConfirmation() {
    const form = document.getElementById('confirmPasswordForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // Get reset parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const code = urlParams.get('code');
    
    if (!email || !code) {
        window.Notifications.error('Error', 'Invalid reset link. Please request a new password reset.');
        setTimeout(() => {
            window.location.href = 'reset-password.html';
        }, 3000);
        return;
    }
    
    resetEmail = email;
    resetCode = code;
    
    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        // Validate passwords
        const validation = validatePassword(password, confirmPassword);
        if (!validation.isValid) {
            window.Notifications.error('Error', validation.message);
            return;
        }
        
        await confirmPasswordReset(password);
    });
    
    // Real-time password validation
    passwordInput.addEventListener('input', function() {
        validatePasswordStrength(passwordInput.value);
    });
    
    confirmPasswordInput.addEventListener('input', function() {
        validatePasswordMatch(passwordInput.value, confirmPasswordInput.value);
    });
}

// Send password reset email using Firebase Auth
async function sendPasswordResetEmail(email) {
    try {
        showLoading(true);
        
        // Use Firebase Auth to send password reset email
        await resetPassword(email);
        
        // Store email for potential EmailJS backup
        resetEmail = email;
        
        // Show success message
        window.Notifications.success(
            'Reset Link Sent', 
            'Check your email for instructions to reset your password'
        );
        
        // Redirect to login after a delay
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000);
        
    } catch (error) {
        console.error('Error sending password reset email:', error);
        
        // Try EmailJS as backup
        try {
            await sendPasswordResetEmailViaEmailJS(email);
        } catch (emailJSError) {
            console.error('EmailJS backup also failed:', emailJSError);
            window.ErrorMessages.showErrorNotification(error, 'Password Reset Error');
        }
    } finally {
        showLoading(false);
    }
}

// Send password reset email via EmailJS (backup method)
async function sendPasswordResetEmailViaEmailJS(email) {
    console.log('Sending password reset email via EmailJS...');
    
    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS not loaded');
    }
    
    // Check if EmailJS config is loaded
    if (typeof window.EMAILJS_CONFIG === 'undefined') {
        throw new Error('EmailJS config not loaded');
    }
    
    const config = window.EMAILJS_CONFIG;
    
    // Initialize EmailJS
    emailjs.init(config.publicKey);
    
    // Generate reset code
    const resetCode = generateResetCode();
    
    // Store reset code in localStorage (temporary solution)
    localStorage.setItem('resetCode', resetCode);
    localStorage.setItem('resetEmail', email);
    localStorage.setItem('resetTimestamp', Date.now().toString());
    
    // Create reset link
    const resetLink = `${window.location.origin}/pages/reset-password-confirm.html?email=${encodeURIComponent(email)}&code=${resetCode}`;
    
    // Prepare template parameters
    const templateParams = {
        ...config.resetPasswordParams,
        to_email: email,
        user_name: email.split('@')[0], // Use email prefix as name
        reset_link: resetLink,
        expiration_time: '24 hours'
    };
    
    // Send email
    const result = await emailjs.send(
        config.serviceId,
        config.resetPasswordTemplateId,
        templateParams
    );
    
    console.log('Password reset email sent via EmailJS:', result);
    return result;
}

// Confirm password reset
async function confirmPasswordReset(newPassword) {
    try {
        showLoading(true);
        
        // Verify reset code
        const storedCode = localStorage.getItem('resetCode');
        const storedEmail = localStorage.getItem('resetEmail');
        const storedTimestamp = localStorage.getItem('resetTimestamp');
        
        // Check if reset code is valid and not expired (24 hours)
        const now = Date.now();
        const resetTime = parseInt(storedTimestamp);
        const isExpired = (now - resetTime) > (24 * 60 * 60 * 1000); // 24 hours in milliseconds
        
        if (!storedCode || !storedEmail || isExpired) {
            throw new Error('Reset code is invalid or expired');
        }
        
        if (storedCode !== resetCode || storedEmail !== resetEmail) {
            throw new Error('Invalid reset code');
        }
        
        // Use Firebase Auth to update password
        await changePassword(newPassword);
        
        // Clear reset data
        localStorage.removeItem('resetCode');
        localStorage.removeItem('resetEmail');
        localStorage.removeItem('resetTimestamp');
        
        // Show success message
        window.Notifications.success(
            'Password Updated', 
            'Your password has been successfully updated'
        );
        
        // Redirect to login
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        
    } catch (error) {
        console.error('Error confirming password reset:', error);
        window.ErrorMessages.showErrorNotification(error, 'Password Update Error');
    } finally {
        showLoading(false);
    }
}

// Generate a secure reset code
function generateResetCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 32; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate password strength and match
function validatePassword(password, confirmPassword) {
    // Check if passwords match
    if (password !== confirmPassword) {
        return {
            isValid: false,
            message: 'Passwords do not match'
        };
    }
    
    // Check password strength
    const strength = getPasswordStrength(password);
    if (strength.score < 3) {
        return {
            isValid: false,
            message: 'Password is too weak. Please use a stronger password.'
        };
    }
    
    return { isValid: true };
}

// Get password strength score
function getPasswordStrength(password) {
    let score = 0;
    const feedback = [];
    
    // Length check
    if (password.length >= 8) {
        score++;
    } else {
        feedback.push('At least 8 characters');
    }
    
    // Uppercase check
    if (/[A-Z]/.test(password)) {
        score++;
    } else {
        feedback.push('One uppercase letter');
    }
    
    // Lowercase check
    if (/[a-z]/.test(password)) {
        score++;
    } else {
        feedback.push('One lowercase letter');
    }
    
    // Number check
    if (/\d/.test(password)) {
        score++;
    } else {
        feedback.push('One number');
    }
    
    // Special character check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        score++;
    }
    
    return { score, feedback };
}

// Real-time password strength validation
function validatePasswordStrength(password) {
    const strength = getPasswordStrength(password);
    const requirements = document.querySelectorAll('.password-requirements li');
    
    if (requirements.length > 0) {
        requirements.forEach((req, index) => {
            if (index < strength.feedback.length) {
                req.style.color = '#ef4444'; // Red for missing requirements
            } else {
                req.style.color = '#10b981'; // Green for met requirements
            }
        });
    }
}

// Real-time password match validation
function validatePasswordMatch(password, confirmPassword) {
    const confirmInput = document.getElementById('confirmPassword');
    
    if (confirmPassword && password !== confirmPassword) {
        confirmInput.style.borderColor = '#ef4444';
    } else {
        confirmInput.style.borderColor = '#10b981';
    }
}

// Password toggle function (global scope)
window.togglePassword = function(inputId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = passwordInput.parentElement.querySelector('.eye-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.src = '../images/invisible.png';
        eyeIcon.alt = 'Hide password';
    } else {
        passwordInput.type = 'password';
        eyeIcon.src = '../images/ojo.png';
        eyeIcon.alt = 'Show password';
    }
};

// Show/hide loading overlay
function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = show ? 'flex' : 'none';
    }
}
