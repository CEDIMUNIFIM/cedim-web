/* ==========================================
   Cards — render de todo el contenido en rejilla
========================================== */

/* Los datos NO viven aquí: están en assets/js/data/, y cada página
   carga los que necesita ANTES que este archivo. Para cambiar el
   contenido se editan esos archivos; este solo se ocupa de dibujarlo.

   Construido con la API del DOM en lugar de innerHTML: los datos son
   texto escrito por usuarios, y textContent evita que ese contenido
   se interprete como HTML. */

/* Los datos guardan solo el nombre del archivo de imagen, no la ruta.
   Todas las páginas viven en la raíz, así que el prefijo es uno solo. */
const CARD_IMAGE_BASE = "assets/img/projects/";
const WORKSHOP_IMAGE_BASE = "assets/img/workshops/";
const CARD_DETAIL_BASE = "project.html?id=";

/* Cuántos proyectos se muestran en la portada */
const FEATURED_COUNT = 3;

/* ==========================================
   Piezas compartidas por los tres tipos
========================================== */

function createStatus(status,label){

    const element = document.createElement("span");
    element.className = `card-status card-status-${status}`;
    element.textContent = label;

    return element;
}

function createTitle(text){

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = text;

    return title;
}

/* Etiqueta de clasificación sobre el título. Devuelve null si el campo
   viene vacío, para no dejar un hueco. */
function createCategory(text){

    if(!text) return null;

    const category = document.createElement("p");
    category.className = "card-category";
    category.textContent = text;

    return category;
}

/* Línea de dato con icono: fecha, instructor, lugar, plazo. El icono
   se pasa como ruta SVG ya que son pocas y fijas. */
function createDetail(iconPath,text,extraClass){

    const detail = document.createElement("p");
    detail.className = extraClass ? `card-detail ${extraClass}` : "card-detail";

    const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
    svg.setAttribute("viewBox","0 0 24 24");
    svg.setAttribute("fill","none");
    svg.setAttribute("stroke","currentColor");
    svg.setAttribute("stroke-width","2");
    svg.setAttribute("stroke-linecap","round");
    svg.setAttribute("stroke-linejoin","round");
    svg.setAttribute("aria-hidden","true");

    iconPath.split("|").forEach((path) => {
        const shape = document.createElementNS("http://www.w3.org/2000/svg","path");
        shape.setAttribute("d",path);
        svg.append(shape);
    });

    detail.append(svg,document.createTextNode(text));

    return detail;
}

const ICON_CALENDAR = "M8 2v4|M16 2v4|M3 10h18|M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z";
const ICON_USER = "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2|M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z";
const ICON_PIN = "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0|M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0z";
const ICON_CLOCK = "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z|M12 6v6l4 2";

function createDescription(text){

    const description = document.createElement("p");
    description.className = "card-description";
    description.textContent = text;

    return description;
}

/* Devuelve null cuando no hay etiquetas, para que quien llame decida
   no añadir nada en lugar de dejar un contenedor vacío ocupando hueco.
   El || [] cubre que alguien omita el campo al editar los datos. */
function createTags(tags){

    const list = tags || [];

    if(list.length === 0) return null;

    const container = document.createElement("div");
    container.className = "card-tags";

    list.forEach((tag) => {
        const item = document.createElement("span");
        item.className = "card-tag";
        item.textContent = tag;
        container.append(item);
    });

    return container;
}

function createFooter(...content){

    const footer = document.createElement("div");
    footer.className = "card-footer";
    footer.append(...content);

    return footer;
}

/* Botón de acción. Los formularios del centro viven en Google Forms /
   Microsoft Forms, así que estos enlaces salen del sitio: cuando la
   URL es externa se abre en otra pestaña y se añade rel="noopener"
   para que la página destino no pueda tocar la nuestra. */
function createAction(label,href){

    const action = document.createElement("a");
    action.className = "btn btn-outline";
    action.href = href;
    action.textContent = label;

    if(/^https?:\/\//.test(href)){
        action.target = "_blank";
        action.rel = "noopener noreferrer";
    }

    return action;
}

function createMeta(text){

    const meta = document.createElement("span");
    meta.className = "card-meta";
    meta.textContent = text;

    return meta;
}

/* ==========================================
   Proyectos
========================================== */

function createProjectCard(project){

    const card = document.createElement("article");
    card.className = "card card-project";

    if(project.image){

        const image = document.createElement("img");
        image.className = "card-image";
        image.src = CARD_IMAGE_BASE + project.image;
        image.loading = "lazy";

        /* alt vacío a propósito: son ilustraciones sin información
           propia y el título va justo debajo, anunciarlas duplicaría. */
        image.alt = "";

        card.append(image);
    }

    const category = createCategory(project.category);
    if(category) card.append(category);

    const header = document.createElement("div");
    header.className = "card-header";

    const title = document.createElement("h3");
    title.className = "card-title";

    /* El enlace se estira sobre toda la tarjeta desde el CSS, así el
       área clicable es grande pero solo hay un enlace por tarjeta. */
    const link = document.createElement("a");
    link.href = CARD_DETAIL_BASE + encodeURIComponent(project.id);
    link.textContent = project.title;

    title.append(link);

    header.append(title,createStatus(project.status,project.statusLabel));

    card.append(header,createDescription(project.description));

    const tags = createTags(project.tags);
    if(tags) card.append(tags);

    card.append(createFooter(createMeta(project.year)));

    return card;
}

