/* ==========================================
   Proyectos — datos editables
   ==========================================

   Este es el único archivo que hay que tocar para agregar, modificar
   o eliminar un proyecto de la web. No hace falta editar HTML ni CSS.
   Cada proyecto genera su tarjeta y su propia página de detalle
   automáticamente.

   El contenido va en INGLÉS: el sitio es íntegramente en inglés.
   (Estas instrucciones quedan en español porque son para el equipo.)

   Cómo editarlo desde GitHub (sin instalar nada):
     1. Abrir este archivo en github.com
     2. Botón del lápiz (Edit this file)
     3. Guardar con "Commit changes" sobre la rama main
     4. El sitio se actualiza solo en ~1 minuto

   Campos de cada proyecto:
     id           Identificador para la URL de su página de detalle.
                  Solo minúsculas, números y guiones. No repetir ni
                  cambiar uno existente: los enlaces ya compartidos
                  dejarían de funcionar.
     title        Nombre del proyecto
     description  Resumen de una o dos líneas (se ve en la tarjeta)
     image        Nombre del archivo dentro de assets/img/projects/
                  Solo el nombre, no la ruta completa. Si se deja
                  vacío ("") la tarjeta se muestra sin imagen.
     status       Controla el color de la etiqueta. Valores válidos:
                    "active"  → celeste  (en desarrollo)
                    "done"    → verde    (completado)
                    "paused"  → naranja  (en pausa)
                    "closed"  → gris     (cerrado / archivado)
     statusLabel  Texto visible de la etiqueta (libre)
     year         Año que se muestra al pie de la tarjeta
     tags         Lista de etiquetas. Puede ir vacía: []
     summary      Texto largo que abre la página de detalle
     objectives   Lista de objetivos del proyecto. Puede ir vacía: []

   Cuidado con la sintaxis: cada proyecto va entre llaves { },
   separado del siguiente por una coma, y los textos entre comillas.
*/

const projects = [
    {
        id:"robotic-arm",
        title:"6-DOF Robotic Arm",
        description:"Articulated manipulator with inverse kinematics for precision tasks in the laboratory.",
        image:"robotic-arm.svg",
        status:"active",
        statusLabel:"In progress",
        year:"2026",
        tags:["Robotics","ROS 2","Control"],
        summary:"Development of a six degree-of-freedom articulated manipulator aimed at precision tasks in laboratory environments. The project covers the mechanical design of the links, actuator selection, and implementation of the forward and inverse kinematic models, with trajectory control running on ROS 2.",
        objectives:[
            "Design and manufacture the six-link mechanical structure",
            "Implement the inverse kinematic model with validation in simulation",
            "Integrate trajectory control on top of ROS 2",
            "Achieve repeatability below one millimetre"
        ]
    },
    {
        id:"inspection-drone",
        title:"Autonomous Inspection Drone",
        description:"UAV with autonomous navigation for structural inspection of faculty facilities.",
        image:"inspection-drone.svg",
        status:"active",
        statusLabel:"In progress",
        year:"2026",
        tags:["UAV","Computer Vision","SLAM"],
        summary:"An unmanned aerial vehicle able to fly predefined routes and detect deterioration in faculty structures. It combines autonomous navigation based on visual SLAM with a crack detection module, so that routine inspections no longer require scaffolding or personnel working at height.",
        objectives:[
            "Build the aerial platform and its power system",
            "Implement autonomous navigation using visual SLAM",
            "Train a crack detector on images captured in the field",
            "Generate inspection reports automatically"
        ]
    },
    {
        id:"exoskeleton",
        title:"Rehabilitation Exoskeleton",
        description:"Active upper-limb orthosis aimed at motor recovery therapy.",
        image:"exoskeleton.svg",
        status:"paused",
        statusLabel:"On hold",
        year:"2025",
        tags:["Biomechatronics","Actuators"],
        summary:"An active upper-limb orthosis designed to support motor recovery therapy. The device follows the patient's movement with adjustable assistance, letting the therapist tune resistance as each session progresses. The project is on hold pending funding for the clinical testing stage.",
        objectives:[
            "Design the articulated structure for shoulder and elbow",
            "Implement assistance control with an adjustable level",
            "Record progress metrics for each therapy session",
            "Validate the prototype with rehabilitation specialists"
        ]
    },
    {
        id:"autonomous-vehicle",
        title:"Scale Autonomous Vehicle",
        description:"1:10 platform for testing autonomous driving and obstacle avoidance algorithms.",
        image:"autonomous-vehicle.svg",
        status:"done",
        statusLabel:"Completed",
        year:"2025",
        tags:["Autonomy","LiDAR","Python"],
        summary:"A 1:10 scale test platform for validating autonomous driving algorithms without the cost or risk of a full-size vehicle. It integrates LiDAR and odometry to build a map of its surroundings, and serves as an experimentation bench for the centre's control and perception courses.",
        objectives:[
            "Integrate LiDAR and odometry on the scale chassis",
            "Implement lane following and obstacle avoidance",
            "Document the platform as a reusable test bench",
            "Publish the results obtained on a closed track"
        ]
    },
    {
        id:"vision-classification",
        title:"Vision-Based Sorting System",
        description:"Automatic classification of parts on a production line using convolutional networks.",
        image:"vision-classification.svg",
        status:"active",
        statusLabel:"In progress",
        year:"2026",
        tags:["Deep Learning","OpenCV"],
        summary:"A visual inspection system that classifies parts moving along a conveyor belt and separates the defective ones. It uses a convolutional network trained on in-house images and targets real-time operation on low-cost hardware, with no dedicated servers required.",
        objectives:[
            "Build a labelled image dataset from real parts",
            "Train and optimise the classification model",
            "Reach real-time inference on embedded hardware",
            "Integrate the system with the part separation mechanism"
        ]
    },
    {
        id:"myoelectric-prosthesis",
        title:"Myoelectric Hand Prosthesis",
        description:"Prosthesis driven by EMG signals and built with low-cost 3D printing.",
        image:"myoelectric-prosthesis.svg",
        status:"done",
        statusLabel:"Completed",
        year:"2024",
        tags:["EMG","3D Printing","Embedded"],
        summary:"A hand prosthesis actuated by the user's own muscle signals, manufactured with 3D printing to cut its cost dramatically compared to commercial alternatives. The design is open and replicable, so that other centres can build and adapt it.",
        objectives:[
            "Design the finger mechanism driven by servomotors",
            "Condition and filter the surface EMG signal",
            "Reduce the total manufacturing cost of the device",
            "Release the design files for replication"
        ]
    }
];
