/* =========================================================================
   INMORTAL TATTS — DATOS DEL PORTAFOLIO
   -------------------------------------------------------------------------
   Este es el único archivo que hay que tocar para publicar tatuajes.

   1. Guarda la foto en  assets/img/portfolio/  (idealmente .avif + .webp + .jpg
      con el mismo nombre; basta con .jpg si no puedes generar los otros).
   2. Añade un objeto a la lista PORTFOLIO con:

      file   : nombre del archivo SIN extensión  -> "dragon-brazo"
      name   : nombre de la pieza                -> "Serpiente / antebrazo"
      cat    : categoría (ver CATEGORIAS abajo)
      w / h  : ancho y alto reales en píxeles (evitan saltos de maquetación)
      alt    : descripción para accesibilidad y SEO
      ext    : (opcional) extensiones disponibles. Por defecto ["avif","webp","jpg"]

   3. Las categorías del filtro se generan solas a partir de las piezas
      publicadas: solo aparece la que realmente tiene trabajo cargado.
      Si hay una sola categoría, el filtro se oculta.

   CATEGORIAS sugeridas (usa exactamente el mismo texto para agrupar):
      "Black Work"  ·  "Black & Grey"  ·  "Abstract"  ·  "Ornamental"  ·  "Custom"

   Los registros con  placeholder: true  son marcos provisionales generados
   con los gráficos de marca: NO son tatuajes. Bórralos a medida que subas
   fotografías reales.
   ========================================================================= */

window.PORTFOLIO = [
  { file: 'slot-01', name: 'Próxima pieza', cat: 'Black Work', w: 900, h: 1200, alt: 'Espacio reservado para una pieza de Black Work de Inmortal Tatts.', placeholder: true },
  { file: 'slot-02', name: 'Próxima pieza', cat: 'Black Work', w: 900, h: 640,  alt: 'Espacio reservado para una pieza de Black Work de Inmortal Tatts.', placeholder: true },
  { file: 'slot-03', name: 'Próxima pieza', cat: 'Black Work', w: 900, h: 900,  alt: 'Espacio reservado para una pieza de Black Work de Inmortal Tatts.', placeholder: true },
  { file: 'slot-04', name: 'Próxima pieza', cat: 'Black Work', w: 900, h: 1350, alt: 'Espacio reservado para una pieza de Black Work de Inmortal Tatts.', placeholder: true },
  { file: 'slot-05', name: 'Próxima pieza', cat: 'Black Work', w: 900, h: 700,  alt: 'Espacio reservado para una pieza de Black Work de Inmortal Tatts.', placeholder: true },
  { file: 'slot-06', name: 'Próxima pieza', cat: 'Black Work', w: 900, h: 1150, alt: 'Espacio reservado para una pieza de Black Work de Inmortal Tatts.', placeholder: true }
];
