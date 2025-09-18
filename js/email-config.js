// EmailJS Configuration
// Replace these with your actual EmailJS credentials

const EMAILJS_CONFIG = {
    // Get these from https://www.emailjs.com/
    serviceId: 'service_av5bthk',           // e.g., 'service_abc123'
    templateId: 'template_deywvwg',         // e.g., 'template_xyz789'
    publicKey: 'OLjNklFkD2lEBeiLE',           // e.g., 'user_abcdef123456'
    
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
    }
};

// Export for use in contact-widget.js
window.EMAILJS_CONFIG = EMAILJS_CONFIG;
