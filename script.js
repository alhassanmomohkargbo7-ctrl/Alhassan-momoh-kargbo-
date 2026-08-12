// ========================================
// MASIMERA WEBSITE - JAVASCRIPT
// ========================================

// ========================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// FORM SUBMISSION HANDLING
// ========================================

const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showAlert('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        if (!isValidEmail(email)) {
            showAlert('Please enter a valid email address.', 'error');
            return;
        }
        
        // If validation passes, show success message
        showAlert('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // In a real application, you would send this data to a server
        console.log({
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message
        });
    });
}

// ========================================
// EMAIL VALIDATION FUNCTION
// ========================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ========================================
// ALERT NOTIFICATION SYSTEM
// ========================================

function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    
    // Add styles
    alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-width: 400px;
    `;
    
    // Set background color based on type
    if (type === 'success') {
        alert.style.backgroundColor = '#2d7a3e';
        alert.style.color = 'white';
    } else if (type === 'error') {
        alert.style.backgroundColor = '#e74c3c';
        alert.style.color = 'white';
    } else {
        alert.style.backgroundColor = '#3498db';
        alert.style.color = 'white';
    }
    
    // Add to page
    document.body.appendChild(alert);
    
    // Remove after 4 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => alert.remove(), 300);
    }, 4000);
}

// ========================================
// NAVIGATION BAR ACTIVE STATE
// ========================================

const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    // Update active link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========================================
// ADD ACTIVE STATE STYLING
// ========================================

const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: #f39c12 !important;
        border-bottom-color: #f39c12 !important;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// LAZY LOADING FOR IMAGES (Optional)
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// SCROLL ANIMATION FOR ELEMENTS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            elementObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.resource-card, .mission-card, .news-card, .program-item').forEach(el => {
    elementObserver.observe(el);
});

// ========================================
// MOBILE MENU TOGGLE (If needed in future)
// ========================================

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// ========================================
// SEARCH FUNCTIONALITY (For future enhancement)
// ========================================

function searchContent(query) {
    const newsCards = document.querySelectorAll('.news-card');
    const resourceCards = document.querySelectorAll('.resource-card');
    
    const allCards = [...newsCards, ...resourceCards];
    let results = 0;
    
    allCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(query.toLowerCase()) || description.includes(query.toLowerCase())) {
            card.style.display = 'block';
            results++;
        } else {
            card.style.display = 'none';
        }
    });
    
    return results;
}

// ========================================
// PRINT PAGE FUNCTIONALITY
// ========================================

function printPage() {
    window.print();
}

// ========================================
// SHARE FUNCTIONALITY
// ========================================

function shareOnSocial(platform) {
    const pageTitle = document.title;
    const pageUrl = window.location.href;
    
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(pageTitle + ' ' + pageUrl)}`,
        email: `mailto:?subject=${encodeURIComponent(pageTitle)}&body=${encodeURIComponent(pageUrl)}`
    };
    
    if (shareUrls[platform]) {
        if (platform === 'email') {
            window.location.href = shareUrls[platform];
        } else {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    }
}

// ========================================
// GET NEWS BY CATEGORY
// ========================================

function filterNewsByCategory(category) {
    const newsCards = document.querySelectorAll('.news-card');
    let results = 0;
    
    newsCards.forEach(card => {
        const newsTag = card.querySelector('.news-tag').textContent;
        
        if (category === 'all' || newsTag.toLowerCase() === category.toLowerCase()) {
            card.style.display = 'block';
            results++;
        } else {
            card.style.display = 'none';
        }
    });
    
    return results;
}

// ========================================
// COOKIE CONSENT (For GDPR compliance)
// ========================================

function setCookieConsent() {
    localStorage.setItem('cookieConsent', 'accepted');
    const cookieBanner = document.getElementById('cookieBanner');
    if (cookieBanner) {
        cookieBanner.style.display = 'none';
    }
}

// ========================================
// DARK MODE TOGGLE (Optional Feature)
// ========================================

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ========================================
// PAGE LOAD ANIMATIONS
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to open search (future feature)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('Search feature would open here');
    }
    
    // Escape key to close any popups
    if (e.key === 'Escape') {
        console.log('Close any open dialogs');
    }
});

// ========================================
// PERFORMANCE MONITORING
// ========================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
    });
}

// ========================================
// ACCESSIBILITY FEATURES
// ========================================

// Improve keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ========================================
// CONTACT FORM ENHANCEMENT
// ========================================

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function() {
        // Allow only numbers and common phone characters
        this.value = this.value.replace(/[^0-9\-\+\(\)]/g, '');
    });
}

// ========================================
// LOCAL STORAGE UTILITIES
// ========================================

const Storage = {
    set: function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    get: function(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    remove: function(key) {
        localStorage.removeItem(key);
    },
    clear: function() {
        localStorage.clear();
    }
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// CONSOLE WELCOME MESSAGE
// ========================================

console.log('%c🌾 Welcome to Masimera Agricultural Extension Farmers Development Network! 🌾', 
    'color: #2d7a3e; font-size: 16px; font-weight: bold;');
console.log('%cEmpowering farmers through knowledge and community support.', 
    'color: #f39c12; font-size: 14px;');

// ========================================
// DOCUMENT READY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Masimera website loaded successfully!');
    
    // Initialize any necessary components
    initializeWebsite();
});

function initializeWebsite() {
    // Add any initialization code here
    console.log('Website initialized');
}

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', function(event) {
    console.error('Error:', event.message);
    // In production, you might want to send this to an error tracking service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', event => {
    console.error('Unhandled promise rejection:', event.reason);
});
