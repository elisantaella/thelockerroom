// ================================
// The Locker Room Website - JavaScript
// ================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initCounterAnimation();
    initFeaturePills();
    initTestimonialSlider();
    initSmoothScroll();
    initParallax();
});

// ================================
// Navbar Scroll Effect
// ================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
        const scrollY = window.scrollY;
        
        // Add/remove scrolled class
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
}

// ================================
// Mobile Menu
// ================================
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');
    
    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ================================
// Scroll Animations (AOS-like)
// ================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

// ================================
// Counter Animation
// ================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;

    const animateCounters = () => {
        if (animated) return;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            
            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-out-expo)
                const easeOutExpo = 1 - Math.pow(2, -10 * progress);
                const current = Math.floor(target * easeOutExpo);
                
                counter.textContent = current.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            requestAnimationFrame(updateCounter);
        });
        
        animated = true;
    };

    // Observe stats section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        }, { threshold: 0.3 });
        
        observer.observe(statsSection);
    }
}

// ================================
// Feature Pills Interaction
// ================================
function initFeaturePills() {
    const pills = document.querySelectorAll('.feature-pill');
    const showcaseContent = document.getElementById('showcase-content');
    
    const features = {
        feed: {
            title: 'Your Personalized Feed',
            description: 'See what\'s happening at your school in real-time. Trending posts, latest updates, and content from people you follow — all in one beautiful, infinitely scrolling feed.',
            list: [
                'Upvote and downvote to surface the best content',
                'Repost with your own commentary',
                'Share photos, videos, and more',
                'Sort by trending, new, or top posts'
            ],
            icon: '📱'
        },
        polls: {
            title: 'Interactive Polls',
            description: 'Create polls to get your school\'s opinion on anything. From serious topics to fun debates, see what everyone thinks in real-time.',
            list: [
                'Multiple choice and ranking polls',
                'Anonymous voting options',
                'Real-time results with percentages',
                'Share results as posts'
            ],
            icon: '📊'
        },
        dms: {
            title: 'Direct Messages',
            description: 'Connect privately with classmates. Whether it\'s about homework, hangouts, or just chatting, DMs keep your conversations personal.',
            list: [
                'End-to-end encrypted messaging',
                'Send photos and media',
                'Read receipts and typing indicators',
                'Message requests from non-followers'
            ],
            icon: '💬'
        },
        anon: {
            title: 'Anonymous Posting',
            description: 'Sometimes you want to share without your name attached. Our anonymous posting lets you speak freely while keeping the community safe.',
            list: [
                'Full anonymity from other users',
                'Same community guidelines apply',
                'Moderated for safety',
                'Build karma without revealing identity'
            ],
            icon: '🎭'
        },
        rmp: {
            title: 'Rate My Professor',
            description: 'Get honest reviews from students who\'ve actually taken the class. Make smarter choices about your schedule based on real experiences.',
            list: [
                'Honest teacher reviews',
                'Difficulty and workload ratings',
                'Tips for success in each class',
                'Filter by subject and grade level'
            ],
            icon: '⭐'
        },
        notifs: {
            title: 'Smart Notifications',
            description: 'Stay in the loop without being overwhelmed. Our intelligent notification system knows what matters to you.',
            list: [
                'Customizable notification preferences',
                'Trending post alerts',
                'Friend activity updates',
                'Quiet hours and focus modes'
            ],
            icon: '🔔'
        }
    };

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Update active state
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            
            // Get feature data
            const featureKey = pill.getAttribute('data-feature');
            const feature = features[featureKey];
            
            if (feature && showcaseContent) {
                // Animate out
                showcaseContent.style.opacity = '0';
                showcaseContent.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    // Update content
                    showcaseContent.innerHTML = `
                        <div class="showcase-text">
                            <h3>${feature.title}</h3>
                            <p>${feature.description}</p>
                            <ul class="showcase-list">
                                ${feature.list.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="showcase-visual">
                            <div class="visual-card">
                                <div class="visual-icon">${feature.icon}</div>
                                <div class="visual-animation">
                                    <div class="floating-post"></div>
                                    <div class="floating-post delay-1"></div>
                                    <div class="floating-post delay-2"></div>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    // Animate in
                    requestAnimationFrame(() => {
                        showcaseContent.style.opacity = '1';
                        showcaseContent.style.transform = 'translateY(0)';
                    });
                }, 200);
            }
        });
    });

    // Add transition styles to showcase content
    if (showcaseContent) {
        showcaseContent.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    }
}

// ================================
// Testimonial Slider
// ================================
function initTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    if (!track) return;

    // Clone testimonials for infinite scroll
    const testimonials = track.innerHTML;
    track.innerHTML = testimonials + testimonials;

    // Pause on hover
    track.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
    });

    track.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
    });
}

// ================================
// Smooth Scroll
// ================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================================
// Parallax Effects
// ================================
function initParallax() {
    const orbs = document.querySelectorAll('.gradient-orb');
    let ticking = false;

    const updateParallax = () => {
        const scrollY = window.scrollY;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.05;
            const yPos = scrollY * speed;
            orb.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// ================================
// Button Ripple Effect
// ================================
document.querySelectorAll('.btn, .nav-cta, .download-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple styles dynamically
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .btn, .nav-cta, .download-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// ================================
// Typing Effect for Hero (Optional Enhancement)
// ================================
function initTypingEffect() {
    const element = document.querySelector('.hero-title .gradient-text');
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--primary)';
    
    let i = 0;
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        } else {
            element.style.borderRight = 'none';
        }
    };
    
    // Start after hero animation
    setTimeout(type, 1000);
}

// ================================
// Dropdown Keyboard Navigation
// ================================
document.querySelectorAll('.nav-item.dropdown').forEach(dropdown => {
    const button = dropdown.querySelector('.nav-link');
    const menu = dropdown.querySelector('.dropdown-menu');
    const items = menu.querySelectorAll('.dropdown-item');
    let currentFocus = -1;

    button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            menu.style.opacity = menu.style.opacity === '1' ? '0' : '1';
            menu.style.visibility = menu.style.visibility === 'visible' ? 'hidden' : 'visible';
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            currentFocus = 0;
            items[currentFocus].focus();
        }
    });

    items.forEach((item, index) => {
        item.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                currentFocus = (index + 1) % items.length;
                items[currentFocus].focus();
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                currentFocus = index - 1 < 0 ? items.length - 1 : index - 1;
                items[currentFocus].focus();
            }
            if (e.key === 'Escape') {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                button.focus();
            }
        });
    });
});

// ================================
// Form Validation (for future use)
// ================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ================================
// Preloader (Optional)
// ================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('[data-aos]').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                const delay = el.getAttribute('data-aos-delay') || 0;
                setTimeout(() => el.classList.add('aos-animate'), parseInt(delay));
            }
        });
    }, 100);
});

// ================================
// Performance: Debounce utility
// ================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ================================
// Performance: Throttle utility
// ================================
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ================================
// Console Easter Egg
// ================================
console.log('%c🏫 The Locker Room', 'font-size: 24px; font-weight: bold; color: #FF6B35;');
console.log('%cYour school. Your community. Your voice.', 'font-size: 14px; color: #666;');
console.log('%cInterested in how we built this? We\'re always looking for talented developers!', 'font-size: 12px; color: #999;');