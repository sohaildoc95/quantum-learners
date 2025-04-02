// Navbar Component
document.addEventListener('DOMContentLoaded', function() {
    const navbarHTML = `
        <nav class="navbar">
            <div class="navbar-brand">
                <a href="/" class="logo">
                    <span class="quantum">Quantum</span>
                    <span class="learners">&nbsp;Learners</span>
                </a>
            </div>
            
            <div class="navbar-toggle" id="navbarToggle">
                <i class="fas fa-bars"></i>
            </div>

            <div class="navbar-menu" id="navbarMenu">
                <ul class="nav-links">
                    <li><a href="/" class="nav-link">Home</a></li>
                    <li><a href="/services" class="nav-link">Services</a></li>
                    <li><a href="/about" class="nav-link">About</a></li>
                    <li><a href="/contact" class="nav-link">Contact Us</a></li>
                    <li class="nav-buttons">
                        <a href="/login" class="nav-link login-btn">Login</a>
                        <a href="/free-test" class="nav-link free-test-btn">Free Test</a>
                    </li>
                </ul>
            </div>
        </nav>
    `;

    // Insert navbar HTML
    document.getElementById('navbar-container').innerHTML = navbarHTML;
    
    // Initialize navbar functionality
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    let isMenuOpen = false;

    // Toggle mobile menu
    navbarToggle.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        navbarMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const icon = this.querySelector('i');
        if (isMenuOpen) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navbarToggle.contains(event.target) && !navbarMenu.contains(event.target)) {
            navbarMenu.classList.remove('active');
            isMenuOpen = false;
            const icon = navbarToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarMenu.classList.remove('active');
            isMenuOpen = false;
            const icon = navbarToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Add scroll effect to navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        }
        
        lastScroll = currentScroll;
    });
}); 