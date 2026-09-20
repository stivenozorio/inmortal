#!/usr/bin/env python3
"""Prepara los videos del interludio para usarlos en la web.

Entrada : assets/video/source/<archivo>   (tal como sale del móvil)
Salida  : assets/video/<slug>.mp4    H.264, sin audio, faststart
          assets/video/<slug>.webm   VP9, más ligero donde se soporta
          assets/video/<slug>-poster.{avif,webp,jpg}

Los originales son verticales, traen audio que no se usa (los interludios
van en silencio y en bucle), y en casi todos hay que recortar el tramo que
mejor se ve antes de comprimir.

Para añadir un video nuevo: déjalo en source/ y añade su fila a VIDEOS.
Imprime también el ancho y el alto reales del póster, para pegarlos en los
atributos width/height del <video> en index.html.

Uso: python3 tools/build_video.py
"""
import subprocess
from pathlib import Path

import imageio_ffmpeg
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "video" / "source"
OUT = ROOT / "assets" / "video"
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()

# (archivo en source/, slug de salida, inicio del recorte, duración del
#  recorte ('' = hasta el final), segundo del original para el póster)
VIDEOS = [
    ("estudio.mp4", "estudio", "0", "", "5.5"),
    ("costillas-jeroglificos.mov", "costillas", "0", "", "8.0"),
    ("manga-color-pan.mp4", "manga-color", "0.4", "", "4.0"),
    ("manga-negra-caminata.mov", "manga-negra", "10.3", "6.2", "13.0"),
]


def run(args):
    subprocess.run([FFMPEG, "-v", "error", "-y"] + args, check=True)


def build_one(fname, slug, start, dur, poster_at):
    src = SRC / fname
    trim = ["-ss", start] + (["-t", dur] if dur else [])

    # -an quita el audio. scale=... nunca amplía: 'min(iw,576)' evita
    # reescalar hacia arriba cuando el original ya es más pequeño.
    common = trim + ["-i", str(src), "-an", "-vf", "scale='min(576,iw)':-2"]
    run(common + ["-c:v", "libx264", "-profile:v", "main", "-crf", "32",
                  "-preset", "slow", "-pix_fmt", "yuv420p",
                  "-movflags", "+faststart", str(OUT / f"{slug}.mp4")])
    run(common + ["-c:v", "libvpx-vp9", "-crf", "44", "-b:v", "0",
                  "-row-mt", "1", "-deadline", "good", "-cpu-used", "2",
                  str(OUT / f"{slug}.webm")])

    poster = OUT / f"{slug}-poster.jpg"
    run(["-ss", poster_at, "-i", str(src), "-frames:v", "1",
         "-vf", "scale='min(576,iw)':-2", str(poster)])
    img = Image.open(poster).convert("RGB")
    img.save(OUT / f"{slug}-poster.avif", "AVIF", quality=55)
    img.save(OUT / f"{slug}-poster.webp", "WEBP", quality=74, method=6)
    img.save(poster, "JPEG", quality=78, optimize=True, progressive=True)
    return img.size


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for fname, slug, start, dur, poster_at in VIDEOS:
        if not (SRC / fname).exists():
            print(f"  !! falta {fname}")
            continue
        w, h = build_one(fname, slug, start, dur, poster_at)
        mp4 = (OUT / f"{slug}.mp4").stat().st_size // 1024
        webm = (OUT / f"{slug}.webm").stat().st_size // 1024
        print(f"  {slug:14} {w}x{h}  mp4 {mp4} KB  webm {webm} KB"
              f"  ->  width=\"{w}\" height=\"{h}\"")


if __name__ == "__main__":
    main()
