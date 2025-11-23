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

// Dynamic Copyright Year
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('copyright-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Photo Gallery Modal
let slideIndex = 1;
let currentImages = [];

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close")[0];

    if (modal) {
        const projectImages = document.querySelectorAll('.project-card img');

        projectImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function () {
                modal.style.display = "block";

                // Get images from data attribute or fallback to src
                const imagesAttr = this.getAttribute('data-images');
                if (imagesAttr) {
                    currentImages = imagesAttr.split(',');
                } else {
                    currentImages = [this.src];
                }

                slideIndex = 1;
                showSlides(slideIndex, this.alt);
            });
        });

        if (closeBtn) {
            closeBtn.onclick = function () {
                modal.style.display = "none";
            }
        }

        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }
});

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n, altText) {
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");

    if (n > currentImages.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = currentImages.length }

    modalImg.src = currentImages[slideIndex - 1];
    if (altText) {
        captionText.innerHTML = `${altText} (${slideIndex}/${currentImages.length})`;
    } else {
        captionText.innerHTML = `Bild ${slideIndex} von ${currentImages.length}`;
    }
}
