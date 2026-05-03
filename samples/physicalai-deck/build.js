/**
 * Physical AI on AWS — Golden Sample Deck
 *
 * 13-slide reference deck demonstrating all 7 layout patterns
 * for AWS Korea V-team's Physical AI / Robotics / Simulation domain.
 *
 * Run:
 *   node samples/physicalai-deck/build.js
 *   → /mnt/user-data/outputs/physicalai-deck.pptx
 */

const pptxgen = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Youngjin Kim";
pres.title  = "Physical AI on AWS";

const C = {
  bg: "0E101C", bgCard: "1C1F30", hairline: "2A2F44", hairlineSoft: "242841",
  ink: "FFFFFF", charcoal: "E2E4EC", slate: "A6ABBE", steel: "7B8198", muted: "5E6478",
  awsOrange: "FF9900", subtitleOrange: "FF693C", awsInk: "232F3E",
  nvidiaGreen: "76B900", metaBlue: "5A9CFF", googleBlue: "4285F4", openaiGreen: "1FBA8C",
  alibabaOrange: "FF6A00", teslaRed: "CC0000", amazonOrange: "FF9900",
  hyundaiBlue: "002C5F", waymoTeal: "00A8A8", anthropicCoral: "E8825D", azurePurple: "A78BFA",
  furiosaPurple: "8B5CF6",
};

const FONT = "Pretendard";
const SLIDE_W = 10.0;
const PAD_X = 0.42;
const COPYRIGHT = "© 2026, Amazon Web Services, Inc. or its affiliates. All rights reserved. Amazon Confidential and Trademark.";

const ASSETS = {
  logo:      "/home/claude/aws_logo_white.png",
  titleBg:   "/home/claude/title_bg.png",
  sectionBg: "/home/claude/section_bg_33.png",
};

let pageNum = 1;

function addFooter(slide, pageNumOrNull) {
  slide.addImage({ path: ASSETS.logo, x: 0.4200, y: 5.2080, w: 0.3450, h: 0.2300 });
  slide.addText(COPYRIGHT, {
    x: 0, y: 5.2700, w: SLIDE_W, h: 0.1515,
    fontFace: FONT, fontSize: 4.5, color: C.charcoal, align: "center", margin: 0, valign: "top",
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
    x, y, w, h: 0.06, fill: { color }, line: { type: "none" },
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
    fill: { color: fillColor }, line: { type: "none" }, rectRadius: 0.06,
  });
  slide.addText(label, {
    x, y, w, h,
    fontFace: FONT, fontSize: 6.8, bold: true,
    color: textColor, charSpacing: 1, align: "center", valign: "middle", margin: 0,
  });
}

