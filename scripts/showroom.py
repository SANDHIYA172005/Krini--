"""Hero pictures: one lit plinth per product line.

Input: the three Google Flow downloads (Nano Banana Pro, 3:4, "2K Upscaled",
1792x2400) in flow-src/ (git-ignored) as lubricants.jpg, construction.jpg and
aerosols.jpg.

Output: public/images/showroom-<line>.webp (1200x1600) and
showroom-<line>-sm.webp (720x960, phones).

The three were generated separately, so they are graded to sit together: each
picture's back wall is brought to the same depth (a gamma chosen from how bright
that wall is), and the aerosols and construction pictures get a little of the
warm amber of the lubricants one in their highlights. A whisper of grain keeps
the smooth light cones from banding once compressed.

Flow's visible watermark (bottom right) is part of each picture and is kept:
the page never crops the pictures and keeps the mark clear of its fades.

    python3 scripts/showroom.py      (needs Pillow and numpy)
"""
import math
import os

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, ".."))
SRC = os.path.join(ROOT, "flow-src")
OUT = os.path.join(ROOT, "public", "images")

# mean brightness (0-255) of each picture's back wall, measured beside the plinth
WALL = {"lubricants": 37.0, "construction": 30.0, "aerosols": 25.5}
# extra warmth in the highlights
WARM = {"lubricants": 0.0, "construction": 0.015, "aerosols": 0.035}
TARGET = 27.0  # every wall ends up this bright

SIZES = [(1200, 1600, "", 86), (720, 960, "-sm", 82)]


def grade(name):
    im = np.asarray(Image.open(os.path.join(SRC, f"{name}.jpg")).convert("RGB")).astype(np.float32) / 255.0
    gamma = math.log(TARGET / 255) / math.log(WALL[name] / 255)
    out = np.power(im, gamma)
    lum = (0.2126 * out[..., 0] + 0.7152 * out[..., 1] + 0.0722 * out[..., 2])[..., None]
    w = WARM[name] * np.clip(lum * 1.6, 0, 1) ** 1.5
    out = np.clip(out + np.concatenate([w, w * 0.25, -w], axis=2), 0, 1)
    return Image.fromarray((out * 255 + 0.5).astype(np.uint8))


def main():
    rng = np.random.default_rng(7)
    for name in WALL:
        im = grade(name)
        for w, h, suffix, quality in SIZES:
            px = np.asarray(im.resize((w, h), Image.LANCZOS)).astype(np.float32)
            px += rng.normal(0, 0.9, px.shape[:2])[..., None]
            out = Image.fromarray(np.clip(px + 0.5, 0, 255).astype(np.uint8))
            path = os.path.join(OUT, f"showroom-{name}{suffix}.webp")
            out.save(path, quality=quality, method=6)
            print(f"{os.path.relpath(path, ROOT):44s} {w}x{h}  {os.path.getsize(path) // 1024} KB")


if __name__ == "__main__":
    main()
