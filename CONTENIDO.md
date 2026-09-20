# Qué falta completar antes de publicar

El sitio está terminado a nivel de diseño, funcionamiento y portafolio.
Lo que sigue es información que **no se inventó** a propósito y que debe
aportar el estudio, más las decisiones que conviene que revises.
Cada punto pendiente está marcado en el código con `<!-- EDITABLE: ... -->`.

---

## 1. Fotografías del portafolio  ·  pendiente

Las fotos anteriores se eliminaron a petición tuya para subir otras. La
galería muestra ahora seis marcos provisionales hechos con los gráficos de
marca, etiquetados «Próximamente»: no hay fotos de stock ni piezas
inventadas.

Para publicar las nuevas:

1. Deja los originales en `assets/img/portfolio/source/` (sirven tal cual
   salen del móvil).
2. Añade una línea por pieza a la tabla `CATALOGO` de
   `tools/build_portfolio.py`.
3. Ejecuta `python3 tools/build_portfolio.py` y pega en
   `assets/js/portfolio-data.js` la lista que imprime; borra de ahí las
   líneas `slot-0x` de los marcos provisionales.

Categorías sugeridas: `Black Work`, `Black & Grey`, `Ornamental`, `Color`,
`Custom`. Solo aparecen en el filtro las que tengan piezas publicadas.

Las fotos borradas siguen en el historial de Git por si hiciera falta
recuperar alguna.

## 2. El artista  ·  `index.html`, sección `#artista`

| Campo | Estado |
|---|---|
| Nombre real | **pendiente**, ahora dice `@hxrrx_tatts` |
| Historia / filosofía | texto base, reescríbelo en primera persona |
| Especialidad | «Black Work» |
| Enfoque | «Diseño custom» |
| Base (ciudad / estudio) | «Chile» |
| Fotografía | **pendiente**, marco provisional |

La foto se prepara apuntándola en `ARTISTA` dentro de
`tools/build_portfolio.py`. Admite dos: la principal y una segunda que se
monta superpuesta (duplica la figura con la clase `artist__photo--sub`).

No se incluyeron premios, años de experiencia, certificaciones, clientes ni
publicaciones: nada de eso estaba disponible y no se inventa.

## 2b. Interludio en video  ·  desactivado

La sección quedó comentada en `index.html` al eliminar el video. Los
estilos y el script siguen en su sitio: para reactivarla, deja el video en
`assets/video/source/estudio.mp4`, ejecuta `python3 tools/build_video.py` y
quita el comentario que empieza en «INTERLUDIO EN VIDEO — desactivado».

## 2c. Sección Black Work  ·  `index.html`, `#black-work`

Vuelve a mostrar la ilustración de la serpiente. El encargo pedía ahí una
fotografía grande: cuando tengas una pieza de Black Work que te guste,
cámbiala (hay un comentario en el código indicando dónde).

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
