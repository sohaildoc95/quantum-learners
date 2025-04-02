// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });
});

// Smooth scrolling for anchor links
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

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Log form data (replace with actual API call)
        console.log('Form submitted:', data);
        
        // Show success message
        const button = this.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Message Sent!';
        button.style.backgroundColor = '#28a745';
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 3000);
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Mobile menu toggle
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');

if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (navbarToggle && navbarMenu && 
        !navbarToggle.contains(event.target) && 
        !navbarMenu.contains(event.target)) {
        navbarMenu.classList.remove('active');
        const icon = navbarToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Testimonials Slider
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentIndex = 0;
    let isAnimating = false;
    let autoSlideInterval;

    // Initialize all slides
    function initializeSlides() {
        testimonialCards.forEach((card, index) => {
            if (index === currentIndex) {
                card.style.transform = 'translateX(0)';
                card.style.opacity = '1';
                card.style.zIndex = '2';
            } else if (index === getNextIndex()) {
                card.style.transform = 'translateX(100%)';
                card.style.opacity = '1';
                card.style.zIndex = '1';
            } else {
                card.style.transform = 'translateX(-100%)';
                card.style.opacity = '0';
                card.style.zIndex = '1';
            }
        });
    }

    function getNextIndex() {
        return (currentIndex + 1) % testimonialCards.length;
    }

    function getPrevIndex() {
        return (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
    }

    function slide(direction) {
        if (isAnimating) return;
        isAnimating = true;

        const totalCards = testimonialCards.length;
        const nextIndex = direction === 'next' 
            ? (currentIndex + 1) % totalCards 
            : (currentIndex - 1 + totalCards) % totalCards;

        // Current card slides out
        testimonialCards[currentIndex].style.transform = 'translateX(-100%)';
        testimonialCards[currentIndex].style.opacity = '0';
        testimonialCards[currentIndex].style.zIndex = '1';

        // Next card slides in
        testimonialCards[nextIndex].style.transform = 'translateX(0)';
        testimonialCards[nextIndex].style.opacity = '1';
        testimonialCards[nextIndex].style.zIndex = '2';

        // Prepare the card after next
        const afterNextIndex = (nextIndex + 1) % totalCards;
        testimonialCards[afterNextIndex].style.transform = 'translateX(100%)';
        testimonialCards[afterNextIndex].style.opacity = '1';
        testimonialCards[afterNextIndex].style.zIndex = '1';

        // Update current index
        currentIndex = nextIndex;

        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    // Event Listeners
    nextBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        slide('next');
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        slide('next'); // Always slide in the same direction
        startAutoSlide();
    });

    // Auto slide function
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => slide('next'), 5000);
    }

    // Initialize slider
    initializeSlides();

    // Start auto sliding
    startAutoSlide();

    // Pause on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
}); 