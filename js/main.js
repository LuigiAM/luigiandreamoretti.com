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

// ===== ACHIEVEMENTS FILTER + SHOW MORE/LESS (Corrected Logic) =====
(function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const achievementsGrid = document.querySelector('.achievements-grid');
    const showMoreBtn = document.querySelector('.show-more-btn');
    
    // Initial check for required elements
    if (!achievementsGrid || !showMoreBtn) return;

    // STEP 1: Get all cards, convert to an array, and sort them immediately.
    // This sorted array will be our single source of truth.
    const sortedCards = Array.from(document.querySelectorAll('.achievement-card'))
        .sort((a, b) => {
            const dateA = a.getAttribute('data-date') || '0000-00';
            const dateB = b.getAttribute('data-date') || '0000-00';
            return dateB.localeCompare(dateA); // Newest first
        });

    // STEP 2: Re-order the cards in the DOM to match the sorted order.
    // This ensures the visual order is always correct.
    sortedCards.forEach(card => achievementsGrid.appendChild(card));

    let currentFilter = 'all';
    let isExpanded = false;
    const CARDS_PER_PAGE = 6;

    function updateCardVisibility() {
        // STEP 3: Filter from our pre-sorted array, not the original DOM order.
        const visibleCards = sortedCards.filter(card => {
            return currentFilter === 'all' || card.getAttribute('data-category') === currentFilter;
        });

        // Hide all cards first
        sortedCards.forEach(card => card.style.display = 'none');

        // Determine which cards to show based on the "isExpanded" state
        const cardsToShow = isExpanded ? visibleCards : visibleCards.slice(0, CARDS_PER_PAGE);
        cardsToShow.forEach(card => card.style.display = 'flex');

        // Update the "Show More" button visibility and text
        if (visibleCards.length > CARDS_PER_PAGE) {
            showMoreBtn.style.display = 'inline-flex';
            const svgUp = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 0.5rem; vertical-align: middle; transform: rotate(180deg);"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
            const svgDown = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 0.5rem; vertical-align: middle;"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
            showMoreBtn.innerHTML = isExpanded ? `Show Less ${svgUp}` : `Show More ${svgDown}`;
        } else {
            showMoreBtn.style.display = 'none';
        }
    }

    // Event listener for filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentFilter = this.getAttribute('data-filter');
            isExpanded = false; // Reset to compressed view on new filter
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            updateCardVisibility();
        });
    });

    // Event listener for the "Show More/Less" button
    showMoreBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        updateCardVisibility();
        // Scroll to the top of the section when collapsing the view
        if (!isExpanded) {
            document.querySelector('#achievements').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // Initialize the view on page load
    updateCardVisibility();
})();