/* ==========================================
   Convocatorias
========================================== */

function createCallCard(call){

    const card = document.createElement("article");
    card.className = "card";

    const category = createCategory(call.category);
    if(category) card.append(category);

    const header = document.createElement("div");
    header.className = "card-header";

    header.append(createTitle(call.title),createStatus(call.status,call.statusLabel));

    card.append(header,createDescription(call.description));

    /* El plazo va resaltado: es el dato que decide si alguien postula
       o no, así que no se pierde entre el resto del texto. */
    if(call.deadline){
        card.append(createDetail(ICON_CLOCK,call.deadline,"card-detail-deadline"));
    }

    const requirements = call.requirements || [];

    if(requirements.length > 0){

        const list = document.createElement("ul");
        list.className = "card-requirements";

        requirements.forEach((requirement) => {
            const item = document.createElement("li");
            item.textContent = requirement;
            list.append(item);
        });

        card.append(list);
    }

    /* Con botón al formulario si la convocatoria sigue abierta; si no,
       el texto al pie que explique desde cuándo está cerrada. */
    if(call.actionLabel && call.actionHref){

        card.append(createFooter(createAction(call.actionLabel,call.actionHref)));

    }else if(call.meta){

        card.append(createFooter(createMeta(call.meta)));
    }

    return card;
}

/* ==========================================
   Talleres
========================================== */

function createWorkshopCard(workshop){

    const card = document.createElement("article");
    card.className = "card";

    if(workshop.image){

        const image = document.createElement("img");
        image.className = "card-image";
        image.src = WORKSHOP_IMAGE_BASE + workshop.image;
        image.loading = "lazy";
        image.alt = "";

        card.append(image);
    }

    card.append(createTitle(workshop.title),createDescription(workshop.description));

    /* Fecha, instructor y lugar: cada uno se omite si viene vacío, así
       un taller sin instructor asignado no muestra una línea a medias. */
    if(workshop.date)       card.append(createDetail(ICON_CALENDAR,workshop.date));
    if(workshop.instructor) card.append(createDetail(ICON_USER,workshop.instructor));
    if(workshop.location)   card.append(createDetail(ICON_PIN,workshop.location));

    const tags = createTags(workshop.tags);
    if(tags) card.append(tags);

    /* El pie admite duración y botón de inscripción a la vez; el CSS
       los separa a extremos opuestos. */
    const footerParts = [];

    if(workshop.meta) footerParts.push(createMeta(workshop.meta));

    if(workshop.actionLabel && workshop.actionHref){
        footerParts.push(createAction(workshop.actionLabel,workshop.actionHref));
    }

    if(footerParts.length > 0) card.append(createFooter(...footerParts));

    return card;
}

/* ==========================================
   Cifras
========================================== */

function createStatCard(stat){

    const card = document.createElement("article");
    card.className = "card card-stat";

    const value = document.createElement("p");
    value.className = "card-stat-value";
    value.textContent = stat.value;

    const label = document.createElement("p");
    label.className = "card-stat-label";
    label.textContent = stat.label;

    card.append(value,label);

    return card;
}

/* ==========================================
   Render
========================================== */

/* Dibuja en el contenedor indicado si existe en la página actual, así
   el mismo archivo sirve a todas las páginas sin condicionales. */
function renderCardsInto(containerId,list,createCard,emptyMessage){

    const grid = document.getElementById(containerId);

    if(!grid) return;

    if(list.length === 0){

        const empty = document.createElement("p");
        empty.className = "cards-empty";
        empty.textContent = emptyMessage;

        grid.replaceChildren(empty);

        return;
    }

    grid.replaceChildren(...list.map(createCard));
}

/* Las cifras son un adorno de la portada, no contenido principal: si no
   hay datos se oculta la sección entera en lugar de mostrar un aviso,
   que ahí quedaría fuera de lugar. */
function renderOrHideSection(sectionId,containerId,list,createCard){

    const section = document.getElementById(sectionId);
    const grid = document.getElementById(containerId);

    if(!section || !grid) return;

    if(list.length === 0){
        section.hidden = true;
        return;
    }

    grid.replaceChildren(...list.map(createCard));
}

/* Si un archivo de datos tiene un error de sintaxis nunca llega a
   definirse. Sin estas guardas la sección reventaría en silencio; así
   cae en el estado vacío y el resto de la página sigue viva. */
const projectList = typeof projects === "undefined" ? [] : projects;
const callList = typeof openCalls === "undefined" ? [] : openCalls;
const workshopList = typeof workshops === "undefined" ? [] : workshops;
const statList = typeof stats === "undefined" ? [] : stats;

renderCardsInto(
    "projects-grid",
    projectList,
    createProjectCard,
    "No projects published yet."
);

renderCardsInto(
    "featured-projects",
    projectList.slice(0,FEATURED_COUNT),
    createProjectCard,
    "No projects published yet."
);

renderCardsInto(
    "calls-grid",
    callList,
    createCallCard,
    "There are no open calls at the moment. Follow us on social media for the next intake."
);

renderCardsInto(
    "workshops-grid",
    workshopList,
    createWorkshopCard,
    "There are no workshops scheduled at the moment."
);

renderOrHideSection("stats-section","stats-grid",statList,createStatCard);
