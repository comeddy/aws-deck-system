/**
 * sample-4pages/build.js — 4-page AWS Standard Deck sample (Cover + Agenda + Content + Closing).
 *
 * Outputs: <repo>/output/sample-4pages.pptx
 * Run:    node samples/sample-4pages/build.js
 */

const path = require("path");
const pptxgen = require("pptxgenjs");

const REPO_ROOT = path.resolve(__dirname, "..", "..");
const ASSETS_DIR = path.join(REPO_ROOT, "assets");
const OUTPUT_PATH = path.join(REPO_ROOT, "output", "sample-4pages.pptx");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "AWS Korea V-team";
pres.title  = "AWS Standard Deck — 4-page Sample";

const C = {
  bg: "0E101C", bgCard: "1C1F30", hairline: "2A2F44",
  ink: "FFFFFF", charcoal: "E2E4EC", slate: "A6ABBE", steel: "7B8198",
  awsOrange: "FF9900", subtitleOrange: "FF693C",
  metaBlue: "5A9CFF", openaiGreen: "1FBA8C", anthropicCoral: "E8825D",
};
const FONT = "Pretendard";
const PAD_X = 0.42;
const COPYRIGHT = "© 2026, Amazon Web Services, Inc. or its affiliates. All rights reserved.";

const ASSETS = {
  titleBg:   path.join(ASSETS_DIR, "title_bg.png"),
  sectionBg: path.join(ASSETS_DIR, "section_bg_33.png"),
};

let pageNum = 1;

function addFooter(slide, pageNumOrNull) {
  slide.addText(COPYRIGHT, {
    x: PAD_X, y: 5.27, w: 8.0, h: 0.22,
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

// ───────────────────────────────────────────────────────────────────────
// Slide 1 — Cover (no page number)
// ───────────────────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { path: ASSETS.titleBg };
  s.addText("AWS Standard Deck", {
    x: 0.42, y: 1.85, w: 8.5, h: 0.85,
    fontFace: FONT, fontSize: 40, bold: true,
    color: C.ink, charSpacing: -1.5, margin: 0,
  });
  s.addText("4-page Sample with Agenda", {
    x: 0.42, y: 2.65, w: 8.5, h: 0.55,
    fontFace: FONT, fontSize: 26, bold: true,
    color: C.ink, charSpacing: -0.8, margin: 0,
  });
  s.addText("Your Name", {
    x: 0.42, y: 4.05, w: 6.0, h: 0.30,
    fontFace: FONT, fontSize: 14, color: C.charcoal, margin: 0,
  });
  s.addText("Prins./Sr. Solutions Architect", {
    x: 0.42, y: 4.32, w: 6.0, h: 0.30,
    fontFace: FONT, fontSize: 14, color: C.charcoal, margin: 0,
  });
  s.addText("AWS Korea", {
    x: 0.42, y: 4.59, w: 6.0, h: 0.30,
    fontFace: FONT, fontSize: 14, color: C.charcoal, margin: 0,
  });
  addFooter(s, null);
  s.addNotes(
    "안녕하세요. AWS Korea의 Solutions Architect 입니다. " +
    "오늘은 AWS 표준 프레젠테이션 디자인 시스템의 4페이지 샘플 deck을 보여드리겠습니다. " +
    "표지, 어젠다, 콘텐츠, 마무리 — 네 가지 핵심 슬라이드 타입이 표준에 부합하는지 한 자리에서 확인하는 것이 목표입니다."
  );
}

// ───────────────────────────────────────────────────────────────────────
// Slide 2 — Agenda (Type E, 5 chapters, minimal style)
// ───────────────────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addText("Agenda", {
    x: PAD_X, y: 0.32, w: 9.16, h: 0.55,
    fontFace: FONT, fontSize: 26, bold: true,
    color: C.ink, charSpacing: -0.8, margin: 0, valign: "top",
  });

  const chapters = [
    { num: "1", title: "Layout Patterns Overview",   keywords: "Cover · Agenda · Section · Content · Closing" },
    { num: "2", title: "Design Tokens & Typography", keywords: "Pretendard · charSpacing · color palette"     },
    { num: "3", title: "Reusable Components",        keywords: "Footer · Stat band · Card grid"               },
    { num: "4", title: "Speaker Scripts & Glossary", keywords: "Korean notes · 약어 설명 block"                },
    { num: "5", title: "QA & Fact-check Protocol",   keywords: "18-point checklist · vendor verification"     },
  ];

  const yTop = 1.20;        // 5 chapters
  const chapterH = 0.72;
  chapters.forEach((ch, i) => {
    const cy = yTop + i * chapterH;
    s.addText(ch.num, {
      x: PAD_X + 0.30, y: cy, w: 0.30, h: chapterH,
      fontFace: FONT, fontSize: 22, bold: true,
      color: C.ink, charSpacing: -0.5, valign: "middle", margin: 0,
    });
    s.addText(ch.title, {
      x: PAD_X + 0.75, y: cy + 0.12, w: 8.25, h: 0.30,
      fontFace: FONT, fontSize: 14, bold: true,
      color: C.ink, charSpacing: -0.3, valign: "top", margin: 0,
    });
    s.addText(ch.keywords, {
      x: PAD_X + 0.75, y: cy + 0.42, w: 8.25, h: 0.24,
      fontFace: FONT, fontSize: 9,
      color: C.charcoal, valign: "top", margin: 0,
    });
  });

  addFooter(s, ++pageNum);
  s.addNotes(
    "오늘 발표는 다섯 개 챕터로 구성됩니다. " +
    "먼저 레이아웃 패턴을 살펴본 뒤, 디자인 토큰과 타이포그래피, 재사용 가능한 컴포넌트, " +
    "한국어 발표자 스크립트와 약어 글로서리, 마지막으로 18-point QA 체크리스트와 팩트체크 프로토콜을 차례로 다루겠습니다."
  );
}

