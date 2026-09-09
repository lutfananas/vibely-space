#!/usr/bin/env python3
"""
Swap the hero poster image at the top of the VIBELY landing page
(DashboardMock component) with the user-uploaded IMG_7921.PNG.

Strategy:
- Backup the existing /public/hero-image.png -> backups/hero-image.v1-original.png
  (only if a backup doesn't already exist, to preserve the very first version)
- Open /home/z/my-project/upload/IMG_7921.PNG (1024x1536 portrait PNG, 2.3MB)
- Resize to a web-friendly size that still looks crisp on retina displays
  (the image is shown at h-48..h-56 = 192..224px CSS px, so a ~900px wide
   source is plenty; we keep aspect ratio so height becomes ~1350)
- Save as optimized JPEG (photos compress dramatically better as JPEG
  than PNG) at /public/hero-image.jpg
- Update src/app/page.tsx and src/components/v2/hero.tsx to point to
  /hero-image.jpg
- Remove the old /public/hero-image.png ONLY if a backup exists (we just
  made one, so it's safe). We delete it to avoid confusion + to keep the
  /public folder lean.
"""

from pathlib import Path
from PIL import Image
import re

ROOT = Path("/home/z/my-project")
SRC_UPLOAD = ROOT / "upload" / "IMG_7921.PNG"
PUBLIC = ROOT / "public"
OLD_PNG = PUBLIC / "hero-image.png"
NEW_JPG = PUBLIC / "hero-image.jpg"
BACKUP_DIR = ROOT / "backups"
BACKUP_OLD = BACKUP_DIR / "hero-image.v1-original.png"

PAGE_TSX = ROOT / "src" / "app" / "page.tsx"
V2_HERO_TSX = ROOT / "src" / "components" / "v2" / "hero.tsx"

MAX_W = 900          # target width for the optimized image
JPEG_Q = 85          # quality (good balance for photos)
EXIF_ORIENTATION = True

def main() -> None:
    assert SRC_UPLOAD.exists(), f"missing source upload: {SRC_UPLOAD}"
    assert OLD_PNG.exists(), f"missing current hero image: {OLD_PNG}"
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)

    # 1. Backup the original (don't overwrite an existing backup)
    if not BACKUP_OLD.exists():
        BACKUP_OLD.write_bytes(OLD_PNG.read_bytes())
        print(f"backup saved: {BACKUP_OLD} ({BACKUP_OLD.stat().st_size:,} bytes)")
    else:
        print(f"backup already exists, keeping it: {BACKUP_OLD}")

    # 2. Open + optimize the new upload
    with Image.open(SRC_UPLOAD) as im:
        if EXIF_ORIENTATION:
            try:
                from PIL import ImageOps
                im = ImageOps.exif_transpose(im)
            except Exception as e:
                print(f"(warn) exif_transpose failed: {e}")
        im = im.convert("RGB")
        w, h = im.size
        print(f"source: {w}x{h} ({SRC_UPLOAD.stat().st_size:,} bytes)")
        if w > MAX_W:
            new_h = round(h * MAX_W / w)
            im = im.resize((MAX_W, new_h), Image.LANCZOS)
            print(f"resized -> {im.size[0]}x{im.size[1]}")
        NEW_JPG.parent.mkdir(parents=True, exist_ok=True)
        im.save(NEW_JPG, format="JPEG", quality=JPEG_Q, optimize=True, progressive=True)
        print(f"saved optimized JPEG: {NEW_JPG} ({NEW_JPG.stat().st_size:,} bytes)")

    # 3. Remove the old PNG (we have a backup)
    OLD_PNG.unlink()
    print(f"removed old: {OLD_PNG}")

    # 4. Update code references
    for path in (PAGE_TSX, V2_HERO_TSX):
        if not path.exists():
            print(f"(skip) not found: {path}")
            continue
        txt = path.read_text(encoding="utf-8")
        new_txt = txt.replace('src="/hero-image.png"', 'src="/hero-image.jpg"')
        if new_txt != txt:
            path.write_text(new_txt, encoding="utf-8")
            print(f"updated reference: {path}")
        else:
            print(f"(no change) {path}")

    print("\nDONE.")

if __name__ == "__main__":
    main()
