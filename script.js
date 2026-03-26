document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // 2. Dark/Light Mode Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const toggleIcon = document.getElementById('toggle-icon');

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default dark
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);
    });

    function updateToggleIcon(theme) {
        if (theme === 'light') {
            toggleIcon.className = 'fas fa-sun';
        } else {
            toggleIcon.className = 'fas fa-moon';
        }
    }

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Progress Bars Animation
    const progressBars = document.querySelectorAll('.progress');

    const progressObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));

    // 5. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // 6. EmailJS Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const submitText = document.getElementById('submit-text');
            const submitIcon = document.getElementById('submit-icon');

            // Save original button state
            const originalText = submitText.innerText;
            const originalIconClass = submitIcon.className;

            // Change button to loading state
            submitText.innerText = 'Sending...';
            submitIcon.className = 'fas fa-spinner fa-spin';

            // Send email via EmailJS (Integrated Service ID and Template ID)
            emailjs.sendForm('service_rnj3mvb', 'template_skrm7vs', this)
                .then(() => {
                    // Success
                    submitText.innerText = 'Sent Successfully!';
                    submitIcon.className = 'fas fa-check-circle';
                    contactForm.reset();

                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitText.innerText = originalText;
                        submitIcon.className = originalIconClass;
                    }, 3000);
                }, (error) => {
                    // Error
                    console.error('EmailJS Error:', error);
                    submitText.innerText = 'Failed to Send';
                    submitIcon.className = 'fas fa-exclamation-circle';

                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitText.innerText = originalText;
                        submitIcon.className = originalIconClass;
                    }, 3000);
                });
        });
    }
});
