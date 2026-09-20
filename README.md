# Inmortal Tatts — sitio web

Sitio estático (HTML + CSS + JavaScript, sin dependencias ni build) para
**Inmortal Tatts — Black Work / Tattoo Art**.

Toda la dirección de arte sale de los assets oficiales de la marca:
el logotipo, el símbolo de llama / reloj de arena y la ilustración de la
serpiente, incluidos en `assets/img/source/`.

---

## Estructura

```
index.html                 Página única con todas las secciones
assets/
  css/styles.css           Sistema visual completo (tokens + secciones)
  css/fonts.css            @font-face de las fuentes autoalojadas
  fonts/                   Archivo + Inter (variables, subconjuntos latin)
  js/portfolio-data.js     ← ÚNICO archivo a tocar para publicar tatuajes
  js/main.js               Intro, scroll, portafolio, lightbox, formulario
  img/source/              Assets originales de marca (no tocar)
  img/                     Derivados web (logo, símbolo, serpiente, social)
  img/portfolio/           Fotografías del portafolio
tools/build_assets.py      Regenera los derivados desde los originales
tools/fetch_fonts.sh       Vuelve a descargar las fuentes autoalojadas
CONTENIDO.md               Qué textos hay que revisar antes de publicar
```

## Publicar el sitio

Es estático: sirve la carpeta tal cual en Netlify, Vercel, GitHub Pages,
Cloudflare Pages o cualquier hosting.

Para verlo en local:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

> Ábrelo por HTTP, no con doble clic sobre `index.html`: algunas fuentes y
> recursos no cargan bajo `file://`.

## Subir tatuajes al portafolio

1. Copia la foto en `assets/img/portfolio/` (por ejemplo `serpiente-brazo.jpg`).
   Si puedes, exporta también `.webp` y `.avif` con el mismo nombre.
2. Añade una línea en `assets/js/portfolio-data.js`.
3. Listo: la galería, el filtro por categorías y el lightbox se generan solos.

Los registros marcados con `placeholder: true` son marcos provisionales
generados con los gráficos de marca (**no** son tatuajes ni fotos de stock).
Bórralos conforme subas material real.

Las categorías del filtro salen de las piezas publicadas: solo aparece la
categoría que realmente tiene trabajo cargado, y con una sola categoría el
filtro se oculta.

## Regenerar los assets derivados

Solo si cambian los originales de marca:

```bash
pip install Pillow numpy
python3 tools/build_assets.py
```

El script recorta el logotipo y el símbolo sobre fondo transparente
(sin deformarlos ni recolorearlos), genera las versiones responsive de la
serpiente en AVIF/WebP/JPG, el grano, los favicons y la imagen Open Graph.

## Decisiones técnicas

- **Paleta oficial** en variables CSS (`:root`): `#F20132`, `#D80531`,
  `#181A27`, `#0B0F18`, `#51162F`, `#791033`, `#131B28`, `#F2F2F0`.
  El azul-negro domina; el rojo funciona como señal, no como fondo.
- **Mobile first**: la maquetación arranca en una columna y crece por
  breakpoints (600 / 860 / 1024 / 1440 px).
- **Rendimiento**: AVIF + WebP con respaldo JPG/PNG, `loading="lazy"`,
  `width`/`height` en todas las imágenes, fuentes variables autoalojadas
  (sin peticiones a terceros) y animaciones limitadas a `transform`/`opacity`.
- **Accesibilidad**: navegación por teclado en galería y lightbox, foco
  visible, `prefers-reduced-motion` desactiva intro, parallax y revelados,
  y contraste de texto por encima de 7:1.
- **Sin backend**: el formulario de cotización arma el mensaje y abre
  WhatsApp (`https://wa.me/573214074562`).

## Antes de publicar

Ver `CONTENIDO.md`: fotografías reales, nombre e historia del artista,
dominio definitivo en las metaetiquetas y revisión de las respuestas del FAQ.
