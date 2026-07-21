const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const yearEl = document.getElementById('year');
const contactForm = document.getElementById('contact-form');

if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
}

if (navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = document.body.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('nav-open')) {
        document.body.classList.remove('nav-open');
        if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.focus();
        }
    }
});

// Contact form → mailto with composed subject/body
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(contactForm);
        const name = String(data.get('name') || '').trim();
        const email = String(data.get('email') || '').trim();
        const message = String(data.get('body') || '').trim();

        const subject = encodeURIComponent(`Portfolio message from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\n${message}`
        );

        window.location.href = `mailto:briankemei01@gmail.com?subject=${subject}&body=${body}`;
    });
}

// Active nav link on scroll
const sections = document.querySelectorAll('main section[id]');

function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    let current = 'home';

    sections.forEach((section) => {
        if (section.offsetTop <= scrollY) {
            current = section.id;
        }
    });

    navLinks.forEach((link) => {
        const href = link.getAttribute('href') || '';
        link.classList.toggle('is-active', href === `#${current}`);
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();
