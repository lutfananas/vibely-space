#!/usr/bin/env python3
"""
Crop the user's face from IMG_7921.PNG (the giveaway poster upload) and save
as a small square avatar to use in the "Post Giveaway Aktif" row of the
DashboardMock component.

Output: /home/z/my-project/public/avatar.png  (256x256 optimized PNG)
"""

from pathlib import Path
from PIL import Image

ROOT = Path("/home/z/my-project")
SRC = ROOT / "upload" / "IMG_7921.PNG"
DST = ROOT / "public" / "avatar.png"

# Crop region (from VLM face detection, slightly expanded for headroom)
# Original: 1024x1536, face at top 13-20%, left 67-76%
# Expanded to: top 8-28%, left 60-82% (gives some hair + shoulders)
with Image.open(SRC) as im:
    im = im.convert("RGB")
    w, h = im.size
    box = (int(w * 0.60), int(h * 0.08), int(w * 0.82), int(h * 0.28))
    crop = im.crop(box)
    # Resize to a square 256x256 avatar (slightly larger than 12x12 rem for retina)
    crop = crop.resize((256, 256), Image.LANCZOS)
    DST.parent.mkdir(parents=True, exist_ok=True)
    crop.save(DST, format="PNG", optimize=True)
    print(f"saved: {DST} ({DST.stat().st_size:,} bytes, 256x256)")

print("DONE")
