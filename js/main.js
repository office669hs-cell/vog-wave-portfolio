console.log('Architectural Portfolio Loaded');

// =========================================================================
// CRITICAL MOBILE DETECTION
// =========================================================================
// Simple, aggressive check: If it's a phone/tablet, KILL the custom cursor.
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (window.innerWidth <= 1024) ||
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0);

const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (isMobile) {
    console.log("Mobile Detected: Disabling Custom Cursor to prevent errors.");
    // Completely remove DOM elements so no script can touch them
    if (cursorDot) cursorDot.remove();
    if (cursorOutline) cursorOutline.remove();
} else {
    // DESKTOP ONLY: Initialize Cursor
    if (cursorDot && cursorOutline) {
        cursorDot.style.display = 'block';
        cursorOutline.style.display = 'block';

        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        window.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Smooth Animation Loop
        const animateOutline = () => {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            requestAnimationFrame(animateOutline);
        };
        animateOutline();

        // Hover States
        const interactiveElements = document.querySelectorAll('a, button, .project-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                cursorOutline.style.borderColor = 'transparent';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '30px';
                cursorOutline.style.height = '30px';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorOutline.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            });
        });
    }
}

// =========================================================================
// NAVIGATION & MENU
// =========================================================================
// Navigation Scroll Effect
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        const isFlex = navLinks.style.display === 'flex';
        navLinks.style.display = isFlex ? 'none' : 'flex';

        if (!isFlex) {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10, 10, 10, 0.95)';
            navLinks.style.backdropFilter = 'blur(10px)';
            navLinks.style.padding = '2rem';
            navLinks.style.textAlign = 'center';
            navLinks.style.gap = '2rem';
            navLinks.style.zIndex = '2000'; /* Ensure menu is on top */
            navLinks.style.display = 'flex'; /* Force flex update */
        }
    });
}

// =========================================================================
// LIGHTBOX FUNCTIONALITY
// =========================================================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

// Get all project images for navigation
const projectHelpers = document.querySelectorAll('.project-card');
let currentIndex = 0;
let visibleImages = [];

function updateVisibleImages() {
    visibleImages = [];
    projectHelpers.forEach((card, index) => {
        // Only include visible cards (respecting filters)
        if (card.style.display !== 'none') {
            const img = card.querySelector('img');
            if (img) {
                visibleImages.push({
                    src: img.src,
                    alt: img.alt,
                    originalIndex: index
                });
            }
        }
    });
}

projectHelpers.forEach((card) => {
    card.addEventListener('click', () => {
        const img = card.querySelector('img');
        if (lightbox && lightboxImg && img) {
            updateVisibleImages();
            currentIndex = visibleImages.findIndex(image => image.src === img.src);
            if (currentIndex === -1) currentIndex = 0;
            openLightbox(currentIndex);
        }
    });
});

function openLightbox(index) {
    if (index >= 0 && index < visibleImages.length) {
        // Use FLEX to ensure CSS centering works
        lightbox.style.display = "flex";
        lightboxImg.src = visibleImages[index].src;
        // Caption removed as per user request
        document.body.style.overflow = "hidden"; // Disable scroll
        currentIndex = index;
    }
}

// Navigation Events
if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = visibleImages.length - 1;
        openLightbox(newIndex);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        let newIndex = currentIndex + 1;
        if (newIndex >= visibleImages.length) newIndex = 0;
        openLightbox(newIndex);
    });
}

// Keyboard Navigation
document.addEventListener('keydown', function (e) {
    // Check if lightbox is visible (flex or block)
    if (lightbox.style.display === "flex" || lightbox.style.display === "block") {
        if (e.key === "ArrowLeft" && prevBtn) prevBtn.click();
        if (e.key === "ArrowRight" && nextBtn) nextBtn.click();
        if (e.key === "Escape" && closeBtn) closeBtn.click();
    }
});

// Close Lightbox
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
    });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
}

// =========================================================================
// SLIDER & FORMS
// =========================================================================
// Hero Slider Logic
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;
const slideInterval = 4000;

function nextSlide() {
    if (slides.length > 0) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}

if (slides.length > 0) {
    setInterval(nextSlide, slideInterval);
}

// Contact Form to WhatsApp
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const phone = document.getElementById('contactPhone').value;
        const service = document.getElementById('contactService').value;
        const message = document.getElementById('contactMessage').value;

        const text = `*New Project Inquiry*\n\n` +
            `*Name:* ${name}\n` +
            `*Email:* ${email}\n` +
            `*Phone:* ${phone}\n` +
            `*Service:* ${service}\n` +
            `*Details:* ${message}`;

        const encodedText = encodeURIComponent(text);
        const waNumber = "923140735267";
        const url = `https://wa.me/${waNumber}?text=${encodedText}`;

        window.open(url, '_blank');
    });
}

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.btn-filter');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}
