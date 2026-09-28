// ===== NAVBAR: solid background once scrolled past the hero top =====
// Pages without a hero (privacy, 404) keep the static "scrolled" class.
(function() {
    const navbar = document.getElementById('navbar');
    const hero = document.getElementById('hero');
    if (!navbar || !hero) return;

    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

// ===== ACTIVE SECTION IN NAV =====
(function() {
    const links = document.querySelectorAll('.nav-links a[href^="#"]');
    if (links.length === 0 || !('IntersectionObserver' in window)) return;

    const linkFor = new Map();
    links.forEach(link => linkFor.set(link.getAttribute('href').slice(1), link));

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            links.forEach(link => link.removeAttribute('aria-current'));
            const link = linkFor.get(entry.target.id);
            if (link) link.setAttribute('aria-current', 'true');
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    document.querySelectorAll('section[id]').forEach(section => observer.observe(section));
})();

// ===== MOBILE NAVIGATION =====
(function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;

    if (!navToggle || !navLinks || !navOverlay) return;

    // Open/close the drawer (forceClose always closes)
    const toggleMenu = (forceClose = false) => {
        const open = forceClose ? false : !navLinks.classList.contains('active');
        navLinks.classList.toggle('active', open);
        navToggle.classList.toggle('active', open);
        navOverlay.classList.toggle('active', open);
        navToggle.setAttribute('aria-expanded', String(open));
        body.style.overflow = open ? 'hidden' : '';
    };

    navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    navOverlay.addEventListener('click', () => toggleMenu(true));

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(true));
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu(true);
            navToggle.focus();
        }
    });
})();

// ===== EXPERIENCE TIMELINE TOGGLE =====
document.querySelectorAll('.timeline-header').forEach(header => {
    header.addEventListener('click', function() {
        const item = this.closest('.timeline-item');
        const isExpanded = item.getAttribute('data-expanded') === 'true';

        item.setAttribute('data-expanded', String(!isExpanded));

        const toggle = this.querySelector('.timeline-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', String(!isExpanded));
    });
});

// ===== ACHIEVEMENTS FILTER + SHOW MORE/LESS (Dynamic One Row) =====
(function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const achievementsGrid = document.querySelector('.achievements-grid');
    const showMoreBtn = document.querySelector('.achievements .show-more-btn');

    if (!achievementsGrid || !showMoreBtn) return;

    // Sort cards newest first once; this array is the single source of truth.
    const sortedCards = Array.from(document.querySelectorAll('.achievement-card'))
        .sort((a, b) => {
            const dateA = a.getAttribute('data-date') || '0000-00';
            const dateB = b.getAttribute('data-date') || '0000-00';
            return dateB.localeCompare(dateA);
        });

    // Re-order the cards in the DOM to match the sorted order.
    sortedCards.forEach(card => achievementsGrid.appendChild(card));

    let currentFilter = 'all';
    let isExpanded = false;

    // Calculate how many cards fit in one row based on grid layout
    function getCardsPerRow() {
        const gridWidth = achievementsGrid.offsetWidth;
        const gap = 24; // 1.5rem = 24px (from CSS gap)
        const minCardWidth = 300; // minmax(300px, 1fr) from CSS

        const cardsPerRow = Math.floor((gridWidth + gap) / (minCardWidth + gap));
        return Math.max(1, cardsPerRow);
    }

    function updateCardVisibility() {
        const visibleCards = sortedCards.filter(card => {
            return currentFilter === 'all' || card.getAttribute('data-category') === currentFilter;
        });

        sortedCards.forEach(card => card.style.display = 'none');

        const cardsPerRow = getCardsPerRow();
        const cardsToShow = isExpanded ? visibleCards : visibleCards.slice(0, cardsPerRow);
        cardsToShow.forEach(card => card.style.display = 'flex');

        if (visibleCards.length > cardsPerRow) {
            showMoreBtn.style.display = 'inline-flex';
            showMoreBtn.setAttribute('aria-expanded', String(isExpanded));
            const svgUp = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="margin-left: 0.5rem; vertical-align: middle; transform: rotate(180deg);"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
            const svgDown = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="margin-left: 0.5rem; vertical-align: middle;"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
            showMoreBtn.innerHTML = isExpanded ? `Show Less ${svgUp}` : `Show All ${visibleCards.length} ${svgDown}`;
        } else {
            showMoreBtn.style.display = 'none';
        }
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentFilter = this.getAttribute('data-filter');
            isExpanded = false; // Reset to compressed view on new filter
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            updateCardVisibility();
        });
    });

    showMoreBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        updateCardVisibility();
        // Scroll to the top of the section when collapsing the view
        if (!isExpanded) {
            document.querySelector('#achievements').scrollIntoView({ block: 'start' });
        }
    });

    // Recalculate on resize (debounced)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateCardVisibility, 250);
    });

    updateCardVisibility();
})();

