/* ==========================================
   Cifras del centro — datos editables
   ==========================================

   Las cifras que aparecen en la portada. Conviene revisarlas al inicio
   de cada semestre.

   El contenido va en INGLÉS: el sitio es íntegramente en inglés.
   (Estas instrucciones quedan en español porque son para el equipo.)

   Cómo editarlo desde GitHub (sin instalar nada):
     1. Abrir este archivo en github.com
     2. Botón del lápiz (Edit this file)
     3. Guardar con "Commit changes" sobre la rama main
     4. El sitio se actualiza solo en ~1 minuto

   Campos de cada cifra:
     value  El número. Puede llevar un signo: "12", "+30", "5".
            Es texto, así que va entre comillas.
     label  Qué se está contando: "Active projects"

   Añadir o quitar cifras cambia la rejilla sola. Si se borran todas,
   la sección no se muestra: no queda un hueco vacío en la portada.

   ATENCIÓN: estas cifras son de ejemplo y NO son reales. Hay que
   reemplazarlas por las del centro antes de darlas por buenas.

   Cuidado con la sintaxis: cada cifra va entre llaves { }, separada
   de la siguiente por una coma, y los textos entre comillas.
*/

const stats = [
    { value:"130", label:"Active projects" },
    { value:"45", label:"Active members" },
    { value:"8",  label:"Publications" },
    { value:"6",  label:"Awards" }
];
