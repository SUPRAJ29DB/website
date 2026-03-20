// script.js - Interactive Features for Portfolio Website

document.addEventListener('DOMContentLoaded', () => {
    
    // ========== CUSTOM CURSOR ==========
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });
        
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .stat-card, .skill-tag');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '50px';
                cursorOutline.style.height = '50px';
                cursorOutline.style.borderColor = 'rgba(168, 85, 247, 0.9)';
                cursorOutline.style.backgroundColor = 'rgba(168, 85, 247, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '35px';
                cursorOutline.style.height = '35px';
                cursorOutline.style.borderColor = 'rgba(168, 85, 247, 0.6)';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }
    
    // ========== MOBILE MENU TOGGLE ==========
    const mobileMenuBtn = document.getElementById('mobileMenu');
    const navLinksDiv = document.getElementById('navLinks');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksDiv.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // ========== SMOOTH SCROLL & ACTIVE MENU HIGHLIGHT ==========
    const sections = ['home', 'about', 'projects', 'contact'];
    const navItems = document.querySelectorAll('.nav-item');
    
    function setActiveSection() {
        let current = '';
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    current = sectionId;
                }
            }
        });
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === current) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveSection);
    setActiveSection();
    
    // Scroll to section function
    function scrollToSection(sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu if open
            if (navLinksDiv.classList.contains('active')) {
                navLinksDiv.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    }
    
    // Add click listeners to nav items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.getAttribute('data-section');
            if (sectionId) scrollToSection(sectionId);
        });
    });
    
    // Button functionality
    const exploreBtn = document.getElementById('exploreWorkBtn');
    const contactBtn = document.getElementById('contactBtn');
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => scrollToSection('projects'));
    }
    if (contactBtn) {
        contactBtn.addEventListener('click', () => scrollToSection('contact'));
    }
    
    // ========== CONTACT FORM HANDLING ==========
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                feedback.textContent = '❌ Please fill all fields.';
                feedback.style.color = '#f87171';
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                feedback.textContent = '❌ Please enter a valid email address.';
                feedback.style.color = '#f87171';
                return;
            }
            
            feedback.textContent = '📡 Sending message...';
            feedback.style.color = '#c084fc';
            
            setTimeout(() => {
                feedback.innerHTML = '✅ Message sent successfully! I\'ll get back to you soon. ✨';
                feedback.style.color = '#4ade80';
                form.reset();
                setTimeout(() => {
                    feedback.textContent = '';
                }, 4000);
            }, 800);
        });
    }
    
    // ========== FLOATING SHAPES PARALLAX EFFECT ==========
    const shapes = document.querySelectorAll('.floating-shape');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        shapes.forEach((shape, idx) => {
            const speed = 15 + idx * 8;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // ========== SCROLL REVEAL ANIMATIONS ==========
    const revealElements = document.querySelectorAll('.project-card, .stat-card, .about-text, .contact-wrapper');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.6s ease';
        revealObserver.observe(el);
    });
    
    // ========== STATIC COUNTER ANIMATION ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        const aboutSection = document.querySelector('.about');
        if (aboutSection && aboutSection.getBoundingClientRect().top < window.innerHeight - 100) {
            animated = true;
            statNumbers.forEach(stat => {
                const targetText = stat.innerText;
                const target = parseInt(targetText);
                if (!isNaN(target)) {
                    let current = 0;
                    const increment = target / 40;
                    const interval = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.innerText = targetText;
                            clearInterval(interval);
                        } else {
                            stat.innerText = Math.floor(current);
                        }
                    }, 25);
                }
            });
        }
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats();
    
    // ========== UPDATE FOOTER YEAR ==========
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2025', currentYear);
    }
    
    // ========== RIPPLE EFFECT ON BUTTONS ==========
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255,255,255,0.4)';
            ripple.style.pointerEvents = 'none';
            ripple.style.transform = 'scale(0)';
            ripple.style.transition = 'transform 0.4s ease-out, opacity 0.3s ease';
            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            btn.appendChild(ripple);
            setTimeout(() => {
                ripple.style.transform = 'scale(4)';
                ripple.style.opacity = '0';
                setTimeout(() => ripple.remove(), 400);
            }, 10);
        });
    });
    
    console.log('✨ Website fully loaded — portfolio ready!');
});