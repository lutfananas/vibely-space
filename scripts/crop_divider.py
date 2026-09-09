#!/usr/bin/env python3
"""Crop hero-image.png (512x768 portrait poster) to a 19:6 landscape divider.
Face detected at x[340,393] y[101,154] (center 366,127) — crop window keeps
face + shoulders fully visible, face sits ~40% from banner top.
Then upscale 3x with Lanczos + mild sharpen for crisp web display."""
from PIL import Image, ImageFilter

SRC = '/home/z/my-project/public/hero-image.png'
OUT = '/home/z/my-project/public/poster-divider.jpg'

img = Image.open(SRC).convert('RGB')
W, H = img.size  # 512 x 768

# 19:6 => width/height = 3.16667 ; full-width crop height:
crop_h = round(W * 6 / 19)          # 162
crop_top = 60                        # face y101-154 -> head margin 41px, shoulders to y201 < 222
crop = img.crop((0, crop_top, W, crop_top + crop_h))
print('crop box:', (0, crop_top, W, crop_top + crop_h), '->', crop.size)

# Upscale 3x for crisp rendering on wide screens (512x162 -> 1536x486)
big = crop.resize((W * 3, crop_h * 3), Image.LANCZOS)
big = big.filter(ImageFilter.UnsharpMask(radius=1.6, percent=70, threshold=2))
big.save(OUT, quality=90)
print('saved:', OUT, big.size, f'ratio={big.size[0]/big.size[1]:.4f} (target {19/6:.4f})')
