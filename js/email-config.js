// EmailJS Configuration
// Replace these with your actual EmailJS credentials

const EMAILJS_CONFIG = {
    // Get these from https://www.emailjs.com/
    serviceId: 'service_av5bthk',           // e.g., 'service_abc123'
    templateId: 'template_deywvwg',         // e.g., 'template_xyz789'
    publicKey: 'OLjNklFkD2lEBeiLE',           // e.g., 'user_abcdef123456'
    
    // Email verification template (you need to create this in EmailJS)
    verificationTemplateId: 'template_gh3xig2', // e.g., 'template_verification123'
    
    // Password reset template (you need to create this in EmailJS)
    resetPasswordTemplateId: 'template_reset_password', // e.g., 'template_reset123'
    
    // Your email address where messages will be sent
    recipientEmail: 'sergioteja15@gmail.com',
    
    // Email template variables (customize as needed)
    templateParams: {
        to_email: 'sergioteja15@gmail.com',
        from_name: '{{from_name}}',
        from_email: '{{from_email}}',
        subject: '{{subject}}',
        message: '{{message}}',
        inquiry_type: '{{inquiry_type}}',
        timestamp: '{{timestamp}}',
        page_url: '{{page_url}}'
    },
    
    // Verification email template variables
    verificationParams: {
        to_email: '{{user_email}}',
        user_name: '{{user_name}}',
        verification_link: '{{verification_link}}',
        app_name: 'Inker',
        support_email: 'sergioteja15@gmail.com'
    },
    
    // Password reset email template variables
    resetPasswordParams: {
        to_email: '{{user_email}}',
        user_name: '{{user_name}}',
        reset_link: '{{reset_link}}',
        app_name: 'Inker',
        support_email: 'sergioteja15@gmail.com',
        expiration_time: '{{expiration_time}}'
    }
};

// Export for use in contact-widget.js
window.EMAILJS_CONFIG = EMAILJS_CONFIG;
