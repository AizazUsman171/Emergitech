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
            navbar.style.backgroundColor = ""; // Reset to default color
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
    });

    // Hamburger Menu Toggle for Mobile View
    const toggleButton = document.querySelector(".menu-toggle");
    const navbarLinks = document.querySelector("#nav-links");

    toggleButton.addEventListener("click", () => {
        navbarLinks.classList.toggle("show");
    });

    // Hide the hamburger menu when clicking outside
    document.addEventListener("click", function (event) {
        const isClickInsideMenu = navbarLinks.contains(event.target);
        const isClickOnToggle = toggleButton.contains(event.target);

        if (!isClickInsideMenu && !isClickOnToggle) {
            navbarLinks.classList.remove("show");
        }
    });
});
