#!/usr/bin/env python3
"""Replace public/hero-image.png with the user's own crop, then regenerate
the 19:6 landscape divider from it.
New poster: 511x437, face detected at x[342,393] y[99,150] (center 367,124).
Crop 19:6 = 511x161 strip; top=68 puts face ~35% from banner top with
31px head margin, shoulders included."""
import shutil
from PIL import Image, ImageFilter

# 1. Replace the poster with user's crop
shutil.copy('/home/z/my-project/upload/hero-image.png', '/home/z/my-project/public/hero-image.png')
print('public/hero-image.png replaced with user upload')

# 2. Regenerate 19:6 divider from the new poster
img = Image.open('/home/z/my-project/upload/hero-image.png').convert('RGB')
W, H = img.size
crop_h = round(W * 6 / 19)   # 161
top = 68
crop = img.crop((0, top, W, top + crop_h))
print('crop box:', (0, top, W, top + crop_h), '->', crop.size)

big = crop.resize((W * 3, crop_h * 3), Image.LANCZOS)   # 1533x483
big = big.filter(ImageFilter.UnsharpMask(radius=1.6, percent=70, threshold=2))
big.save('/home/z/my-project/public/poster-divider.jpg', quality=90)
print('saved poster-divider.jpg', big.size, f'face at {(124-top)/crop_h*100:.0f}% from top')
