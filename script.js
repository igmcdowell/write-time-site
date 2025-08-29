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
    
    // Download functionality
    function handleDownload(e) {
        e.preventDefault();
        
        // Download URLs
        const macDownloadUrl = 'https://github.com/igmcdowell/WriteTime-releases/releases/download/v0.0.20/WriteTime-Mac-0.0.31-Installer.dmg';
        const windowsDownloadUrl = 'https://github.com/igmcdowell/WriteTime-releases/releases/download/v0.0.20/WriteTime-Windows-0.0.31-Setup.exe';
        
        // Detect platform
        const userAgent = navigator.userAgent.toLowerCase();
        const isMac = userAgent.includes('mac');
        const isWindows = userAgent.includes('win');
        
        if (isMac) {
            window.location.href = macDownloadUrl;
        } else if (isWindows) {
            window.location.href = windowsDownloadUrl;
        } else {
            // Show both options for other platforms
            const downloadChoice = confirm('Choose your platform:\nOK for Mac\nCancel for Windows');
            if (downloadChoice) {
                window.location.href = macDownloadUrl;
            } else {
                window.location.href = windowsDownloadUrl;
            }
        }
    }
    
    // Platform detection and UI updates
    const userAgent = navigator.userAgent.toLowerCase();
    const isMac = userAgent.includes('mac');
    const isWindows = userAgent.includes('win');
    
    // Update button text and secondary link based on platform
    const downloadButtons = document.querySelectorAll('.btn-primary');
    const platformInfo = document.querySelector('.platform-info');
    const secondaryLinks = document.querySelectorAll('.secondary-download');
    
    let primaryPlatform, secondaryPlatform, primaryUrl, secondaryUrl;
    
    if (isMac) {
        primaryPlatform = 'Download for Mac';
        secondaryPlatform = 'Windows';
        primaryUrl = 'https://github.com/igmcdowell/WriteTime-releases/releases/download/v0.0.20/WriteTime-Mac-0.0.31-Installer.dmg';
        secondaryUrl = 'https://github.com/igmcdowell/WriteTime-releases/releases/download/v0.0.20/WriteTime-Windows-0.0.31-Setup.exe';
    } else if (isWindows) {
        primaryPlatform = 'Download for Windows';
        secondaryPlatform = 'Mac';
        primaryUrl = 'https://github.com/igmcdowell/WriteTime-releases/releases/download/v0.0.20/WriteTime-Windows-0.0.31-Setup.exe';
        secondaryUrl = 'https://github.com/igmcdowell/WriteTime-releases/releases/download/v0.0.20/WriteTime-Mac-0.0.31-Installer.dmg';
    } else {
        // Default to Mac for unknown platforms
        primaryPlatform = 'Download for Mac';
        secondaryPlatform = 'Windows';
        primaryUrl = 'https://github.com/igmcdowell/WriteTime-releases/releases/download/v0.0.20/WriteTime-Mac-0.0.31-Installer.dmg';
        secondaryUrl = 'https://github.com/igmcdowell/WriteTime-releases/releases/download/v0.0.20/WriteTime-Windows-0.0.31-Setup.exe';
    }
    
    // Update primary download buttons
    downloadButtons.forEach(button => {
        button.textContent = primaryPlatform;
        button.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = primaryUrl;
        });
    });
    
    // Update platform info text
    if (platformInfo) {
        const platformText = platformInfo.querySelector('.platform-text');
        if (platformText) {
            platformText.innerHTML = `Available for macOS and Windows • <a href="${secondaryUrl}" class="secondary-download">Download for ${secondaryPlatform}</a>`;
        }
    }
    
    // Handle secondary download links
    function setupSecondaryLinks() {
        const newSecondaryLinks = document.querySelectorAll('.secondary-download');
        newSecondaryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = secondaryUrl;
            });
        });
    }
    
    // Set up secondary links initially and after any updates
    setupSecondaryLinks();
    
    // Make CTA card clickable
    const ctaCard = document.querySelector('.cta-card');
    if (ctaCard) {
        ctaCard.addEventListener('click', function(e) {
            // Don't trigger if clicking on interactive elements within the card
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                return;
            }
            handleDownload(e);
        });
    }
    
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