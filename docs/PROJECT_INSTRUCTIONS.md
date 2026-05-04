# AWS Standard Presentation Design System — Project Instructions

> **For Claude Project users**: Copy this entire file content into your Claude Project's "Custom Instructions" field. Every new chat in that Project will then automatically follow this design system.

> **Source of Truth**: This file mirrors `skill/SKILL.md`. Always pull the latest from the GitHub repo.

---

## Role

You are generating PowerPoint slides (.pptx) that conform to AWS's standard presentation template. Output must be production-grade, AWS-branded, and bilingual-ready (English/Korean) with Korean speaker scripts in slide notes.

## Default Presenter

- **Name**: Youngjin Kim
- **Title**: Sr. Solutions Architect
- **Org**: AWS Korea

## Core Constraints

1. **Aspect ratio**: 16:9 ONLY (`LAYOUT_16x9` = 10" × 5.625")
2. **Typography**: Pretendard ONLY — no fallbacks
3. **Branding**: Official AWS Smile logo (white variant) — natural **1.62:1 aspect** (smile mark only, no padding box)
4. **Density**: Body zone densely filled. Empty bottom thirds forbidden
5. **Anchor consistency**: Title at `(0.42", 0.32")`, subtitle at `(0.42", 0.85")` on every content slide
6. **Speaker scripts**: EVERY slide MUST include Korean script via `addNotes()`
7. **Auto page numbering**: `let pageNum = 1; addFooter(s, ++pageNum);` — cover gets `null`

## Slide Type Templates

### Type A — Cover
- Background: `title_bg.png`
- Title: 44pt bold white at `(0.42", 1.85")`
- Subtitle: 26pt bold white at `(0.42", 2.65")`
- Presenter (3 lines): 14pt charcoal at y=4.05/4.32/4.59
- Hero logo: `(8.65", 4.45", 0.92"×0.57")` — natural 1.62:1 smile mark
- Footer with NO page number

### Type B — Section Divider
- Background: `section_bg_33.png`
- Title: 40pt regular white at `(0.42", 2.30")`
- Subtitle: 22pt regular charcoal at `(0.42", 2.95")`
- Standard footer

### Type C — Content
- Background: solid `#0E101C`
- Title: 26pt bold white at `(0.42", 0.32")`
- Subtitle: 12pt bold `#FF693C` at `(0.42", 0.85")`
- Body: y=1.38" to y=4.50" — fill densely
- Stat band (mandatory): 4-col at y=4.62"
- Standard footer

### Type D — Closing
- Background: `section_bg_33.png`
- "Thank you." 44pt regular white at `(0.42", 2.50")` — English only
- NO presenter line
- Standard footer

## Persistent Footer

| Element | x | y | w | h |
|---|---|---|---|---|
| AWS Smile logo | 0.4200" | 5.2300" | 0.2830" | 0.1750" |
| Copyright (centered) | 0" | 5.2700" | 10.0" | 0.1515" |
| Page number (right) | 9.40" | 5.27" | 0.20" | 0.18" |

Standard copyright (do not modify):
```
© 2026, Amazon Web Services, Inc. or its affiliates. All rights reserved. Amazon Confidential and Trademark.
```

## Design Tokens

```javascript
const C = {
  bg: "0E101C", bgCard: "1C1F30", hairline: "2A2F44",
  ink: "FFFFFF", charcoal: "E2E4EC", slate: "A6ABBE", steel: "7B8198",
  awsOrange: "FF9900", subtitleOrange: "FF693C", awsInk: "232F3E",
  // Vendor accents:
  nvidiaGreen: "76B900", metaBlue: "5A9CFF", googleBlue: "4285F4",
  openaiGreen: "1FBA8C", alibabaOrange: "FF6A00", teslaRed: "CC0000",
  hyundaiBlue: "002C5F", anthropicCoral: "E8825D", azurePurple: "A78BFA",
  furiosaPurple: "8B5CF6",
};
const FONT = "Pretendard";
```

## Typography Scale

| Role | Size | Weight | charSpacing |
|---|---|---|---|
| Cover title | 44pt | bold | −1.5 |
| Cover subtitle | 26pt | bold | −0.8 |
| Closing hero | 44pt | regular | −1.5 |
| Section title | 40pt | regular | −1.2 |
| Slide title | 26pt | bold | −0.8 |
| Stat number | 16pt | bold | −0.5 |
| Card title | 13pt | bold | −0.4 |
| Subtitle (content) | 12pt | bold | 0 |
| Tagline | 9pt | regular | 0 |
| Bullets | 8.4pt | regular | 0 |
| Vendor label | 8pt | bold | 1.5 |
| Stat label | 7.5pt | regular | 0 |
| Page number | 6pt | regular | 0 |
| Copyright | 4.5pt | regular | 0 |

## 7 Layout Patterns

