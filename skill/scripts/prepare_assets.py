#!/usr/bin/env python3
"""
prepare_assets.py — Generate or extract asset files for AWS standard decks.

Outputs to /home/claude/:
  - title_bg.png         (1920×1080 cover gradient) — REQUIRED
  - section_bg_33.png    (1920×1080 section/closing gradient) — REQUIRED
  - aws_logo_white.png   (white AWS Smile mark only, natural 1.62:1 aspect)
                         OPTIONAL — slides no longer render the logo, but the
                         file is still produced for legacy compatibility and
                         non-deck use cases.

Usage:
    python prepare_assets.py [--svg PATH] [--template PATH] [--force]

Modes:
    --svg PATH       Convert official AWS SVG → white PNG (PREFERRED for logo)
    --template PATH  Extract from existing AWS template .pptx
    (no args)        Generate all gradients with PIL fallback
    --force          Regenerate even if outputs exist
"""

import argparse
import re
import shutil
import sys
import zipfile
from pathlib import Path

OUTPUT_DIR = Path("/home/claude")
LOGO_PATH = OUTPUT_DIR / "aws_logo_white.png"
TITLE_BG_PATH = OUTPUT_DIR / "title_bg.png"
SECTION_BG_PATH = OUTPUT_DIR / "section_bg_33.png"


def ensure_pil():
    try:
        from PIL import Image, ImageFilter
        import numpy as np
        return Image, ImageFilter, np
    except ImportError:
        sys.exit("PIL/numpy required. Run: pip install pillow numpy --break-system-packages")


def convert_svg_to_white_logo(svg_path: Path):
    """Option 1 (preferred): Convert official AWS SVG to white PNG with cropping."""
    try:
        import cairosvg
    except ImportError:
        sys.exit("cairosvg not installed. Run: pip install cairosvg --break-system-packages")

    Image, _, np = ensure_pil()

    print(f"[svg→png] Reading {svg_path}")
    with open(svg_path, "r") as f:
        svg = f.read()

    # Strip background rectangles, recolor dark navy → white
    svg = re.sub(r'<rect\s+id="Rectangle"[^>]*></rect>', "", svg)
    svg = svg.replace('fill="#232F3E"', 'fill="#FFFFFF"')

    tmp_svg = OUTPUT_DIR / "_aws_logo_tmp.svg"
    tmp_png = OUTPUT_DIR / "_aws_logo_tmp.png"
    with open(tmp_svg, "w") as f:
        f.write(svg)
    cairosvg.svg2png(url=str(tmp_svg), write_to=str(tmp_png), output_width=400, output_height=400)

    # Crop to natural bounding box
    im = Image.open(tmp_png).convert("RGBA")
    arr = np.array(im)
    alpha = arr[:, :, 3]
    rows = np.any(alpha > 0, axis=1)
    cols = np.any(alpha > 0, axis=0)
    if rows.any() and cols.any():
        rmin, rmax = np.where(rows)[0][[0, -1]]
        cmin, cmax = np.where(cols)[0][[0, -1]]
        margin = 20
        cropped = im.crop((
            max(0, cmin - margin),
            max(0, rmin - margin),
            min(im.size[0], cmax + margin),
            min(im.size[1], rmax + margin),
        ))
    else:
        cropped = im

    cropped.save(LOGO_PATH, optimize=True)
    tmp_svg.unlink()
    tmp_png.unlink()
    print(f"[svg→png] ✓ Saved {LOGO_PATH} ({cropped.size[0]}×{cropped.size[1]})")


def extract_from_template(template_path: Path):
    """Option 2: Extract logo + backgrounds from AWS template .pptx."""
    Image, _, np = ensure_pil()

    print(f"[template] Extracting from {template_path}")
    work = OUTPUT_DIR / "_template_unpacked"
    if work.exists():
        shutil.rmtree(work)
    work.mkdir()

    with zipfile.ZipFile(template_path, "r") as z:
        z.extractall(work)

    media = work / "ppt" / "media"
    if not media.exists():
        sys.exit(f"No ppt/media in template: {template_path}")

    # Heuristic candidates
    candidates = {
        "logo": ["image1.png", "image2.png"],
        "title_bg": ["image25.png", "image24.png", "image26.png", "image1.jpeg", "image1.jpg"],
        "section_bg": ["image33.png", "image32.png", "image34.png"],
    }

    # Logo (recolor dark→white)
    for fname in candidates["logo"]:
        p = media / fname
        if p.exists():
            im = Image.open(p).convert("RGBA")
            arr = np.array(im)
            mask = arr[:, :, 3] > 0
            arr[mask, 0:3] = 255
            Image.fromarray(arr).save(LOGO_PATH, optimize=True)
            print(f"[template] ✓ Logo from {fname} → {LOGO_PATH}")
            break

    for fname in candidates["title_bg"]:
        p = media / fname
        if p.exists():
            shutil.copy(p, TITLE_BG_PATH)
            print(f"[template] ✓ Title bg from {fname} → {TITLE_BG_PATH}")
            break

    for fname in candidates["section_bg"]:
        p = media / fname
        if p.exists():
            shutil.copy(p, SECTION_BG_PATH)
            print(f"[template] ✓ Section bg from {fname} → {SECTION_BG_PATH}")
            break

    shutil.rmtree(work)


