// Error Message Translator
// Translates Firebase error codes to user-friendly messages

const ERROR_MESSAGES = {
    // Authentication errors
    'auth/invalid-email': 'Please enter a valid email address',
    'auth/user-disabled': 'This account has been disabled. Please contact support',
    'auth/user-not-found': 'No account found with this email address',
    'auth/wrong-password': 'Incorrect password. Please try again',
    'auth/invalid-login-credentials': 'Invalid email or password. Please check your credentials and try again',
    'auth/email-already-in-use': 'An account with this email already exists',
    'auth/weak-password': 'Password is too weak. Please choose a stronger password',
    'auth/operation-not-allowed': 'This operation is not allowed. Please contact support',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later',
    'auth/network-request-failed': 'Network error. Please check your connection and try again',
    'auth/requires-recent-login': 'Please log in again to complete this action',
    'auth/invalid-credential': 'Invalid credentials. Please check your email and password',
    'auth/credential-already-in-use': 'This credential is already associated with another account',
    'auth/invalid-verification-code': 'Invalid verification code. Please try again',
    'auth/invalid-verification-id': 'Invalid verification ID. Please request a new verification email',
    'auth/missing-verification-code': 'Please enter the verification code',
    'auth/missing-verification-id': 'Verification ID is missing. Please request a new verification email',
    'auth/code-expired': 'Verification code has expired. Please request a new one',
    'auth/invalid-phone-number': 'Invalid phone number format',
    'auth/missing-phone-number': 'Phone number is required',
    'auth/quota-exceeded': 'Service temporarily unavailable. Please try again later',
    'auth/captcha-check-failed': 'Security verification failed. Please try again',
    'auth/invalid-app-credential': 'Invalid app credentials. Please contact support',
    'auth/missing-app-credential': 'App credentials missing. Please contact support',
    'auth/invalid-user-token': 'Session expired. Please log in again',
    'auth/user-token-expired': 'Session expired. Please log in again',
    'auth/null-user': 'User not found. Please log in again',
    'auth/app-deleted': 'App has been deleted. Please contact support',
    'auth/keychain-error': 'Keychain error. Please try again',
    'auth/internal-error': 'Internal error. Please try again later',
    'auth/invalid-custom-token': 'Invalid custom token. Please contact support',
    'auth/custom-token-mismatch': 'Custom token mismatch. Please contact support',
    'auth/invalid-credential': 'Invalid credentials. Please check your information',
    'auth/invalid-email': 'Please enter a valid email address',
    'auth/operation-not-allowed': 'This operation is not allowed',
    'auth/operation-not-supported-in-this-environment': 'This operation is not supported in this environment',
    'auth/popup-blocked': 'Popup was blocked by your browser. Please allow popups and try again',
    'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again',
    'auth/provider-already-linked': 'This account is already linked to another provider',
    'auth/quota-exceeded': 'Service quota exceeded. Please try again later',
    'auth/redirect-cancelled-by-user': 'Sign-in was cancelled. Please try again',
    'auth/redirect-operation-pending': 'Another sign-in operation is in progress',
    'auth/rejected-credential': 'Sign-in was rejected. Please try again',
    'auth/timeout': 'Operation timed out. Please try again',
    'auth/user-mismatch': 'User mismatch. Please try again',
    'auth/user-not-found': 'No account found with this email address',
    'auth/weak-password': 'Password is too weak. Please choose a stronger password',
    'auth/web-storage-unsupported': 'Web storage is not supported in this browser',
    
    // Custom errors
    'EMAIL_NOT_VERIFIED': 'Please verify your email address before logging in',
    'USER_NOT_FOUND': 'User not found. Please try registering first',
    'INVALID_CREDENTIALS': 'Invalid email or password. Please check your credentials',
    'NETWORK_ERROR': 'Network error. Please check your connection',
    'UNKNOWN_ERROR': 'An unexpected error occurred. Please try again'
};

// Function to get user-friendly error message
function getErrorMessage(error) {
    // Handle different error types
    let errorCode = '';
    
    if (error && error.code) {
        // Firebase error with code
        errorCode = error.code;
    } else if (typeof error === 'string') {
        // String error
        errorCode = error;
    } else if (error && error.message) {
        // Error with message
        errorCode = error.message;
    } else {
        // Unknown error
        errorCode = 'UNKNOWN_ERROR';
    }
    
    // Get user-friendly message
    const friendlyMessage = ERROR_MESSAGES[errorCode] || ERROR_MESSAGES['UNKNOWN_ERROR'];
    
    console.log('Error translation:', {
        original: errorCode,
        friendly: friendlyMessage
    });
    
    return friendlyMessage;
}

// Function to show error notification
function showErrorNotification(error, title = 'Error') {
    const message = getErrorMessage(error);
    window.Notifications.error(title, message);
}

// Function to show success notification
function showSuccessNotification(message, title = 'Success') {
    window.Notifications.success(title, message);
}

// Function to show warning notification
function showWarningNotification(message, title = 'Warning') {
    window.Notifications.warning(title, message);
}

// Function to show info notification
function showInfoNotification(message, title = 'Info') {
    window.Notifications.info(title, message);
}

// Export functions
window.ErrorMessages = {
    getErrorMessage,
    showErrorNotification,
    showSuccessNotification,
    showWarningNotification,
    showInfoNotification
};
