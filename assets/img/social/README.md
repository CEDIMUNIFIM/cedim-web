# Imagen de vista previa en redes

Es la imagen que aparece cuando alguien comparte un enlace del sitio en
Facebook, Instagram, LinkedIn o WhatsApp.

## En uso: `og-image.png`

| | |
|---|---|
| Medidas | 1200 × 630 px |
| Formato | PNG |
| Peso | 14 KB |

Viene del paquete oficial de logo. Está en la proporción exacta que
piden las redes (1.91:1), así que **no se recorta**: se ve completa tal
como está.

Las ocho páginas la referencian por URL absoluta. Si se reemplaza, hay
que mantener las medidas 1200×630 o actualizar `og:image:width` y
`og:image:height` en todas ellas — algunas redes descartan la imagen si
lo declarado no coincide con el archivo.

## Sin usar: `og-cedim.jpg`

Foto del centro, 1280×960. Quedó fuera porque su proporción es 4:3 y
las redes recortaban cerca del 40% de la altura.

Si se prefiere una foto en vez de la tarjeta de marca — suele captar más
atención — hay que **recortarla a 1200×630** y apuntar las etiquetas a
ella. Mientras no se haga, este archivo se puede borrar sin consecuencia.

## Por qué no SVG

Facebook, LinkedIn y WhatsApp no renderizan SVG en las vistas previas.
Aunque el resto del sitio use SVG, esta imagen tiene que ser un mapa de
bits.

## Cómo comprobar que funciona

Pegar la URL del sitio en el depurador de Facebook y pulsar
"Scrape Again": https://developers.facebook.com/tools/debug/

Las redes guardan la vista previa en caché, así que tras cambiar la
imagen hay que forzar ese refresco para verla actualizada.
