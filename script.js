// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    const body = document.body;
    
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.setAttribute('data-lucide', 'sun');
    } else {
        body.removeAttribute('data-theme');
        themeIcon.setAttribute('data-lucide', 'moon');
    }
    
    // Initialize Lucide icons for theme toggle
    lucide.createIcons();
    
    // Toggle theme
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            body.removeAttribute('data-theme');
            themeIcon.setAttribute('data-lucide', 'moon');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            themeIcon.setAttribute('data-lucide', 'sun');
            localStorage.setItem('theme', 'dark');
        }
        
        // Reinitialize Lucide icons after changing the icon
        lucide.createIcons();
    });
    
    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const featuresSection = document.querySelector('.features');
    
    if (scrollIndicator && featuresSection) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            featuresSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    // Hide scroll indicator when user scrolls past hero
    window.addEventListener('scroll', function() {
        const heroHeight = document.querySelector('.hero').offsetHeight;
        if (window.scrollY > heroHeight * 0.3) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '0.7';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });

    // Smooth scrolling for any anchor links (future use)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Download button functionality
    const downloadButtons = document.querySelectorAll('.btn-primary');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // For now, just show an alert since we don't have the actual download link
            alert('Beta download will be available soon! Check back for updates.');
        });
    });
    
    // Theme Carousel Functionality
    let currentTheme = 0;
    let carouselTimer = null;
    const themes = document.querySelectorAll('.theme-slide');
    const dots = document.querySelectorAll('.dot');
    const themeTabs = document.querySelectorAll('.theme-tab');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    function showTheme(index) {
        // Move carousel track to show the selected theme
        const track = document.querySelector('.carousel-track');
        if (track) {
            // Each slide is 33.333% of track width, translate by index * 33.333%
            const translateX = -(index * 33.333);
            track.style.transform = `translateX(${translateX}%)`;
        }
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Update tabs
        themeTabs.forEach((tab, i) => {
            tab.classList.toggle('active', i === index);
        });
        
        currentTheme = index;
    }
    
    function resetCarouselTimer() {
        // Clear existing timer
        if (carouselTimer) {
            clearInterval(carouselTimer);
        }
        
        // Start new timer
        carouselTimer = setInterval(() => {
            const nextIndex = currentTheme < themes.length - 1 ? currentTheme + 1 : 0;
            showTheme(nextIndex);
        }, 8000);
    }
    
    // Next/Prev button functionality
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            const newIndex = currentTheme > 0 ? currentTheme - 1 : themes.length - 1;
            showTheme(newIndex);
            resetCarouselTimer();
        });
        
        nextBtn.addEventListener('click', () => {
            const newIndex = currentTheme < themes.length - 1 ? currentTheme + 1 : 0;
            showTheme(newIndex);
            resetCarouselTimer();
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTheme(index);
            resetCarouselTimer();
        });
    });
    
    // Theme tab navigation
    themeTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            showTheme(index);
            resetCarouselTimer();
        });
    });
    
    // Initialize the carousel to show first theme and start auto-rotation
    showTheme(0);
    resetCarouselTimer();
    
    // Initialize Lucide icons
    lucide.createIcons();

    // Add subtle animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.feature-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});