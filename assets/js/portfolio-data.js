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
  { file: 'garras-nuca', name: 'Garras', cat: 'Black Work', w: 900, h: 1350, ws: [520, 720, 900], alt: 'Marcas de garra en negro sólido tatuadas en la nuca, con salpicado y espacio negativo.' },
  { file: 'olas-antebrazo', name: 'Olas', cat: 'Black Work', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Patrón de olas en negro sólido tatuado en el antebrazo, con degradado de veta de madera.' },
  { file: 'tribal-cabeza-2', name: 'Tribal en cabeza', cat: 'Black Work', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Trazo tribal en negro rapado en el lateral de la cabeza.' },
  { file: 'lettering-piedra', name: 'Lettering en piedra', cat: 'Black Work', w: 808, h: 1079, ws: [520, 720, 808], alt: 'Lettering caligráfico con efecto de bloque de piedra tatuado en el antebrazo.' },
  { file: 'corazon-sagrado', name: 'Corazón sagrado', cat: 'Black Work', w: 900, h: 1287, ws: [520, 720, 900], alt: 'Corazón sagrado con mandala y lettering «Resiste y persevera» en negro sólido.' },
  { file: 'zeus-brazo', name: 'Zeus', cat: 'Black & Grey', w: 900, h: 1349, ws: [520, 720, 900], alt: 'Busto de Zeus con fases lunares y símbolos geométricos tatuado en el hombro.' },
  { file: 'guerrera-azteca', name: 'Guerrera azteca', cat: 'Black & Grey', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Retrato realista de una guerrera con tocado azteca tatuado en el hombro, en negro y gris.' },
  { file: 'rostro-dotwork', name: 'Rostro en puntillismo', cat: 'Black & Grey', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Rostro femenino y ondas ornamentales trabajados en puntillismo.' },
  { file: 'rostro-plantas', name: 'Rostro y plantas', cat: 'Black & Grey', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Rostro femenino entre plantas tatuado en el antebrazo, en negro y gris.' },
  { file: 'dragon-espalda-brazo', name: 'Dragón de espalda', cat: 'Black & Grey', w: 828, h: 1472, ws: [520, 720, 828], alt: 'Dragón japonés que cubre la espalda y se extiende hacia el brazo, en negro y gris.' },
  { file: 'demonio-pierna', name: 'Demonio alado', cat: 'Black & Grey', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Rostro de demonio alado tatuado en la pantorrilla, en negro y gris.' },
  { file: 'oni-pierna', name: 'Oni', cat: 'Black & Grey', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Máscara oni con cuernos tatuada en la pantorrilla, en negro y gris con acentos rojos.' },
  { file: 'calavera-daga', name: 'Calavera y daga', cat: 'Black & Grey', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Calavera con daga y serpiente tatuada en el antebrazo, en negro y gris.' },
  { file: 'manga-grafica', name: 'Manga gráfica', cat: 'Black & Grey', w: 900, h: 1350, ws: [520, 720, 900], alt: 'Manga de patrones gráficos en blanco y negro, estilo ilustración editorial.' },
  { file: 'universo-doble-manga', name: 'Universo', cat: 'Black & Grey', w: 828, h: 1041, ws: [520, 720, 828], alt: 'Dos antebrazos tatuados con planetas, naves y cielo estrellado en negro y gris.' },
  { file: 'pulpo-brazo', name: 'Pulpo', cat: 'Black & Grey', w: 828, h: 1283, ws: [520, 720, 828], alt: 'Pulpo japonés entre nubes tatuado en la manga, en negro y gris con acentos rojos.' },
  { file: 'lirio-polilla', name: 'Lirio y polilla', cat: 'Black & Grey', w: 736, h: 995, ws: [520, 720, 736], alt: 'Lirio y polilla tatuados en el antebrazo sobre fondo negro sólido.' },
  { file: 'oni-mascara', name: 'Máscara oni', cat: 'Black & Grey', w: 720, h: 1085, ws: [520, 720], alt: 'Máscara oni con cuernos y velo tatuada en el antebrazo, en negro y gris.' },
  { file: 'golondrina-floral', name: 'Golondrina floral', cat: 'Black & Grey', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Golondrina y flores tatuadas en la manga completa, en negro y gris.' },
  { file: 'oni-calavera-mano', name: 'Oni y calavera', cat: 'Black & Grey', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Máscara oni y calavera tatuadas del antebrazo a la mano, en negro y gris con acentos rojos.' },
  { file: 'concha-mandala', name: 'Conchas', cat: 'Ornamental', w: 900, h: 1349, ws: [520, 720, 900], alt: 'Composición de conchas marinas en puntillismo tatuada en el antebrazo.' },
  { file: 'criatura-color', name: 'Criatura', cat: 'Color', w: 900, h: 1564, ws: [520, 720, 900], alt: 'Criatura ilustrada con cuernos y aura en tonos rosas y morados tatuada en el brazo.' },
  { file: 'manga-color', name: 'Manga a color', cat: 'Color', w: 900, h: 1600, ws: [520, 720, 900], alt: 'Manga completa con varias piezas a color, incluida una criatura alada.' },
  { file: 'oni-manga-color', name: 'Oni a color', cat: 'Color', w: 900, h: 1350, ws: [520, 720, 900], alt: 'Rostro oni y elementos gráficos a color tatuados en la manga completa.' },
  { file: 'escarabajo-verde', name: 'Escarabajo', cat: 'Color', w: 900, h: 1600, ws: [520, 720, 900], alt: 'Escarabajo en tonos verdes tatuado en el antebrazo, técnica puntillismo.' },
  { file: 'dragon-floral', name: 'Dragón y flores', cat: 'Color', w: 900, h: 1200, ws: [520, 720, 900], alt: 'Dragón y composición floral a color tatuados en la espalda y el brazo.' }
];
