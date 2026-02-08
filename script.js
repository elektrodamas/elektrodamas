document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".has-animation");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 50);
            }
        });
    }, { threshold: 0.3 });

    elements.forEach(element => observer.observe(element));

    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');

    if (hamburger && navList) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navList.classList.toggle('active');

            // Accessibility: Update aria-expanded
            const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
            hamburger.setAttribute('aria-expanded', !expanded);
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Dark Mode Toggle with enhanced transitions
    const toggleButton = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const html = document.documentElement;

    // Check for saved user preference or system preference with error handling
    try {
        if (localStorage.getItem('dark-mode') === 'enabled' || 
            (!localStorage.getItem('dark-mode') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            body.classList.add('dark-mode');
            html.classList.add('dark-mode');
            if (toggleButton) {
                toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
                toggleButton.setAttribute('aria-label', 'Switch to light mode');
            }
        } else if (toggleButton) {
            toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
            toggleButton.setAttribute('aria-label', 'Switch to dark mode');
        }
    } catch (e) {
        // localStorage might not be available (private browsing, etc.)
        console.warn('localStorage not available:', e);
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            html.classList.toggle('dark-mode');
            
            try {
                if (body.classList.contains('dark-mode')) {
                    toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
                    toggleButton.setAttribute('aria-label', 'Switch to light mode');
                    localStorage.setItem('dark-mode', 'enabled');
                } else {
                    toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
                    toggleButton.setAttribute('aria-label', 'Switch to dark mode');
                    localStorage.setItem('dark-mode', 'disabled');
                }
            } catch (e) {
                console.warn('Could not save dark mode preference:', e);
            }
        });
    }

    // Dynamic Copyright Year
    const yearElement = document.getElementById('copyright-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Form Validation and Submission Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const submitBtn = document.getElementById('submit-btn');
        const formMessage = document.getElementById('form-message');

        // Validate form on input
        const validateField = (field, errorElement) => {
            let isValid = false;
            
            if (field === nameInput) {
                isValid = field.value.trim().length >= 2;
                errorElement.textContent = isValid ? '' : 'Name must be at least 2 characters';
            } else if (field === emailInput) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
                isValid = emailRegex.test(field.value);
                errorElement.textContent = isValid ? '' : 'Please enter a valid email address';
            } else if (field === messageInput) {
                isValid = field.value.trim().length >= 10;
                errorElement.textContent = isValid ? '' : 'Message must be at least 10 characters';
            }
            
            field.classList.toggle('error', !isValid);
            return isValid;
        };

        // Add event listeners for real-time validation
        nameInput.addEventListener('blur', () => validateField(nameInput, document.getElementById('name-error')));
        emailInput.addEventListener('blur', () => validateField(emailInput, document.getElementById('email-error')));
        messageInput.addEventListener('blur', () => validateField(messageInput, document.getElementById('message-error')));

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Clear previous messages
            formMessage.className = 'form-message';
            formMessage.textContent = '';

            // Validate all fields
            const isNameValid = validateField(nameInput, document.getElementById('name-error'));
            const isEmailValid = validateField(emailInput, document.getElementById('email-error'));
            const isMessageValid = validateField(messageInput, document.getElementById('message-error'));

            if (!isNameValid || !isEmailValid || !isMessageValid) {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Please fix the errors above before submitting.';
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            formMessage.className = 'form-message loading';
            formMessage.textContent = 'Formular wird gesendet...';

            try {
                // Submit form
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    formMessage.className = 'form-message success';
                    formMessage.textContent = 'Vielen Dank! Ihre Nachricht wurde erfolgreich versendet. Wir werden Sie bald kontaktieren.';
                    contactForm.reset();
                    
                    // Clear error messages
                    document.getElementById('name-error').textContent = '';
                    document.getElementById('email-error').textContent = '';
                    document.getElementById('message-error').textContent = '';
                    
                    // Redirect after 2 seconds
                    setTimeout(() => {
                        window.location.href = 'https://elektro-damas.de/success';
                    }, 2000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Es gab einen Fehler beim Senden des Formulars. Bitte versuchen Sie es später erneut.';
                submitBtn.disabled = false;
            }
        });
    }
});
