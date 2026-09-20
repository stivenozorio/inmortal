# Qué falta completar antes de publicar

El sitio está terminado a nivel de diseño, funcionamiento y portafolio.
Lo que sigue es información que **no se inventó** a propósito y que debe
aportar el estudio, más las decisiones que conviene que revises.
Cada punto pendiente está marcado en el código con `<!-- EDITABLE: ... -->`.

---

## 1. Fotografías del portafolio  ·  hecho, con decisiones que revisar

Publicadas **26 piezas** de las 34 fotos enviadas, repartidas en cuatro
categorías: Black Work, Black & Grey, Ornamental y Color.

Tres cosas que conviene que revises:

- **Categoría «Color».** El encargo listaba Black Work, Black & Grey,
  Abstract, Ornamental y Custom, pero en el material hay piezas a color
  (escarabajo, criatura, pecho japonés, manga japonesa) y no hay nada
  abstracto ni claramente «custom». La regla era mostrar solo categorías
  reales, así que se creó Color y se dejaron fuera Abstract y Custom.
- **Marca de agua.** Cuatro fotos llevan `@carlosherrera.art` incrustado
  (lirio y polilla, pulpo, y alguna más). Se dejaron tal cual: quitar el
  crédito de alguien no es una decisión que tome el sitio. Si esa cuenta es
  tuya y prefieres publicarlas sin marca, envía los originales limpios.
- **Tomas sin publicar.** Quedaron guardadas en
  `assets/img/portfolio/source/` ocho fotos que repiten pieza (otra toma
  del dragón de espalda, de la guerrera azteca, de la manga religiosa y de
  la criatura) más una foto de sesión. Se dejaron fuera para que la galería
  no repita la misma pieza cuatro veces. Publicarlas es añadir su línea en
  `tools/build_portfolio.py`; están listadas al final de ese archivo.

## 2. El artista  ·  `index.html`, sección `#artista`

| Campo | Estado |
|---|---|
| Nombre real | **pendiente**, ahora dice `@hxrrx_tatts` |
| Historia / filosofía | texto base, reescríbelo en primera persona |
| Especialidad | «Black Work» |
| Enfoque | «Diseño custom» |
| Base (ciudad / estudio) | «Colombia» |
| Fotografía | lista: la sesión bajo la luz roja del estudio (IMG_5713) |

Si prefieres un retrato tuyo mirando a cámara, o la otra foto de sesión
(IMG_5742, de perfil tatuando), se cambia en `ARTISTA` dentro de
`tools/build_portfolio.py`.

No se incluyeron premios, años de experiencia, certificaciones, clientes ni
publicaciones: nada de eso estaba disponible y no se inventa.

## 2b. Video del estudio

`assets/video/estudio.mp4` (1,7 MB) quedó guardado pero **no se usa en la
web**. Puede ir como fondo en silencio en la sección Black Work o en el CTA
final; dilo y se monta con carga diferida para no penalizar el móvil.

## 3. FAQ  ·  `index.html`, sección `#faq`

Las respuestas de **precio** y **cuidados posteriores** están redactadas en
términos generales. Ajústalas a tus tarifas y a tu protocolo real.

Si tienes ubicación física y horarios, añade una pregunta más: hoy no
aparecen porque no se conocen.

## 4. Ubicación del hero  ·  `index.html`, `.hero__where`

Dice «Colombia». Cámbialo por la ciudad o el nombre del estudio.

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
