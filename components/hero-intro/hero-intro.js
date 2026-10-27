/* ==========================================
   Hero Intro — manos de píxeles que se acercan y se dispersan
   ==========================================

   Dibuja en un <canvas> detrás del hero dos manos hechas de puntos
   (una robótica, una humana). Se ensamblan desde el desorden, quedan
   casi tocándose y, desde el punto de contacto, los puntos se dispersan
   y dejan ver el titular. Dura unos 2,6 s.

   Reglas que respeta (mismas ideas que reveal.js):
     - Mejora progresiva: el HTML del hero no cambia. Sin JavaScript, o
       con prefers-reduced-motion, la intro no existe y el hero se ve
       tal cual.
     - Una vez por sesión: quien vuelve a la portada no la ve repetida.
       Para volver a verla (por ejemplo, al revisar cambios) se abre
       index.html?intro
     - El texto del hero está en el HTML desde el inicio; este script
       solo lo oculta mientras corre la animación y lo muestra cuando
       empieza la dispersión. Hay un temporizador de seguridad que
       siempre lo devuelve.

   Cómo cambiar las manos: ver HERO_INTRO_IMAGES. Mientras valga null se
   usan dos siluetas provisionales dibujadas por código.

   Orden de carga: este archivo va antes de reveal.js, que debe seguir
   siendo el último script de la página. */

/* null  → siluetas provisionales (borrar heroIntroPlaceholder cuando
           ya no se usen).
   {robot:"hand-robot.webp", human:"hand-human.webp"} → nombres de
           archivo dentro de assets/img/hero/. Cada imagen es una mano
           que apunta hacia el centro: la robótica entra por la
           izquierda (apunta a la derecha) y la humana por la derecha
           (apunta a la izquierda). Sirven PNG/WebP con fondo
           transparente, o mano clara sobre fondo negro. */
const HERO_INTRO_IMAGES = null;
const HERO_INTRO_IMAGE_BASE = "assets/img/hero/";

const HERO_INTRO_KEY = "cedim-hero-intro";

/* Duración de cada fase, en segundos */
const HERO_INTRO_ASSEMBLE = 1.4;
const HERO_INTRO_HOLD = 0.35;
const HERO_INTRO_DISPERSE = 0.85;
const HERO_INTRO_TOTAL = HERO_INTRO_ASSEMBLE + HERO_INTRO_HOLD + HERO_INTRO_DISPERSE;

function heroIntroShouldPlay(){

    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

    if(/[?&]intro\b/.test(window.location.search)) return true;

    /* sessionStorage puede lanzar (ventanas privadas, datos bloqueados):
       en ese caso se prefiere mostrar la intro a romper la página. */
    try{
        return !window.sessionStorage.getItem(HERO_INTRO_KEY);
    }catch(error){
        return true;
    }
}

function heroIntroRemember(){

    try{
        window.sessionStorage.setItem(HERO_INTRO_KEY,"1");
    }catch(error){
        /* sin almacenamiento: simplemente se repetirá */
    }
}

/* ==========================================
   Fuentes de las manos
========================================== */

/* PROVISIONAL: siluetas toscas para probar tiempos y movimiento antes
   de tener las imágenes definitivas. Mano apuntando a la derecha; la
   humana se espeja. En la robótica los dedos llevan huecos entre
   falanges para sugerir articulaciones. */
function heroIntroPlaceholder(width,height,robot){

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const g = canvas.getContext("2d");

    if(!robot){
        g.translate(width,0);
        g.scale(-1,1);
    }

    const gray = (value) => `rgb(${value},${value},${value})`;

    g.lineCap = "round";

    g.strokeStyle = gray(robot ? 150 : 200);
    g.lineWidth = height * 0.24;
    g.beginPath();
    g.moveTo(0,height * 0.52);
    g.lineTo(width * 0.30,height * 0.52);
    g.stroke();

    g.fillStyle = gray(robot ? 210 : 225);
    g.beginPath();
    g.ellipse(width * 0.38,height * 0.52,width * 0.13,height * 0.17,0,0,Math.PI * 2);
    g.fill();

    /* x0, y0, x1, y1, grosor (fracciones del lienzo) */
    const fingers = [
        [0.46,0.42,0.97,0.36,0.075],
        [0.48,0.50,0.84,0.56,0.075],
        [0.47,0.58,0.74,0.69,0.070],
        [0.43,0.64,0.62,0.78,0.060],
        [0.34,0.38,0.56,0.22,0.080]
    ];

    const shades = [235,170,215];

    fingers.forEach(([x0,y0,x1,y1,thickness]) => {

        for(let i = 0; i < 3; i++){

            const a = i / 3;
            const b = (i + 1) / 3 - (robot ? 0.035 : 0);

            g.strokeStyle = gray(robot ? shades[i] : 225);
            g.lineWidth = height * thickness * (1 - i * 0.08);
            g.beginPath();
            g.moveTo(width * (x0 + (x1 - x0) * a),height * (y0 + (y1 - y0) * a));
            g.lineTo(width * (x0 + (x1 - x0) * b),height * (y0 + (y1 - y0) * b));
            g.stroke();
        }
    });

    return canvas;
}

