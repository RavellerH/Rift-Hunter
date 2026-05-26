#!/usr/bin/env python3
"""
Rift Hunter — Asset Generator
Reads PROMPTS.md, extracts every prompt, generates images via Google Imagen 3.
Outputs to docs/assets/generated/<category>/<slug>.png

Setup:
    pip install -r requirements-gen.txt
    export GOOGLE_API_KEY=your_key_here     # DO NOT hardcode or commit the key

Usage:
    python generate_assets.py --list              # preview all prompts
    python generate_assets.py --dry-run           # test without API calls
    python generate_assets.py                     # generate everything
    python generate_assets.py --category player   # one category only
    python generate_assets.py --id male_hunter_reference_sheet
    python generate_assets.py --overwrite         # regenerate existing files
"""

import os
import re
import sys
import time
import argparse
from pathlib import Path

# ── Config ───────────────────────────────────────────────────────────────────

PROMPTS_FILE = Path(__file__).parent / "PROMPTS.md"
OUTPUT_DIR   = Path(__file__).parent / "docs" / "assets" / "generated"

# Google Imagen 3 — Google AI Studio (api.ai.google.dev)
IMAGEN_MODEL = "imagen-3.0-generate-001"

# Imagen 3 aspect ratios per asset type
# Supported: "1:1", "3:4", "4:3", "9:16", "16:9"
ASPECT_RATIOS = {
    "reference": "16:9",
    "portrait":  "1:1",
    "sprite":    "1:1",
    "ui":        "16:9",
}

# Pixel art prefix appended to sprite prompts
SPRITE_PREFIX = (
    "pixel art, 48x48 game sprite sheet, clean single-pixel outlines, "
    "limited color palette (16 colors max), white background, horizontal strip layout. "
)

# ── Prompt Parsing ────────────────────────────────────────────────────────────

# Sections to skip entirely — not prompts, just workflow notes
SKIP_SECTIONS = {
    "master style block", "workflow notes", "consistency pipeline",
    "sprite sheet format for godot", "palette constraint",
    "monsters", "npcs — veilwatch guild hub", "npc portraits (midjourney — dialogue box headshots)",
}

# Which top-level heading maps to which category folder
CATEGORY_KEYWORDS = {
    "player":   ["male hunter", "female hunter", "character creation screen",
                 "hunter sprite", "hunter portrait", "hunter reference"],
    "monsters": ["thornmane", "verdanthos", "diablorak", "velkhrath",
                 "namielle", "ashmaul", "chaoskrel", "war-wyvern",
                 "serath", "sovereign", "barreltusk", "glacewing",
                 "mizuwing", "ignadrake", "venomfang"],
    "npcs":     ["yela", "doram", "voss", "ryn", "suni", "athe",
                 "npc portrait", "brix", "fen", "karas", "pip",
                 "wren", "ignas", "vyn", "sable"],
    "ui":       ["character creation screen", "hud", "guild board",
                 "inventory", "crafting menu"],
}


def _category_for(title: str) -> str:
    t = title.lower()
    for cat, keywords in CATEGORY_KEYWORDS.items():
        if any(k in t for k in keywords):
            return cat
    return "misc"


def _clean_mj_flags(text: str) -> str:
    """Strip Midjourney flags that Flux doesn't understand."""
    text = re.sub(r"--style\s+\S+", "", text)
    text = re.sub(r"--ar\s+[\d:]+", "", text)
    text = re.sub(r"--v\s+\d+", "", text)
    text = re.sub(r"--q\s+[\d.]+", "", text)
    text = re.sub(r"--no\s+\S+", "", text)
    return re.sub(r"\s{2,}", " ", text).strip()


def _split_negative(text: str) -> tuple[str, str]:
    """Extract NEGATIVE: block from SD prompts."""
    if "NEGATIVE:" in text:
        pos, neg = text.split("NEGATIVE:", 1)
        return pos.strip(), neg.strip()
    return text.strip(), ""


def _prompt_type(title: str, body: str, code: str) -> str:
    t, b, c = title.lower(), body.lower(), code.lower()
    if any(k in c for k in ("pixel art sprite", "sprite sheet", "row 1 (", "row 2 (")):
        return "sprite"
    if any(k in c for k in ("close-up portrait", "dialogue portrait", "portrait painting")):
        return "portrait"
    if any(k in t for k in ("screen", "ui mockup", "hud")):
        return "ui"
    return "reference"


def _slug(title: str) -> str:
    return re.sub(r"[^a-z0-9]+", "_", title.lower()).strip("_")


