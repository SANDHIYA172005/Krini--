"""Section stills cut from the first round of Google Flow footage
(the six 8 s clips: A-drop, B-gears, C-plant, D-formwork, E-aerosol, F-aerial),
for About, Services, Products, Blog and Contact.

Each still is a frame from a source clip, cropped to the slot's aspect ratio
around a focus point, graded like the film, and marked with the same visible
"Veo" watermark Flow applies to the footage (re-applied bottom-right when the
crop loses the original).
"""
import subprocess
from PIL import Image, ImageEnhance
import numpy as np

import os, tempfile
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
RAW = os.environ.get("STILLS_SRC", os.path.join(ROOT, "film-src"))
OUT = os.path.join(ROOT, "public", "images")
WM = Image.open(os.path.join(HERE, "veo-watermark.png"))  # 35x17 at 1080p source scale
TMP = tempfile.mkdtemp()

def grab(src, t):
    path = os.path.join(TMP, f"grab-{src}-{t}.png")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(t), "-i", f"{RAW}/{src}.mp4", "-frames:v", "1", path], check=True)
    return Image.open(path).convert("RGB")

def grade(im):
    a = np.asarray(im).astype(np.float32) / 255.0
    # same shadow curve as the film: 0.08 -> 0.055, 0.5 -> 0.49
    x = np.array([0, 0.08, 0.5, 1.0]); y = np.array([0, 0.055, 0.49, 1.0])
    a = np.interp(a, x, y)
    im = Image.fromarray((a * 255).clip(0, 255).astype(np.uint8))
    return ImageEnhance.Color(im).enhance(0.96)

ONLY = set(filter(None, os.environ.get("ONLY", "").split(",")))  # e.g. ONLY=blog-storage.webp,og-about.jpg

def still(name, src, t, w, h, fx=0.5, fy=0.5, band=(0, 1080)):
    if ONLY and name not in ONLY:
        return
    im = grab(src, t)
    y0, bh = band
    im = im.crop((0, y0, 1920, y0 + bh))
    W, H = im.size
    target = w / h
    if W / H > target:  # too wide: crop width
        cw, ch = int(H * target), H
    else:
        cw, ch = W, int(W / target)
    x = int(min(max(W * fx - cw / 2, 0), W - cw))
    y = int(min(max(H * fy - ch / 2, 0), H - ch))
    im = im.crop((x, y, x + cw, y + ch)).resize((w, h), Image.LANCZOS)
    im = grade(im)
    scale = h / ch  # source px -> output px
    wm = WM.resize((max(1, round(WM.width * scale)), max(1, round(WM.height * scale))), Image.LANCZOS)
    im = im.convert("RGBA")
    im.alpha_composite(wm, (w - wm.width - round(22 * scale), h - wm.height - round(23 * scale)))
    im = im.convert("RGB")
    ext = "jpg" if name.endswith(".jpg") else "webp"
    path = f"{OUT}/{name}"
    if ext == "jpg":
        im.save(path, quality=84, optimize=True, progressive=True)
    else:
        im.save(path, quality=80, method=6)
    print(f"{name:28s} {w}x{h}  from {src} @ {t}s")

# Each slot gets a still cut to its exact shape, so the page never crops one and
# the mark in its corner always shows. Where a frame changes shape with the
# screen, there is one still per shape (the page picks it with <picture>).

# About (4:5)
still("about.webp", "B-gears", 3.2, 1200, 1500, fx=0.55)
# Services: the production hall banner, 21:9 from 1024px, 16:9 from 640px, 4:3 on phones
still("manufacturing.webp", "C-plant", 5.6, 2100, 900, fy=0.55)
still("manufacturing-169.webp", "C-plant", 5.6, 1600, 900, fy=0.55)
still("manufacturing-43.webp", "C-plant", 5.6, 1200, 900, fx=0.5, fy=0.55)
# Products: 4:5 for the sticky frame (from 1024px), 4:3 above each line on smaller screens
still("lubricants.webp", "A-drop", 2.9, 1200, 1500, fx=0.42)
still("construction.webp", "D-formwork", 3.2, 1200, 1500, fx=0.58)
still("aerosols.webp", "E-aerosol", 2.4, 1200, 1500, fx=0.36)
still("lubricants-43.webp", "A-drop", 2.9, 1200, 900, fx=0.42, fy=0.55)
still("construction-43.webp", "D-formwork", 3.2, 1200, 900, fx=0.58)
still("aerosols-43.webp", "E-aerosol", 2.4, 1200, 900, fx=0.36)
# Blog cards (4:3)
still("blog-lubricants.webp", "B-gears", 5.4, 1200, 900)
still("blog-construction.webp", "D-formwork", 4.6, 1200, 900, fx=0.55)
still("blog-aerosols.webp", "E-aerosol", 2.0, 1200, 900, fx=0.45)
still("blog-cutting-oil.webp", "A-drop", 6.8, 1200, 900, fx=0.5)
still("blog-storage.webp", "C-plant", 1.0, 1200, 900, fx=0.5)
still("blog-private-label.webp", "F-aerial", 1.5, 1200, 900, fx=0.42, band=(98, 884))
# Blog page header (4:3)
still("blog-head-43.webp", "A-drop", 4.5, 1200, 900, fx=0.5)
# Share images (1200x630, the shape social networks show, so they never crop the mark),
# one per section of the site; og.jpg (home) is described below. These keep the frame's
# full width, so they are cut from its bottom (fy=1): the mark in the footage stays whole
# and the one re-applied lands exactly on it, instead of a sliver of it showing under a second.
still("og-about.jpg", "B-gears", 3.2, 1200, 630, fx=0.55, fy=1)
still("og-services.jpg", "C-plant", 5.6, 1200, 630, fy=1)
still("og-lubricants.jpg", "A-drop", 2.9, 1200, 630, fx=0.42, fy=1)
still("og-construction.jpg", "D-formwork", 3.2, 1200, 630, fx=0.58, fy=1)
still("og-aerosols.jpg", "E-aerosol", 2.4, 1200, 630, fx=0.36, fy=1)
still("og-blog.jpg", "A-drop", 6.8, 1200, 630, fx=0.5, fy=1)
still("og-contact.jpg", "F-aerial", 6.5, 1200, 630, band=(98, 884))
# Contact: the picture behind the headline, 21:9 from 1024px (it ends above the form,
# so the form never covers the mark), 16:9 from 768px, 4:5 on phones
still("contact-219.webp", "F-aerial", 6.5, 2100, 900, band=(98, 884))
still("contact.webp", "F-aerial", 6.5, 1920, 1080, band=(98, 884))
still("contact-m.webp", "F-aerial", 6.5, 960, 1200, fx=0.5, band=(98, 884))
# og.jpg (the social-share image) is not cut here: it is a 1200x630 capture of the
# hero's opening shot (the oil drop, the headline and the h1) with the credit line
# and the Veo mark, see docs/HERO.md.