// ===== ABOUT SECTION SLIDESHOW =====
(function() {
    const slideshow = document.querySelector('.about-slideshow');
    if (!slideshow) return;

    const slides = slideshow.querySelectorAll('.slideshow-slide');
    const dots = slideshow.querySelectorAll('.slideshow-dot');
    const pauseBtn = slideshow.querySelector('.slideshow-pause');
    if (slides.length === 0) return;

    const INTERVAL_MS = 5000;
    const SWIPE_THRESHOLD = 40;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let currentSlide = 0;
    let interval = null;
    let userPaused = reduceMotion; // no autoplay for reduced-motion users

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    function prevSlide() {
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
    }

    function startAutoPlay() {
        if (interval || userPaused) return;
        interval = setInterval(nextSlide, INTERVAL_MS);
    }

    function stopAutoPlay() {
        clearInterval(interval);
        interval = null;
    }

    function restartAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            goToSlide(parseInt(this.getAttribute('data-slide'), 10));
            restartAutoPlay();
        });
    });

    // Pause/play button (WCAG 2.2.2)
    if (pauseBtn) {
        pauseBtn.setAttribute('aria-pressed', String(userPaused));
        pauseBtn.addEventListener('click', () => {
            userPaused = !userPaused;
            pauseBtn.setAttribute('aria-pressed', String(userPaused));
            if (userPaused) {
                stopAutoPlay();
            } else {
                startAutoPlay();
            }
        });
    }

    // Pause while hovered or focused
    slideshow.addEventListener('mouseenter', stopAutoPlay);
    slideshow.addEventListener('mouseleave', startAutoPlay);
    slideshow.addEventListener('focusin', stopAutoPlay);
    slideshow.addEventListener('focusout', (e) => {
        if (!slideshow.contains(e.relatedTarget)) startAutoPlay();
    });

    // Basic swipe support
    let touchStartX = null;
    slideshow.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });
    slideshow.addEventListener('touchend', (e) => {
        if (touchStartX === null) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        touchStartX = null;
        if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
        if (deltaX < 0) {
            nextSlide();
        } else {
            prevSlide();
        }
        restartAutoPlay();
    }, { passive: true });

    startAutoPlay();
})();

// ===== VIDEO MODAL (click-to-load YouTube in a native <dialog>) =====
// YouTube is only contacted once a visitor presses play.
(function() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-modal-iframe');
    if (!modal || !iframe || typeof modal.showModal !== 'function') return;

    const closeBtn = modal.querySelector('.video-modal-close');

    function openModal(videoId, title) {
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(videoId) + '?autoplay=1';
        iframe.title = title || 'Video';
        modal.showModal();
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.close();
    }

    // Esc and closeModal() both fire "close": stop playback and restore scrolling
    modal.addEventListener('close', () => {
        iframe.removeAttribute('src');
        document.body.style.overflow = '';
    });

    // Triggers: product cards (click on image area) and .video-thumb buttons
    document.querySelectorAll('[data-video-id]').forEach(el => {
        const trigger = el.classList.contains('product-card')
            ? el.querySelector('.product-image-wrapper')
            : el;
        if (!trigger) return;

        trigger.addEventListener('click', () => {
            openModal(el.getAttribute('data-video-id'), el.getAttribute('data-video-title'));
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Clicks on the backdrop target the <dialog> element itself
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
})();

// ===== EXPERIENCE TIMELINE - SHOW MORE =====
(function() {
    const btn = document.querySelector('.timeline-show-more-btn');
    if (!btn) return;

    const hiddenItems = document.querySelectorAll('.timeline-item[data-initial-visible="false"]');
    if (hiddenItems.length === 0) return;

    btn.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';

        if (!isExpanded) {
            hiddenItems.forEach(item => item.classList.add('visible'));
            this.setAttribute('aria-expanded', 'true');
        } else {
            hiddenItems.forEach(item => item.classList.remove('visible'));
            this.setAttribute('aria-expanded', 'false');

            // Scroll back to top of Experience section
            const experienceSection = document.getElementById('experience');
            if (experienceSection) {
                experienceSection.scrollIntoView({ block: 'start' });
            }
        }
    });
})();

// ===== PITCHES & PRESENTATIONS - SHOW MORE =====
(function() {
    const btn = document.querySelector('.pitches-show-more-btn');
    if (!btn) return;

    const hiddenItems = document.querySelectorAll('.video-gallery-item[data-initial-visible="false"]');
    if (hiddenItems.length === 0) return;

    btn.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';

        if (!isExpanded) {
            hiddenItems.forEach(item => item.classList.add('visible'));
            this.setAttribute('aria-expanded', 'true');
        } else {
            hiddenItems.forEach(item => item.classList.remove('visible'));
            this.setAttribute('aria-expanded', 'false');

            // Scroll back to the Pitches & Presentations heading
            const pitchesSection = this.closest('.gallery-category');
            if (pitchesSection) {
                pitchesSection.scrollIntoView({ block: 'start' });
            }
        }
    });
})();

// ===== CONTACT FORM (Web3Forms) =====
// Without JS the form posts natively and Web3Forms redirects back to #contact.
(function() {
    const form = document.querySelector('.contact-form');
    if (!form || !window.fetch) return;

    const submitBtn = form.querySelector('.contact-submit');
    const status = form.querySelector('.form-status');
    const btnLabel = submitBtn.textContent;

    const showStatus = (type, message) => {
        status.className = 'form-status is-' + type;
        status.textContent = message;
    };

    const showError = () => {
        showStatus('error', 'Sorry, your message could not be sent. Please email me at ');
        const link = document.createElement('a');
        link.href = 'mailto:hello@luigimoretti.com';
        link.textContent = 'hello@luigimoretti.com';
        status.append(link, '.');
    };

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
        status.textContent = '';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            });
            const result = await response.json();

            if (response.ok && result.success) {
                form.reset();
                showStatus('success', "Thanks, your message is on its way. I'll reply within a few days.");
            } else {
                showError();
            }
        } catch (err) {
            showError();
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = btnLabel;
        }
    });
})();
