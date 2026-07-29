# Imagen de vista previa en redes

Esta carpeta guarda la imagen que aparece cuando alguien comparte un
enlace del sitio en Facebook, Instagram, LinkedIn o WhatsApp.

## Estado actual

`og-cedim.jpg` ya está puesta (193 KB), y las siete páginas apuntan a
ella. Funciona.

**Pero está a 1280×960 (4:3), no a 1200×630.** Las redes recortan al
centro para llegar a su proporción 1.91:1, así que se pierde alrededor
de un 40% de la altura: se corta arriba y abajo. Si en la foto hay algo
importante en esas zonas (un rótulo, la cara de alguien, el logo),
conviene recortarla a 1200×630 a mano y volver a subirla con el mismo
nombre. Al hacerlo hay que actualizar también `og:image:width` y
`og:image:height` en las siete páginas.

### Requisitos de la foto

| | |
|---|---|
| Nombre | `og-cedim.jpg` |
| Medidas | 1200 × 630 px (proporción 1.91:1) |
| Formato | JPG |
| Peso | menos de 1 MB, idealmente ~200 KB |

Las etiquetas `og:image:width` y `og:image:height` de cada página deben
coincidir con las medidas reales del archivo: si no coinciden, algunas
redes descartan la imagen.

Sugerencias de contenido: el laboratorio en uso, un prototipo
reconocible, o el equipo trabajando. Conviene que se entienda a tamaño
pequeño, porque en el móvil la vista previa se ve reducida.

Si la foto original no tiene esa proporción, hay que recortarla a
1200×630 — si no, las redes la recortan solas y suelen cortar por donde
no conviene.

### Por qué JPG y no SVG

Facebook, LinkedIn y WhatsApp no renderizan SVG en las vistas previas.
Aunque el resto del sitio use SVG, esta imagen tiene que ser un mapa de
bits.

## Alternativa: `og-cedim.svg`

En esta carpeta hay una tarjeta gráfica con la marca CEDIM, hecha a
1200×630. No se está usando: quedó como opción por si en algún momento
se prefiere una tarjeta de marca en vez de una foto. Para usarla habría
que exportarla a JPG o PNG (abriéndola en el navegador, Figma o
Inkscape) y nombrar el resultado `og-cedim.jpg`.

## Cómo comprobar que funciona

Después de subir la foto, pegar la URL del sitio en el depurador de
Facebook y pedir "Scrape Again":
https://developers.facebook.com/tools/debug/

Las redes guardan la vista previa en caché, así que si se comparte un
enlace antes de subir la imagen, hay que forzar ese refresco para que
aparezca.