// ───────────────────────────────────────────────────────────────────────
// Slide 3 — Content (3-column comparison + stat band)
// ───────────────────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addContentHeader(s, "Layout Verification", "Three-Column Pattern + Stat Band");

  const colW = (9.16 - 0.10 * 2) / 3;
  const colY = 1.38;
  const colH = 3.05;
  const cols = [
    {
      vendor: "TYPOGRAPHY",
      title: "Pretendard Only",
      body: "Title 26pt bold,\nsubtitle 12pt orange.\nNo Inter / Noto fallback.",
      color: C.metaBlue,
    },
    {
      vendor: "ANCHORS",
      title: "Title 0.42\", 0.32\"",
      body: "Subtitle at 0.85\".\nFooter at 5.27\".\nConsistent every slide.",
      color: C.openaiGreen,
    },
    {
      vendor: "DENSITY",
      title: "Stat Band Required",
      body: "Bottom third filled\nwith 4 stats.\nNo empty space.",
      color: C.anthropicCoral,
    },
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
    s.addText(col.body, {
      x: x + 0.14, y: colY + 0.95, w: colW - 0.28, h: 1.80,
      fontFace: FONT, fontSize: 10,
      color: C.charcoal, margin: 0, valign: "top",
    });
  });

  addStatBand(s, [
    { value: "16:9",   label: "Aspect Ratio" },
    { value: "26pt",   label: "Title Size" },
    { value: "FF693C", label: "Subtitle Orange" },
    { value: "0E101C", label: "Background Navy" },
  ]);
  addFooter(s, ++pageNum);
  s.addNotes(
    "이 슬라이드는 콘텐츠 레이아웃의 핵심 요소를 검증하는 페이지입니다. " +
    "왼쪽 컬럼은 타이포그래피 — Pretendard 단일 폰트 사용 원칙을, " +
    "가운데 컬럼은 앵커 좌표 — 제목·부제목·푸터의 고정 위치를, " +
    "오른쪽 컬럼은 밀도 — 하단 stat band 필수 배치를 보여줍니다. " +
    "하단 4개의 stat은 16:9 비율, 26pt 제목 크기, 부제목 오렌지, 배경 네이비 컬러 토큰을 한눈에 보여줍니다. " +
    "이 세 가지 원칙이 표준에 부합한다면 동일한 컴포넌트로 전체 deck을 확장할 수 있습니다."
  );
}

// ───────────────────────────────────────────────────────────────────────
// Slide 4 — Closing ("Thank you." — English-only)
// ───────────────────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { path: ASSETS.sectionBg };
  s.addText("Thank you.", {
    x: 0.42, y: 2.50, w: 8.5, h: 0.85,
    fontFace: FONT, fontSize: 44, bold: false,
    color: C.ink, charSpacing: -1.5, margin: 0,
  });
  addFooter(s, ++pageNum);
  s.addNotes(
    "지금까지 AWS 표준 deck의 4페이지 샘플을 살펴보았습니다. " +
    "표지, 어젠다, 콘텐츠, 마무리 슬라이드의 디자인 토큰과 앵커가 모두 표준에 부합하는지 시각적으로 확인해 주시기 바랍니다. " +
    "질문이 있으시면 편하게 말씀해 주세요. 감사합니다."
  );
}

pres.writeFile({ fileName: OUTPUT_PATH })
  .then((f) => console.log(`✓ Written: ${f}`))
  .catch((err) => { console.error("✗ Write failed:", err); process.exit(1); });
