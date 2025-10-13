// Sticky navbar on scroll
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links (with navbar offset)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return; // Skip if just "#"
        
        const target = document.querySelector(targetId);
        if (target) {
            const navbarHeight = 80; // Adjust based on your navbar height
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== MOBILE NAVIGATION (COMPLETE FIX) =====
(function() {
    // Wait for DOM to fully load
    const initMobileNav = () => {
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        const navOverlay = document.querySelector('.nav-overlay');
        const body = document.body;

        // Debug: Log element existence
        console.log('Nav Toggle:', navToggle ? 'Found' : 'Missing');
        console.log('Nav Links:', navLinks ? 'Found' : 'Missing');
        console.log('Nav Overlay:', navOverlay ? 'Found' : 'Missing');

        if (!navToggle || !navLinks || !navOverlay) {
            console.error('Mobile nav elements missing!');
            return;
        }

        // Toggle menu function
        const toggleMenu = (forceClose = false) => {
            if (forceClose) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                navOverlay.classList.remove('active');
                body.style.overflow = '';
            } else {
                const isActive = navLinks.classList.toggle('active');
                navToggle.classList.toggle('active');
                navOverlay.classList.toggle('active');
                body.style.overflow = isActive ? 'hidden' : '';
            }
        };

        // Toggle button click
        navToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });

        // Overlay click (close menu)
        navOverlay.addEventListener('click', () => {
            toggleMenu(true);
        });

        // Nav link clicks (close menu)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu(true);
            });
        });

        // Escape key (close menu)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                toggleMenu(true);
            }
        });

        console.log('Mobile nav initialized successfully');
    };

    // Initialize after DOM loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileNav);
    } else {
        initMobileNav();
    }
})();


// Experience Timeline Toggle
document.querySelectorAll('.timeline-header').forEach(header => {
    header.addEventListener('click', function() {
        const item = this.closest('.timeline-item');
        const isExpanded = item.getAttribute('data-expanded') === 'true';
        
        // Toggle expansion
        item.setAttribute('data-expanded', !isExpanded);
    });
});

// ===== PHOTO GALLERY LIGHTBOX =====
(function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxDetail = document.getElementById('lightbox-detail');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    if (!lightbox || galleryItems.length === 0) return;
    
    let currentIndex = 0;
    let currentCategory = 'all';
    let filteredItems = [];

    // Open lightbox
    function openLightbox(index, category) {
        currentCategory = category;
        filteredItems = Array.from(galleryItems).filter(item => 
            item.getAttribute('data-lightbox') === category
        );
        currentIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Update lightbox content
    function updateLightboxContent() {
        const item = filteredItems[currentIndex];
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption').textContent;
        const detail = item.querySelector('.gallery-detail').textContent;

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = caption;
        lightboxDetail.textContent = detail;

        // Update navigation button visibility
        prevBtn.style.display = currentIndex > 0 ? 'flex' : 'none';
        nextBtn.style.display = currentIndex < filteredItems.length - 1 ? 'flex' : 'none';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Navigate lightbox
    function navigateLightbox(direction) {
        currentIndex += direction;
        currentIndex = Math.max(0, Math.min(currentIndex, filteredItems.length - 1));
        updateLightboxContent();
    }

    // Event listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-lightbox');
            const categoryItems = Array.from(galleryItems).filter(i => 
                i.getAttribute('data-lightbox') === category
            );
            const categoryIndex = categoryItems.indexOf(this);
            openLightbox(categoryIndex, category);
        });
    });

    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });

    prevBtn.addEventListener('click', () => navigateLightbox(-1));
    nextBtn.addEventListener('click', () => navigateLightbox(1));

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                if (currentIndex > 0) navigateLightbox(-1);
                break;
            case 'ArrowRight':
                if (currentIndex < filteredItems.length - 1) navigateLightbox(1);
                break;
        }
    });
})();

// ===== ACHIEVEMENTS FILTER + SHOW MORE/LESS (COMPLETE FIX) =====
(function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const achievementCards = document.querySelectorAll('.achievement-card');
    const achievementsGrid = document.querySelector('.achievements-grid');
    const showMoreBtn = document.querySelector('.show-more-btn');
    
    if (!achievementsGrid || !showMoreBtn) return;
    
    let currentFilter = 'all';
    let isExpanded = false;
    const CARDS_PER_PAGE = 6;

    // Sort cards by date (newest first)
    function sortAchievements() {
        const cardsArray = Array.from(achievementCards);
        cardsArray.sort((a, b) => {
            const dateA = a.getAttribute('data-date') || '0000-00';
            const dateB = b.getAttribute('data-date') || '0000-00';
            return dateB.localeCompare(dateA);
        });
        cardsArray.forEach(card => achievementsGrid.appendChild(card));
    }

    // Get visible cards for current filter
    function getVisibleCards() {
        return Array.from(achievementCards).filter(card => {
            const category = card.getAttribute('data-category');
            return currentFilter === 'all' || category === currentFilter;
        });
    }

    // Update card visibility
    function updateCardVisibility() {
        const visibleCards = getVisibleCards();
        const totalVisible = visibleCards.length;

        achievementCards.forEach(card => {
            card.style.display = 'none';
            card.style.opacity = '0';
        });

        const cardsToShow = isExpanded ? visibleCards : visibleCards.slice(0, CARDS_PER_PAGE);
        
        cardsToShow.forEach((card, index) => {
            card.style.display = 'flex';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 10 * index);
        });

        // Update button
        if (totalVisible > CARDS_PER_PAGE) {
            showMoreBtn.style.display = 'inline-flex';
            updateButtonText();
        } else {
            showMoreBtn.style.display = 'none';
        }
    }

    // Update button text and icon
    function updateButtonText() {
        if (isExpanded) {
            showMoreBtn.innerHTML = `
                Show Less 
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 0.5rem; vertical-align: middle; transform: rotate(180deg);">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            `;
        } else {
            showMoreBtn.innerHTML = `
                Show More 
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 0.5rem; vertical-align: middle;">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            `;
        }
    }

    // Filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentFilter = this.getAttribute('data-filter');
            isExpanded = false;
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            updateCardVisibility();
        });
    });

    // Show More/Less button
    showMoreBtn.addEventListener('click', function() {
        isExpanded = !isExpanded;
        updateCardVisibility();
        
        if (!isExpanded) {
            // Scroll back to achievements section when collapsing
            setTimeout(() => {
                document.querySelector('#achievements').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
        }
    });

    // Initialize
    sortAchievements();
    updateCardVisibility();
})();