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

// Mobile nav toggle (enhanced)
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.querySelector('.nav-overlay');
const body = document.body;

if (navToggle) {
    // Toggle menu
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
        navOverlay.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking overlay
    navOverlay.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        navOverlay.classList.remove('active');
        body.style.overflow = '';
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
            navOverlay.classList.remove('active');
            body.style.overflow = '';
        });
    });
}

// Experience Timeline Toggle
document.querySelectorAll('.timeline-header').forEach(header => {
    header.addEventListener('click', function() {
        const item = this.closest('.timeline-item');
        const isExpanded = item.getAttribute('data-expanded') === 'true';
        
        // Toggle expansion
        item.setAttribute('data-expanded', !isExpanded);
    });
});

// Achievements Filter with Sorting and Show More
const filterButtons = document.querySelectorAll('.filter-btn');
const achievementCards = document.querySelectorAll('.achievement-card');
const achievementsGrid = document.querySelector('.achievements-grid');
const showMoreBtn = document.querySelector('.show-more-btn');
let currentFilter = 'all';
let showingAll = false;

// Sort cards by date (newest first) on load
function sortAchievements() {
    const cardsArray = Array.from(achievementCards);
    cardsArray.sort((a, b) => {
        const dateA = a.getAttribute('data-date');
        const dateB = b.getAttribute('data-date');
        return dateB.localeCompare(dateA); // Descending order
    });
    
    // Reorder in DOM
    cardsArray.forEach(card => achievementsGrid.appendChild(card));
}

// Initial sort
sortAchievements();

// Filter functionality
function filterAchievements(filter) {
    currentFilter = filter;
    showingAll = false;
    showMoreBtn.classList.remove('expanded');
    showMoreBtn.querySelector('svg').style.transform = '';
    
    const cardsArray = Array.from(achievementCards);
    let visibleCount = 0;
    
    cardsArray.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        const shouldShow = filter === 'all' || category === filter;
        
        if (shouldShow) {
            visibleCount++;
            // Show first 9 cards (3 rows), hide rest initially
            if (visibleCount <= 9) {
                card.style.display = 'flex';
                card.classList.remove('hidden-by-show-more');
                setTimeout(() => {
                    card.style.opacity = '1';
                }, 10 * index);
            } else {
                card.style.display = 'none';
                card.classList.add('hidden-by-show-more');
            }
        } else {
            card.style.display = 'none';
            card.classList.remove('hidden-by-show-more');
        }
    });
    
    // Show/hide "Show More" button
    if (visibleCount > 9) {
        showMoreBtn.classList.remove('hidden');
    } else {
        showMoreBtn.classList.add('hidden');
    }
}

// Filter button clicks
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Apply filter
        filterAchievements(filter);
    });
});

// Show More button
showMoreBtn.addEventListener('click', function() {
    showingAll = !showingAll;
    
    const hiddenCards = document.querySelectorAll('.achievement-card.hidden-by-show-more');
    
    if (showingAll) {
        // Show all cards
        hiddenCards.forEach((card, index) => {
            card.style.display = 'flex';
            card.classList.remove('hidden-by-show-more');
            setTimeout(() => {
                card.style.opacity = '1';
            }, 50 * index);
        });
        this.textContent = 'Show Less';
        this.classList.add('expanded');
    } else {
        // Hide extra cards
        hiddenCards.forEach(card => {
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.display = 'none';
                card.classList.add('hidden-by-show-more');
            }, 300);
        });
        this.innerHTML = 'Show More<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 0.5rem; vertical-align: middle;"><polyline points="6 9 12 15 18 9"></polyline></svg>';
        this.classList.remove('expanded');
        
        // Scroll to achievements section
        document.querySelector('#achievements').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

// Initial filter
filterAchievements('all');
