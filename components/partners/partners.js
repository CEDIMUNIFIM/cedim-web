/* ==========================================
   Partners — render de la franja de aliados
========================================== */

/* Los datos están en assets/js/data/partners.js, que index.html carga
   antes que este archivo.

   No usa el render de cards.js porque no son tarjetas: es una franja de
   logos. Repite las cuatro líneas de "ocultar si está vacío" a
   propósito, en lugar de llamar a cards.js, para no crear una
   dependencia invisible entre dos componentes. */

const PARTNER_LOGO_BASE = "assets/img/partners/";

/* Con logo si existe el archivo; si no, el nombre como texto. Así la
   sección funciona desde el primer día y mejora cuando lleguen los
   logos, sin tocar código. */
function createPartner(partner){

    const hasLink = Boolean(partner.href);

    const element = document.createElement(hasLink ? "a" : "div");
    element.className = "partner";

    if(hasLink){
        element.href = partner.href;
        element.target = "_blank";
        element.rel = "noopener noreferrer";
    }

    if(partner.logo){

        const logo = document.createElement("img");
        logo.src = PARTNER_LOGO_BASE + partner.logo;
        logo.alt = partner.name;
        logo.loading = "lazy";

        element.append(logo);

    }else{

        element.textContent = partner.name;
    }

    return element;
}

function renderPartners(){

    const section = document.getElementById("partners-section");
    const container = document.getElementById("partners-list");

    if(!section || !container) return;

    /* typeof: si partners.js se rompe al editarlo, la sección
       desaparece en vez de dejar la portada a medias. */
    const list = typeof partners === "undefined" ? [] : partners;

    if(list.length === 0){
        section.hidden = true;
        return;
    }

    container.replaceChildren(...list.map(createPartner));
}

renderPartners();