function addVendorCard(slide, opts) {
  const { x, y, w, h, accent, vendor, badge, title, release, tagline, bullets } = opts;
  addAccentBar(slide, x, y, w, accent);
  addCardBg(slide, x, y + 0.06, w, h - 0.06);

  const px = x + 0.14;
  const pw = w - 0.28;
  let cy = y + 0.20;

  slide.addText(vendor, {
    x: px, y: cy, w: pw, h: 0.20,
    fontFace: FONT, fontSize: 8, bold: true, color: C.steel, charSpacing: 1.5, margin: 0,
  });
  cy += 0.24;

  if (badge) {
    addBadge(slide, px, cy, 0.55, 0.18, badge, accent, "1A1A1A");
    cy += 0.24;
  }

  slide.addText(title, {
    x: px, y: cy, w: pw, h: 0.30,
    fontFace: FONT, fontSize: 13, bold: true, color: C.ink, charSpacing: -0.4, margin: 0,
  });
  cy += 0.32;

  if (release) {
    slide.addText(release, {
      x: px, y: cy, w: pw, h: 0.18,
      fontFace: FONT, fontSize: 7.8, bold: true, color: accent, margin: 0,
    });
    cy += 0.20;
  }

  if (tagline) {
    slide.addText(tagline, {
      x: px, y: cy, w: pw, h: 0.36,
      fontFace: FONT, fontSize: 9, color: C.charcoal, margin: 0,
    });
    cy += 0.42;
  }

  slide.addShape(pres.ShapeType.line, {
    x: px, y: cy, w: pw, h: 0,
    line: { color: C.hairline, width: 0.5 },
  });
  cy += 0.10;

  if (bullets && bullets.length) {
    const bulletItems = bullets.map(b => ({
      text: "•  " + b, options: { fontSize: 8.4, color: C.charcoal },
    }));
    slide.addText(bulletItems, {
      x: px, y: cy, w: pw, h: y + h - cy - 0.12,
      fontFace: FONT, paraSpaceAfter: 4, margin: 0, valign: "top",
    });
  }
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 1 — COVER
// ═══════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { path: ASSETS.titleBg };
  s.addText("Physical AI on AWS", {
    x: 0.42, y: 1.85, w: 8.5, h: 0.85,
    fontFace: FONT, fontSize: 44, bold: true, color: C.ink, charSpacing: -1.5, margin: 0,
  });
  s.addText("From Simulation to Sim-to-Real Deployment", {
    x: 0.42, y: 2.65, w: 8.5, h: 0.55,
    fontFace: FONT, fontSize: 26, bold: true, color: C.ink, charSpacing: -0.8, margin: 0,
  });
  s.addText("Youngjin Kim", { x: 0.42, y: 4.05, w: 6.0, h: 0.30, fontFace: FONT, fontSize: 14, color: C.charcoal, margin: 0 });
  s.addText("Sr. Solutions Architect", { x: 0.42, y: 4.32, w: 6.0, h: 0.30, fontFace: FONT, fontSize: 14, color: C.charcoal, margin: 0 });
  s.addText("AWS Korea", { x: 0.42, y: 4.59, w: 6.0, h: 0.30, fontFace: FONT, fontSize: 14, color: C.charcoal, margin: 0 });
  s.addImage({ path: ASSETS.logo, x: 8.55, y: 4.45, w: 1.05, h: 0.70 });
  addFooter(s, null);
  s.addNotes(
    "안녕하세요. AWS Korea의 김영진입니다. " +
    "오늘은 'Physical AI on AWS'라는 주제로 말씀드리고자 합니다. " +
    "Foundation Model의 발전이 시뮬레이션과 로보틱스 영역까지 확장되면서 " +
    "완전히 새로운 산업 표준이 만들어지고 있는 시점입니다. " +
    "이 자리에서는 데이터 파이프라인, VLA 학습, 시뮬레이션 환경, Sim-to-Real, " +
    "그리고 한국 NPU 생태계까지 다루겠습니다. 끝까지 함께해 주시면 감사하겠습니다."
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 2 — SECTION DIVIDER (Part 1)
// ═══════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { path: ASSETS.sectionBg };
  s.addText("Part 1", { x: 0.42, y: 2.30, w: 9.16, h: 0.70, fontFace: FONT, fontSize: 40, color: C.ink, charSpacing: -1.2, margin: 0 });
  s.addText("Why Physical AI Now", { x: 0.42, y: 2.95, w: 9.16, h: 0.55, fontFace: FONT, fontSize: 22, color: C.charcoal, charSpacing: -0.5, margin: 0 });
  addFooter(s, ++pageNum);
  s.addNotes(
    "이번 섹션에서는 왜 지금이 Physical AI에 주목해야 할 시점인지 살펴보겠습니다. " +
    "Foundation Model의 발전, 시뮬레이션 인프라의 성숙, 양산형 휴머노이드의 등장이라는 " +
    "세 가지 흐름이 동시에 수렴하고 있습니다."
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 3 — Pattern 6: Timeline + 2-Column Detail
// ═══════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addContentHeader(s, "Robotics: 65년의 진화", "1959년 Unimate에서 2026년 양산형 휴머노이드까지");

  const tlY = 1.74;
  const milestones = [
    { x: 0.60, year: "1959", label: "Unimate" },
    { x: 2.40, year: "1986", label: "Boston Dynamics" },
    { x: 4.20, year: "2013", label: "Atlas v1" },
    { x: 6.00, year: "2022", label: "Optimus 1" },
    { x: 7.80, year: "2026", label: "양산형 5종" },
  ];
  s.addShape(pres.ShapeType.line, {
    x: 0.70, y: tlY, w: 7.40, h: 0,
    line: { color: C.hairline, width: 1.2 },
  });
  milestones.forEach(m => {
    s.addShape(pres.ShapeType.ellipse, {
      x: m.x - 0.07, y: tlY - 0.07, w: 0.14, h: 0.14,
      fill: { color: C.subtitleOrange }, line: { type: "none" },
    });
    s.addText(m.year, {
      x: m.x - 0.50, y: tlY - 0.36, w: 1.00, h: 0.20,
      fontFace: FONT, fontSize: 10, bold: true, color: C.ink, align: "center", margin: 0,
    });
    s.addText(m.label, {
      x: m.x - 0.55, y: tlY + 0.12, w: 1.10, h: 0.20,
      fontFace: FONT, fontSize: 8, color: C.slate, align: "center", margin: 0,
    });
  });

  const detailY = 2.40;
  const colW = 4.50;
  addCardBg(s, PAD_X, detailY, colW, 2.10);
  s.addText("축적의 시간 (1959-2020)", {
    x: PAD_X + 0.16, y: detailY + 0.16, w: colW - 0.32, h: 0.30,
    fontFace: FONT, fontSize: 13, bold: true, color: C.ink, margin: 0,
  });
  s.addText([
    { text: "•  60년에 걸친 점진적 진화", options: {} },
    { text: "•  공장 자동화 → 연구실 데모", options: {} },
    { text: "•  센서·액추에이터 단가 100배 하락", options: {} },
    { text: "•  ROS 표준화로 SW 생태계 형성", options: {} },
  ], {
    x: PAD_X + 0.16, y: detailY + 0.60, w: colW - 0.32, h: 1.40,
    fontFace: FONT, fontSize: 9, color: C.charcoal, paraSpaceAfter: 5, margin: 0, valign: "top",
  });

  const rightX = PAD_X + colW + 0.16;
  addCardBg(s, rightX, detailY, colW, 2.10);
  s.addText("압축의 시간 (2021-2026)", {
    x: rightX + 0.16, y: detailY + 0.16, w: colW - 0.32, h: 0.30,
    fontFace: FONT, fontSize: 13, bold: true, color: C.subtitleOrange, margin: 0,
  });
  s.addText([
    { text: "•  GPT 등장 후 5년 만에 VLA 부상", options: {} },
    { text: "•  Tesla·Figure·Unitree 양산 진입", options: {} },
    { text: "•  Foundation Model + 시뮬레이션 결합", options: {} },
    { text: "•  국내 두산·HD현대 본격 투자", options: {} },
  ], {
    x: rightX + 0.16, y: detailY + 0.60, w: colW - 0.32, h: 1.40,
    fontFace: FONT, fontSize: 9, color: C.charcoal, paraSpaceAfter: 5, margin: 0, valign: "top",
  });

  addStatBand(s, [
    { value: "65년", label: "총 발전 기간" },
    { value: "5년", label: "VLA 부상 압축 시간" },
    { value: "$32B", label: "2026 시장 규모" },
    { value: "5종", label: "2026 양산 휴머노이드" },
  ]);
  addFooter(s, ++pageNum);
  s.addNotes(
    "이 슬라이드는 로보틱스의 65년 발전사를 압축적으로 보여드립니다. " +
    "왼쪽 '축적의 시간'은 1959년 Unimate부터 2020년까지의 점진적 발전입니다. " +
    "이 60년 동안은 공장 자동화 중심의 발전과 ROS 같은 SW 표준화가 이뤄졌습니다. " +
    "오른쪽 '압축의 시간'은 2021년 이후 단 5년 만에 일어난 폭발적 변화입니다. " +
    "GPT 등장 이후 Vision-Language-Action 모델, 즉 VLA가 빠르게 부상했고 " +
    "Tesla, Figure, Unitree가 양산 단계에 진입했습니다. " +
    "국내에서도 두산로보틱스와 HD현대가 본격 투자를 시작했습니다. " +
    "이 압축의 시간을 가능하게 한 핵심 동력이 다음 슬라이드들에서 다룰 시뮬레이션 인프라입니다."
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 4 — Pattern 2: 5-Column Card Grid (양산형 휴머노이드 5종)
// ═══════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addContentHeader(s, "2026 양산 휴머노이드 5종", "각자 다른 폼팩터·가격·타깃 시장으로 차별화");

  const total = 9.16, gutter = 0.10, colY = 1.38, colH = 3.05;
  const w = (total - gutter * 4) / 5;
  const cards = [
    { accent: C.teslaRed, vendor: "TESLA", badge: "FLAGSHIP", title: "Optimus Gen 3",
      release: "2026 Q2 양산", tagline: "범용 가사·노동",
      bullets: ["170cm / 56kg", "$20K 목표가", "공장 내부 시범"] },
    { accent: C.openaiGreen, vendor: "FIGURE", badge: "PARTNER", title: "Figure 02",
      release: "BMW 협력", tagline: "산업 자동화",
      bullets: ["BMW Spartanburg", "Helix VLA 탑재", "$30K 추정"] },
    { accent: C.alibabaOrange, vendor: "UNITREE", badge: "PRICE", title: "G1 / H1-2",
      release: "양산 진행", tagline: "연구·교육 시장",
      bullets: ["$16K (G1)", "오픈소스 SDK", "중국 내 압도적"] },
    { accent: C.hyundaiBlue, vendor: "HYUNDAI", badge: "ATLAS", title: "All-Electric Atlas",
      release: "2026 양산", tagline: "현대차 그룹 라인",
      bullets: ["BD 인수 후 첫 양산", "현대차 공장 적용", "한국 양산"] },
    { accent: C.metaBlue, vendor: "1X", badge: "HOME", title: "NEO Gamma",
      release: "2026 출시", tagline: "가정용 휴머노이드",
      bullets: ["가정 환경 특화", "OpenAI 투자", "Tendon-driven"] },
  ];
  cards.forEach((c, i) => {
    const x = PAD_X + i * (w + gutter);
    addVendorCard(s, { x, y: colY, w, h: colH, ...c });
  });

  addStatBand(s, [
    { value: "5종", label: "2026 양산 모델" },
    { value: "$16K~$30K", label: "가격 범위" },
    { value: "3개국", label: "양산 거점 (US/CN/KR)" },
    { value: "10K+", label: "예상 첫해 출하" },
  ]);
  addFooter(s, ++pageNum);
  s.addNotes(
    "이 슬라이드는 2026년 양산 단계에 진입한 휴머노이드 로봇 5종을 보여드립니다. " +
    "왼쪽부터 Tesla Optimus Gen 3는 범용 가사 및 노동을 타깃으로 $20K 목표가입니다. " +
    "Figure 02는 BMW와의 협력으로 산업 자동화에서 검증되고 있습니다. " +
    "Unitree G1은 $16K라는 압도적 가격으로 연구·교육 시장을 공략합니다. " +
    "현대차 그룹은 Boston Dynamics 인수 후 첫 양산 휴머노이드인 All-Electric Atlas를 한국에서 진행합니다. " +
    "1X NEO Gamma는 OpenAI 투자를 받아 가정용 휴머노이드라는 새 카테고리를 개척합니다. " +
    "공통적으로 2026년이 양산 원년이며 가격대는 $16K-$30K입니다. " +
    "다음 섹션에서는 이 휴머노이드들을 학습시키는 시뮬레이션 인프라를 살펴보겠습니다."
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 5 — SECTION DIVIDER (Part 2)
// ═══════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { path: ASSETS.sectionBg };
  s.addText("Part 2", { x: 0.42, y: 2.30, w: 9.16, h: 0.70, fontFace: FONT, fontSize: 40, color: C.ink, charSpacing: -1.2, margin: 0 });
  s.addText("Simulation Stack on AWS", { x: 0.42, y: 2.95, w: 9.16, h: 0.55, fontFace: FONT, fontSize: 22, color: C.charcoal, charSpacing: -0.5, margin: 0 });
  addFooter(s, ++pageNum);
  s.addNotes(
    "이번 섹션에서는 Physical AI 학습의 핵심인 시뮬레이션 스택을 살펴보겠습니다. " +
    "실제 로봇 학습 전 가상 환경에서 시행착오를 거치는 것이 사고 비용을 줄이고 학습 속도를 높이는 핵심입니다."
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 6 — Pattern 1: 3-Column Comparison (시뮬레이터 비교)
// ═══════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addContentHeader(s, "시뮬레이터 3종 비교", "Isaac Sim · Genesis · MuJoCo의 아키텍처와 강점");

  const total = 9.16, gutter = 0.10, colY = 1.38, colH = 3.05;
  const colW = (total - gutter * 2) / 3;
  const cards = [
    { accent: C.nvidiaGreen, vendor: "NVIDIA", badge: "GPU", title: "Isaac Sim",
      release: "Omniverse 기반", tagline: "GPU 병렬, USD 포맷, ROS2 통합",
      bullets: ["단일 머신 1만 환경 동시 실행", "PhysX 5 정확도 검증", "Isaac Lab으로 RL 학습 직결", "Cosmos WFM과 결합 가능"] },
    { accent: C.openaiGreen, vendor: "GENESIS", badge: "OSS", title: "Genesis",
      release: "오픈소스 (2024)", tagline: "Pythonic, 단일 GPU 매우 빠름",
      bullets: ["PyTorch 네이티브", "수십 배 throughput", "differentiable physics", "학계·스타트업 선호"] },
    { accent: C.googleBlue, vendor: "GOOGLE DEEPMIND", badge: "REF", title: "MuJoCo",
      release: "오픈소스 표준", tagline: "정확한 contact, 학계 표준",
      bullets: ["20년 검증된 솔버", "RL 논문 표준 환경", "MJX로 GPU 가속", "다양한 모델 zoo"] },
  ];
  cards.forEach((c, i) => {
    const x = PAD_X + i * (colW + gutter);
    addVendorCard(s, { x, y: colY, w: colW, h: colH, ...c });
  });

  addStatBand(s, [
    { value: "10K+", label: "Isaac Sim 병렬 환경" },
    { value: "10x", label: "Genesis 속도 우위" },
    { value: "20년", label: "MuJoCo 검증 기간" },
    { value: "3종 모두", label: "AWS EC2에서 실행" },
  ]);
  addFooter(s, ++pageNum);
  s.addNotes(
    "이 슬라이드에서는 대표 시뮬레이터 3종을 비교해 보겠습니다. " +
    "왼쪽 Isaac Sim은 NVIDIA Omniverse 기반으로 GPU 병렬화가 가장 강력합니다. " +
    "단일 머신에서 1만 개 환경을 병렬 실행할 수 있어 학습 속도가 비약적으로 빨라집니다. " +
    "가운데 Genesis는 2024년 등장한 오픈소스로 PyTorch 네이티브와 압도적 throughput으로 학계·스타트업이 선호합니다. " +
    "오른쪽 MuJoCo는 Google DeepMind가 인수한 20년 검증된 솔버로 RL 논문의 사실상 표준입니다. " +
    "세 시뮬레이터 모두 AWS EC2 G6e/G7e 또는 SageMaker HyperPod에서 실행 가능하며 " +
    "프로젝트 성격에 따라 선택하시면 됩니다. " +
    "다음 슬라이드에서는 AWS의 Physical AI 전체 아키텍처를 살펴보겠습니다."
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 7 — Pattern 5: Top Strip + Bottom Quad (Physical AI Flywheel)
// ═══════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addContentHeader(s, "Physical AI Flywheel", "데이터 → 학습 → 시뮬 → 배포 → 데이터 (반복)");

  const stripY = 1.38;
  const stages = [
    { x: 0.50, label: "1. 수집", desc: "Real + Sim Data" },
    { x: 2.70, label: "2. 학습", desc: "VLA Foundation" },
    { x: 4.90, label: "3. 시뮬", desc: "Sim-to-Real" },
    { x: 7.10, label: "4. 배포", desc: "Edge Deploy" },
  ];
  stages.forEach((stg, i) => {
    addCardBg(s, stg.x, stripY, 1.85, 0.85);
    s.addText(stg.label, {
      x: stg.x + 0.10, y: stripY + 0.10, w: 1.65, h: 0.30,
      fontFace: FONT, fontSize: 13, bold: true, color: C.ink, charSpacing: -0.4, margin: 0,
    });
    s.addText(stg.desc, {
      x: stg.x + 0.10, y: stripY + 0.42, w: 1.65, h: 0.28,
      fontFace: FONT, fontSize: 9, color: C.subtitleOrange, margin: 0,
    });
    if (i < 3) {
      s.addText("→", {
        x: stg.x + 1.85, y: stripY + 0.30, w: 0.36, h: 0.30,
        fontFace: FONT, fontSize: 18, color: C.slate, align: "center", valign: "middle", margin: 0,
      });
    }
  });

  const bottomY = 2.45;
  const bottomH = 1.98;
  const bw = (9.16 - 0.10 * 2) / 3;
  const services = [
    { accent: C.amazonOrange, vendor: "DATA LAYER", title: "데이터 파이프라인",
      bullets: ["S3: 페타바이트 raw 센서", "Glue: ETL · 라벨링", "IoT Core: 실로봇 → 클라우드", "Cosmos WFM: 합성 데이터"] },
    { accent: C.nvidiaGreen, vendor: "TRAINING", title: "VLA 학습",
      bullets: ["SageMaker HyperPod", "EC2 P5/P5e (H100)", "GR00T N1 fine-tune", "Capacity Blocks for ML"] },
    { accent: C.azurePurple, vendor: "DEPLOY", title: "에지 배포",
      bullets: ["IoT Greengrass", "Bedrock AgentCore", "Nota AI 양자화", "Furiosa/DeepX NPU"] },
  ];
  services.forEach((svc, i) => {
    const x = PAD_X + i * (bw + 0.10);
    addAccentBar(s, x, bottomY, bw, svc.accent);
    addCardBg(s, x, bottomY + 0.06, bw, bottomH - 0.06);
    s.addText(svc.vendor, {
      x: x + 0.14, y: bottomY + 0.20, w: bw - 0.28, h: 0.20,
      fontFace: FONT, fontSize: 8, bold: true, color: C.steel, charSpacing: 1.5, margin: 0,
    });
    s.addText(svc.title, {
      x: x + 0.14, y: bottomY + 0.44, w: bw - 0.28, h: 0.30,
      fontFace: FONT, fontSize: 13, bold: true, color: C.ink, charSpacing: -0.4, margin: 0,
    });
    s.addText(svc.bullets.map(b => ({ text: "•  " + b, options: { fontSize: 8.4, color: C.charcoal } })), {
      x: x + 0.14, y: bottomY + 0.80, w: bw - 0.28, h: 1.08,
      fontFace: FONT, paraSpaceAfter: 4, margin: 0, valign: "top",
    });
  });

  addStatBand(s, [
    { value: "PB-scale", label: "센서 데이터" },
    { value: "1024 GPU", label: "HyperPod 단일 클러스터" },
    { value: "10ms", label: "엣지 추론 latency" },
    { value: "End-to-End", label: "AWS 단일 통합" },
  ]);
  addFooter(s, ++pageNum);
  s.addNotes(
    "이 슬라이드는 Physical AI Flywheel 전체 그림을 보여드립니다. " +
    "위쪽 4단계는 데이터 수집, 학습, 시뮬, 배포라는 반복 사이클입니다. " +
    "아래쪽은 각 단계를 받쳐주는 AWS 서비스를 정리한 것입니다. " +
    "데이터 레이어에서는 S3가 페타바이트급 raw 센서 데이터를 저장하고 Glue가 ETL과 라벨링을 처리합니다. " +
    "학습 단계는 SageMaker HyperPod와 EC2 P5e로 VLA 모델을 fine-tune합니다. " +
    "배포 단계는 IoT Greengrass와 Bedrock AgentCore로 엣지에 모델을 전달합니다. " +
    "한국 파트너인 Nota AI, Furiosa, DeepX, Mobilint의 NPU 양자화로 엣지 추론 latency를 10ms 이하로 압축합니다. " +
    "이 모든 단계가 AWS 안에서 단일 통합 환경으로 제공되는 것이 핵심 차별화입니다."
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 8 — Pattern 4: 2-Column Compare (Modular vs E2E VLA)
// ═══════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addContentHeader(s, "VLA Architecture: Modular vs End-to-End", "두 접근의 트레이드오프와 산업 채택 현황");

  const colW = (9.16 - 0.16) / 2;
  const colY = 1.38;
  const colH = 3.05;
  const cards = [
    { x: PAD_X, accent: C.metaBlue, vendor: "MODULAR ARCHITECTURE",
      title: "Perception → Planning → Control",
      tagline: "전통적 분리 모듈 + 학습 가능한 컴포넌트",
      bullets: ["각 모듈 독립 검증·테스트 가능", "ROS2 / DDS 기반 통신", "안전 인증 (ISO 26262) 용이", "Waymo, Cruise, 한국 자율주행", "데이터 효율적, 일반화 약함"] },
    { x: PAD_X + colW + 0.16, accent: C.openaiGreen, vendor: "END-TO-END VLA",
      title: "Pixel → Action (단일 신경망)",
      tagline: "Vision-Language-Action Foundation Model",
      bullets: ["GR00T N1, RT-2, Helix", "장면 일반화 능력 우수", "방대한 훈련 데이터 필요", "Tesla FSD v13, Figure Helix", "안전 검증 어려움, 활발한 연구"] },
  ];
  cards.forEach(c => {
    addAccentBar(s, c.x, colY, colW, c.accent);
    addCardBg(s, c.x, colY + 0.06, colW, colH - 0.06);
    s.addText(c.vendor, {
      x: c.x + 0.18, y: colY + 0.20, w: colW - 0.36, h: 0.22,
      fontFace: FONT, fontSize: 8, bold: true, color: C.steel, charSpacing: 1.5, margin: 0,
    });
    s.addText(c.title, {
      x: c.x + 0.18, y: colY + 0.46, w: colW - 0.36, h: 0.34,
      fontFace: FONT, fontSize: 14, bold: true, color: C.ink, charSpacing: -0.4, margin: 0,
    });
    s.addText(c.tagline, {
      x: c.x + 0.18, y: colY + 0.84, w: colW - 0.36, h: 0.28,
      fontFace: FONT, fontSize: 10, color: c.accent, margin: 0,
    });
    s.addShape(pres.ShapeType.line, {
      x: c.x + 0.18, y: colY + 1.18, w: colW - 0.36, h: 0,
      line: { color: C.hairline, width: 0.5 },
    });
    s.addText(c.bullets.map(b => ({ text: "•  " + b, options: { fontSize: 10, color: C.charcoal } })), {
      x: c.x + 0.18, y: colY + 1.30, w: colW - 0.36, h: 1.60,
      fontFace: FONT, paraSpaceAfter: 6, margin: 0, valign: "top",
    });
  });

  addStatBand(s, [
    { value: "60%", label: "현재 자율주행 Modular" },
    { value: "70%+", label: "신규 휴머노이드 E2E" },
    { value: "1B+", label: "VLA 모델 파라미터" },
    { value: "Hybrid", label: "양산 트렌드" },
  ]);
  addFooter(s, ++pageNum);
  s.addNotes(
    "이 슬라이드에서는 VLA 아키텍처의 두 큰 갈래를 비교해 보겠습니다. " +
    "왼쪽 Modular Architecture는 인지·계획·제어를 별도 모듈로 분리하는 전통적 방식입니다. " +
    "각 모듈을 독립 검증할 수 있어 ISO 26262 같은 안전 인증이 용이하며 Waymo, Cruise, 국내 자율주행 업체가 채택합니다. " +
    "오른쪽 End-to-End VLA는 픽셀에서 액션까지를 단일 신경망으로 처리하는 Foundation Model 접근입니다. " +
    "GR00T N1, Google RT-2, Figure Helix가 대표적이며 데이터가 많을 때 일반화가 뛰어납니다. " +
    "현재 자율주행은 60%가 Modular이지만 신규 휴머노이드는 70% 이상이 E2E입니다. " +
    "최근 양산 트렌드는 두 접근의 장점을 결합한 Hybrid로 수렴하고 있습니다. " +
    "다음 섹션에서는 Sim-to-Real의 실무적 도전들을 살펴보겠습니다."
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 9 — SECTION DIVIDER (Part 3)
// ═══════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { path: ASSETS.sectionBg };
  s.addText("Part 3", { x: 0.42, y: 2.30, w: 9.16, h: 0.70, fontFace: FONT, fontSize: 40, color: C.ink, charSpacing: -1.2, margin: 0 });
  s.addText("Sim-to-Real & Korean Edge Ecosystem", { x: 0.42, y: 2.95, w: 9.16, h: 0.55, fontFace: FONT, fontSize: 22, color: C.charcoal, charSpacing: -0.5, margin: 0 });
  addFooter(s, ++pageNum);
  s.addNotes(
    "이번 섹션은 시뮬에서 학습한 정책을 실제 로봇으로 옮기는 Sim-to-Real과 " +
    "엣지 배포의 실무적 도전, 그리고 한국 파트너 생태계를 다룹니다."
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 10 — Pattern 7: Incident Catalog + Lessons (Sim-to-Real 실패 패턴)
// ═══════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addContentHeader(s, "Sim-to-Real Gap: 6대 실패 패턴", "왜 시뮬에서 잘 되던 정책이 실제 로봇에서 무너지는가");

  const leftX = PAD_X;
  const leftW = 4.50;
  const incidents = [
    { color: C.teslaRed, label: "센서 노이즈" },
    { color: C.alibabaOrange, label: "조명 변화" },
    { color: C.nvidiaGreen, label: "마찰계수 차이" },
    { color: C.metaBlue, label: "통신 지연" },
    { color: C.azurePurple, label: "동역학 모델 불일치" },
    { color: C.anthropicCoral, label: "분포 외 객체 (OOD)" },
  ];
  const rowH = 0.42;
  incidents.forEach((inc, i) => {
    const ry = 1.38 + i * (rowH + 0.05);
    s.addShape(pres.ShapeType.rect, {
      x: leftX, y: ry, w: 0.30, h: rowH,
      fill: { color: inc.color }, line: { type: "none" },
    });
    addCardBg(s, leftX + 0.30, ry, leftW - 0.30, rowH);
    s.addText(`#${i + 1}  ${inc.label}`, {
      x: leftX + 0.42, y: ry, w: leftW - 0.42, h: rowH,
      fontFace: FONT, fontSize: 10, bold: true, color: C.ink, valign: "middle", margin: 0,
    });
  });

  const rightX = PAD_X + leftW + 0.16;
  const rightW = 4.50;
  addCardBg(s, rightX, 1.38, rightW, 1.85);
  s.addText("AWS 운영 대응", {
    x: rightX + 0.16, y: 1.50, w: rightW - 0.32, h: 0.30,
    fontFace: FONT, fontSize: 13, bold: true, color: C.ink, margin: 0,
  });
  s.addText([
    { text: "•  Domain Randomization (Isaac Lab)", options: {} },
    { text: "•  Cosmos WFM 합성 데이터로 분포 확장", options: {} },
    { text: "•  Real-to-Sim 데이터 피드백 루프", options: {} },
    { text: "•  Hardware-in-the-Loop (HIL) 검증", options: {} },
  ], {
    x: rightX + 0.16, y: 1.92, w: rightW - 0.32, h: 1.28,
    fontFace: FONT, fontSize: 9, color: C.charcoal, paraSpaceAfter: 6, margin: 0, valign: "top",
  });

  addAccentBar(s, rightX, 3.35, rightW, C.subtitleOrange);
  addCardBg(s, rightX, 3.41, rightW, 1.05);
  s.addText("Insight", {
    x: rightX + 0.16, y: 3.50, w: rightW - 0.32, h: 0.20,
    fontFace: FONT, fontSize: 8, bold: true, color: C.subtitleOrange, charSpacing: 1.5, margin: 0,
  });
  s.addText("Sim-to-Real Gap의 80%는 데이터 다양성 부족에서 비롯되며, AWS Cosmos WFM과 GR00T 결합으로 체계적으로 해소할 수 있습니다.", {
    x: rightX + 0.16, y: 3.72, w: rightW - 0.32, h: 0.65,
    fontFace: FONT, fontSize: 9.5, color: C.ink, margin: 0, valign: "top",
  });

  addStatBand(s, [
    { value: "80%", label: "데이터 다양성 부족 비중" },
    { value: "10x", label: "DR 적용 시 일반화 향상" },
    { value: "30%↓", label: "실제 데이터 의존도" },
    { value: "Closed Loop", label: "Real → Sim → Real" },
  ]);
  addFooter(s, ++pageNum);
  s.addNotes(
    "이 슬라이드는 Sim-to-Real 과정에서 자주 마주치는 6가지 실패 패턴을 카탈로그로 정리한 것입니다. " +
    "센서 노이즈, 조명 변화, 마찰계수 차이, 통신 지연, 동역학 모델 불일치, 그리고 분포 외 객체 OOD입니다. " +
    "각 사례마다 실제 배포 시 정책이 무너지는 원인이 됩니다. " +
    "오른쪽 'AWS 운영 대응' 박스는 이 갭을 메우는 4가지 표준 기법입니다. " +
    "Isaac Lab의 Domain Randomization, Cosmos WFM 기반 합성 데이터, Real-to-Sim 피드백 루프, Hardware-in-the-Loop 검증입니다. " +
    "오른쪽 아래 인사이트가 핵심입니다. Sim-to-Real Gap의 80%는 데이터 다양성 부족에서 비롯되며 " +
    "AWS Cosmos WFM과 GR00T 결합으로 이를 체계적으로 해소합니다. " +
    "다음 슬라이드에서는 한국 NPU 파트너 생태계를 살펴보겠습니다."
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 11 — Pattern 2: 4-Column Card Grid (한국 NPU 파트너 4사)
// ═══════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addContentHeader(s, "한국 NPU·최적화 파트너 4사", "엣지 추론 latency를 10ms 이하로 압축하는 기술");

  const total = 9.16, gutter = 0.10, colY = 1.38, colH = 3.05;
  const w = (total - gutter * 3) / 4;
  const cards = [
    { accent: C.subtitleOrange, vendor: "NOTA AI", badge: "QUANT", title: "NetsPresso",
      release: "모델 경량화", tagline: "PTQ + QAT 자동화",
      bullets: ["VLA 모델 4-bit 양자화", "정확도 손실 < 2%", "5x 추론 속도", "AWS Marketplace"] },
    { accent: C.furiosaPurple, vendor: "FURIOSAAI", badge: "NPU", title: "RNGD",
      release: "2025 양산", tagline: "150 TOPS, 60W TDP",
      bullets: ["LLaMA·VLA 추론 특화", "데이터센터급 성능", "한국 fab 양산", "EC2 통합 검토"] },
    { accent: C.openaiGreen, vendor: "DEEPX", badge: "EDGE", title: "DX-M1 / DX-M2",
      release: "2026 출시", tagline: "엣지 NPU, 5W급",
      bullets: ["스마트팩토리 비전", "휴머노이드 SoC 후보", "Greengrass 호환", "Hyundai 협력"] },
    { accent: C.metaBlue, vendor: "MOBILINT", badge: "VISION", title: "Aries / Regulus",
      release: "양산 진행", tagline: "비전 추론 NPU",
      bullets: ["30 TOPS, 3W", "ADAS 검증 완료", "삼성전자 파운드리", "로봇 비전 채택"] },
  ];
  cards.forEach((c, i) => {
    const x = PAD_X + i * (w + gutter);
    addVendorCard(s, { x, y: colY, w, h: colH, ...c });
  });

  addStatBand(s, [
    { value: "4사", label: "한국 NPU 생태계" },
    { value: "<10ms", label: "엣지 추론 latency" },
    { value: "5W~60W", label: "TDP 범위" },
    { value: "AWS 통합", label: "Marketplace 진행 중" },
  ]);
  addFooter(s, ++pageNum);
  s.addNotes(
    "이 슬라이드는 한국 NPU와 모델 최적화 파트너 4사를 보여드립니다. " +
    "Nota AI는 NetsPresso로 VLA 모델을 4-bit까지 양자화하면서 정확도 손실 2% 미만, 추론 속도 5배 향상을 달성합니다. " +
    "FuriosaAI는 RNGD로 데이터센터급 150 TOPS를 60W TDP로 구현해 LLaMA·VLA 추론에 특화됩니다. " +
    "DeepX는 DX-M1과 DX-M2로 5W급 엣지 NPU를 제공하며 휴머노이드 SoC 후보로도 거론됩니다. " +
    "Mobilint는 30 TOPS를 3W에 구현해 ADAS와 로봇 비전에 적합합니다. " +
    "4사 모두 AWS Marketplace 통합 또는 EC2 통합이 검토·진행 중이며 " +
    "한국 고객사는 이 생태계 덕분에 엣지 추론 latency를 10ms 이하로 압축할 수 있는 옵션을 확보하고 있습니다."
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 12 — Pattern 3: Left Panel + Right Quad (한국 고객 사례 4건)
// ═══════════════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addContentHeader(s, "한국 Physical AI 도입 4사례", "현대차 · LG · 두산 · 코웨이의 실제 워크로드");

  const leftW = 3.20;
  const leftH = 3.05;
  addAccentBar(s, PAD_X, 1.38, leftW, C.subtitleOrange);
  addCardBg(s, PAD_X, 1.44, leftW, leftH - 0.06);
  s.addText("KOREA ADOPTION", {
    x: PAD_X + 0.16, y: 1.58, w: leftW - 0.32, h: 0.20,
    fontFace: FONT, fontSize: 8, bold: true, color: C.steel, charSpacing: 1.5, margin: 0,
  });
  s.addText("축적의 시간\n압축의 시간으로", {
    x: PAD_X + 0.16, y: 1.82, w: leftW - 0.32, h: 0.85,
    fontFace: FONT, fontSize: 19, bold: true, color: C.ink, charSpacing: -0.6, margin: 0,
  });
  s.addText(
    "한국 제조 강국의 60년 노하우와 AWS Physical AI 스택이 만나면서, " +
    "양산 휴머노이드와 자율로봇 영역에서 빠르게 글로벌 경쟁력을 확보하고 있습니다.",
    {
      x: PAD_X + 0.16, y: 2.85, w: leftW - 0.32, h: 1.40,
      fontFace: FONT, fontSize: 9, color: C.charcoal, margin: 0, valign: "top",
    }
  );

  const rightX = PAD_X + leftW + 0.16;
  const rightW = 9.16 - leftW - 0.16;
  const cellW = (rightW - 0.10) / 2;
  const cellH = (leftH - 0.10) / 2;
  const cases = [
    { accent: C.hyundaiBlue, vendor: "HYUNDAI MOTOR GROUP", title: "All-Electric Atlas 양산",
      bullet: "BD 인수 후 첫 양산 휴머노이드, 한국 공장 적용" },
    { accent: C.subtitleOrange, vendor: "LG ELECTRONICS", title: "스마트팩토리 자율로봇",
      bullet: "구미·창원 공장 비전 검사 + 물류 로봇" },
    { accent: C.azurePurple, vendor: "DOOSAN ROBOTICS", title: "협동로봇 + GenAI",
      bullet: "AI·VLA 결합한 차세대 협동로봇 개발" },
    { accent: C.openaiGreen, vendor: "COWAY", title: "가정용 청정·정수 자율화",
      bullet: "필터·관리 자동화 + 비전 기반 진단" },
  ];
  cases.forEach((c, i) => {
    const cx = rightX + (i % 2) * (cellW + 0.10);
    const cy = 1.38 + Math.floor(i / 2) * (cellH + 0.10);
    addAccentBar(s, cx, cy, cellW, c.accent);
    addCardBg(s, cx, cy + 0.06, cellW, cellH - 0.06);
    s.addText(c.vendor, {
      x: cx + 0.14, y: cy + 0.18, w: cellW - 0.28, h: 0.20,
      fontFace: FONT, fontSize: 7.5, bold: true, color: C.steel, charSpacing: 1.5, margin: 0,
    });
    s.addText(c.title, {
      x: cx + 0.14, y: cy + 0.42, w: cellW - 0.28, h: 0.34,
      fontFace: FONT, fontSize: 12, bold: true, color: C.ink, charSpacing: -0.4, margin: 0,
    });
    s.addText(c.bullet, {
      x: cx + 0.14, y: cy + 0.84, w: cellW - 0.28, h: 0.50,
      fontFace: FONT, fontSize: 9, color: C.charcoal, margin: 0, valign: "top",
    });
  });

  addStatBand(s, [
    { value: "4사", label: "주요 한국 고객" },
    { value: "양산 단계", label: "현대차 Atlas" },
    { value: "POC", label: "두산·LG·코웨이" },
    { value: "100%", label: "AWS 인프라 활용" },
  ]);
  addFooter(s, ++pageNum);
  s.addNotes(
    "이 슬라이드는 한국 Physical AI 도입의 4가지 대표 사례입니다. " +
    "왼쪽 패널이 전체 흐름을 요약합니다. 한국이 가진 60년 제조 노하우, 즉 '축적의 시간'이 " +
    "AWS Physical AI 스택과 만나면서 빠르게 '압축의 시간'으로 전환되고 있습니다. " +
    "오른쪽 4개 사례입니다. 첫째, 현대차 그룹은 Boston Dynamics 인수 후 All-Electric Atlas의 첫 양산을 한국에서 진행합니다. " +
    "둘째, LG전자는 구미·창원 공장에서 비전 검사와 물류 로봇을 통합한 스마트팩토리를 운영합니다. " +
    "셋째, 두산로보틱스는 협동로봇에 GenAI와 VLA를 결합하는 차세대 모델을 개발 중입니다. " +
    "넷째, 코웨이는 가정용 정수기·공기청정기의 필터 관리와 자율 진단을 자동화합니다. " +
    "4사 모두 AWS 인프라를 100% 활용하며 현대차는 양산, 나머지는 POC 단계입니다."
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SLIDE 13 — CLOSING
// ═══════════════════════════════════════════════════════════════════════
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
    "오늘 12페이지에 걸쳐 Physical AI on AWS의 전체 그림을 살펴보았습니다. " +
    "핵심 메시지는 시뮬·VLA 학습·Sim-to-Real·엣지 배포가 AWS 안에서 단일 통합 환경으로 제공되고 " +
    "한국 NPU 생태계와 양산 고객 사례가 빠르게 결합되고 있다는 점입니다. " +
    "질문이나 추가로 논의하고 싶으신 부분이 있으시면 자유롭게 말씀해 주십시오. 감사합니다."
  );
}

// ═══════════════════════════════════════════════════════════════════════
// WRITE FILE
// ═══════════════════════════════════════════════════════════════════════

const outputDir = "/mnt/user-data/outputs";
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
const outputPath = path.join(outputDir, "physicalai-deck.pptx");

pres.writeFile({ fileName: outputPath })
  .then(() => console.log(`✓ Written: ${outputPath}`))
  .catch((err) => { console.error("✗ Write failed:", err); process.exit(1); });
