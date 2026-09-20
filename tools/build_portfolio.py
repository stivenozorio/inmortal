#!/usr/bin/env python3
"""Prepara las fotografías del portafolio para la web.

Entrada : assets/img/portfolio/source/IMG_*.jpeg   (originales tal cual llegan)
Salida  : assets/img/portfolio/<slug>-{520,900}.{avif,webp} + <slug>-900.jpg
          assets/img/artist-{600,900}.{avif,webp,jpg}

Además imprime las entradas listas para pegar en assets/js/portfolio-data.js.

Para publicar una foto nueva: déjala en source/ y añádela a CATALOGO.
Para quitarla de la web: comenta su línea y vuelve a ejecutar el script.

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
    ("IMG_5733", "blackout-pierna", "Blackout", "Black Work",
     "Pierna cubierta en negro sólido con líneas orgánicas en reserva, estilo Black Work."),
    ("IMG_5734", "tribal-brazo", "Tribal", "Black Work",
     "Tatuaje tribal en negro sólido sobre el brazo, con puntas afiladas y espacio negativo."),
    ("IMG_5735", "tribal-cabeza", "Tribal en cabeza", "Black Work",
     "Trazo tribal en negro tatuado en el lateral de la cabeza."),

    ("IMG_5723", "guerrera-azteca", "Guerrera azteca", "Black & Grey",
     "Retrato realista de una guerrera con tocado azteca tatuado en el hombro, en negro y gris."),
    ("IMG_5729", "dragon-espalda", "Dragón", "Black & Grey",
     "Dragón japonés en negro y gris que cubre la espalda completa."),
    ("IMG_5736", "dragon-espalda-nubes", "Dragón entre nubes", "Black & Grey",
     "Dragón japonés entre nubes tatuado en la espalda, en negro y gris."),
    ("IMG_5727", "dragones-lineas", "Dragones en línea", "Black & Grey",
     "Trazado de dos dragones a línea fina sobre la espalda, antes del sombreado."),
    ("IMG_5715", "universo-brazos", "Universo", "Black & Grey",
     "Dos antebrazos tatuados con planetas, naves y cielo estrellado en negro y gris."),
    ("IMG_5717", "oni-pierna", "Oni", "Black & Grey",
     "Máscara oni con cuernos tatuada en la pantorrilla, en negro y gris con acentos rojos."),
    ("IMG_5730", "titan-brazo", "Titán", "Black & Grey",
     "Rostro de titán barbado con círculos y símbolos geométricos tatuado en el brazo."),
    ("IMG_5737", "ojo-rosa", "Ojo y rosa", "Black & Grey",
     "Ojo, números romanos y rosa tatuados en el brazo, en negro y gris."),
    ("IMG_5725", "manga-religiosa", "Manga religiosa", "Black & Grey",
     "Manga completa con figuras religiosas y nubes en negro y gris."),
    ("IMG_5732", "arquitectura-brazo", "Arquitectura", "Black & Grey",
     "Manga con arquitectura y perspectivas urbanas en negro y gris."),
    ("IMG_5731", "lettering-brazo", "Lettering", "Black & Grey",
     "Lettering caligráfico sombreado tatuado en el brazo."),
    ("IMG_5741", "manga-japonesa", "Manga japonesa", "Black & Grey",
     "Manga japonesa completa con olas, flores y figuras en negro y gris."),
    ("IMG_5743", "dama-luna", "Dama y luna", "Black & Grey",
     "Rostro femenino con luna y ornamentos tatuado en la manga, en negro y gris."),
    ("IMG_5718", "manga-floral", "Manga floral", "Black & Grey",
     "Manga floral con ave y peonías en negro y gris."),
    ("IMG_5724", "floral-y-dragon", "Floral y dragón", "Black & Grey",
     "Vista de espalda con manga floral en un brazo y dragón en el otro."),
    ("IMG_5714", "lirio-polilla", "Lirio y polilla", "Black & Grey",
     "Lirio y polilla tatuados en el antebrazo sobre fondo negro sólido."),
    ("IMG_5720", "pulpo-brazo", "Pulpo", "Black & Grey",
     "Pulpo japonés entre nubes tatuado en la manga, en negro y gris con acentos rojos."),

    ("IMG_5744", "dragon-espalda-perfil", "Dragón · de perfil", "Black & Grey",
     "Dragón de espalda visto de perfil, con la manga floral del otro brazo."),
    ("IMG_5746", "dragon-espalda-completa", "Dragón · espalda completa", "Black & Grey",
     "Vista completa del dragón japonés tatuado en la espalda."),
    ("IMG_5739", "dragon-espalda-detalle", "Dragón · detalle", "Black & Grey",
     "Detalle de la cabeza del dragón de espalda, en negro y gris."),
    ("IMG_5716", "guerrera-azteca-detalle", "Guerrera azteca · detalle", "Black & Grey",
     "Detalle del rostro de la guerrera azteca tatuada en el hombro."),
    ("IMG_5726", "manga-religiosa-brazo", "Manga religiosa · brazo completo", "Black & Grey",
     "Vista completa de la manga religiosa desde el hombro hasta la muñeca."),

    ("IMG_5738", "elefante-mandala", "Elefante y mandala", "Ornamental",
     "Elefante con mandala y geometría ornamental tatuado en el muslo."),
    ("IMG_5722", "rostro-dotwork", "Rostro en puntillismo", "Ornamental",
     "Rostro femenino y ondas ornamentales trabajados en puntillismo."),

    ("IMG_5719", "criatura-color", "Criatura", "Color",
     "Criatura ilustrada con cuernos y aura en tonos rosas y morados tatuada en el brazo."),
    ("IMG_5745", "criatura-color-detalle", "Criatura · detalle", "Color",
     "Detalle de la criatura ilustrada en rosas y morados tatuada en el brazo."),
    ("IMG_5721", "escarabajo-color", "Escarabajo", "Color",
     "Escarabajo con alas abiertas en verdes y azules tatuado en el antebrazo."),
    ("IMG_5728", "pecho-japones", "Pecho japonés", "Color",
     "Pecho y hombro con motivos japoneses en negro con acentos naranjas y rojos."),
    ("IMG_5740", "japones-brazo", "Japonés", "Color",
     "Manga japonesa con máscara y nubes en negro, gris y rojo."),
]

# Recortes manuales (archivo -> alto y bajo en píxeles del original), para
# capturas de historias cuyo fondo no es una franja plana y trim_bars no ve.
CROPS = {
    "IMG_5714": (185, 1110),
}

# Fotografías de la sección "Behind the ink": principal y secundaria.
ARTISTA = [
    ("IMG_5713", "artist",
     "El artista de Inmortal Tatts tatuando un antebrazo bajo la luz roja del estudio."),
    ("IMG_5742", "artist-sub",
     "El artista trabajando un lettering en el antebrazo de un cliente."),
]

# Todo el material enviado está en uso: 32 piezas en el portafolio, dos fotos
# en la sección del artista y el video en el interludio (tools/build_video.py).


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
