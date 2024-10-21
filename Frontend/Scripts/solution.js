document.addEventListener("DOMContentLoaded", function () {
    // Scroll Effect for Navbar
    let lastScrollTop = 0;
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", function () {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Adding/removing 'scrolled' class to change the background color
        if (currentScroll > 0) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Hide navbar on scroll down and show on scroll up
        if (currentScroll > lastScrollTop) {
            // Scroll down - hide navbar
            navbar.style.top = "-70px"; // Adjust this value based on your navbar height
        } else {
            // Scroll up - show navbar
            navbar.style.top = "0";
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative values


        // Hide the hamburger menu when clicking outside
    document.addEventListener("click", function (event) {
        const isClickInsideMenu = navbarLinks.contains(event.target);
        const isClickOnToggle = toggleButton.contains(event.target);

        if (!isClickInsideMenu && !isClickOnToggle) {
            navbarLinks.classList.remove("show");
        }
    });
    
    });

    // Hamburger Menu Toggle for Mobile View
    const toggleButton = document.querySelector(".menu-toggle");
    const navbarLinks = document.querySelector("#navbar ul.nav-links");

    toggleButton.addEventListener("click", () => {
        navbarLinks.classList.toggle("show");
    });

    // GSAP Scroll Animation for Cards
    gsap.registerPlugin(ScrollTrigger);

    // Apply GSAP animation to each card
    const solutionCards = document.querySelectorAll(".solution-card");

    solutionCards.forEach((card, index) => {
        gsap.fromTo(
            card,
            {
                // Initial state: slightly rotated on Y-axis and hidden
                opacity: 0,
                rotateY: 45,
                y: 100,
            },
            {
                // Final state: visible, original position, no rotation
                opacity: 1,
                rotateY: 0,
                y: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card, // Trigger the animation when the card is in view
                    start: "top 80%", // Start the animation when the card's top is at 80% of viewport
                    end: "bottom 20%",
                    scrub: true, // Smooth scrolling effect
                },
            }
        );
    });
});