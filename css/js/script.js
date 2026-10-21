
/* ======================================
   KISHOR M — PORTFOLIO JAVASCRIPT
====================================== */

/* 1. Typing Animation */

const words = [
    "Web Developer",
    "Frontend Developer",
    "Python Developer",
    "UI Designer"
];

const typingElement = document.querySelector(".typing");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingElement) return;

    const currentWord = words[wordIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingElement.textContent = currentWord.substring(0, charIndex);

    let speed = isDeleting ? 55 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 1400;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 350;
    }

    window.setTimeout(typeEffect, speed);
}

if (typingElement) {
    typeEffect();
}

/* 2. Mobile Navigation Menu */

const header = document.querySelector(".header");
const navbar = document.querySelector(".navbar");

if (header && navbar) {
    let menuButton = document.querySelector(".menu-btn");

    if (!menuButton) {
        menuButton = document.createElement("button");
        menuButton.className = "menu-btn";
        menuButton.type = "button";
        menuButton.setAttribute("aria-label", "Open navigation menu");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';

        header.appendChild(menuButton);
    }

    menuButton.addEventListener("click", () => {
        const isOpen = navbar.classList.toggle("nav-open");

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuButton.innerHTML = isOpen
            ? '<i class="fas fa-times" aria-hidden="true"></i>'
            : '<i class="fas fa-bars" aria-hidden="true"></i>';
    });

    navbar.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navbar.classList.remove("nav-open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Open navigation menu");
            menuButton.innerHTML =
                '<i class="fas fa-bars" aria-hidden="true"></i>';
        });
    });
}

/* 3. Active Navigation Link */

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".navbar a");

if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navigationLinks.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") === `#${entry.target.id}`;

                        link.classList.toggle("active", isActive);

                        if (isActive) {
                            link.setAttribute("aria-current", "location");
                        } else {
                            link.removeAttribute("aria-current");
                        }
                    });
                }
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px",
            threshold: 0
        }
    );

    sections.forEach((section) => sectionObserver.observe(section));
}
