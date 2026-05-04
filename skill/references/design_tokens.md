# Design Tokens Reference

> Detailed color, typography, and spacing tokens. Read this when you need exact hex values, font sizes, or anchor coordinates.

## Color Palette

```javascript
const C = {
  // ─── Surfaces ───
  bg:            "0E101C",  // dark navy — content slide background
  bgCard:        "1C1F30",  // elevated card surface on dark
  hairline:      "2A2F44",  // dividers on dark
  hairlineSoft:  "242841",  // quieter dividers

  // ─── Text on dark ───
  ink:           "FFFFFF",  // primary headlines, hero text
  charcoal:      "E2E4EC",  // body text, taglines, presenter info
  slate:         "A6ABBE",  // stat labels, secondary
  steel:         "7B8198",  // vendor labels, tertiary
  muted:         "5E6478",  // de-emphasized

  // ─── AWS brand ───
  awsOrange:      "FF9900",  // AWS primary accent
  subtitleOrange: "FF693C",  // AWS subtitle color (template-exact, NON-NEGOTIABLE)
  awsInk:         "232F3E",  // AWS deep navy (logo color on light)

  // ─── Vendor / category accents ───
  // Use sparingly, only for product identity in card headers
  nvidiaGreen:    "76B900",
  metaBlue:       "5A9CFF",
  googleBlue:     "4285F4",
  openaiGreen:    "1FBA8C",
  alibabaOrange:  "FF6A00",
  teslaRed:       "CC0000",
  amazonOrange:   "FF9900",
  hyundaiBlue:    "002C5F",
  waymoTeal:      "00A8A8",
  anthropicCoral: "E8825D",
  azurePurple:    "A78BFA",
  furiosaPurple:  "8B5CF6",
};
```

## Typography Scale

| Role | Size | Weight | charSpacing |
|---|---|---|---|
| Cover title | 44pt | bold | −1.5 |
| Cover subtitle | 26pt | bold | −0.8 |
| Closing hero | 44pt | regular | −1.5 |
| Section title | 40pt | regular | −1.2 |
| Section subtitle | 22pt | regular | −0.5 |
| Slide title | 26pt | bold | −0.8 |
| Stat number | 16pt | bold | −0.5 |
| Cover presenter | 14pt | regular | 0 |
| Card title | 13pt | bold | −0.4 |
| Subtitle (content) | 12pt | bold | 0 |
| Tagline | 9pt | regular | 0 |
| Bullets | 8.4pt | regular | 0 |
| Vendor label | 8pt | bold | 1.5 |
| Release tag | 7.8pt | bold | 0 |
| Stat label | 7.5pt | regular | 0 |
| Badge | 6.8pt | bold | 1 |
| Page number | 6pt | regular | 0 |
| Copyright | 4.5pt | regular | 0 |

**Font**: `Pretendard` for ALL text. No fallbacks.

## Layout Anchors

### Content slide vertical anchors
```
Title         y = 0.32"
Subtitle      y = 0.85"   (+0.53" rhythm)
Body start    y = 1.38"   (+0.53" rhythm)
Body end      y = 4.50"
Stat band     y = 4.62"
Footer        y = 5.21"
```

**No header divider line.** Equal 0.53" rhythm between Title → Subtitle → Body.

### Cover slide vertical anchors
```
Title         y = 1.85"
Subtitle      y = 2.65"
Presenter L1  y = 4.05"   (Name)
Presenter L2  y = 4.32"   (Title)
Presenter L3  y = 4.59"   (Org)
Footer        y = 5.21"   (copyright only — NO logo, NO page number)
```

### Section divider anchors
```
Title         y = 2.30"
Subtitle      y = 2.95"
Footer        y = 5.21"
```

### Closing slide anchors
```
"Thank you."  y = 2.50"   (English only, no presenter)
Footer        y = 5.21"
```

## Outer Padding & Grid Calculations

```javascript
const PAD_X = 0.42;        // outer left/right padding
const SLIDE_W = 10.0;
const usableW = 9.16;      // SLIDE_W - PAD_X * 2

// 5-column card grid
const cardW_5 = (9.16 - 0.10 * 4) / 5;  // = 1.748"

// 4-column card grid
const cardW_4 = (9.16 - 0.10 * 3) / 4;  // = 2.215"

// 3-column card grid
const cardW_3 = (9.16 - 0.10 * 2) / 3;  // = 2.987"

// 2-column 50/50
const cardW_2 = (9.16 - 0.16) / 2;       // = 4.50"

// 4-column stat band
const statW = (9.16 - 0.10 * 3) / 4;     // = 2.215"
```

## Card Heights

| Type | Height | Use |
|---|---|---|
| Hero card | 3.05" | Main body cards |
| Half card | ~1.45" | Stacked layouts |
| Quarter card | ~1.30" | Dense grids |
| Stat cell | 0.55" | Bottom band |

## Footer Layout

| Element | x | y | w | h |
|---|---|---|---|---|
| Copyright text (centered) | 0" | 5.2700" | 10.0" (full slide) | 0.1515" |
| Page number (right) | 9.40" | 5.27" | 0.20" | 0.18" |

The footer carries no logo image — only centered copyright + right-aligned page number.

**Standard copyright string** (do not modify):
```
© 2026, Amazon Web Services, Inc. or its affiliates. All rights reserved. Amazon Confidential and Trademark.
```

## Card Component Anatomy

```
┌──────────────────────────┐  ← top accent bar (vendor color, 0.06" tall)
│                          │
│  VENDOR LABEL            │  ← uppercase steel, 8pt bold, charSpacing 1.5
│                          │
│  ┌─────┐                 │  ← badge pill
│  │BADGE│                 │
│  └─────┘                 │
│                          │
│  Model Name              │  ← 13pt bold white
│                          │
│  Released MM YYYY        │  ← 7.8pt bold accent color
│                          │
│  One-line tagline.       │  ← 9pt charcoal
│                          │
│  ─────────────────       │  ← hairline divider
│                          │
│  •  Bullet point         │  ← 8.4pt charcoal
│  •  Bullet point         │
│                          │
└──────────────────────────┘
```

- Card body: `fill #1C1F30`, border `0.75pt #2A2F44`, no rounded corners
- Badge pill: `rectRadius 0.06–0.10"`, vendor-color fill, dark text (`#1A1A1A`)
- Internal padding: 0.12–0.14" left/right
