# Logos

Del paquete oficial de marca CEDIM.

## Archivos en uso

| Archivo | Dónde se usa | Notas |
|---|---|---|
| `cedim-logo-white.svg` | Navbar y pie de página | Se muestra a 40 px de alto |
| `favicon.svg` | Ícono de pestaña, todas las páginas | Símbolo blanco sobre cuadrado azul marino |
| `apple-touch-icon.png` | iPhone/iPad, pantalla de inicio | 180×180, esquinas cuadradas |

**El logo del navbar es la versión blanca, no la estándar.** El sitio
tiene fondo azul casi negro (`#0B1120`) y el logo estándar es azul marino
(`#11415E`): sobre ese fondo casi no se vería. `cedim-logo.svg` se
conserva por si alguna vez hace falta sobre fondo claro.

El `apple-touch-icon.png` va con las esquinas **cuadradas** a propósito:
iOS le aplica su propio redondeado, y si el PNG ya viniera redondeado se
redondearía dos veces y asomarían esquinas oscuras.

## Dónde se declaran

- Logo del navbar y del pie: `components/site-chrome/site-chrome.js`
- Su tamaño: `components/navbar/navbar.css` y `components/footer/footer.css`
- Íconos de pestaña: el `<head>` de cada página

## Formatos que no se usan

- **JPG / JPEG** — no admite transparencia y comprime con pérdida, lo que
  ensucia bordes y texto. Sirve para fotos, no para logos.
- **PNG para la pestaña** — el SVG lo cubre mejor y pesa menos.

## Opcional: `favicon.ico`

No está en el repo. Serviría de respaldo para navegadores muy antiguos
que no leen SVG, y habría que colocarlo en la raíz del proyecto y
declararlo con `<link rel="icon" href="favicon.ico" sizes="32x32">`.
Con `favicon.svg` en su lugar, todos los navegadores actuales quedan
cubiertos, así que no es necesario.

## Datos de marca

- Azul marino: `#11415E`
- Azul claro: `#54AFDE`
- Proporción del logo completo: 1046 × 287 (≈ 3,64 : 1)
- Ancho mínimo del logo completo: 140 px. Por debajo, usar solo el símbolo.
- Espacio libre alrededor: al menos un 15 % de la altura del logo.
- No estirarlo, rotarlo, recolorearlo ni añadirle sombras.

Nota: estos colores de marca no coinciden con el `--color-primary` del
sitio (`#38BDF8`, definido en `assets/css/variables.css`). Conviven sin
problema, pero conviene saberlo si algún día se unifica la paleta.
