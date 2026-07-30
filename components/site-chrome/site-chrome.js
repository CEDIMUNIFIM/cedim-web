/* ==========================================
   Site Chrome — navbar y footer compartidos
   ==========================================

   Sustituye al copiado a mano del navbar y el footer en cada página.
   Cada HTML solo declara dos contenedores vacíos:

       <div id="site-navbar"></div>
       <div id="site-footer"></div>

   y este archivo los rellena. Para cambiar el menú, el correo, la
   dirección o las redes sociales se edita AQUÍ y cambia en todo el
   sitio de una vez.

   Orden de carga en el HTML: este archivo va ANTES que navbar.js y
   footer.js, porque esos buscan elementos que aquí se crean.

   El markup se arma con plantillas de texto (no con createElement como
   en cards.js) porque es contenido nuestro y fijo, no texto escrito
   por usuarios: aquí no hay riesgo de inyección y se lee mucho mejor.
*/

const NAV_ITEMS = [
    { href:"index.html",      label:"Home" },
    { href:"about.html",      label:"About" },
    { href:"research.html",   label:"Research" },
    { href:"projects.html",   label:"Projects" },
    { href:"open-calls.html", label:"Open Calls" },
    { href:"workshops.html",  label:"Workshops" },
    { href:"#contact",        label:"Contact" }
];

const SITE_EMAIL = "cedim.uni@uni.edu.pe";
const SITE_ADDRESS = "Faculty of Mechanical Engineering, Building A3, 3rd floor — Av. Túpac Amaru 210, Rímac, Lima, Peru";

const SITE_SOCIAL = [
    {
        label:"Facebook",
        href:"https://web.facebook.com/cedimuni",
        icon:'<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>'
    },
    {
        label:"Instagram",
        href:"https://www.instagram.com/cedim.uni/",
        icon:'<rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>'
    },
    {
        label:"LinkedIn",
        href:"https://www.linkedin.com/in/centro-de-desarrollo-e-investigaci%C3%B3n-en-mecatr%C3%B3nica-fim-b24919340",
        icon:'<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle>'
    }
];

/* Nombre del archivo actual, para marcar la opción activa del menú.
   Al abrir una carpeta el navegador sirve index.html sin nombrarlo,
   de ahí el valor por defecto. */
function currentPage(){

    const file = window.location.pathname.split("/").pop();

    return file === "" ? "index.html" : file;
}

function navbarMarkup(){

    const page = currentPage();

    const links = NAV_ITEMS.map((item) => {

        const active = item.href === page ? ' class="is-active"' : "";

        return `<li><a href="${item.href}"${active}>${item.label}</a></li>`;

    }).join("");

    return `
    <header class="navbar">
        <div class="container navbar-container">

            <a href="index.html" class="navbar-logo">
                <img src="assets/img/logos/cedim-logo-white.svg" alt="CEDIM" />
            </a>

            <nav class="navbar-menu" aria-label="Main Navigation">
                <ul class="navbar-links">${links}</ul>
            </nav>

            <a href="open-calls.html" class="navbar-cta btn btn-primary">
                Join CEDIM
            </a>

            <button
                class="navbar-toggle"
                aria-label="Open navigation menu"
                aria-expanded="false">
                ☰
            </button>

        </div>
    </header>`;
}

function footerMarkup(){

    const links = NAV_ITEMS
        .filter((item) => item.href !== "#contact")
        .map((item) => `<li><a href="${item.href}">${item.label}</a></li>`)
        .join("");

    const social = SITE_SOCIAL.map((item) => `
        <a href="${item.href}" target="_blank" rel="noopener noreferrer" aria-label="${item.label}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${item.icon}</svg>
        </a>`).join("");

    return `
    <footer id="contact" class="footer">
        <div class="container footer-container">

            <div class="footer-brand">
                <a href="index.html" class="footer-logo">
                    <img src="assets/img/logos/cedim-logo-white.svg" alt="CEDIM" />
                </a>
                <p class="footer-description">
                    Mechatronics Research and Development Centre at
                    Universidad Nacional de Ingeniería.
                </p>
            </div>

            <nav class="footer-links" aria-label="Footer Navigation">
                <h3 class="footer-heading">Links</h3>
                <ul>${links}</ul>
            </nav>

            <div class="footer-contact">
                <h3 class="footer-heading">Contact</h3>
                <ul>
                    <li>
                        <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </svg>
                        <a href="mailto:${SITE_EMAIL}">${SITE_EMAIL}</a>
                    </li>
                    <li>
                        <svg class="footer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>${SITE_ADDRESS}</span>
                    </li>
                </ul>
            </div>

            <div class="footer-social">
                <h3 class="footer-heading">Follow us</h3>
                <div class="footer-social-links">${social}</div>
            </div>

        </div>

        <div class="footer-bottom">
            <p>&copy; <span id="footer-year"></span> CEDIM - Universidad Nacional de Ingeniería. All rights reserved.</p>
        </div>
    </footer>`;
}

function renderSiteChrome(){

    const navbarSlot = document.getElementById("site-navbar");
    const footerSlot = document.getElementById("site-footer");

    if(navbarSlot) navbarSlot.outerHTML = navbarMarkup();
    if(footerSlot) footerSlot.outerHTML = footerMarkup();
}

renderSiteChrome();