def generate_gradient_title_bg():
    """Option 3 fallback: title bg gradient (dark teal→navy→purple)."""
    Image, ImageFilter, np = ensure_pil()
    print("[gradient] Generating title_bg.png")
    w, h = 1920, 1080
    arr = np.zeros((h, w, 3), dtype=np.float32)
    c1 = np.array([12, 50, 60], dtype=np.float32)
    c2 = np.array([18, 22, 50], dtype=np.float32)
    c3 = np.array([60, 30, 90], dtype=np.float32)

    xs = np.arange(w)[None, :]
    ys = np.arange(h)[:, None]
    t = (xs * 0.6 + ys * 0.4) / (w * 0.6 + h * 0.4)
    t = np.clip(t, 0, 1)

    mask = t < 0.5
    t1 = t / 0.5
    t2 = (t - 0.5) / 0.5
    for ch in range(3):
        seg1 = c1[ch] * (1 - t1) + c2[ch] * t1
        seg2 = c2[ch] * (1 - t2) + c3[ch] * t2
        arr[:, :, ch] = np.where(mask, seg1, seg2)

    img = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
    img = img.filter(ImageFilter.GaussianBlur(radius=8))
    img.save(TITLE_BG_PATH, optimize=True)
    print(f"[gradient] ✓ Saved {TITLE_BG_PATH}")


def generate_gradient_section_bg():
    """Option 3 fallback: section bg gradient (dark navy→magenta→orange)."""
    Image, ImageFilter, np = ensure_pil()
    print("[gradient] Generating section_bg_33.png")
    w, h = 1920, 1080
    arr = np.zeros((h, w, 3), dtype=np.float32)
    c1 = np.array([14, 16, 28], dtype=np.float32)
    c2 = np.array([180, 30, 80], dtype=np.float32)
    c3 = np.array([230, 100, 50], dtype=np.float32)

    xs = np.arange(w)[None, :]
    ys = np.arange(h)[:, None]
    t = (xs * 0.7 + ys * 0.3) / (w * 0.7 + h * 0.3)
    t = np.clip(t, 0, 1)

    mask = t < 0.55
    t1 = t / 0.55
    t2 = (t - 0.55) / 0.45
    for ch in range(3):
        seg1 = c1[ch] * (1 - t1) + c2[ch] * t1
        seg2 = c2[ch] * (1 - t2) + c3[ch] * t2
        arr[:, :, ch] = np.where(mask, seg1, seg2)

    img = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
    img = img.filter(ImageFilter.GaussianBlur(radius=10))
    img.save(SECTION_BG_PATH, optimize=True)
    print(f"[gradient] ✓ Saved {SECTION_BG_PATH}")


def generate_fallback_logo():
    """Last-resort placeholder. Use --svg for production."""
    Image, _, _ = ensure_pil()
    from PIL import ImageDraw, ImageFont
    print("[fallback] WARNING: Generating placeholder logo. Use --svg for production.")

    img = Image.new("RGBA", (600, 400), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 200)
    except OSError:
        font = ImageFont.load_default()
    draw.text((50, 100), "aws", fill=(255, 255, 255, 255), font=font)
    img.save(LOGO_PATH, optimize=True)
    print(f"[fallback] ✓ Saved placeholder {LOGO_PATH}")


def main():
    parser = argparse.ArgumentParser(description="Prepare AWS deck assets")
    parser.add_argument("--svg", type=Path, help="Path to official AWS SVG")
    parser.add_argument("--template", type=Path, help="Path to AWS .pptx template")
    parser.add_argument("--force", action="store_true", help="Regenerate even if exists")
    args = parser.parse_args()

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # === Logo ===
    if not LOGO_PATH.exists() or args.force:
        if args.svg and args.svg.exists():
            convert_svg_to_white_logo(args.svg)
        elif args.template and args.template.exists():
            extract_from_template(args.template)
        else:
            generate_fallback_logo()
    else:
        print(f"[skip] {LOGO_PATH} exists (use --force to regenerate)")

    # === Title bg ===
    if not TITLE_BG_PATH.exists() or args.force:
        if args.template and args.template.exists() and TITLE_BG_PATH.exists():
            pass  # already extracted
        else:
            generate_gradient_title_bg()
    else:
        print(f"[skip] {TITLE_BG_PATH} exists")

    # === Section bg ===
    if not SECTION_BG_PATH.exists() or args.force:
        if args.template and args.template.exists() and SECTION_BG_PATH.exists():
            pass
        else:
            generate_gradient_section_bg()
    else:
        print(f"[skip] {SECTION_BG_PATH} exists")

    print("\n=== Asset preparation complete ===")
    print(f"  Logo:       {LOGO_PATH}")
    print(f"  Title bg:   {TITLE_BG_PATH}")
    print(f"  Section bg: {SECTION_BG_PATH}")


if __name__ == "__main__":
    main()
