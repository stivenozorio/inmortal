#!/usr/bin/env python3
"""Deriva los assets web de marca (logo, simbolo, serpiente, social).

Las fotografias del portafolio y del artista las prepara tools/build_portfolio.py.

Entradas  : assets/img/source/*.jpg  (logo, simbolo llama/reloj, serpiente)
Salidas   : assets/img/*.{avif,webp,jpg,png}

El logo y el simbolo NO se deforman ni se recolorean: unicamente se recorta el
area util y se calcula un canal alfa a partir de la separacion cromatica con el
fondo, conservando la forma y el rojo de marca (#F20132).

Uso: python3 tools/build_assets.py
"""
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "img" / "source"
OUT = ROOT / "assets" / "img"

BRAND_RED = (242, 1, 50)          # #F20132
DEEP_BG = (11, 15, 24)            # #0B0F18
PRIMARY_BG = (24, 26, 39)         # #181A27
BURGUNDY = (81, 22, 47)           # #51162F


def redness(arr):
    """Separacion del rojo frente al resto del espectro, por pixel."""
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    return r - (g + b) / 2.0


def keyed(img, lo, hi, color=BRAND_RED):
    """Devuelve el trazo rojo sobre fondo transparente (forma intacta)."""
    arr = np.asarray(img.convert("RGB")).astype(np.float32)
    alpha = np.clip((redness(arr) - lo) / (hi - lo), 0.0, 1.0)
    h, w = alpha.shape
    rgba = np.zeros((h, w, 4), dtype=np.uint8)
    rgba[:, :, 0] = color[0]
    rgba[:, :, 1] = color[1]
    rgba[:, :, 2] = color[2]
    rgba[:, :, 3] = (alpha * 255).astype(np.uint8)
    return Image.fromarray(rgba, "RGBA")


def trim_alpha(img, pad=8):
    bbox = img.split()[-1].getbbox()
    if not bbox:
        return img
    x0, y0, x1, y1 = bbox
    x0, y0 = max(0, x0 - pad), max(0, y0 - pad)
    x1, y1 = min(img.width, x1 + pad), min(img.height, y1 + pad)
    return img.crop((x0, y0, x1, y1))


def save_png(img, name, width=None, webp=True):
    """PNG (compatibilidad) + WebP (lo que sirve el navegador en la práctica)."""
    if width and img.width != width:
        h = round(img.height * width / img.width)
        img = img.resize((width, h), Image.LANCZOS)
    path = OUT / f"{name}.png"
    img.save(path, "PNG", optimize=True)
    extra = ""
    if webp:
        img.save(OUT / f"{name}.webp", "WEBP", quality=90, method=6, alpha_quality=100)
        extra = " (+webp)"
    print(f"  {path.relative_to(ROOT)}  {img.width}x{img.height}{extra}")
    return img


def save_variants(img, name, widths, quality=(58, 74, 82)):
    """Escribe avif/webp/jpg responsivos para una imagen opaca."""
    q_avif, q_webp, q_jpg = quality
    for w in widths:
        h = round(img.height * w / img.width)
        r = img.resize((w, h), Image.LANCZOS).convert("RGB")
        r.save(OUT / f"{name}-{w}.avif", "AVIF", quality=q_avif)
        r.save(OUT / f"{name}-{w}.webp", "WEBP", quality=q_webp, method=6)
        r.save(OUT / f"{name}-{w}.jpg", "JPEG", quality=q_jpg, optimize=True, progressive=True)
        print(f"  {name}-{w}.[avif|webp|jpg]  {w}x{h}")


def build_logo():
    print("logo:")
    card = Image.open(SRC / "logo-card.jpg")
    # Banda central del lienzo = marca denominativa completa.
    word = keyed(card.crop((0, 420, card.width, 840)), lo=30, hi=190)
    word = trim_alpha(word, pad=10)
    save_png(word, "logo-wordmark", width=1200)
    save_png(word, "logo-wordmark-sm", width=480)
    # Lockup inferior (llama x Inmortal Studios x circulo).
    lock = keyed(card.crop((0, 1080, card.width, 1230)), lo=30, hi=190)
    lock = trim_alpha(lock, pad=10)
    save_png(lock, "logo-studios", width=720)
    return word


def build_mark():
    print("simbolo llama / reloj de arena:")
    src = Image.open(SRC / "mark-flame-hourglass.jpg")
    mark = keyed(src, lo=40, hi=200)
    mark = trim_alpha(mark, pad=6)
    save_png(mark, "mark", width=420)    # marca de agua del CTA final
    save_png(mark, "mark-md", width=220)  # intro
    save_png(mark, "mark-sm", width=128)  # header y divisor
    return mark


