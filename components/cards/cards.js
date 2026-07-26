/* ==========================================
   Cards — render de proyectos
========================================== */

/* Los datos NO viven aquí: están en assets/js/data/projects.js, que
   index.html carga antes que este archivo. Para cambiar el contenido
   se edita ese archivo; este solo se ocupa de dibujarlo. */

/* Los datos guardan solo el nombre del archivo de imagen, no la ruta.
   Todas las páginas viven en la raíz, así que el prefijo es uno solo. */
const CARD_IMAGE_BASE = "assets/img/projects/";
const CARD_DETAIL_BASE = "project.html?id=";

/* Cuántos proyectos se muestran en la portada */
const FEATURED_COUNT = 3;

/* Construido con la API del DOM en lugar de innerHTML: los datos son
   texto escrito por usuarios, y textContent evita que ese contenido
   se interprete como HTML. */
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

    const status = document.createElement("span");
    status.className = `card-status card-status-${project.status}`;
    status.textContent = project.statusLabel;

    header.append(title,status);

    const description = document.createElement("p");
    description.className = "card-description";
    description.textContent = project.description;

    card.append(header,description);

    /* || [] por si alguien omite el campo al editar los datos a mano:
       vale más una tarjeta sin etiquetas que la sección entera rota. */
    const tagList = project.tags || [];

    if(tagList.length > 0){

        const tags = document.createElement("div");
        tags.className = "card-tags";

        tagList.forEach((tag) => {
            const item = document.createElement("span");
            item.className = "card-tag";
            item.textContent = tag;
            tags.append(item);
        });

        card.append(tags);
    }

    const footer = document.createElement("div");
    footer.className = "card-footer";

    const meta = document.createElement("span");
    meta.className = "card-meta";
    meta.textContent = project.year;

    footer.append(meta);

    card.append(footer);

    return card;
}

/* Dibuja en el contenedor indicado si existe en la página actual.
   index.html usa #featured-projects y projects.html #projects-grid,
   así que el mismo archivo sirve a ambas sin condicionales por página. */
function renderProjectsInto(containerId,list){

    const grid = document.getElementById(containerId);

    if(!grid) return;

    if(list.length === 0){

        const empty = document.createElement("p");
        empty.className = "cards-empty";
        empty.textContent = "No projects published yet.";

        grid.replaceChildren(empty);

        return;
    }

    grid.replaceChildren(...list.map(createProjectCard));
}

/* Si projects.js tiene un error de sintaxis nunca llega a definirse.
   Sin esta guarda la sección entera reventaría en silencio; así al
   menos cae en el estado vacío y el resto de la página sigue viva. */
const projectList = typeof projects === "undefined" ? [] : projects;

renderProjectsInto("projects-grid",projectList);
renderProjectsInto("featured-projects",projectList.slice(0,FEATURED_COUNT));
