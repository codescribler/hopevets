/* ==========================================
   Hope Vets — Main JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ── Initialise libraries ──────────────────────────────
    AOS.init({
        duration: 700,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });

    lucide.createIcons();

    // ── Sticky Nav ────────────────────────────────────────
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    const handleNavScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 80) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
        lastScroll = scrollY;
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // ── Mobile Menu Toggle ────────────────────────────────
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu  = document.getElementById('mobile-menu');
    const menuIcon    = document.getElementById('menu-icon');
    let menuOpen = false;

    mobileToggle.addEventListener('click', () => {
        menuOpen = !menuOpen;
        mobileMenu.classList.toggle('open', menuOpen);
        mobileToggle.setAttribute('aria-expanded', menuOpen);
        menuIcon.setAttribute('data-lucide', menuOpen ? 'x' : 'menu');
        lucide.createIcons();
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            menuOpen = false;
            mobileMenu.classList.remove('open');
            mobileToggle.setAttribute('aria-expanded', false);
            menuIcon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });

    // ── Back to Top ───────────────────────────────────────
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backToTop.classList.remove('opacity-0', 'invisible', 'translate-y-4');
            backToTop.classList.add('opacity-100', 'visible', 'translate-y-0');
        } else {
            backToTop.classList.add('opacity-0', 'invisible', 'translate-y-4');
            backToTop.classList.remove('opacity-100', 'visible', 'translate-y-0');
        }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ── Smooth Scroll for Anchor Links ────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ── Active Nav-Link Highlighting ──────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('nav-active');
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.classList.add('nav-active');
                    }
                });
            }
        });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(section => observer.observe(section));

    // ── Hero Parallax ─────────────────────────────────────
    const heroSection = document.getElementById('hero');

    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768) {
            const scrolled   = window.scrollY;
            const heroHeight = heroSection.offsetHeight;
            if (scrolled < heroHeight) {
                const parallaxBg = heroSection.querySelector('.hero-parallax');
                if (parallaxBg) {
                    parallaxBg.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
            }
        }
    }, { passive: true });

    // ── Paw Stamp Animation (trigger on scroll into view) ──
    const pawStamps = document.querySelectorAll('.paw-stamp');
    const pawObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('stamped');
                }, 2000);
                pawObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    pawStamps.forEach(stamp => pawObserver.observe(stamp));

    // ── Counter Animation for "Since 2003" ────────────────
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el   = entry.target;
                const text = el.textContent;
                if (text === 'Since 2003') {
                    let start      = 1990;
                    const end      = 2003;
                    const duration = 1500;
                    const step     = duration / (end - start);
                    const counter  = setInterval(() => {
                        start++;
                        el.textContent = `Since ${start}`;
                        if (start >= end) clearInterval(counter);
                    }, step);
                    counterObserver.unobserve(el);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.font-heading').forEach(el => {
        if (el.textContent.trim() === 'Since 2003') {
            counterObserver.observe(el);
        }
    });

});