function heroIntroLoadImage(name){

    return new Promise((resolve,reject) => {

        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = HERO_INTRO_IMAGE_BASE + name;
    });
}

/* Devuelve {robot, human}: cada uno es un <canvas> o una <img> con la
   proporción de la mano. */
function heroIntroSources(handWidth){

    if(HERO_INTRO_IMAGES === null){

        const height = Math.round(handWidth * 0.5);

        return Promise.resolve({
            robot:heroIntroPlaceholder(Math.round(handWidth),height,true),
            human:heroIntroPlaceholder(Math.round(handWidth),height,false)
        });
    }

    return Promise.all([
        heroIntroLoadImage(HERO_INTRO_IMAGES.robot),
        heroIntroLoadImage(HERO_INTRO_IMAGES.human)
    ]).then(([robot,human]) => ({ robot,human }));
}

/* ==========================================
   De la imagen a los puntos
========================================== */

/* Recorre la imagen en una rejilla y deja un punto donde hay mano.
   El peso mezcla opacidad y luminosidad: sirve igual con PNG
   transparente que con una mano clara sobre negro, y las zonas
   oscuras dan puntos pequeños, que es lo que da volumen. */
function heroIntroSample(source,width,step){

    const naturalWidth = source.naturalWidth || source.width;
    const naturalHeight = source.naturalHeight || source.height;
    const height = Math.round(width * naturalHeight / naturalWidth);

    const scratch = document.createElement("canvas");
    scratch.width = width;
    scratch.height = height;

    const g = scratch.getContext("2d",{ willReadFrequently:true });
    g.drawImage(source,0,0,width,height);

    const data = g.getImageData(0,0,width,height).data;
    const points = [];

    for(let y = 0; y < height; y += step){
        for(let x = 0; x < width; x += step){

            const i = (Math.floor(y) * width + Math.floor(x)) * 4;
            const alpha = data[i + 3] / 255;
            const light = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
            const weight = alpha * light;

            if(weight > 0.14) points.push({ x,y,weight });
        }
    }

    return { points,height };
}

/* ==========================================
   Animación
========================================== */

function heroIntroClamp(value){
    return Math.min(1,Math.max(0,value));
}

function heroIntroEaseOut(value){
    return 1 - Math.pow(1 - value,3);
}

function heroIntroColors(){

    const style = window.getComputedStyle(document.documentElement);
    const read = (name,fallback) => style.getPropertyValue(name).trim() || fallback;

    return [
        read("--color-primary","#38BDF8"),
        read("--color-text","#F8FAFC"),
        read("--color-accent","#818CF8")
    ];
}

function heroIntroBuild(sources,stage){

    const { width:stageWidth,height:stageHeight } = stage;

    const compact = stageWidth < 700;
    const handWidth = Math.round(compact ? stageWidth * 0.5 : Math.min(stageWidth * 0.46,760));
    const step = Math.min(10,Math.max(5,Math.round(handWidth / 80)));

    const robot = heroIntroSample(sources.robot,handWidth,step);
    const human = heroIntroSample(sources.human,handWidth,step);

    const centerX = stageWidth / 2;
    const centerY = stageHeight / 2;
    const gap = Math.max(16,stageWidth * 0.02);

    const dots = [];
    let farthest = 1;

    [[robot,0],[human,1]].forEach(([hand,side]) => {

        const left = side === 0 ? centerX - gap / 2 - handWidth : centerX + gap / 2;
        const top = centerY - hand.height / 2;

        hand.points.forEach((point) => {

            const x = left + point.x;
            const y = top + point.y;
            const distance = Math.hypot(x - centerX,y - centerY);

            const scatterAngle = Math.random() * Math.PI * 2;
            const scatterRadius = 60 + Math.random() * 160;

            const outAngle = Math.atan2(y - centerY,x - centerX) + (Math.random() - 0.5) * 1.4;
            const outRadius = 90 + Math.random() * 260;

            farthest = Math.max(farthest,distance);

            dots.push({
                x,y,distance,side,
                radius:step * 0.36 * Math.pow(point.weight,0.7) + step * 0.1,
                delay:Math.random() * 0.35,
                scatterX:Math.cos(scatterAngle) * scatterRadius,
                scatterY:Math.sin(scatterAngle) * scatterRadius,
                outX:Math.cos(outAngle) * outRadius,
                outY:Math.sin(outAngle) * outRadius - Math.random() * 60
            });
        });
    });

    dots.forEach((dot) => {
        dot.disperseDelay = dot.distance / farthest * 0.3;
    });

    return { dots,slide:stageWidth * 0.16 };
}

