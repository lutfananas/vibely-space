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
# User complained "gepeng" twice. Root cause analysis:
#   v1: non-square 225x308 crop stretched to 256x256 (true distortion)
#   v2: square 280x280 crop, but face only ~33% of frame -> small + unclear
#   v3 (this): TIGHTER square 180x180 crop centered on face -> face fills ~54%
#         of avatar width, much more prominent. Still square = no distortion.
CX = 727          # face center x
CY = 245          # slightly above face center for hair/forehead headroom
HALF = 90         # half-size of the square crop (180x180 total)

with Image.open(SRC) as im:
    im = im.convert("RGB")
    w, h = im.size
    left = max(0, CX - HALF)
    top = max(0, CY - HALF)
    right = min(w, CX + HALF)
    bottom = min(h, CY + HALF)
    # enforce perfect square (in case we hit image edge)
    side = min(right - left, bottom - top)
    crop = im.crop((left, top, left + side, top + side))
    print(f"crop box: ({left},{top}) -> ({left+side},{top+side}) = {side}x{side} (square)")
    # upscale via LANCZOS for crisp final 256x256
    avatar = crop.resize((256, 256), Image.LANCZOS)
    # mild sharpening to compensate for upscaling (face stays crisp at 48px display)
    from PIL import ImageEnhance
    avatar = ImageEnhance.Sharpness(avatar).enhance(1.15)
    DST.parent.mkdir(parents=True, exist_ok=True)
    avatar.save(DST, format="PNG", optimize=True)
    print(f"saved: {DST} ({DST.stat().st_size:,} bytes, 256x256)")

print("DONE")
