const navbar = document.querySelector(".navbar");
const navbarToggle = document.querySelector(".navbar-toggle");

window.addEventListener("scroll", () => {

    if(window.scrollY > 40){

        navbar.classList.add("navbar-scrolled");

    }else{

        navbar.classList.remove("navbar-scrolled");

    }

});

navbarToggle.addEventListener("click", () => {

    const isOpen = navbar.classList.toggle("navbar-open");

    navbarToggle.setAttribute("aria-expanded", isOpen);

    navbarToggle.textContent = isOpen ? "✕" : "☰";

});

document.querySelectorAll(".navbar-links a").forEach((link) => {

    link.addEventListener("click", () => {

        navbar.classList.remove("navbar-open");

        navbarToggle.setAttribute("aria-expanded", "false");

        navbarToggle.textContent = "☰";

    });

});