def parse_prompts(md_path: Path) -> list[dict]:
    """
    Returns a list of dicts, one per prompt block found in PROMPTS.md:
      id, title, category, type, prompt, negative, size_key

    Handles two nesting patterns:
      ## N — MONSTER NAME       ← parent (## level)
      ### Reference Sheet (MJ)  ← child with code block

      ## N — Hunter X           ← standalone section with code block directly
    """
    text = md_path.read_text(encoding="utf-8")
    results = []

    section_re = re.compile(r"^(#{2,4})\s+(.+)$", re.MULTILINE)
    code_re    = re.compile(r"```(?:\w+)?\n(.*?)```", re.DOTALL)

    matches = list(section_re.finditer(text))

    # Track the most recent ## parent title for context
    parent_title = ""
    parent_category = "misc"

    for i, m in enumerate(matches):
        level = len(m.group(1))
        title = m.group(2).strip()

        if title.lower() in SKIP_SECTIONS:
            continue

        start = m.end()
        end   = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        body  = text[start:end]

        # Update parent context on ## sections
        if level == 2:
            parent_title    = title
            parent_category = _category_for(title)

        blocks = code_re.findall(body)
        if not blocks:
            continue

        raw   = blocks[0]
        clean = _clean_mj_flags(raw)
        prompt, negative = _split_negative(clean)

        if not prompt.strip():
            continue

        # Determine category: try this title first, fall back to parent
        category = _category_for(title)
        if category == "misc" and parent_category != "misc":
            category = parent_category

        # Build a unique slug: for child sections, prefix with parent slug
        if level >= 3 and parent_title:
            slug = _slug(parent_title) + "_" + _slug(title)
            display = f"{parent_title} — {title}"
        else:
            slug    = _slug(title)
            display = title

        # Deduplicate slugs within results
        existing_ids = {r["id"] for r in results}
        base_slug = slug
        counter   = 2
        while slug in existing_ids:
            slug = f"{base_slug}_{counter}"
            counter += 1

        ptype    = _prompt_type(title, body, raw)
        size_key = ptype if ptype in ASPECT_RATIOS else "reference"

        results.append({
            "id":       slug,
            "title":    display,
            "category": category,
            "type":     ptype,
            "prompt":   prompt,
            "negative": negative,
            "size_key": size_key,
        })

    return results


# ── Generation ────────────────────────────────────────────────────────────────

def _get_client():
    try:
        from google import genai
    except ImportError:
        print("  ✗  Install google-genai: pip install -r requirements-gen.txt")
        sys.exit(1)
    api_key = os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        print("  ✗  Set GOOGLE_API_KEY environment variable first.")
        sys.exit(1)
    return genai.Client(api_key=api_key)


def generate_one(entry: dict, out_path: Path, dry_run: bool = False) -> bool:
    aspect = ASPECT_RATIOS.get(entry["size_key"], "1:1")

    prompt = entry["prompt"]
    if entry["type"] == "sprite":
        prompt = SPRITE_PREFIX + prompt

    if dry_run:
        print(f"    [DRY RUN]  {entry['title']}")
        print(f"               model  : {IMAGEN_MODEL}")
        print(f"               aspect : {aspect}")
        print(f"               prompt : {prompt[:120]}{'…' if len(prompt) > 120 else ''}")
        return True

    print(f"  → {entry['title']}", end="", flush=True)

    try:
        from google.genai import types

        client = _get_client()

        response = client.models.generate_images(
            model=IMAGEN_MODEL,
            prompt=prompt,
            config=types.GenerateImagesConfig(
                number_of_images=1,
                aspect_ratio=aspect,
                output_mime_type="image/png",
                safety_filter_level="BLOCK_ONLY_HIGH",
                person_generation="ALLOW_ADULT",
            ),
        )

        if not response.generated_images:
            print("  ✗  No images returned (prompt may have been filtered)")
            return False

        img_bytes = response.generated_images[0].image.image_bytes
        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_bytes(img_bytes)

        print(f"  ✓  → {out_path.relative_to(Path.cwd())}")
        return True

    except Exception as e:
        print(f"\n  ✗  {e}")
        return False


# ── CLI ───────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Generate Rift Hunter assets via Google Imagen 3"
    )
    parser.add_argument("--dry-run",  action="store_true",
                        help="Print prompts without calling the API")
    parser.add_argument("--list",     action="store_true",
                        help="List all prompts and exit")
    parser.add_argument("--category", metavar="CAT",
                        help="Only generate a specific category: player / monsters / npcs / ui / misc")
    parser.add_argument("--id",       metavar="SLUG",
                        help="Only generate a single prompt by its slug ID")
    parser.add_argument("--overwrite", action="store_true",
                        help="Regenerate even if output file already exists")
    args = parser.parse_args()

    if not args.dry_run and not os.environ.get("GOOGLE_API_KEY"):
        print("Error: set GOOGLE_API_KEY first.")
        print("  export GOOGLE_API_KEY=your_key_here")
        print("  Get a key at: aistudio.google.com")
        sys.exit(1)

    prompts = parse_prompts(PROMPTS_FILE)

    if args.category:
        prompts = [p for p in prompts if p["category"] == args.category]
    if args.id:
        prompts = [p for p in prompts if p["id"] == args.id]

    if not prompts:
        print("No prompts matched.")
        sys.exit(0)

    # Print manifest
    print(f"\nRift Hunter Asset Generator — {len(prompts)} prompt(s) found\n")
    categories = sorted({p["category"] for p in prompts})
    for cat in categories:
        cat_prompts = [p for p in prompts if p["category"] == cat]
        print(f"  [{cat}]")
        for p in cat_prompts:
            out = OUTPUT_DIR / p["category"] / f"{p['id']}.png"
            exists = "✓ exists" if out.exists() else "  pending"
            print(f"    {exists}  {p['type']:9s}  {p['title']}")
    print()

    if args.list:
        return

    # Generate
    success = failed = skipped = 0

    for p in prompts:
        out_path = OUTPUT_DIR / p["category"] / f"{p['id']}.png"

        if out_path.exists() and not args.overwrite:
            skipped += 1
            continue

        ok = generate_one(p, out_path, dry_run=args.dry_run)

        if ok:
            success += 1
        else:
            failed += 1

        # Polite pause between requests
        if not args.dry_run and ok:
            time.sleep(1.0)

    print(f"\nDone — {success} generated, {skipped} skipped (use --overwrite to regenerate), {failed} failed.")


if __name__ == "__main__":
    main()
