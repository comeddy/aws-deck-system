/**
 * build_deck.js — Reference skeleton for AWS Standard Presentation
 *
 * Copy this file as a starting point for new decks. Replace content sections
 * (cover, sections, content slides, closing) with deck-specific content.
 *
 * Usage:
 *   node build_deck.js
 *   → /mnt/user-data/outputs/<deck-name>.pptx
 *
 * Prerequisites:
 *   - npm install pptxgenjs
 *   - Assets in /home/claude/:
 *     - title_bg.png
 *     - section_bg_33.png
 *   (AWS Smile logo PNG is no longer required — slides do not display it)
 */

const pptxgen = require("pptxgenjs");

// ═══════════════════════════════════════════════════════════════════════
// SETUP
// ═══════════════════════════════════════════════════════════════════════

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Youngjin Kim";
pres.title  = "AWS Standard Deck";

// ═══════════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════════

const C = {
  // Surfaces
  bg:             "0E101C",
  bgCard:         "1C1F30",
  hairline:       "2A2F44",
  hairlineSoft:   "242841",
  // Text on dark
  ink:            "FFFFFF",
  charcoal:       "E2E4EC",
  slate:          "A6ABBE",
  steel:          "7B8198",
  muted:          "5E6478",
  // AWS brand
  awsOrange:      "FF9900",
  subtitleOrange: "FF693C",
  awsInk:         "232F3E",
  // Vendor accents
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

const FONT     = "Pretendard";
const SLIDE_W  = 10.0;
const PAD_X    = 0.42;
const COPYRIGHT = "© 2026, Amazon Web Services, Inc. or its affiliates. All rights reserved.";

const ASSETS = {
  // logo asset removed: AWS Smile is no longer rendered on slides
  titleBg:   "/home/claude/title_bg.png",
  sectionBg: "/home/claude/section_bg_33.png",
};

// ═══════════════════════════════════════════════════════════════════════
// PAGE COUNTER (auto-increments — DO NOT hardcode)
// ═══════════════════════════════════════════════════════════════════════

let pageNum = 1;

// ═══════════════════════════════════════════════════════════════════════
// REUSABLE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════

/** Standard footer. Pass null on cover for no page number.
 *  AWS Smile logo intentionally omitted (per design decision).
 *  Footer contains only left-aligned copyright + right-aligned page number.
 */
function addFooter(slide, pageNumOrNull) {
  slide.addText(COPYRIGHT, {
    x: PAD_X, y: 5.2700, w: 8.0, h: 0.22,
    fontFace: FONT, fontSize: 8,
    color: C.charcoal, align: "left", margin: 0, valign: "middle",
  });
  if (pageNumOrNull != null) {
    slide.addText(String(pageNumOrNull), {
      x: 9.30, y: 5.27, w: 0.30, h: 0.22,
      fontFace: FONT, fontSize: 8,
      color: C.charcoal, align: "right", margin: 0, valign: "middle",
    });
  }
}

/** Standard content-slide header. */
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

/** Stat band (4 columns) — mandatory bottom density. */
function addStatBand(slide, stats) {
  const total = 9.16, gutter = 0.10;
  const w = (total - gutter * 3) / 4;
  const y = 4.62;
  stats.forEach((s, i) => {
    const x = PAD_X + i * (w + gutter);
    slide.addText(s.value, {
      x, y, w, h: 0.28,
      fontFace: FONT, fontSize: 16, bold: true,
      color: C.ink, charSpacing: -0.5, margin: 0, valign: "top",
    });
    slide.addText(s.label, {
      x, y: y + 0.30, w, h: 0.25,
      fontFace: FONT, fontSize: 7.5,
      color: C.slate, margin: 0, valign: "top",
    });
  });
}

function addAccentBar(slide, x, y, w, color) {
  slide.addShape(pres.ShapeType.rect, {
    x, y, w, h: 0.06,
    fill: { color }, line: { type: "none" },
  });
}

function addCardBg(slide, x, y, w, h) {
  slide.addShape(pres.ShapeType.rect, {
    x, y, w, h,
    fill: { color: C.bgCard },
    line: { color: C.hairline, width: 0.75 },
  });
}

function addBadge(slide, x, y, w, h, label, fillColor, textColor) {
  slide.addShape(pres.ShapeType.roundRect, {
    x, y, w, h,
    fill: { color: fillColor }, line: { type: "none" },
    rectRadius: 0.06,
  });
  slide.addText(label, {
    x, y, w, h,
    fontFace: FONT, fontSize: 6.8, bold: true,
    color: textColor, charSpacing: 1, align: "center", valign: "middle",
    margin: 0,
  });
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE TYPE BUILDERS
// ═══════════════════════════════════════════════════════════════════════

function addCoverSlide(opts) {
  const s = pres.addSlide();
  s.background = { path: ASSETS.titleBg };
  s.addText(opts.title, {
    x: 0.42, y: 1.85, w: 8.5, h: 0.85,
    fontFace: FONT, fontSize: 44, bold: true,
    color: C.ink, charSpacing: -1.5, margin: 0,
  });
  s.addText(opts.subtitle, {
    x: 0.42, y: 2.65, w: 8.5, h: 0.55,
    fontFace: FONT, fontSize: 26, bold: true,
    color: C.ink, charSpacing: -0.8, margin: 0,
  });
  s.addText(opts.presenterName, {
    x: 0.42, y: 4.05, w: 6.0, h: 0.30,
    fontFace: FONT, fontSize: 14, color: C.charcoal, margin: 0,
  });
  s.addText(opts.presenterTitle, {
    x: 0.42, y: 4.32, w: 6.0, h: 0.30,
    fontFace: FONT, fontSize: 14, color: C.charcoal, margin: 0,
  });
  s.addText(opts.presenterOrg, {
    x: 0.42, y: 4.59, w: 6.0, h: 0.30,
    fontFace: FONT, fontSize: 14, color: C.charcoal, margin: 0,
  });
  // AWS Smile logo intentionally omitted from cover (per design decision).
  addFooter(s, null);  // ← Cover gets NO page number
  s.addNotes(opts.script || "");
  return s;
}

function addSectionSlide(title, subtitle, script) {
  const s = pres.addSlide();
  s.background = { path: ASSETS.sectionBg };
  s.addText(title, {
    x: 0.42, y: 2.30, w: 9.16, h: 0.70,
    fontFace: FONT, fontSize: 40,
    color: C.ink, charSpacing: -1.2, margin: 0,
  });
  if (subtitle) {
    s.addText(subtitle, {
      x: 0.42, y: 2.95, w: 9.16, h: 0.55,
      fontFace: FONT, fontSize: 22,
      color: C.charcoal, charSpacing: -0.5, margin: 0,
    });
  }
  addFooter(s, ++pageNum);
  s.addNotes(script || "");
  return s;
}

function addClosingSlide(script) {
  const s = pres.addSlide();
  s.background = { path: ASSETS.sectionBg };
  s.addText("Thank you.", {
    x: 0.42, y: 2.50, w: 8.5, h: 0.85,
    fontFace: FONT, fontSize: 44, bold: false,
    color: C.ink, charSpacing: -1.5, margin: 0,
  });
  addFooter(s, ++pageNum);
  s.addNotes(script || "");
  return s;
}

// ═══════════════════════════════════════════════════════════════════════
// EXAMPLE BUILD (replace with actual content)
// ═══════════════════════════════════════════════════════════════════════

addCoverSlide({
  title: "AWS Standard Deck",
  subtitle: "Reference Build Skeleton",
  presenterName: "Youngjin Kim",
  presenterTitle: "Sr. Solutions Architect",
  presenterOrg: "AWS Korea",
  script: "안녕하세요. AWS Korea의 김영진입니다. 오늘은 AWS Standard Deck의 레퍼런스 빌드 구조를 소개드리겠습니다.",
});

addSectionSlide("Part 1", "Layout Patterns Overview",
  "이번 섹션에서는 레이아웃 패턴을 살펴보겠습니다.");

// Example content slide
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addContentHeader(s, "Example Content Slide", "Three-Column Comparison Pattern");

  const colW = (9.16 - 0.10 * 2) / 3;
  const colY = 1.38;
  const colH = 3.05;
  const cols = [
    { vendor: "MODULAR", title: "Classical Stack", color: C.metaBlue },
    { vendor: "END-TO-END", title: "Single Network", color: C.openaiGreen },
    { vendor: "HYBRID", title: "Best of Both", color: C.anthropicCoral },
  ];
  cols.forEach((col, i) => {
    const x = PAD_X + i * (colW + 0.10);
    addAccentBar(s, x, colY, colW, col.color);
    addCardBg(s, x, colY + 0.06, colW, colH - 0.06);
    s.addText(col.vendor, {
      x: x + 0.14, y: colY + 0.20, w: colW - 0.28, h: 0.22,
      fontFace: FONT, fontSize: 8, bold: true,
      color: C.steel, charSpacing: 1.5, margin: 0,
    });
    s.addText(col.title, {
      x: x + 0.14, y: colY + 0.50, w: colW - 0.28, h: 0.32,
      fontFace: FONT, fontSize: 13, bold: true,
      color: C.ink, charSpacing: -0.4, margin: 0,
    });
  });

  addStatBand(s, [
    { value: "3", label: "Approaches" },
    { value: "100K+", label: "Hours Required" },
    { value: "$10M+", label: "Compute Cost" },
    { value: "2026", label: "Mainstream Year" },
  ]);
  addFooter(s, ++pageNum);
  s.addNotes("이 슬라이드에서는 VLA 아키텍처 3가지 접근법을 비교해 보겠습니다.");
}

addClosingSlide(
  "오늘 AWS Standard Deck의 핵심 컴포넌트를 살펴보았습니다. 감사합니다."
);

// ═══════════════════════════════════════════════════════════════════════
// WRITE FILE
// ═══════════════════════════════════════════════════════════════════════

const outputPath = "/mnt/user-data/outputs/aws-standard-deck-reference.pptx";
pres.writeFile({ fileName: outputPath })
  .then(() => console.log(`✓ Written: ${outputPath}`))
  .catch((err) => console.error("✗ Write failed:", err));
