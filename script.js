document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".has-animation");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
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
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check for saved user preference
    if (localStorage.getItem('dark-mode') === 'enabled') {
        body.classList.add('dark-mode');
        if (toggleButton) {
            toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>'; // Sun icon for dark mode
            toggleButton.setAttribute('aria-label', 'Switch to light mode');
        }
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>'; // Moon icon for light mode
                toggleButton.setAttribute('aria-label', 'Switch to dark mode');
                localStorage.setItem('dark-mode', 'disabled');
            } else {
                body.classList.add('dark-mode');
                toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>'; // Sun icon for dark mode
                toggleButton.setAttribute('aria-label', 'Switch to light mode');
                localStorage.setItem('dark-mode', 'enabled');
            }
        });
    }
});
