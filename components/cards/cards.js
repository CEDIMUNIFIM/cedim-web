/* ==========================================
   Cards — render de proyectos, convocatorias y talleres
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

    const header = document.createElement("div");
    header.className = "card-header";

    header.append(createTitle(call.title),createStatus(call.status,call.statusLabel));

    card.append(header,createDescription(call.description));

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

    card.append(createTitle(workshop.title),createDescription(workshop.description));

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

/* Si un archivo de datos tiene un error de sintaxis nunca llega a
   definirse. Sin estas guardas la sección reventaría en silencio; así
   cae en el estado vacío y el resto de la página sigue viva. */
const projectList = typeof projects === "undefined" ? [] : projects;
const callList = typeof openCalls === "undefined" ? [] : openCalls;
const workshopList = typeof workshops === "undefined" ? [] : workshops;

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
