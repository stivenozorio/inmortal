# Qué falta completar antes de publicar

El sitio está terminado a nivel de diseño y funcionamiento. Lo que sigue es
información que **no se inventó** a propósito y que debe aportar el estudio.
Cada punto está marcado en el código con un comentario `<!-- EDITABLE: ... -->`.

---

## 1. Fotografías del portafolio  ·  `assets/img/portfolio/` + `assets/js/portfolio-data.js`

Hoy la galería muestra seis marcos provisionales hechos con los gráficos de
marca, etiquetados como «Próximamente». No hay fotos de stock ni piezas
inventadas.

Al subir las fotos, indica en cada registro su categoría real. Las
sugeridas son: `Black Work`, `Black & Grey`, `Abstract`, `Ornamental`,
`Custom`. Solo aparecen en el filtro las que tengan piezas publicadas.

## 2. El artista  ·  `index.html`, sección `#artista`

| Campo | Estado |
|---|---|
| Nombre real | provisional: `@hxrrx_tatts` |
| Historia / filosofía | texto base, reescríbelo en primera persona |
| Especialidad | «Black Work» |
| Enfoque | «Diseño custom» |
| Base (ciudad / estudio) | «Colombia» |
| Fotografía | marco provisional `assets/img/artist-{600,900}.{avif,webp,jpg}` |

No se incluyeron premios, años de experiencia, certificaciones, clientes ni
publicaciones: nada de eso estaba disponible y no se inventa.

## 3. FAQ  ·  `index.html`, sección `#faq`

Las respuestas de **precio** y **cuidados posteriores** están redactadas en
términos generales. Ajústalas a tus tarifas y a tu protocolo real.

Si tienes ubicación física y horarios, añade una pregunta más: hoy no
aparecen porque no se conocen.

## 4. Ubicación del hero  ·  `index.html`, `.hero__where`

Dice «Colombia». Cámbialo por la ciudad o el nombre del estudio.

## 5. Dominio y metadatos  ·  `index.html`, `<head>`

Reemplaza `https://inmortaltatts.com/` por el dominio definitivo en:

- `<link rel="canonical">`
- `og:url` y `og:image`
- `twitter:image`
- el bloque JSON-LD (`url`, `image`)

La imagen para redes ya está generada en `assets/img/og-image.jpg`.

---

## Datos ya configurados y verificados

- WhatsApp: **+57 321 407 4562** → `https://wa.me/573214074562`
  con el mensaje solicitado, en el hero, el header, tras el portafolio,
  en Black Work, en el formulario, en el pie y en el botón flotante móvil.
- Instagram: **@hxrrx_tatts** → `https://www.instagram.com/hxrrx_tatts`
  (sin feed falso: solo enlace real).
- Título SEO: `Inmortal Tatts | Black Work Tattoo`.
