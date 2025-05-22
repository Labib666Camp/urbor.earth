document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 70;

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navUl = document.querySelector('nav ul');

    if (navToggle && navUl) {
        navToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                updateActiveLink(targetId);
                if (navUl && navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });

    function updateActiveLink(targetId) {
        navLinks.forEach(nav => nav.classList.remove('active'));
        const activeLink = document.querySelector(`nav ul li a[href="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            console.log("Form submitted (simulated):");
            const formData = new FormData(this);
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    const animatedSections = document.querySelectorAll('.content-section, .solution-row-section');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    animatedSections.forEach(section => { sectionObserver.observe(section); });

    const pageSections = document.querySelectorAll('main section[id]');
    window.addEventListener('scroll', () => {
        let currentActiveId = '';
        const scrollPosition = window.pageYOffset;
        pageSections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentActiveId = '#' + section.getAttribute('id');
            }
        });
        if (!currentActiveId && scrollPosition < (pageSections.length > 0 ? pageSections[0].offsetTop - headerHeight : 0)) {
            currentActiveId = '#hero';
        }
        if (currentActiveId) { updateActiveLink(currentActiveId); }
        else { navLinks.forEach(nav => nav.classList.remove('active')); }
    });

    let initialSectionInView = '#hero';
    if (pageSections.length > 0) {
        for (let section of pageSections) {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                initialSectionInView = '#' + section.getAttribute('id');
                break;
            }
        }
    }
    updateActiveLink(initialSectionInView);

    // Set current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});