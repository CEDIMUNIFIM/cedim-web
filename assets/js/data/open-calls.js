/* ==========================================
   Convocatorias — datos editables
   ==========================================

   Este es el único archivo que hay que tocar para publicar, modificar
   o retirar una convocatoria. No hace falta editar HTML ni CSS.

   El contenido va en INGLÉS: el sitio es íntegramente en inglés.
   (Estas instrucciones quedan en español porque son para el equipo.)

   Cómo editarlo desde GitHub (sin instalar nada):
     1. Abrir este archivo en github.com
     2. Botón del lápiz (Edit this file)
     3. Guardar con "Commit changes" sobre la rama main
     4. El sitio se actualiza solo en ~1 minuto

   Campos de cada convocatoria:
     title        Nombre de la convocatoria
     description  Texto explicativo
     status       Controla el color de la etiqueta. Valores válidos:
                    "active"  → celeste  (abierta)
                    "closed"  → gris     (cerrada)
     statusLabel  Texto visible de la etiqueta (libre)
     actionLabel  Texto del botón. Dejar "" si no lleva botón
                  (por ejemplo, en una convocatoria ya cerrada).
     actionHref   URL del formulario de postulación (Google Forms o
                  Microsoft Forms). Va la dirección completa, empezando
                  por https://. Al ser externa el botón se abre en otra
                  pestaña automáticamente.
                  Si se deja "#contact" baja al pie de la página, donde
                  está el correo — úsalo solo si aún no hay formulario.
     meta         Texto pequeño al pie, para cuando NO hay botón.
                  Dejar "" si no se usa.

   Para retirar una convocatoria basta con borrar su bloque completo
   (desde { hasta },). Si se borran todas, la página muestra un aviso
   de que no hay convocatorias abiertas.

   Cuidado con la sintaxis: cada convocatoria va entre llaves { },
   separada de la siguiente por una coma, y los textos entre comillas.
*/

const openCalls = [
    {
        title:"New member intake 2026-I",
        description:"Undergraduate students joining the research lines in robotics, control, and embedded systems. No prior experience required, but weekly availability for laboratory work is expected.",
        status:"active",
        statusLabel:"Open",
        actionLabel:"Apply",
        actionHref:"#contact",
        meta:""
    },
    {
        title:"National Robotics Competition",
        description:"Registration of teams representing the faculty at the national university competition. Selected teams receive technical mentoring and laboratory access.",
        status:"active",
        statusLabel:"Open",
        actionLabel:"View terms",
        actionHref:"#contact",
        meta:""
    },
    {
        title:"Mechatronics research grant",
        description:"Financial support for thesis students whose projects are tied to the centre's research lines.",
        status:"closed",
        statusLabel:"Closed",
        actionLabel:"",
        actionHref:"",
        meta:"Closed in March 2026"
    }
];
