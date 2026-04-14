/* ═══════════════════════════════════════════
   GRIGO AUTOMOTIVE'S — Advanced UX Logic
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── LANGUAGE ENGINE ── */
    let currentLang = localStorage.getItem('grigo_lang') || 'ro';

    function setLang(lang) {
        currentLang = lang;
        localStorage.setItem('grigo_lang', lang);

        const isRo = lang === 'ro';
        document.documentElement.lang = lang;

        // Toggle visibility of language-specific elements
        document.querySelectorAll('[data-ro]').forEach(el => {
            el.style.display = isRo ? '' : 'none';
        });
        document.querySelectorAll('[data-en]').forEach(el => {
            el.style.display = isRo ? 'none' : '';
        });

        // Update Button States (Desktop & Mobile Segmented Controls)
        const langToggles = document.querySelectorAll('.ios-segmented-control');
        langToggles.forEach(toggle => {
            if (isRo) {
                toggle.classList.remove('en-active');
                toggle.querySelector('button:nth-of-type(1)').classList.add('active');
                toggle.querySelector('button:nth-of-type(2)').classList.remove('active');
            } else {
                toggle.classList.add('en-active');
                toggle.querySelector('button:nth-of-type(1)').classList.remove('active');
                toggle.querySelector('button:nth-of-type(2)').classList.add('active');
            }
        });
    }

    // Expose to window for inline onclick handlers
    window.setLang = setLang;
    setLang(currentLang);


    /* ── MOBILE MENU LOGIC ── */
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks   = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate toggle lines if needed (handled in CSS mostly, but logic here)
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }


    /* ── NAVBAR SCROLL REACTION ── */
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check


    /* ── INTERSECTION OBSERVER (REVEAL ANIMATIONS) ── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once revealed
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });


    /* ── SMOOTH SCROLLING ── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = target.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
