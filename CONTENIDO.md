# Qué falta completar antes de publicar

El sitio está terminado a nivel de diseño, funcionamiento y portafolio.
Lo que sigue es información que **no se inventó** a propósito y que debe
aportar el estudio, más las decisiones que conviene que revises.
Cada punto pendiente está marcado en el código con `<!-- EDITABLE: ... -->`.

---

## 1. Fotografías del portafolio  ·  hecho

Publicadas **26 piezas** en cuatro categorías reales: Black Work,
Black & Grey, Ornamental y Color. No se creó «Abstract» ni «Custom»
porque el material recibido no tiene piezas claramente de esos estilos.

Tres cosas que conviene que revises:

- **`pulpo-brazo`** conserva la marca de agua `@carlosherrera_art`
  incrustada en la foto. No se recorta ni se retoca el crédito de otra
  persona sin que lo pidas tú.
- **`criatura-color-3`** (una segunda foto de la misma pieza que
  `criatura-color`, con peor luz) se dejó en `source/` sin publicar, para
  no repetir el mismo tatuaje dos veces en la galería.
- Del material de video recibido, cinco tomas no se usaron: cuatro repiten
  piezas que ya están en foto o en el video elegido, y una
  (`ee05e0f4-…mov`) muestra el logo de otra marca en la ropa de la
  clienta. Quedaron documentadas al final de `tools/build_portfolio.py`
  por si quieres usarlas como un segundo video más adelante.

Para añadir o quitar piezas:

1. Deja el original en `assets/img/portfolio/source/` (sirve tal cual sale
   del móvil).
2. Añade o borra su línea en la tabla `CATALOGO` de
   `tools/build_portfolio.py`.
3. Ejecuta `python3 tools/build_portfolio.py` y pega en
   `assets/js/portfolio-data.js` la lista que imprime.

Las categorías del filtro salen de las piezas publicadas: solo aparece la
que realmente tiene trabajo cargado.

## 2. El artista  ·  `index.html`, sección `#artista`  ·  foto hecha

| Campo | Estado |
|---|---|
| Nombre real | **pendiente**, ahora dice `@hxrrx_tatts` |
| Historia / filosofía | texto base, reescríbelo en primera persona |
| Especialidad | «Black Work» |
| Enfoque | «Diseño custom» |
| Base (ciudad / estudio) | «Chile» |
| Fotografía | lista: dos fotos del estudio bajo luz roja |

Para cambiarlas, apúntalas en `ARTISTA` dentro de
`tools/build_portfolio.py` (admite dos: la principal y una segunda que se
monta superpuesta).

No se incluyeron premios, años de experiencia, certificaciones, clientes ni
publicaciones: nada de eso estaba disponible y no se inventa.

## 2b. Interludio en video  ·  hecho

Entre Proceso y Cotización va el video de la espalda completa (negro
sólido, estructura ornamental y peonías a color), en silencio, en bucle y
solo mientras está a la vista. El texto dice «Una pieza de varias
sesiones»: si el número real de sesiones es otro, ajústalo en
`index.html`, clase `.reel__note`.

Para cambiar el video: deja el nuevo en `assets/video/source/estudio.mp4`
y ejecuta `python3 tools/build_video.py`.

## 2c. Sección Black Work  ·  `index.html`, `#black-work`  ·  hecho

Muestra ahora «Garras», la pieza de marcas de garra en la nuca — la
fotografía más fuerte del lote nuevo. Para cambiarla, edita la ruta
`assets/img/portfolio/<pieza>-{520,720,900}` en esa sección.

## 3. FAQ  ·  `index.html`, sección `#faq`

Las respuestas de **precio** y **cuidados posteriores** están redactadas en
términos generales. Ajústalas a tus tarifas y a tu protocolo real.

Si tienes ubicación física y horarios, añade una pregunta más: hoy no
aparecen porque no se conocen.

## 4. Ubicación  ·  `index.html`, `.hero__where` y `#artista`

Dice «Chile». Cámbialo por la ciudad o el nombre del estudio.

## 5. Dominio y metadatos  ·  `index.html`, `<head>`

Ahora apuntan al despliegue actual: **https://inmortalhxrr.vercel.app**

Si contratas un dominio propio, cámbialo en los seis sitios donde aparece:

- `<link rel="canonical">`
- `og:url` y `og:image`
- `twitter:image`
- el bloque JSON-LD (`url`, `image`)

Estas URLs deben ser **absolutas y públicas**: la vista previa de WhatsApp,
Instagram o Facebook descarga la imagen desde ahí. Si el dominio no existe
o la imagen no está publicada, el enlace se comparte sin vista previa.

La imagen para redes está en `assets/img/og-image.jpg` (1200x630, 87 KB).

### Al cambiar de dominio o de imagen

WhatsApp y Facebook guardan la vista previa en caché durante días. Pasa la
URL por https://developers.facebook.com/tools/debug/ y pulsa
«Scrape Again» para forzar el refresco.

---

## Datos ya configurados y verificados

- WhatsApp: **+57 321 407 4562** → `https://wa.me/573214074562`
  con el mensaje solicitado, en el hero, el header, tras el portafolio,
  en Black Work, en el formulario, en el pie y en el botón flotante móvil.
- Instagram: **@hxrrx_tatts** → `https://www.instagram.com/hxrrx_tatts`
  (sin feed falso: solo enlace real).
- Título SEO: `Inmortal Tatts | Black Work Tattoo`.
