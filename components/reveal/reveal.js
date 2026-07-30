/* Aparición al hacer scroll (mejora progresiva).

   El estado oculto lo aplica este script, no el CSS de los
   componentes: sin JavaScript nada llega a ocultarse. Por eso mismo
   debe cargarse el ÚLTIMO en cada página, después de los renderers,
   para que las tarjetas que observa ya existan en el DOM.

   Con prefers-reduced-motion activo no se hace nada en absoluto. */
(function(){

    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if(!("IntersectionObserver" in window)) return;

    const targets = document.querySelectorAll(".card, .partner, .section-title");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if(!entry.isIntersecting) return;

            entry.target.classList.add("reveal-visible");

            observer.unobserve(entry.target);

        });

    }, { threshold:.15, rootMargin:"0px 0px -40px" });

    targets.forEach((el, index) => {

        el.classList.add("reveal");

        /* Escalonado corto por orden en la página; el módulo evita que
           una lista larga acumule esperas al final. */
        el.style.transitionDelay = `${(index % 6) * 60}ms`;

        /* Al terminar, se limpia todo: la transición de .reveal
           sustituiría a la propia del componente (hover de .card,
           etc.) mientras la clase siguiera puesta. */
        el.addEventListener("transitionend", () => {

            el.classList.remove("reveal","reveal-visible");

            el.style.transitionDelay = "";

        }, { once:true });

        observer.observe(el);

    });

})();