function heroIntroDraw(context,scene,colors,time){

    const { dots,slide } = scene;
    const assembleEnd = HERO_INTRO_ASSEMBLE + HERO_INTRO_HOLD;

    let lastColor = -1;

    for(let i = 0; i < dots.length; i++){

        const dot = dots[i];

        let x = dot.x;
        let y = dot.y;
        let alpha = 1;
        let radius = dot.radius;
        let color = dot.side;

        if(time < assembleEnd){

            const p = heroIntroEaseOut(heroIntroClamp((time - dot.delay) / (HERO_INTRO_ASSEMBLE - 0.35)));
            const away = 1 - p;

            x += away * ((dot.side === 0 ? -slide : slide) + dot.scatterX);
            y += away * dot.scatterY;
            alpha = Math.min(1,p * 1.6);

        }else{

            const u = heroIntroClamp((time - assembleEnd - dot.disperseDelay) / (HERO_INTRO_DISPERSE - 0.3));
            const travel = u * u;

            x += dot.outX * travel;
            y += dot.outY * travel;
            alpha = 1 - u;
            radius *= 1 - u * 0.5;

            /* los puntos que se van pasan al violeta del degradado */
            if(u > 0.2) color = 2;
        }

        if(alpha <= 0.01) continue;

        if(color !== lastColor){
            context.fillStyle = colors[color];
            lastColor = color;
        }

        context.globalAlpha = alpha;
        context.beginPath();
        context.arc(x,y,radius,0,Math.PI * 2);
        context.fill();
    }

    context.globalAlpha = 1;
}

function runHeroIntro(){

    const hero = document.querySelector(".hero");

    if(!hero || !heroIntroShouldPlay()) return;

    const canvas = document.createElement("canvas");
    canvas.className = "hero-intro-canvas";
    canvas.setAttribute("aria-hidden","true");

    const context = canvas.getContext("2d");

    if(!context) return;

    heroIntroRemember();

    hero.classList.add("hero-intro-active","hero-intro-pending");
    hero.prepend(canvas);

    let finished = false;

    const reveal = () => hero.classList.remove("hero-intro-pending");

    const finish = () => {

        if(finished) return;

        finished = true;
        reveal();
        canvas.remove();
        hero.classList.remove("hero-intro-active");
    };

    /* Temporizadores de seguridad: el texto vuelve y el canvas se
       retira aunque requestAnimationFrame se pause (pestaña en segundo
       plano) o algo falle a medias. */
    window.setTimeout(reveal,(HERO_INTRO_ASSEMBLE + HERO_INTRO_HOLD) * 1000);
    window.setTimeout(finish,(HERO_INTRO_TOTAL + 0.9) * 1000);

    const bounds = hero.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1,2);

    canvas.width = Math.round(bounds.width * ratio);
    canvas.height = Math.round(bounds.height * ratio);
    context.scale(ratio,ratio);

    const handWidth = Math.round(bounds.width < 700 ? bounds.width * 0.5 : Math.min(bounds.width * 0.46,760));

    heroIntroSources(handWidth).then((sources) => {

        if(finished) return;

        const scene = heroIntroBuild(sources,bounds);
        const colors = heroIntroColors();

        let start = null;

        const frame = (now) => {

            if(finished) return;

            if(start === null) start = now;

            const time = (now - start) / 1000;

            context.clearRect(0,0,bounds.width,bounds.height);
            heroIntroDraw(context,scene,colors,time);

            if(time < HERO_INTRO_TOTAL){
                window.requestAnimationFrame(frame);
            }else{
                finish();
            }
        };

        window.requestAnimationFrame(frame);

    }).catch(finish);
}

runHeroIntro();