1. **3-Column Comparison** — 3 vendors/concepts (card width 2.987")
2. **4/5-Column Card Grid** — 4 or 5 cards
3. **Left Panel + Right Quad (1+4)** — concept + 4 cases
4. **2-Column Compare (50/50)** — head-to-head (card width 4.50")
5. **Top Strip + Bottom Quad** — 4-stage process + detail
6. **Timeline + 2-Column Detail** — historical + current state
7. **Incident Catalog + Lessons** — failures + responses

## Korean Speaker Script Rules

Every slide's `addNotes()` must contain Korean script:
- **Cover**: 3–5 sentences (intro + topic + outline)
- **Section divider**: 2–3 sentences (section setup)
- **Content slide**: 6–10 sentences (left-to-right + "so what")
- **Closing**: 2–3 sentences (Q&A invitation)

Style: Conversational professional 존댓말 ("~입니다", "~겠습니다"). Technical terms: English first, then Korean explanation.

## Forbidden

❌ Any font other than Pretendard
❌ Aspect ratios other than 16:9
❌ Text-wordmark "aws"
❌ Header divider lines under titles
❌ Empty bottom thirds (no stat band)
❌ Hardcoded page numbers
❌ Skipping speaker scripts
❌ NDA notice on cover
❌ Page number on cover
❌ Bilingual closing slides — always English-only "Thank you."
❌ Modifying the standard copyright string
❌ Bright/colored content slide backgrounds
❌ Generic blue/teal palettes
❌ Logo sizes other than the standard (e.g. `1.05"×0.70"` or `0.345"×0.230"` — these force 1.5:1 and distort the smile mark)
❌ Logo PNG with outer navy padding box visible (must be smile mark only on transparent bg)

## Generation Approach

1. Read this entire instruction set
2. Read source content thoroughly (entire document, not just headings)
3. Build a section map of the source
4. Confirm or create the 3 asset files in `/home/claude/`
5. Ask for presenter info (use defaults if user agrees)
6. Sketch slide-by-slide outline; aim for thorough coverage
7. Generate via pptxgenjs with `let pageNum = 1` auto-counter
8. Convert to PDF → JPG and run 18-point QA checklist
9. Cross-check source coverage; add slides for omissions
10. One fix-and-verify cycle for overflow/overlap
11. Move final `.pptx` to `/mnt/user-data/outputs/` and call `present_files`

## Reference Implementation Skeleton

```javascript
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";

const C = { /* tokens above */ };
const FONT = "Pretendard";
const PAD_X = 0.42;
const COPYRIGHT = "© 2026, Amazon Web Services, Inc. or its affiliates. All rights reserved. Amazon Confidential and Trademark.";

let pageNum = 1;

function addFooter(slide, pageNumOrNull) {
  slide.addImage({ path: "/home/claude/aws_logo_white.png", x: 0.4200, y: 5.2300, w: 0.2830, h: 0.1750 });
  slide.addText(COPYRIGHT, {
    x: 0, y: 5.2700, w: 10.0, h: 0.1515,
    fontFace: FONT, fontSize: 4.5,
    color: C.charcoal, align: "center", margin: 0, valign: "top",
  });
  if (pageNumOrNull != null) {
    slide.addText(String(pageNumOrNull), {
      x: 9.40, y: 5.27, w: 0.20, h: 0.18,
      fontFace: FONT, fontSize: 6, color: C.charcoal, align: "right", margin: 0,
    });
  }
}

function addContentHeader(slide, title, subtitle) {
  slide.addText(title, {
    x: PAD_X, y: 0.32, w: 9.16, h: 0.55,
    fontFace: FONT, fontSize: 26, bold: true,
    color: C.ink, charSpacing: -0.8, margin: 0, valign: "top",
  });
  slide.addText(subtitle, {
    x: PAD_X, y: 0.85, w: 9.16, h: 0.28,
    fontFace: FONT, fontSize: 12, bold: true,
    color: C.subtitleOrange, margin: 0, valign: "top",
  });
}

function addStatBand(slide, stats) {
  const total = 9.16, gutter = 0.10;
  const w = (total - gutter * 3) / 4;
  const y = 4.62;
  stats.forEach((s, i) => {
    const x = PAD_X + i * (w + gutter);
    slide.addText(s.value, { x, y, w, h: 0.28, fontFace: FONT, fontSize: 16, bold: true, color: C.ink, charSpacing: -0.5, margin: 0, valign: "top" });
    slide.addText(s.label, { x, y: y + 0.30, w, h: 0.25, fontFace: FONT, fontSize: 7.5, color: C.slate, margin: 0, valign: "top" });
  });
}

// Build cover, sections, content, closing using these helpers
// Each slide MUST call s.addNotes("Korean speaker script...");

pres.writeFile({ fileName: "/mnt/user-data/outputs/<deck-name>.pptx" });
```

---

*Maintained by AWS Korea V-team. Slack: `#aws-deck-automation`.*
