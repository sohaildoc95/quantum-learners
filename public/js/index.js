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

    // Show first testimonial
    testimonialCards[0].classList.add('active');

    // Function to show testimonial
    function showTestimonial(direction) {
        if (isAnimating) return;
        isAnimating = true;

        const currentCard = testimonialCards[currentIndex];
        const nextIndex = direction === 'next' 
            ? (currentIndex + 1) % testimonialCards.length 
            : (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
        const nextCard = testimonialCards[nextIndex];

        // Set initial positions
        currentCard.classList.remove('active');
        currentCard.classList.add('exit');
        nextCard.classList.remove('prev', 'next', 'exit');
        nextCard.classList.add('enter');

        // Update current index
        currentIndex = nextIndex;

        // Reset classes after animation
        setTimeout(() => {
            currentCard.classList.remove('exit');
            nextCard.classList.remove('enter');
            nextCard.classList.add('active');
            isAnimating = false;
        }, 500);
    }

    // Next testimonial
    nextBtn.addEventListener('click', () => {
        showTestimonial('next');
    });

    // Previous testimonial
    prevBtn.addEventListener('click', () => {
        showTestimonial('prev');
    });

    // Auto slide every 5 seconds
    let autoSlideInterval = setInterval(() => {
        showTestimonial('next');
    }, 5000);

    // Pause auto-slide on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        sliderContainer.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => {
                showTestimonial('next');
            }, 5000);
        });
    }
}); 