/* ========================================
   Apple-Inspired Portfolio - JavaScript
   Smooth interactions and animations
   ======================================== */

// ==========================================
// 1. Dark Mode Toggle with localStorage
// ==========================================
const darkModeToggle = document.querySelector('.dark-mode-toggle');

function initDarkMode() {
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

initDarkMode();

darkModeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
});

// ==========================================
// 2. Smooth Scrolling for Navigation Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// 3. Auto-Update Year in Footer
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Initialize all carousels
    Object.keys(carouselData).forEach(carouselId => {
        initCarousel(carouselId);
    });
});

// ==========================================
// 4. Active Navigation Highlight with IntersectionObserver
// ==========================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-menu a:not(.dark-mode-toggle)');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to corresponding link
            const activeLink = document.querySelector(`.navbar-menu a[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// ==========================================
// 4. Carousel Functionality
// ==========================================

const carouselData = {
    cooking: {
        images: Array.from({ length: 5 }, (_, i) => `assets/explorations/cooking/${String(i + 1).padStart(2, '0')}.jpg`)
    },
    soccer: {
        images: Array.from({ length: 5 }, (_, i) => `assets/explorations/soccer/${String(i + 1).padStart(2, '0')}.jpg`)
    },
    surfing: {
        images: Array.from({ length: 5 }, (_, i) => `assets/explorations/surfing/${String(i + 1).padStart(2, '0')}.jpg`)
    },
    photography: {
        images: Array.from({ length: 5 }, (_, i) => `assets/explorations/photography/${String(i + 1).padStart(2, '0')}.jpg`)
    }
};

const carouselStates = {};

function initCarousel(carouselId) {
    const carousel = document.querySelector(`[data-carousel-id="${carouselId}"]`);
    if (!carousel) return;

    const images = carouselData[carouselId]?.images || [];
    if (images.length === 0) return;

    carouselStates[carouselId] = { currentIndex: 0, totalImages: images.length };

    const imageElement = carousel.querySelector('.carousel-image');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');

    imageElement.src = images[0];
    imageElement.alt = `${carouselId} image 1`;

    for (let i = 0; i < images.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(carouselId, i));
        dotsContainer.appendChild(dot);
    }

    prevBtn.addEventListener('click', () => previousSlide(carouselId));
    nextBtn.addEventListener('click', () => nextSlide(carouselId));
}

function updateCarousel(carouselId) {
    const state = carouselStates[carouselId];
    if (!state) return;

    const carousel = document.querySelector(`[data-carousel-id="${carouselId}"]`);
    const imageElement = carousel.querySelector('.carousel-image');
    const images = carouselData[carouselId].images;

    imageElement.src = images[state.currentIndex];
    imageElement.alt = `${carouselId} image ${state.currentIndex + 1}`;

    const dots = carousel.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === state.currentIndex);
    });
}

function nextSlide(carouselId) {
    const state = carouselStates[carouselId];
    state.currentIndex = (state.currentIndex + 1) % state.totalImages;
    updateCarousel(carouselId);
}

function previousSlide(carouselId) {
    const state = carouselStates[carouselId];
    state.currentIndex = (state.currentIndex - 1 + state.totalImages) % state.totalImages;
    updateCarousel(carouselId);
}

function goToSlide(carouselId, index) {
    const state = carouselStates[carouselId];
    state.currentIndex = index;
    updateCarousel(carouselId);
}

// ==========================================
// 5. Interest Pills Interaction
// ==========================================
const interestPills = document.querySelectorAll('.interest-pill');
const interestMessage = document.getElementById('interest-message');

const interestResponses = {
    soccer: '⚽ Great choice! Soccer is my passion on the field.',
    surfing: '🏄 Surfing is my favorite escape to nature.',
    photography: '📷 Photography lets me capture and share beautiful moments.'
};

interestPills.forEach(pill => {
    pill.addEventListener('click', function () {
        const interest = this.getAttribute('data-interest');
        
        // Toggle active state
        this.classList.toggle('active');
        
        // Update message
        if (this.classList.contains('active')) {
            interestMessage.textContent = interestResponses[interest];
            interestMessage.style.opacity = '1';
        } else {
            interestMessage.textContent = '';
            interestMessage.style.opacity = '0';
        }
        
        // Optional: Remove active state from other pills
        interestPills.forEach(otherPill => {
            if (otherPill !== this) {
                otherPill.classList.remove('active');
            }
        });
    });
});

// ==========================================
// 6. Contact Form Validation (Client-side)
// ==========================================
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Reset status message
        formStatus.textContent = '';
        formStatus.className = 'form-status';
        
        // Validate fields
        if (!name || !email || !message) {
            formStatus.textContent = 'All fields are required.';
            formStatus.classList.add('error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formStatus.textContent = 'Please enter a valid email address.';
            formStatus.classList.add('error');
            return;
        }
        
        // If validation passes, show success message
        // Note: This is a static site, so the form doesn't actually send anywhere
        // In production, you'd integrate with a backend or service like Formspree
        formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
        formStatus.classList.add('success');
        
        // Reset form
        contactForm.reset();
        
        // Clear message after 5 seconds
        setTimeout(() => {
            formStatus.textContent = '';
        }, 5000);
    });
}

// ==========================================
// 7. Optional: Add subtle animations on page load
// ==========================================
window.addEventListener('load', function () {
    // Add animation class to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeInUp 0.6s ease forwards`;
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Define fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// 8. Lazy Loading for Images (when added)
// ==========================================
// This setup allows for easy addition of lazy-loaded images later
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}
