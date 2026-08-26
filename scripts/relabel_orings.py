from PIL import Image, ImageDraw, ImageFont
import numpy as np
from scipy import ndimage
import os

SRC = "src/assets/products/parker/orings"
FONT_PATH = "C:/Windows/Fonts/arialbd.ttf"

# (base_file, new_label, out_file)
JOBS = [
    ("epdm-e3622.jpg", "E8961-85", "epdm-e8961.jpg"),
    ("fkm-v1238.jpg", "V3664-85", "fkm-v3664.jpg"),
    ("nitrile-nm507.jpg", "N0674-70", "nitrile-n0674-mil.jpg"),
    ("fkm-va075.jpg", "V1475-75", "fkm-v1475.jpg"),
    ("hnbr-n8587.jpg", "N1470-70", "nitrile-n1470.jpg"),
    ("lsr-s3691.jpg", "N1499-70", "nitrile-n1499.jpg"),
    ("perfluoro-ff380.jpg", "TPU-V1", "polyurethane-v1.jpg"),
    ("epdm-e3622.jpg", "N0674-70", "nitrile-n0674-nbr.jpg"),
]

def relabel(base_file, label, out_file):
    path = os.path.join(SRC, base_file)
    im = Image.open(path).convert("RGB")
    w, h = im.size
    arr = np.array(im)
    dark = arr.sum(axis=2) < 300

    structure = np.ones((3, 3), dtype=int)
    labeled, n = ndimage.label(dark, structure=structure)

    # the ring blob is whichever connected component contains a seed point
    # near the top-left of the ring (always ring, never text, in every base image)
    seed_y, seed_x = int(0.15 * h), int(0.25 * w)
    ring_label = labeled[seed_y, seed_x]
    if ring_label == 0:
        # seed missed the ring; search nearby for a dark pixel
        found = False
        for dy in range(-40, 41, 4):
            for dx in range(-40, 41, 4):
                yy, xx = seed_y + dy, seed_x + dx
                if 0 <= yy < h and 0 <= xx < w and labeled[yy, xx] != 0:
                    ring_label = labeled[yy, xx]
                    found = True
                    break
            if found:
                break

    # erase every dark blob that is NOT the ring blob (i.e. the old text),
    # dilated a bit to also clear anti-aliased halo pixels around the old glyphs
    text_mask = dark & (labeled != ring_label)
    text_mask = ndimage.binary_dilation(text_mask, iterations=10)
    ring_mask = dark & (labeled == ring_label)
    text_mask = text_mask & ~ring_mask
    out_arr = arr.copy()
    out_arr[text_mask] = 255
    im2 = Image.fromarray(out_arr)

    # figure out where the erased text used to be, so the new label goes in the same spot
    ys, xs = np.where(text_mask)
    if len(xs) == 0:
        x0, y0, x1, y1 = int(0.5 * w), int(0.3 * h), w - 10, int(0.6 * h)
    else:
        x0, y0, x1, y1 = xs.min(), ys.min(), xs.max(), ys.max()

    draw = ImageDraw.Draw(im2)
    box_w, box_h = x1 - x0, y1 - y0
    font_size = box_h
    font = ImageFont.truetype(FONT_PATH, font_size)
    while True:
        bbox = draw.textbbox((0, 0), label, font=font)
        tw = bbox[2] - bbox[0]
        if tw <= box_w or font_size <= 20:
            break
        font_size -= 4
        font = ImageFont.truetype(FONT_PATH, font_size)

    th = bbox[3] - bbox[1]
    tx = x0 + (box_w - tw) / 2 - bbox[0]
    ty = y0 + (box_h - th) / 2 - bbox[1]
    draw.text((tx, ty), label, fill=(0, 0, 0), font=font)

    out_path = os.path.join(SRC, out_file)
    im2.save(out_path, quality=92)
    print("wrote", out_path, "erased bbox", (x0, y0, x1, y1))

for base, label, out in JOBS:
    relabel(base, label, out)
