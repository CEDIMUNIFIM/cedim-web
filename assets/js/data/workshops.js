/* ==========================================
   Talleres — datos editables
   ==========================================

   Este es el único archivo que hay que tocar para publicar, modificar
   o retirar un taller. No hace falta editar HTML ni CSS.

   El contenido va en INGLÉS: el sitio es íntegramente en inglés.
   (Estas instrucciones quedan en español porque son para el equipo.)

   Cómo editarlo desde GitHub (sin instalar nada):
     1. Abrir este archivo en github.com
     2. Botón del lápiz (Edit this file)
     3. Guardar con "Commit changes" sobre la rama main
     4. El sitio se actualiza solo en ~1 minuto

   Campos de cada taller:
     title        Nombre del taller
     description  Resumen de los contenidos
     tags         Lista de etiquetas: área y nivel.
                  Puede ir vacía: []
     meta         Texto pequeño al pie (duración, número de sesiones).
                  Dejar "" si no se usa.
     actionLabel  Texto del botón de inscripción. Dejar "" si el taller
                  no tiene inscripción abierta.
     actionHref   URL del formulario de inscripción (Google Forms o
                  Microsoft Forms). Va la dirección completa, empezando
                  por https://. Al ser externa el botón se abre en otra
                  pestaña automáticamente.

   La duración y el botón conviven en el pie de la tarjeta: la duración
   queda a la izquierda y el botón a la derecha.

   Para retirar un taller basta con borrar su bloque completo (desde {
   hasta },). Si se borran todos, la página muestra un aviso de que no
   hay talleres programados.

   Cuidado con la sintaxis: cada taller va entre llaves { }, separado
   del siguiente por una coma, y los textos entre comillas.
*/

const workshops = [
    {
        title:"Introduction to ROS 2",
        description:"Framework fundamentals, nodes, topics, and simulation in Gazebo.",
        tags:["Robotics","Intermediate"],
        meta:"8 sessions",
        actionLabel:"",
        actionHref:""
    },
    {
        title:"CAD design with SolidWorks",
        description:"Part modelling, assemblies, and technical drawings for prototyping.",
        tags:["Design","Beginner"],
        meta:"6 sessions",
        actionLabel:"",
        actionHref:""
    },
    {
        title:"STM32 microcontrollers",
        description:"Embedded systems programming, peripherals, and serial communication.",
        tags:["Embedded","Intermediate"],
        meta:"10 sessions",
        actionLabel:"",
        actionHref:""
    },
    {
        title:"Computer vision with OpenCV",
        description:"Image processing, object detection, and camera calibration.",
        tags:["Vision","Intermediate"],
        meta:"8 sessions",
        actionLabel:"",
        actionHref:""
    }
];
