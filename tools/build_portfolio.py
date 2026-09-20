#!/usr/bin/env python3
"""Prepara las fotografías del portafolio para la web.

Entrada : assets/img/portfolio/source/*.jpeg   (originales tal cual llegan)
Salida  : assets/img/portfolio/<slug>-{520,720,900}.{avif,webp} + <slug>-900.jpg
          assets/img/artist{,-sub}-{600,900}.{avif,webp,jpg}

Además imprime las entradas listas para pegar en assets/js/portfolio-data.js.

Para publicar una foto nueva: déjala en source/ y añádela a CATALOGO.
Para quitarla de la web: comenta o borra su línea y vuelve a ejecutar el script.

Uso: python3 tools/build_portfolio.py
"""
from pathlib import Path

from PIL import Image
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "img" / "portfolio" / "source"
OUT = ROOT / "assets" / "img" / "portfolio"
WIDTHS = (520, 720, 900)   # el móvil a 2x pide ~720 px: sin este escalón bajaba el de 900

# (archivo, slug, nombre, categoría, alt)
CATALOGO = [
    # --- Black Work ---------------------------------------------------
    ("garras-nuca", "garras-nuca", "Garras", "Black Work",
     "Marcas de garra en negro sólido tatuadas en la nuca, con salpicado y espacio negativo."),
    ("olas-antebrazo", "olas-antebrazo", "Olas", "Black Work",
     "Patrón de olas en negro sólido tatuado en el antebrazo, con degradado de veta de madera."),
    ("tribal-cabeza-2", "tribal-cabeza-2", "Tribal en cabeza", "Black Work",
     "Trazo tribal en negro rapado en el lateral de la cabeza."),
    ("lettering-piedra", "lettering-piedra", "Lettering en piedra", "Black Work",
     "Lettering caligráfico con efecto de bloque de piedra tatuado en el antebrazo."),
    ("corazon-sagrado", "corazon-sagrado", "Corazón sagrado", "Black Work",
     "Corazón sagrado con mandala y lettering «Resiste y persevera» en negro sólido."),

    # --- Black & Grey ----------------------------------------------------
    ("zeus-brazo", "zeus-brazo", "Zeus", "Black & Grey",
     "Busto de Zeus con fases lunares y símbolos geométricos tatuado en el hombro."),
    ("guerrera-azteca-2", "guerrera-azteca", "Guerrera azteca", "Black & Grey",
     "Retrato realista de una guerrera con tocado azteca tatuado en el hombro, en negro y gris."),
    ("rostro-dotwork-2", "rostro-dotwork", "Rostro en puntillismo", "Black & Grey",
     "Rostro femenino y ondas ornamentales trabajados en puntillismo."),
    ("rostro-plantas", "rostro-plantas", "Rostro y plantas", "Black & Grey",
     "Rostro femenino entre plantas tatuado en el antebrazo, en negro y gris."),
    ("dragon-espalda-brazo", "dragon-espalda-brazo", "Dragón de espalda", "Black & Grey",
     "Dragón japonés que cubre la espalda y se extiende hacia el brazo, en negro y gris."),
    ("demonio-pierna", "demonio-pierna", "Demonio alado", "Black & Grey",
     "Rostro de demonio alado tatuado en la pantorrilla, en negro y gris."),
    ("oni-pierna-2", "oni-pierna", "Oni", "Black & Grey",
     "Máscara oni con cuernos tatuada en la pantorrilla, en negro y gris con acentos rojos."),
    ("calavera-daga", "calavera-daga", "Calavera y daga", "Black & Grey",
     "Calavera con daga y serpiente tatuada en el antebrazo, en negro y gris."),
    ("manga-grafica", "manga-grafica", "Manga gráfica", "Black & Grey",
     "Manga de patrones gráficos en blanco y negro, estilo ilustración editorial."),
    ("universo-doble-manga", "universo-doble-manga", "Universo", "Black & Grey",
     "Dos antebrazos tatuados con planetas, naves y cielo estrellado en negro y gris."),
    ("pulpo-brazo-2", "pulpo-brazo", "Pulpo", "Black & Grey",
     "Pulpo japonés entre nubes tatuado en la manga, en negro y gris con acentos rojos."),
    ("lirio-polilla-2", "lirio-polilla", "Lirio y polilla", "Black & Grey",
     "Lirio y polilla tatuados en el antebrazo sobre fondo negro sólido."),
    ("oni-mascara-antebrazo", "oni-mascara", "Máscara oni", "Black & Grey",
     "Máscara oni con cuernos y velo tatuada en el antebrazo, en negro y gris."),
    ("golondrina-floral", "golondrina-floral", "Golondrina floral", "Black & Grey",
     "Golondrina y flores tatuadas en la manga completa, en negro y gris."),
    ("oni-calavera-mano", "oni-calavera-mano", "Oni y calavera", "Black & Grey",
     "Máscara oni y calavera tatuadas del antebrazo a la mano, en negro y gris con acentos rojos."),

    # --- Ornamental --------------------------------------------------------
    ("concha-mandala", "concha-mandala", "Conchas", "Ornamental",
     "Composición de conchas marinas en puntillismo tatuada en el antebrazo."),

    # --- Color ---------------------------------------------------------
    ("criatura-color-2", "criatura-color", "Criatura", "Color",
     "Criatura ilustrada con cuernos y aura en tonos rosas y morados tatuada en el brazo."),
    ("manga-color-completa", "manga-color", "Manga a color", "Color",
     "Manga completa con varias piezas a color, incluida una criatura alada."),
    ("oni-manga-color", "oni-manga-color", "Oni a color", "Color",
     "Rostro oni y elementos gráficos a color tatuados en la manga completa."),
    ("escarabajo-verde", "escarabajo-verde", "Escarabajo", "Color",
     "Escarabajo en tonos verdes tatuado en el antebrazo, técnica puntillismo."),
    ("dragon-floral-espalda", "dragon-floral", "Dragón y flores", "Color",
     "Dragón y composición floral a color tatuados en la espalda y el brazo."),
]

