#!/usr/bin/env python3
"""Prepara el video del estudio para usarlo como interludio en la web.

Entrada : assets/video/source/estudio.mp4   (tal como sale del móvil)
Salida  : assets/video/estudio.mp4   H.264, sin audio, faststart
          assets/video/estudio.webm  VP9, más ligero donde se soporta
          assets/video/estudio-poster.{avif,webp,jpg}

El original es vertical (matriz de rotación), dura 14 s y trae audio que no
se usa: el interludio va en silencio y en bucle.

Uso: python3 tools/build_video.py
"""
import subprocess
from pathlib import Path

import imageio_ffmpeg
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "video" / "source" / "estudio.mp4"
OUT = ROOT / "assets" / "video"
POSTER_AT = "5.5"          # fotograma con la pieza centrada
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()


def run(args):
    subprocess.run([FFMPEG, "-v", "error", "-y"] + args, check=True)


def main():
    OUT.mkdir(parents=True, exist_ok=True)

    # -an quita el audio. scale=... nunca amplía: 'min(iw,576)' evita
    # reescalar hacia arriba cuando el original ya es más pequeño.
    common = ["-i", str(SRC), "-an", "-vf", "scale='min(576,iw)':-2"]
    run(common + ["-c:v", "libx264", "-profile:v", "main", "-crf", "32",
                  "-preset", "slow", "-pix_fmt", "yuv420p",
                  "-movflags", "+faststart", str(OUT / "estudio.mp4")])
    run(common + ["-c:v", "libvpx-vp9", "-crf", "44", "-b:v", "0",
                  "-row-mt", "1", "-deadline", "good", "-cpu-used", "2",
                  str(OUT / "estudio.webm")])

    poster = OUT / "estudio-poster.jpg"
    run(["-ss", POSTER_AT, "-i", str(SRC), "-frames:v", "1",
         "-vf", "scale='min(576,iw)':-2", str(poster)])
    img = Image.open(poster).convert("RGB")
    img.save(OUT / "estudio-poster.avif", "AVIF", quality=55)
    img.save(OUT / "estudio-poster.webp", "WEBP", quality=74, method=6)
    img.save(poster, "JPEG", quality=78, optimize=True, progressive=True)

    for f in sorted(OUT.iterdir()):
        if f.is_file():
            print(f"  {f.name:24} {f.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
