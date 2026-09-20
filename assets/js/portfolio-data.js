/* =========================================================================
   INMORTAL TATTS — DATOS DEL PORTAFOLIO
   -------------------------------------------------------------------------
   Este es el único archivo que hay que tocar para cambiar lo que se publica.

   Cada pieza:
     file : nombre base de la imagen en assets/img/portfolio/ (sin ancho ni
            extensión). De "dragon-espalda" salen dragon-espalda-520.avif,
            -900.avif, -520.webp, -900.webp y -900.jpg
     name : nombre visible en el hover y en el lightbox
     cat  : categoría; el filtro se arma solo con las que tengan piezas
     w/h  : medidas reales de la versión grande (evitan saltos de maquetación)
     ws   : anchos disponibles, para el srcset
     alt  : descripción para accesibilidad y SEO

   PARA AÑADIR O QUITAR FOTOS
   1. Deja el original en assets/img/portfolio/source/
   2. Añade su línea en la tabla CATALOGO de tools/build_portfolio.py
   3. Ejecuta:  python3 tools/build_portfolio.py
      y pega aquí la lista que imprime.

   Para quitar una pieza de la web basta con borrar su línea de esta lista.
   ========================================================================= */

window.PORTFOLIO = [
  { file: 'blackout-pierna', name: 'Blackout', cat: 'Black Work', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Pierna cubierta en negro sólido con líneas orgánicas en reserva, estilo Black Work.' },
  { file: 'tribal-brazo', name: 'Tribal', cat: 'Black Work', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Tatuaje tribal en negro sólido sobre el brazo, con puntas afiladas y espacio negativo.' },
  { file: 'tribal-cabeza', name: 'Tribal en cabeza', cat: 'Black Work', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Trazo tribal en negro tatuado en el lateral de la cabeza.' },
  { file: 'guerrera-azteca', name: 'Guerrera azteca', cat: 'Black & Grey', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Retrato realista de una guerrera con tocado azteca tatuado en el hombro, en negro y gris.' },
  { file: 'dragon-espalda', name: 'Dragón', cat: 'Black & Grey', w: 900, h: 1174, ws: [520, 720, 900], alt: 'Dragón japonés en negro y gris que cubre la espalda completa.' },
  { file: 'dragon-espalda-nubes', name: 'Dragón entre nubes', cat: 'Black & Grey', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Dragón japonés entre nubes tatuado en la espalda, en negro y gris.' },
  { file: 'dragones-lineas', name: 'Dragones en línea', cat: 'Black & Grey', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Trazado de dos dragones a línea fina sobre la espalda, antes del sombreado.' },
  { file: 'universo-brazos', name: 'Universo', cat: 'Black & Grey', w: 828, h: 1185, ws: [520, 720, 828], alt: 'Dos antebrazos tatuados con planetas, naves y cielo estrellado en negro y gris.' },
  { file: 'oni-pierna', name: 'Oni', cat: 'Black & Grey', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Máscara oni con cuernos tatuada en la pantorrilla, en negro y gris con acentos rojos.' },
  { file: 'titan-brazo', name: 'Titán', cat: 'Black & Grey', w: 854, h: 1280, ws: [520, 720, 854], alt: 'Rostro de titán barbado con círculos y símbolos geométricos tatuado en el brazo.' },
  { file: 'ojo-rosa', name: 'Ojo y rosa', cat: 'Black & Grey', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Ojo, números romanos y rosa tatuados en el brazo, en negro y gris.' },
  { file: 'manga-religiosa', name: 'Manga religiosa', cat: 'Black & Grey', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Manga completa con figuras religiosas y nubes en negro y gris.' },
  { file: 'arquitectura-brazo', name: 'Arquitectura', cat: 'Black & Grey', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Manga con arquitectura y perspectivas urbanas en negro y gris.' },
  { file: 'lettering-brazo', name: 'Lettering', cat: 'Black & Grey', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Lettering caligráfico sombreado tatuado en el brazo.' },
  { file: 'manga-japonesa', name: 'Manga japonesa', cat: 'Black & Grey', w: 720, h: 1280, ws: [520, 720], alt: 'Manga japonesa completa con olas, flores y figuras en negro y gris.' },
  { file: 'dama-luna', name: 'Dama y luna', cat: 'Black & Grey', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Rostro femenino con luna y ornamentos tatuado en la manga, en negro y gris.' },
  { file: 'manga-floral', name: 'Manga floral', cat: 'Black & Grey', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Manga floral con ave y peonías en negro y gris.' },
  { file: 'floral-y-dragon', name: 'Floral y dragón', cat: 'Black & Grey', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Vista de espalda con manga floral en un brazo y dragón en el otro.' },
  { file: 'lirio-polilla', name: 'Lirio y polilla', cat: 'Black & Grey', w: 720, h: 925, ws: [520, 720], alt: 'Lirio y polilla tatuados en el antebrazo sobre fondo negro sólido.' },
  { file: 'pulpo-brazo', name: 'Pulpo', cat: 'Black & Grey', w: 720, h: 1116, ws: [520, 720], alt: 'Pulpo japonés entre nubes tatuado en la manga, en negro y gris con acentos rojos.' },
  { file: 'elefante-mandala', name: 'Elefante y mandala', cat: 'Ornamental', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Elefante con mandala y geometría ornamental tatuado en el muslo.' },
  { file: 'rostro-dotwork', name: 'Rostro en puntillismo', cat: 'Ornamental', w: 900, h: 1201, ws: [520, 720, 900], alt: 'Rostro femenino y ondas ornamentales trabajados en puntillismo.' },
  { file: 'criatura-color', name: 'Criatura', cat: 'Color', w: 736, h: 1280, ws: [520, 720, 736], alt: 'Criatura ilustrada con cuernos y aura en tonos rosas y morados tatuada en el brazo.' },
  { file: 'escarabajo-color', name: 'Escarabajo', cat: 'Color', w: 720, h: 1280, ws: [520, 720], alt: 'Escarabajo con alas abiertas en verdes y azules tatuado en el antebrazo.' },
  { file: 'pecho-japones', name: 'Pecho japonés', cat: 'Color', w: 854, h: 1280, ws: [520, 720, 854], alt: 'Pecho y hombro con motivos japoneses en negro con acentos naranjas y rojos.' },
  { file: 'japones-brazo', name: 'Japonés', cat: 'Color', w: 853, h: 1280, ws: [520, 720, 853], alt: 'Manga japonesa con máscara y nubes en negro, gris y rojo.' }
];
