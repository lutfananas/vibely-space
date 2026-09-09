#!/usr/bin/env python3
"""
Crop the user's face from IMG_7921.PNG (the giveaway poster upload) and save
as a small square avatar to use in the "Post Giveaway Aktif" row of the
DashboardMock component.

IMPORTANT: the crop region MUST be square (width == height) — otherwise
resizing to 256x256 distorts the face (gepeng). We crop a square region
centered on the face, then downscale to 256x256 with zero distortion.

Output: /home/z/my-project/public/avatar.png  (256x256 optimized PNG)
"""

from pathlib import Path
from PIL import Image

ROOT = Path("/home/z/my-project")
SRC = ROOT / "upload" / "IMG_7921.PNG"
DST = ROOT / "public" / "avatar.png"

# Face location in the 1024x1536 poster (from VLM detection):
#   face left 67-76%  -> x 686..778, center x ~ 732
#   face top 13-20%   -> y 200..307, center y ~ 253
# We take a SQUARE box centered slightly above face center (to include hair),
# half-size 140px -> 280x280 region, well within image bounds.
CX = 727          # face center x
CY = 250          # face center y (slightly above to include hair headroom)
HALF = 140        # half-size of the square crop

with Image.open(SRC) as im:
    im = im.convert("RGB")
    w, h = im.size
    left = max(0, CX - HALF)
    top = max(0, CY - HALF)
    right = min(w, CX + HALF)
    bottom = min(h, CY + HALF)
    # enforce perfect square
    side = min(right - left, bottom - top)
    crop = im.crop((left, top, left + side, top + side))
    print(f"crop box: ({left},{top}) -> ({left+side},{top+side}) = {side}x{side} (square)")
    avatar = crop.resize((256, 256), Image.LANCZOS)
    DST.parent.mkdir(parents=True, exist_ok=True)
    avatar.save(DST, format="PNG", optimize=True)
    print(f"saved: {DST} ({DST.stat().st_size:,} bytes, 256x256)")

print("DONE")
