/* ==========================================
   Project Detail — render de project.html
========================================== */

/* Una sola página sirve a todos los proyectos: lee el id de la URL
   (?id=robotic-arm), lo busca en assets/js/data/projects.js y se
   dibuja. Agregar un proyecto a ese archivo crea su página sola. */

const DETAIL_IMAGE_BASE = "assets/img/projects/";
const DETAIL_PROJECTS = "projects.html";

function createIcon(path){

    const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
    svg.setAttribute("viewBox","0 0 24 24");
    svg.setAttribute("fill","none");
    svg.setAttribute("stroke","currentColor");
    svg.setAttribute("stroke-width","2");
    svg.setAttribute("stroke-linecap","round");
    svg.setAttribute("stroke-linejoin","round");
    svg.setAttribute("aria-hidden","true");

    const shape = document.createElementNS("http://www.w3.org/2000/svg","path");
    shape.setAttribute("d",path);

    svg.append(shape);

    return svg;
}

function createBackLink(){

    const back = document.createElement("a");
    back.className = "project-back";
    back.href = DETAIL_PROJECTS;

    back.append(createIcon("m15 18-6-6 6-6"));
    back.append(document.createTextNode("Back to projects"));

    return back;
}

function renderNotFound(container){

    document.title = "Project not found | CEDIM";

    const wrapper = document.createElement("div");
    wrapper.className = "project-notfound";

    const title = document.createElement("h1");
    title.className = "page-title";
    title.textContent = "Project not found";

    const message = document.createElement("p");
    message.textContent = "The project you are looking for does not exist, or its link has changed.";

    const link = document.createElement("a");
    link.className = "btn btn-primary";
    link.href = DETAIL_PROJECTS;
    link.textContent = "View all projects";

    wrapper.append(title,message,link);
    container.replaceChildren(wrapper);
}

/* Construido con la API del DOM en lugar de innerHTML: los datos son
   texto escrito por usuarios, y textContent evita que ese contenido
   se interprete como HTML. */
function renderProject(container,project){

    document.title = `${project.title} | CEDIM`;

    const fragment = document.createDocumentFragment();

    fragment.append(createBackLink());

    const header = document.createElement("div");
    header.className = "project-header";

    const title = document.createElement("h1");
    title.className = "page-title";
    title.textContent = project.title;

    const status = document.createElement("span");
    status.className = `card-status card-status-${project.status}`;
    status.textContent = project.statusLabel;

    header.append(title,status);
    fragment.append(header);

    const meta = document.createElement("div");
    meta.className = "project-meta";

    const year = document.createElement("span");
    year.textContent = project.year;
    meta.append(year);

    /* || [] por si alguien omite el campo al editar los datos a mano. */
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

        meta.append(tags);
    }

    fragment.append(meta);

    if(project.image){

        const image = document.createElement("img");
        image.className = "project-image";
        image.src = DETAIL_IMAGE_BASE + project.image;
        image.alt = "";

        fragment.append(image);
    }

    const body = document.createElement("div");
    body.className = "project-body";

    const summary = document.createElement("p");
    summary.className = "project-summary";
    summary.textContent = project.summary || project.description;

    body.append(summary);

    const objectiveList = project.objectives || [];

    if(objectiveList.length > 0){

        const block = document.createElement("div");
        block.className = "project-block";

        const blockTitle = document.createElement("h2");
        blockTitle.className = "project-section-title";
        blockTitle.textContent = "Objectives";

        const list = document.createElement("ul");
        list.className = "project-objectives";

        objectiveList.forEach((objective) => {
            const item = document.createElement("li");
            item.textContent = objective;
            list.append(item);
        });

        block.append(blockTitle,list);
        body.append(block);
    }

    fragment.append(body);

    container.replaceChildren(fragment);
}

function renderProjectDetail(){

    const container = document.getElementById("project-content");

    if(!container) return;

    /* Igual que en cards.js: si projects.js se rompe al editarlo,
       la página muestra el estado "no encontrado" en vez de nada. */
    const list = typeof projects === "undefined" ? [] : projects;

    const id = new URLSearchParams(window.location.search).get("id");
    const project = list.find((item) => item.id === id);

    if(!project){
        renderNotFound(container);
        return;
    }

    renderProject(container,project);
}

renderProjectDetail();
