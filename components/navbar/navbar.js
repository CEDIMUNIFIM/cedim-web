/* Requiere que site-chrome.js se haya ejecutado antes: es quien crea
   el .navbar y el botón que se consultan aquí. */
const navbar = document.querySelector(".navbar");
const navbarToggle = document.querySelector(".navbar-toggle");

window.addEventListener("scroll", () => {

    if(window.scrollY > 40){

        navbar.classList.add("navbar-scrolled");

    }else{

        navbar.classList.remove("navbar-scrolled");

    }

});

/* Un solo sitio que sincroniza clase, aria-expanded e icono, para que
   no puedan quedar en desacuerdo entre sí. */
function setMenuOpen(isOpen){

    navbar.classList.toggle("navbar-open",isOpen);

    navbarToggle.setAttribute("aria-expanded",isOpen);

    navbarToggle.textContent = isOpen ? "✕" : "☰";
}

navbarToggle.addEventListener("click", () => {

    setMenuOpen(!navbar.classList.contains("navbar-open"));

});

document.querySelectorAll(".navbar-links a").forEach((link) => {

    link.addEventListener("click", () => setMenuOpen(false));

});

/* Escape cierra el menú y devuelve el foco al botón. Sin esto, quien
   navega con teclado no tiene forma de salir del menú sin recorrerlo
   entero, y al cerrarlo el foco se quedaría en un enlace ya oculto.

   No se atrapa el foco dentro del menú a propósito: no es un diálogo
   modal, sino un panel que se despliega, y atrapar el foco en algo no
   modal desorienta más de lo que ayuda. El orden del marcado ya hace
   que el tabulador entre en los enlaces y siga hacia la página. */
document.addEventListener("keydown", (event) => {

    if(event.key !== "Escape") return;

    if(!navbar.classList.contains("navbar-open")) return;

    setMenuOpen(false);

    navbarToggle.focus();

});
