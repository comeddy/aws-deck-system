/**
 * sample-2pages/build.js — 2-page AWS Standard Deck sample (Cover + Content).
 *
 * Outputs: <repo>/output/sample-2pages.pptx
 * Run:    node samples/sample-2pages/build.js
 */

const path = require("path");
const pptxgen = require("pptxgenjs");

const REPO_ROOT = path.resolve(__dirname, "..", "..");
const ASSETS_DIR = path.join(REPO_ROOT, "assets");
const OUTPUT_PATH = path.join(REPO_ROOT, "output", "sample-2pages.pptx");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "AWS Korea V-team";
pres.title  = "AWS Standard Deck — 2-page Sample";

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
// Slide 1 — Cover
// ───────────────────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { path: ASSETS.titleBg };
  s.addText("AWS Standard Deck", {
    x: 0.42, y: 1.85, w: 8.5, h: 0.85,
    fontFace: FONT, fontSize: 40, bold: true,
    color: C.ink, charSpacing: -1.5, margin: 0,
  });
  s.addText("2-page Sample for Layout Verification", {
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
    "오늘은 AWS 표준 프레젠테이션 디자인 시스템을 검증하기 위한 2페이지 샘플 deck을 보여드리겠습니다. " +
    "표지(cover)와 콘텐츠 슬라이드(content)에서 타이포그래피, 컬러 토큰, 푸터, 페이지 번호가 표준에 부합하는지 확인하는 것이 목표입니다."
  );
}

// ───────────────────────────────────────────────────────────────────────
// Slide 2 — Content (3-column comparison + stat band)
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
    { value: "16:9",  label: "Aspect Ratio" },
    { value: "26pt",  label: "Title Size" },
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
    "이 두 페이지가 표준에 부합한다면 동일한 컴포넌트로 전체 deck을 확장할 수 있습니다."
  );
}

pres.writeFile({ fileName: OUTPUT_PATH })
  .then((f) => console.log(`✓ Written: ${f}`))
  .catch((err) => { console.error("✗ Write failed:", err); process.exit(1); });
