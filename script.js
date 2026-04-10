/* ═══════════════════════════════════════════
   GRIGO AUTOMOTIVE'S — script.js
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ── LANGUAGE TOGGLE ──────────────────────────────────────
    let currentLang = localStorage.getItem('grigo_lang') || 'ro';

    function setLang(lang) {
        currentLang = lang;
        localStorage.setItem('grigo_lang', lang);

        const isRo = lang === 'ro';
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-ro]').forEach(el => {
            el.style.display = isRo ? '' : 'none';
        });
        document.querySelectorAll('[data-en]').forEach(el => {
            el.style.display = isRo ? 'none' : '';
        });

        document.getElementById('btn-ro').classList.toggle('active', isRo);
        document.getElementById('btn-en').classList.toggle('active', !isRo);
    }

    // expose to inline onclick
    window.setLang = setLang;
    setLang(currentLang);


    // ── MOBILE MENU ──────────────────────────────────────────
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks  = document.getElementById('nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links a').forEach(a => {
            a.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }


    // ── NAVBAR SCROLL EFFECT ─────────────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (!navbar) return;
        if (window.scrollY > 60) {
            navbar.style.background = 'rgba(10,12,15,0.97)';
            navbar.style.boxShadow  = '0 4px 24px rgba(0,0,0,0.6)';
        } else {
            navbar.style.background = '';
            navbar.style.boxShadow  = '';
        }
    }, { passive: true });


    // ── SCROLL REVEAL ANIMATIONS ─────────────────────────────
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));


    // ── GALLERY IMAGE FALLBACK ────────────────────────────────
    document.querySelectorAll('.gallery-hero-img img').forEach(img => {
        img.addEventListener('error', () => {
            const wrapper = img.closest('.gallery-hero-img');
            if (wrapper) {
                img.style.display = 'none';
                const errEl = wrapper.querySelector('.gallery-img-error');
                if (errEl) errEl.style.display = 'flex';
            }
        });
    });


    // ── SMOOTH ANCHOR OFFSET (accounts for sticky topbar + navbar) ──
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const id = link.getAttribute('href').slice(1);
            const target = document.getElementById(id);
            if (!target) return;
            e.preventDefault();
            const offset = 90;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

});