# Fotografías de la sección "Behind the ink": principal y secundaria.
ARTISTA = [
    ("artista-manos", "artist",
     "Manos del artista tatuando un antebrazo bajo la luz roja del estudio."),
    ("artista-sesion", "artist-sub",
     "El artista de espaldas, tatuando en el estudio bajo luz roja."),
]

# Recortes manuales (archivo -> alto y bajo en píxeles del original), para
# capturas de historias cuyo fondo no es una franja plana y trim_bars no ve.
CROPS = {
    "lirio-polilla-2": (95, 1090),
    "oni-mascara-antebrazo": (255, 1340),
}

# Material recibido y sin publicar por ahora, con el motivo:
#   criatura-color-3   -> misma pieza que criatura-color-2, foto peor iluminada
#   096cadf9 / 6936bb45 / 9edd6675 / a431a351 (video) -> mismas piezas que ya
#     están en fotografía o en el video elegido (espalda completa, pierna oni)
#   ee05e0f4 (video) -> muestra el logo de otra marca en la ropa
#   674e7817 / c5450db5 (video) -> buen material, candidatos para un segundo
#     interludio si más adelante se quiere rotar el video


def trim_bars(img, name=None):
    """Recorta las franjas de las capturas de historias."""
    if name in CROPS:
        top, bottom = CROPS[name]
        return img.crop((0, top, img.width, bottom)), top, img.height - bottom
    a = np.asarray(img.convert("RGB")).astype(int)
    flat = a.reshape(a.shape[0], -1).std(axis=1) < 6
    top = 0
    while top < len(flat) and flat[top]:
        top += 1
    bottom = 0
    while bottom < len(flat) and flat[len(flat) - 1 - bottom]:
        bottom += 1
    if top or bottom:
        img = img.crop((0, top, img.width, img.height - bottom))
    return img, top, bottom


def variants(img, stem, out_dir, widths):
    """Genera cada ancho disponible; el mayor lleva además el JPG de respaldo."""
    real = sorted({min(w, img.width) for w in widths})
    last = None
    for w in real:
        h = round(img.height * w / img.width)
        r = img.resize((w, h), Image.LANCZOS)
        r.save(out_dir / f"{stem}-{w}.avif", "AVIF", quality=55)
        r.save(out_dir / f"{stem}-{w}.webp", "WEBP", quality=74, method=6)
        last = r
    last.save(out_dir / f"{stem}-{real[-1]}.jpg", "JPEG", quality=80,
              optimize=True, progressive=True)
    return real, last.width, last.height


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    entries = []
    for src, slug, name, cat, alt in CATALOGO:
        path = SRC / f"{src}.jpeg"
        if not path.exists():
            print(f"  !! falta {path.name}")
            continue
        img, t, b = trim_bars(Image.open(path), src)
        real, w, h = variants(img, slug, OUT, WIDTHS)
        note = f"  (recorte {t}/{b}px)" if (t or b) else ""
        print(f"  {slug:22} {img.width}x{img.height} -> {w}x{h}{note}")
        entries.append(f"  {{ file: '{slug}', name: '{name}', cat: '{cat}', "
                       f"w: {w}, h: {h}, ws: {real}, "
                       f"alt: '{alt}' }}")

    for src, slug, _alt in ARTISTA:
        img, _, _ = trim_bars(Image.open(SRC / f"{src}.jpeg"), src)
        real, _, _ = variants(img, slug, ROOT / "assets" / "img", (600, 900))
        print(f"  artista: {src} -> assets/img/{slug}-{real}")

    print("\n--- pegar en assets/js/portfolio-data.js ---")
    print("window.PORTFOLIO = [\n" + ",\n".join(entries) + "\n];")


if __name__ == "__main__":
    main()
