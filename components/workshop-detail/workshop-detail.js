/* Botón "Expandir todo / Contraer todo" del temario. Mejora progresiva:
   nace con .hidden y solo se muestra si este script corre, porque sin JS
   no haría nada (los <details> siguen funcionando solos). */
function initSyllabus(){

    const button = document.getElementById("syllabus-toggle");
    const items = Array.from(document.querySelectorAll(".workshop-class"));

    if(!button || items.length === 0) return;

    const allOpen = () => items.every((item) => item.open);

    const syncLabel = () => {
        button.textContent = allOpen() ? "Contraer todo" : "Expandir todo";
    };

    button.classList.remove("hidden");

    button.addEventListener("click",() => {
        const open = !allOpen();
        items.forEach((item) => { item.open = open; });
    });

    /* Mantiene el texto correcto aunque se abra una clase a mano */
    items.forEach((item) => item.addEventListener("toggle",syncLabel));
}

initSyllabus();