def build_snake():
    print("serpiente:")
    snake = Image.open(SRC / "snake.jpg").convert("RGB")
    save_variants(snake, "snake", [480, 720, 1080])
    # Recorte apaisado centrado en la cabeza, para la seccion Black Work.
    w, h = snake.size
    wide = snake.crop((0, int(h * 0.30), w, int(h * 0.72)))
    save_variants(wide, "snake-wide", [600, 900, 1200])


def build_grain():
    """Grano procedural muy ligero (ruido monocromo con alfa baja)."""
    print("grano:")
    rng = np.random.default_rng(7)
    size, levels = 96, 4
    noise = (rng.integers(0, levels, size=(size, size)) * (255 // (levels - 1))).astype(np.uint8)
    rgba = np.zeros((size, size, 4), dtype=np.uint8)
    rgba[:, :, 0] = rgba[:, :, 1] = rgba[:, :, 2] = noise
    rgba[:, :, 3] = (noise * 0.22).astype(np.uint8)
    img = Image.fromarray(rgba, "RGBA")
    save_png(img, "grain", webp=False)


def build_social(word):
    """Open Graph 1200x630 y favicons.

    La tarjeta de enlace usa la ilustración de la serpiente a sangre: es el
    recurso que mejor identifica a la marca en un feed. Encima, un degradado
    hacia el azul-negro y la marca denominativa.
    """
    print("social / favicon:")
    W, H = 1200, 630

    # Fondo: azul-negro con luz roja y base borgoña (la misma del hero).
    base = Image.new("RGB", (W, H), DEEP_BG)
    glow = Image.new("RGB", (W, H), DEEP_BG)
    dg = ImageDraw.Draw(glow)
    dg.ellipse((W * 0.52, -H * 0.45, W * 1.30, H * 1.05), fill=BRAND_RED)
    dg.ellipse((-W * 0.20, H * 0.60, W * 0.65, H * 1.95), fill=BURGUNDY)
    glow = glow.filter(ImageFilter.GaussianBlur(170))
    base = Image.blend(base, glow, 0.26)

    # La serpiente entra por la derecha. Su fondo es el mismo azul-negro del
    # lienzo, así que se funde con "lighten": sólo queda la tinta.
    snake = Image.open(SRC / "snake.jpg").convert("RGB")
    sh = int(H * 1.16)
    sw = round(snake.width * sh / snake.height)
    art = snake.resize((sw, sh), Image.LANCZOS)

    mask = Image.new("L", (sw, sh), 0)
    dm = ImageDraw.Draw(mask)
    dm.ellipse((sw * 0.00, sh * 0.19, sw * 1.00, sh * 0.89), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(sw * 0.12))

    layer = Image.new("RGB", (W, H), DEEP_BG)
    layer.paste(art, (W - sw + 18, (H - sh) // 2), mask)
    base = ImageChops.lighter(base, layer)

    # Marca denominativa a la izquierda, con aire.
    logo_w = 430
    logo_r = word.resize((logo_w, round(word.height * logo_w / word.width)), Image.LANCZOS)
    lx, ly = 78, (H - logo_r.height) // 2 - 14
    base.paste(logo_r, (lx, ly), logo_r)

    d2 = ImageDraw.Draw(base)
    d2.rectangle((lx, ly + logo_r.height + 34, lx + 96, ly + logo_r.height + 37), fill=BRAND_RED)
    d2.rectangle((0, H - 6, W, H), fill=BRAND_RED)
    base.save(OUT / "og-image.jpg", "JPEG", quality=86, optimize=True, progressive=True)
    print(f"  og-image.jpg  {W}x{H}")

    # Favicons: simbolo sobre fondo azul-negro.
    mark = Image.open(OUT / "mark.png")
    for size, name in ((512, "favicon-512"), (180, "apple-touch-icon"), (32, "favicon-32")):
        pad = round(size * 0.16)
        canvas = Image.new("RGBA", (size, size), DEEP_BG + (255,))
        inner = size - pad * 2
        mr = mark.resize((round(mark.width * inner / mark.height), inner), Image.LANCZOS)
        canvas.paste(mr, ((size - mr.width) // 2, pad), mr)
        canvas.convert("RGB").save(OUT / f"{name}.png", "PNG", optimize=True)
        print(f"  {name}.png  {size}x{size}")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    word = build_logo()
    build_mark()
    build_snake()
    build_grain()
    build_social(word)
    print("listo.")


if __name__ == "__main__":
    main()
