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
  js/portfolio-data.js     Lista de piezas publicadas (la genera el script)
  js/main.js               Intro, scroll, portafolio, lightbox, formulario
  img/source/              Assets originales de marca (no tocar)
  img/                     Derivados web (logo, símbolo, serpiente, social)
  img/portfolio/source/    Fotografías originales, tal como llegan del móvil
  img/portfolio/           Versiones web (520 / 720 / 900 px en AVIF y WebP)
  video/estudio.mp4        Video del estudio (por ahora no se usa en la web)
tools/build_portfolio.py   Prepara las fotos del portafolio y del artista
tools/build_assets.py      Regenera los derivados de marca
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

1. Copia la foto original en `assets/img/portfolio/source/` (sirve tal cual
   sale del móvil; no hace falta editarla).
2. Añade una línea a la tabla `CATALOGO` de `tools/build_portfolio.py`:

   ```python
   ("IMG_1234", "dragon-brazo", "Dragón", "Black & Grey",
    "Dragón japonés tatuado en el antebrazo, en negro y gris."),
   #  archivo     nombre-web     título      categoría        texto alternativo
   ```

3. Ejecuta el script y pega en `assets/js/portfolio-data.js` la lista que
   imprime:

   ```bash
   pip install Pillow numpy      # solo la primera vez
   python3 tools/build_portfolio.py
   ```

El script recorta las franjas de las capturas de historias, genera tres
anchos (520 / 720 / 900 px) en AVIF y WebP con respaldo JPG, y calcula las
medidas que evitan los saltos de maquetación.

Para quitar una pieza de la web basta con borrar su línea de
`assets/js/portfolio-data.js`; el original se queda guardado en `source/`.

Las categorías del filtro salen de las piezas publicadas: solo aparece la
que realmente tiene trabajo cargado, y con una sola categoría el filtro se
oculta.

Para cambiar la fotografía del artista, apunta otra en `ARTISTA` dentro del
mismo script.

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

Ver `CONTENIDO.md`: nombre e historia del artista, revisión de las
respuestas del FAQ y dominio propio si se contrata uno.
