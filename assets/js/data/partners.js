/* ==========================================
   Aliados — datos editables
   ==========================================

   Instituciones y empresas que aparecen en la portada.

   Cómo editarlo desde GitHub (sin instalar nada):
     1. Abrir este archivo en github.com
     2. Botón del lápiz (Edit this file)
     3. Guardar con "Commit changes" sobre la rama main
     4. El sitio se actualiza solo en ~1 minuto

   Campos de cada aliado:
     name  Nombre de la institución. Es lo que se muestra si no hay
           logo, y también el texto alternativo del logo.
     logo  Nombre del archivo dentro de assets/img/partners/.
           Solo el nombre, no la ruta completa.
           Si se deja vacío ("") se muestra el nombre como texto, que
           es lo que ocurre ahora: aún no hay logos en el repo.
     href  Sitio web del aliado. Dejar "" si no se quiere enlazar.

   Sobre los logos: para que se vean bien sobre el fondo oscuro del
   sitio conviene la versión en blanco o de un solo color claro, en SVG.
   Un logo a color sobre fondo oscuro suele verse sucio.

   ATENCIÓN antes de publicar logos ajenos: hace falta permiso de cada
   institución para usar su marca. Mostrar el nombre como texto no
   tiene ese problema.

   Si se borran todos, la sección no se muestra.

   Cuidado con la sintaxis: cada aliado va entre llaves { }, separado
   del siguiente por una coma, y los textos entre comillas.
*/

const partners = [
    { name:"Universidad Nacional de Ingeniería", logo:"", href:"https://www.uni.edu.pe/" },
    { name:"Facultad de Ingeniería Mecánica",    logo:"", href:"" },
    { name:"IEEE UNI Student Branch",            logo:"", href:"" }
];
