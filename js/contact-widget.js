// Contact Widget JavaScript

// EmailJS configuration will be loaded from email-config.js

// Get correct image path based on current location
function getImagePath() {
    const currentPath = window.location.pathname;
    if (currentPath.includes('/pages/')) {
        return '../images/comentario.png';
    } else {
        return 'images/comentario.png';
    }
}

// Contact form data
let contactFormData = {
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
};

// Initialize contact widget
function initContactWidget() {
    // Create contact button
    const contactButton = document.createElement('div');
    contactButton.className = 'contact-widget';
    contactButton.innerHTML = `
        <button class="contact-button" onclick="openContactModal()">
            <img src="${getImagePath()}" alt="Contact" class="contact-icon">
        </button>
    `;
    
    // Create contact modal
    const contactModal = document.createElement('div');
    contactModal.className = 'contact-modal';
    contactModal.id = 'contactModal';
    contactModal.innerHTML = `
        <div class="contact-modal-content">
            <div class="contact-modal-header">
                <h2 class="contact-modal-title">Contact Us</h2>
                <p class="contact-modal-subtitle">We'd love to hear from you! Send us a message.</p>
                <button class="contact-close-btn" onclick="closeContactModal()">×</button>
            </div>
            
            <form class="contact-form" id="contactForm">
                <div class="contact-success" id="contactSuccess">
                    ✅ Thank you! Your message has been sent successfully.
                </div>
                
                <div class="contact-error" id="contactError">
                    ❌ Sorry, there was an error sending your message. Please try again.
                </div>
                
                <div class="form-group">
                    <label for="contactName">Name *</label>
                    <input type="text" id="contactName" name="name" required>
                </div>
                
                <div class="form-group">
                    <label for="contactEmail">Email *</label>
                    <input type="email" id="contactEmail" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="contactSubject">Subject *</label>
                    <input type="text" id="contactSubject" name="subject" required>
                </div>
                
                <div class="form-group">
                    <label for="contactInquiryType">Inquiry Type</label>
                    <select id="contactInquiryType" name="inquiryType">
                        <option value="general">General Question</option>
                        <option value="booking">Booking Inquiry</option>
                        <option value="artist">Artist Application</option>
                        <option value="support">Technical Support</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="contactMessage">Message *</label>
                    <textarea id="contactMessage" name="message" placeholder="Tell us more about your inquiry..." required></textarea>
                </div>
                
                <button type="submit" class="contact-submit-btn" id="contactSubmitBtn">
                    Send Message
                </button>
            </form>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(contactButton);
    document.body.appendChild(contactModal);
    
    // Add event listeners
    setupContactEventListeners();
}

// Setup event listeners
function setupContactEventListeners() {
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('contactModal');
    
    // Form submission
    form.addEventListener('submit', handleContactSubmit);
    
    // Close modal on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeContactModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeContactModal();
        }
    });
    
    // Form field updates
    const formFields = form.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
        field.addEventListener('input', updateContactFormData);
    });
}

// Open contact modal
function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Focus on first input
    setTimeout(() => {
        const firstInput = modal.querySelector('input');
        if (firstInput) firstInput.focus();
    }, 300);
}

// Close contact modal
function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    
    // Reset form after animation
    setTimeout(() => {
        resetContactForm();
    }, 300);
}

// Reset contact form
function resetContactForm() {
    const form = document.getElementById('contactForm');
    form.reset();
    
    // Hide messages
    document.getElementById('contactSuccess').style.display = 'none';
    document.getElementById('contactError').style.display = 'none';
    
    // Reset form data
    contactFormData = {
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
    };
}

// Update form data
function updateContactFormData(e) {
    const field = e.target;
    contactFormData[field.name] = field.value;
}

// Handle form submission
async function handleContactSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('contactSubmitBtn');
    const successMsg = document.getElementById('contactSuccess');
    const errorMsg = document.getElementById('contactError');
    
    // Hide previous messages
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';
    
    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
        // Collect form data
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            inquiryType: formData.get('inquiryType'),
            timestamp: new Date().toISOString(),
            page: window.location.href
        };
        
        // Send email using EmailJS
        await sendContactEmail(data);
        
        // Show success message
        successMsg.style.display = 'block';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset form after delay
        setTimeout(() => {
            resetContactForm();
            closeContactModal();
        }, 2000);
        
    } catch (error) {
        console.error('Error sending contact form:', error);
        
        // Show error message
        errorMsg.style.display = 'block';
        errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
}

// Send email using EmailJS
async function sendContactEmail(data) {
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
    
    // Send email
    const result = await emailjs.send(
        config.serviceId,
        config.templateId,
        {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message,
            inquiry_type: data.inquiryType,
            timestamp: data.timestamp,
            page_url: data.page
        }
    );
    
    if (result.status !== 200) {
        throw new Error('Failed to send email');
    }
    
    return result;
}

// Alternative method using a simple mailto link (fallback)
function sendContactEmailFallback(data) {
    const subject = encodeURIComponent(`[${data.inquiryType.toUpperCase()}] ${data.subject}`);
    const body = encodeURIComponent(`
Name: ${data.name}
Email: ${data.email}
Inquiry Type: ${data.inquiryType}
Page: ${data.page}
Timestamp: ${data.timestamp}

Message:
${data.message}
    `);
    
    const mailtoLink = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Load EmailJS if not already loaded
    if (typeof emailjs === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.onload = () => {
            initContactWidget();
        };
        document.head.appendChild(script);
    } else {
        initContactWidget();
    }
});

// Export functions for global access
window.openContactModal = openContactModal;
window.closeContactModal = closeContactModal;
