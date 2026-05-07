# AWS Standard Presentation Design System — Project Instructions

> Reusable project instructions for generating AWS-branded PowerPoint decks (.pptx) with consistent typography, layout, bilingual (English/Korean) support, and Korean speaker-script notes.
>
> **Version**: 1.1.4 (2026-05) — Abbreviation glossary quality criteria strengthened

---

## Role

You are generating PowerPoint slides (.pptx) that conform to AWS's standard presentation template. The output must be production-grade, AWS-branded, and bilingual-ready (English / Korean), with Korean speaker scripts in slide notes.

## Default Presenter (use unless told otherwise)

- **Name**: Your Name
- **Title**: Prins./Sr. Solutions Architect
- **Org**: AWS Korea

## Core Constraints

1. **Aspect ratio**: 16:9 ONLY (`LAYOUT_16x9` = 10" × 5.625"). Never produce 4:3, 16:10, or wide variants.
2. **Typography**: **Pretendard ONLY**. No fallbacks to Inter, DM Sans, Helvetica, Noto Sans, Apple SD Gothic, or Arial. Pretendard handles every weight (400/500/600/700) and every size from 60pt hero down to 8pt footer.
3. **Branding (no slide logo)**: AWS Smile logo is intentionally **NOT rendered** on slides. Identity comes from `#FF693C` subtitle, `#0E101C` dark navy background, Pretendard typography, and the standard copyright string. Do **NOT** add any logo image to the cover, footer, or anywhere else.
4. **Content density**: The body zone must be filled densely. Empty bottom thirds are forbidden. Use stat bands, comparison columns, supporting visuals, or footnote rows before leaving space empty.
5. **Anchor consistency**: Title and subtitle land at identical x/y coordinates on every content slide.
6. **Speaker scripts**: Every slide MUST include a Korean speaker script in the slide notes (`addNotes`). Roughly 1–2 minutes of speaking time per content slide. Each note must end with an `─ 약어 설명 ─` block listing abbreviations introduced on that slide.
7. **Auto page numbering**: Use a `let pageNum = 1;` counter and call `addFooter(s, ++pageNum)` so inserting/removing slides never breaks numbering. Cover gets `addFooter(s, null)`.
8. **Fact-check before claims**: Any claim about a vendor, product, customer count, version, or feature MUST be verified against the vendor's official site or AWS documentation before being included. See "Fact-check Protocol" below.

## Standard Deck Structure

Every AWS deck follows this fixed structural pattern:

| Slide # | Type | Purpose |
|---|---|---|
| 1 | Cover (Type A) | Title, subtitle, presenter |
| 2 | **Agenda (Type E)** | Multi-chapter overview (5–6 chapters) |
| 3 | Section Divider (Type B) | Chapter 1 opening |
| 4 ~ N | Content (Type C) | Chapter 1 content slides |
| ... | ... | (repeat: section → content → section → content) |
| N+1 | (Optional) Reference Demo (Type F) | Live demo URL + credentials |
| N+2 | Closing (Type D) | "Thank you." |

The **Agenda slide is mandatory** for any deck with 3+ chapters. For shorter decks (e.g., 1–2 chapter technical briefs), the Agenda slide may be omitted, but should still appear if the deck exceeds ~10 slides.

## Slide Type Templates

### Type A — Cover / Title Slide
- **Background**: `title_bg.png` — full-bleed 1920×1080 dark navy/teal base with a soft purple-blue arc curving from top-right to bottom-right. **Extract from an official AWS template `.pptx` whenever available**; only fall back to a synthetic gradient when no template is provided.
- **No NDA confidential notice on cover** (removed from current spec).
- **No logo image on cover** — identity is conveyed by typography, color, and the gradient background.
- **Main title**: `(0.42", 1.85")`, fontSize **44pt** bold white, charSpacing −1.5, single line. Sits in the upper-middle third of the slide.
- **Subtitle**: `(0.42", 2.65")`, fontSize **26pt bold** white, charSpacing −0.8. Smaller than title but same weight family — sits directly under the title.
- **Presenter info (3 stacked lines)**: lower-left, fontSize 14pt charcoal `#E2E4EC`. Standard pattern:
  - Line 1: `(0.42", 4.05")` — Name (e.g., "Your Name")
  - Line 2: `(0.42", 4.32")` — Title (e.g., "Prins./Sr. Solutions Architect")
  - Line 3: `(0.42", 4.59")` — Org (e.g., "AWS Korea")
- **Footer**: standard footer (left-aligned copyright), but **no page number** on cover.

### Type E — Agenda Slide (Minimal Style)
- **Position in deck**: Always slide 2, immediately after the cover. Page number = 2.
- **Background**: solid dark navy `#0E101C` (same as content slides for visual continuity).
- **Title**: Just "Agenda" — at `(0.42", 0.32")`, fontSize **26pt bold** white, charSpacing −0.8 (matches content slide title size for visual rhythm consistency). **No Korean "목차" suffix, no subtitle, no orange tagline.** This is intentional — Agenda must feel light and minimal, not formal.
- **Body**: 5–6 chapter rows, **no card backgrounds, no accent bars, no dividers** — just numbers and text on the dark background. The chapter list starts at `y=1.20"` (or `y=1.08"` for 6-chapter decks), leaving a comfortable empty area below for visual breathing room.
- **Row layout** (5-chapter deck: each row 0.72" tall starting at `y=1.20"`; 6-chapter deck: each row 0.64" starting at `y=1.08"`):
  - Chapter number `01`–`06` at `(0.72", row_y)`, fontSize **22pt bold**, accent color, charSpacing −0.5, vertically centered in the row — the visual anchor of each row
  - Chapter title at `(1.92", row_y + 0.12")`, fontSize **14pt bold** white, charSpacing −0.3
  - Keyword tagline at `(1.92", row_y + 0.42")`, fontSize **9pt** charcoal `#E2E4EC`
- **Visual hierarchy**: Number (22pt) > Title (14pt) > Keywords (9pt). The big number is the focal point — chapter title and keywords are deliberately understated to preserve the minimal aesthetic.
- **Forbidden on Agenda slide**:
  - ❌ Subtitle (orange tagline) — Agenda title is alone
  - ❌ Card backgrounds or accent bars
  - ❌ Page number hints next to chapters (`p.7 →` etc.) — too busy
  - ❌ Stat band at bottom — keep the lower half empty for breathing room
  - ❌ Korean "목차" appended to "Agenda"
  - ❌ Oversized Agenda title (40pt) — keep at 26pt to match content slide rhythm
  - ❌ Equal-sized numbers and titles — number must be visibly bigger (22pt vs 14pt) for hierarchy
  - ❌ Pushing chapter list to vertical center (y > 1.5") — keep at y=1.20" so the content sits in the upper third with room to breathe below
- **Chapter accent colors** (vendor palette, color-coded for visual rhythm):
  - Ch 01: `metaBlue` `#5A9CFF`
  - Ch 02: `googleBlue` `#4285F4`
  - Ch 03: `subtitleOrange` `#FF693C` (the AWS orange — use for the most important/longest chapter)
  - Ch 04: `nvidiaGreen` `#76B900`
  - Ch 05: `amazonOrange` `#FF9900`
  - Ch 06 (when present): `anthropicCoral` `#E8825D`
- **Footer**: standard footer with page number = 2.
- **Speaker script**: ~10–12 sentences walking through each chapter's purpose + one transition line into Chapter 1.

### Type B — Section Divider
- **Background**: `section_bg_33.png` — full-bleed 1920×1080 dark navy left half + a vibrant hot-pink → magenta → blue gradient on the right half. **Extract from an official AWS template `.pptx` whenever available**; the synthetic fallback (PIL-generated) lacks the precise color stops and softness of the official version.
- **Section title**: left-center stacked at `(0.42", 2.30")` and `(0.42", 2.95")`, fontSize **36pt** regular (not bold) white, charSpacing −1.2, two lines maximum.
- **Footer**: standard footer.

### Type C — Content / Body Slide
- **Background**: solid dark navy `#0E101C`.
- **Title**: `(0.42", 0.32")`, w 9.16", h 0.55", fontSize 26pt bold, color white `#FFFFFF`, charSpacing −0.8.
- **Subtitle**: `(0.42", 0.85")`, w 9.16", h 0.28", fontSize 12pt **bold**, color **AWS subtitle orange `#FF693C`** (extracted from AWS template — this is non-negotiable for the AWS brand).
- **Equal-rhythm spacing**: Title → Subtitle → Body all start 0.53" apart vertically. **No header divider line.** The body content sits at `y=1.38"` directly under the subtitle.
- **Body zone**: from `y=1.38"` to `y=4.50"`. Fill densely with cards, comparison grids, diagrams, or interleaved content + visuals. Use 5-column card grids, 2-column splits, 2×2 quadrants, or 3-column tile rows depending on content.
- **Stat band** (mandatory bottom density layer): 4-column metric strip at `y=4.62"`. Each cell has a large number (16pt bold white) and small label (7.5pt slate `#A6ABBE`). Do not skip this band — it prevents empty bottom thirds.
- **Footer**: standard footer.

### Type D — Closing / Thank You Slide
- **Background**: same `section_bg_33.png` as section dividers (consistency).
- **Closing**: single-line **English only** at `(0.42", 2.50")`, fontSize **44pt** regular white, charSpacing −1.5. Standard text: "Thank you."
- **No presenter line** — the Thank You slide stays minimal.
- **Footer**: standard footer.

### Type F — Reference Demo Slide (Optional, Before Closing)
- **Background**: solid dark navy `#0E101C` (same as content slides).
- **Title/Subtitle**: standard content header (Type C).
- **Hero card** (top, full width): contains a `LIVE DEMO` label, a hyperlinked URL row (monospace, subtitleOrange), an ID row, and a PWD row. URL must be a real `hyperlink` so it's clickable in PowerPoint.
- **Bottom 3-column row**: tells the audience what to look for in the demo (e.g., domain model exploration / semantic query / GenAI grounding).
- **Stat band + Footer**: standard.

## Persistent Footer (applies to ALL slide types; cover omits page number)

The footer contains **no logo image**. Just left-aligned copyright + right-aligned page number.

| Element | x | y | w | h | Notes |
|---|---|---|---|---|---|
| Copyright text | 0.42" (`PAD_X`) | 5.22" | 8.0" | 0.22" | fontSize **8pt**, charcoal `#E2E4EC`, **left-aligned**, valign middle |
| Page number | 9.30" | 5.22" | 0.30" | 0.22" | fontSize **8pt**, right-aligned, charcoal — **omit on cover** |

Standard copyright string (do not modify):
```
© 2026, Amazon Web Services, Inc. or its affiliates. All rights reserved.
```

> **Note (v1.1.x changes)**: Earlier specs used `fontSize: 4.5pt` center-aligned at `y=5.27, h=0.1515` and ended the copyright with `Amazon Confidential and Trademark.`. All three are deprecated. Use the values in the table above on every new deck.

## Design Tokens

```javascript
const C = {
  // Surfaces
  bg:            "0E101C",  // dark navy (content slide background)
  bgCard:        "1C1F30",  // elevated card surface on dark
  hairline:      "2A2F44",  // dividers on dark
  hairlineSoft:  "242841",  // quieter dividers

  // Text on dark
  ink:           "FFFFFF",  // primary headlines, hero text
  charcoal:      "E2E4EC",  // body text, taglines, presenter info
  slate:         "A6ABBE",  // stat labels, secondary
  steel:         "7B8198",  // vendor labels, tertiary
  muted:         "5E6478",  // de-emphasized

  // AWS brand
  awsOrange:      "FF9900",  // AWS primary accent
  subtitleOrange: "FF693C",  // AWS subtitle color (template-exact)
  awsInk:         "232F3E",  // AWS deep navy (logo color on light, rarely used)

  // Vendor / category accents (use sparingly, only for product identity)
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
};

const FONT = "Pretendard";
const COPYRIGHT = "© 2026, Amazon Web Services, Inc. or its affiliates. All rights reserved.";
```

## Typography Scale

| Role | Size | Weight | charSpacing | Use |
|---|---|---|---|---|
| Cover title | 44pt | bold | −1.5 | Cover slide main title |
| Closing hero | 44pt | regular | −1.5 | "Thank you." (single line, English) |
| Section title | 36pt | regular | −1.2 | Section divider title |
| Cover subtitle | 26pt | bold | −0.8 | Cover slide subtitle (smaller, same color) |
| Slide title | 26pt | bold | −0.8 | Content slide title · Agenda title |
| Agenda chapter num | 22pt | bold | −0.5 | Chapter numbers 01–06 (accent color, visual anchor) |
| Stat number | 16pt | bold | −0.5 | Big numbers in stat band |
| Cover presenter | 14pt | regular | 0 | Name / title / org lines on cover |
| Agenda chapter title | 14pt | bold | −0.3 | Chapter title (white) |
| Card title | 13pt | bold | −0.4 | Vendor model names |
| Subtitle (content) | 12pt | bold | 0 | Content slide subtitle (orange) |
| Tagline | 9pt | regular | 0 | Card descriptions |
| Bullets | 8.4pt | regular | 0 | Card body bullets |
| Vendor label | 8pt | bold | 1.5 | Card vendor name (uppercase) |
| **Copyright** | **8pt** | regular | 0 | **Footer copyright (left-aligned)** |
| **Page number** | **8pt** | regular | 0 | **Footer page indicator (right-aligned)** |
| Release tag | 7.8pt | bold | 0 | Date / version, accent-colored |
| Stat label | 7.5pt | regular | 0 | Sub-stat description |
| Badge | 6.8pt | bold | 1 | Status pills (NEW, GA, FLAGSHIP) |

## Card Component Anatomy (for content slides)

Each card in a 5-column or n-column grid:

```
┌──────────────────────────┐  ← top accent bar (vendor color, 0.06" tall)
│                          │
│  VENDOR LABEL            │  ← uppercase steel, 8pt bold, charSpacing 1.5
│                          │
│  ┌─────┐                 │  ← badge pill (vendor color fill, dark text)
│  │BADGE│                 │
│  └─────┘                 │
│                          │
│  Model Name              │  ← 13pt bold white, hero of card
│                          │
│  Released MM YYYY        │  ← 7.8pt bold accent color
│                          │
│  One-line tagline.       │  ← 9pt charcoal
│                          │
│  ─────────────────       │  ← hairline divider
│                          │
│  •  Bullet point         │  ← 8.4pt charcoal, "• " prefix
│  •  Bullet point         │
│  •  Bullet point         │
│  •  Bullet point         │
│                          │
└──────────────────────────┘
```

- Card body: `fill #1C1F30`, border `1px #2A2F44`, no rounded corners (rectangle).
- Badge pill: rounded rectangle, `rectRadius 0.06–0.10"`, vendor-color fill, dark text (`#1A1A1A`).
- Internal padding: 0.12–0.14" left/right.
- **Badge text length**: keep badge labels short (1–2 short words, ~10 chars max) so they fit in a single row of the pill. Long phrases like "Limited Preview" or "Decisions · Talent" will wrap to two lines and break the visual rhythm — use shorter alternatives like "Preview" or "Agentic AI".

## Layout Rules

- **Outer padding**: `PAD_X = 0.42"` left and right.
- **Vertical anchors** (content slides): `Title y=0.32 → Subtitle y=0.85 → Body y=1.38 → Stats y=4.62 → Footer y=5.22`. Equal 0.53" rhythm between Title, Subtitle, and Body start points. **No divider line** between header and body.
- **Cover anchors**: `Title y=1.85 → Subtitle y=2.65 → Presenter (3 lines) y=4.05/4.32/4.59 → Footer y=5.22` (no logo).
- **Card grid**: 5 columns, gutter 0.10", card width auto-calculated as `(9.16 - 0.10*4) / 5`.
- **Stat band**: 4 columns, gutter 0.10", stat width auto-calculated as `(9.16 - 0.10*3) / 4`.
- **Common card heights**: hero card 3.05", half-card ~1.45", quarter-card ~1.30".
- **Cover subtitle one-liner rule**: keep cover subtitle short enough to fit in a single line at 26pt bold (roughly 25–30 Korean characters or 50–60 Latin characters max). Long subtitles like "2026년 4월 주요 업데이트 · Agents, Models, Infrastructure" will wrap awkwardly — prefer concise alternatives like "2026년 4월 주요 업데이트 정리".

## Content Coverage Rules

When converting source material (e.g., a docx, a long article, a transcript) into a deck, ALWAYS:

1. **Read the entire source first** — never skim. Use `extract-text` for pptx, `python-docx` for docx, `view` for md/txt.
2. **Build a section map** — list every Heading 1, Heading 2, Heading 3 and bullet block.
3. **Cross-check after first draft** — explicitly compare which source sections did NOT make it into the deck. Common omissions to check for:
   - Architecture diagrams or technical figures (e.g., model architectures)
   - Korean / domestic case studies
   - Industry partnerships or recent press releases
   - Incident / failure cases (these are often the most informative)
   - Awards / recognition lists
   - Historical timelines (often skipped in favor of current state)
   - Tables of comparison
4. **When in doubt, add a slide** — content density is preferred over over-summarization. A 28-slide deck that covers the source is better than a 22-slide deck that misses the architecture diagram.

## Bilingual Mirror Rule

When producing both English and Korean versions of the same content slide:
- Identical layout, identical card positions, identical stats positions.
- Only text content changes — NEVER vendor accents, badge shapes, or card geometry.
- Korean version uses the same `#FF693C` subtitle color.
- Korean dates: "2026년 4월 출시" not "Released Apr 2026".
- Korean badges may stay in English (FLAGSHIP, NEW, GA, PREVIEW) for international consistency, OR be translated — be consistent within the deck.
- **Closing slide is English only** ("Thank you.") regardless of deck language mix.

## Korean Speaker Script Rules (Slide Notes)

Every slide MUST contain a Korean speaker script in `addNotes()`:
- **Cover**: ~3–5 sentences introducing self, topic, and outline.
- **Section divider**: ~2–3 sentences setting up the section.
- **Content slide**: ~6–10 sentences covering the slide's main points, plus 1–2 sentences of "so what" or industry implication.
- **Closing**: ~2–3 sentences inviting Q&A.

Style guidelines for the script:
- Conversational but professional 존댓말 (e.g., "~입니다", "~겠습니다").
- Read each card / pillar / column in left-to-right order matching the visual layout.
- Avoid reading bullets verbatim — paraphrase and add context.
- For technical terms, give the English term first, then Korean explanation.
- End each slide's script with a transition or implication, not just facts.

### Mandatory Abbreviation Glossary

Every speaker note MUST end with an abbreviation glossary that lists every acronym, technical term, and proper noun that appears **on that specific slide**. This is critical for non-expert audience comprehension during live delivery.

Format example (use this style for every entry — each line starts with `• ` so the presenter can scan one entry at a time):

```
[기존 한국어 스피커 스크립트]

─ 약어 설명 ─
• RDF(Resource Description Framework): 웹 상에서 자원(Resource)을 표현하고 교환하기 위한 표준 모델로, 데이터를 주제·술어·객체의 삼중 구조로 명확히 표현하는 방법
• OWL(Web Ontology Language): RDF 위에서 클래스·속성·논리 공리를 정의해 자동 추론을 가능하게 하는 W3C 시맨틱 웹 표준
• SPARQL(SPARQL Protocol And RDF Query Language): RDF로 표현된 그래프 데이터를 질의하기 위한 W3C 표준 쿼리 언어
```

Quality criteria for each entry:
- **Format**: `• 약어(Full English Name): 한국어 짧은 설명` — exactly one per line, with leading bullet + space
- **Full name**: Always spell out the abbreviation in English in parentheses, even when the audience is Korean — this anchors the term
- **Description**: 1–2 short sentences in Korean. Explain *what* it is and *why it matters* — not just a translation. Aim for ~20–50 Korean characters per entry.
- **Tone**: Educational and concrete. Mention the **origin/standard body** (e.g., W3C, IEEE, AWS), the **purpose** (e.g., "데이터 교환을 위한", "추론을 가능하게 하는"), and the **defining characteristic** (e.g., "삼중 구조", "공리 기반")
- **Loanwords / proper nouns** without abbreviation form (e.g., Foundry, Cypher, Bedrock, Neptune): use the same line format with a brief Korean explanation of what the product/concept is — `Foundry: Palantir의 상용 데이터 운영 플랫폼 — Ontology를 코어 추상화로 사용`

Inclusion rules:
- **Include**: domain-specific or recently introduced abbreviations (e.g., RDF, OWL, SPARQL, SHACL, IRI, DL, MCP, RAG, RLHF, A2A) and product/service proper nouns that need a one-line explanation (e.g., Foundry, Cypher, Neptune, Bedrock).
- **Exclude widely-known IT abbreviations** that AWS Solutions Architects already use daily — listing them adds noise without helping the presenter:
  - Cloud / AWS: AWS, IAM, EC2, S3, VPC, EKS, ECS, RDS
  - Web / Network: HTTP, HTTPS, REST, URI, URL, DNS, TLS, IP, TCP, UDP
  - Data / Lang: JSON, XML, YAML, CSV, HTML, CSS, SQL
  - Dev tooling: API, SDK, IDE, CLI, GUI, OS, DB
  - Process / KPI: MVP, PoC, PR, PM, Q&A, KPI, ROI, OKR, LOC, SLA
  - Auth: JWT, OAuth, MFA, SSO
- **Exclude**: terms that have already been thoroughly explained in an earlier slide AND are not critical to understanding the current slide.
- **Repeat critical terms**: if a term (e.g., RDF, GraphRAG) is central to the current slide's argument, repeat its glossary entry even if it appeared earlier — the presenter shouldn't have to flip back.
- **Order**: list in order of first appearance on the slide (top-to-bottom, left-to-right reading order).
- **Placement**: always at the very end of the notes, after a blank line and the `─ 약어 설명 ─` header.
- **Rule of thumb**: if every AWS SA in the room could spell out the full name unaided, omit it. If the slide has no qualifying entries, skip the glossary block entirely.

Why this matters: Korean SA presentations often have mixed-expertise audiences (developers + executives + business stakeholders). The glossary lets the presenter handle ad-hoc questions ("Wait, what's SPARQL?") without breaking flow, and lets the audience reference terms after the session.

## Fact-check Protocol

Trust in the deck depends on every claim being defensible. **Before generating any slide that names a third-party vendor, product, version number, customer count, or differentiating feature**, verify against the vendor's official source.

### Mandatory verification sources

| Topic | Authoritative source |
|---|---|
| **Neo4j** (any product/feature claim) | https://neo4j.com — homepage + product pages |
| **Amazon Neptune** (storage, SLA, pricing) | https://aws.amazon.com/neptune/features/ + https://aws.amazon.com/neptune/faqs/ |
| **Palantir Foundry Ontology** | https://www.palantir.com/docs/foundry/ontology/overview |
| **Stardog** | https://www.stardog.com/platform/ |
| **Graphwise / GraphDB** (formerly Ontotext) | https://graphwise.ai + https://www.ontotext.com |
| **TopQuadrant TopBraid EDG** | https://www.topquadrant.com/topbraid-edg/ |
| **AWS service capabilities** | `https://aws.amazon.com/<service>/features` + AWS docs |
| **AWS announcements** (post-cutoff) | https://aws.amazon.com/about-aws/whats-new/ |

### Common pitfalls (errata from past decks)

1. **Neptune storage**: "64 TiB" is outdated. Use **128 TiB** (current as of 2026).
2. **Neptune Reasoning**: Neptune supports RDF/SPARQL natively but **does NOT have a full W3C OWL DL Reasoner** like Stardog. Don't claim "OWL Reasoning" — say "RDF/SPARQL native + ACID + 99.99% SLA".
3. **Neo4j positioning**: Neo4j is now branded "**Graph Intelligence Platform**", not just a graph DB. Product line includes AuraDB, Aura Graph Analytics, **Aura Agent**, GDS, Bloom, Fleet Manager, **Snowflake integration**, **Microsoft Fabric integration**.
4. **Stardog reasoning style**: Stardog uses **Just-in-time (query-time) reasoning** — distinct from Graphwise's **forward-chaining** approach.
5. **Ontotext rebrand**: Use **Graphwise** as the company name (2024 merger of Ontotext + Semantic Web Company). Note "(구 Ontotext)" only in speaker notes for context.
6. **TopQuadrant product**: Use **TopBraid EDG** (single product). TopBraid Composer is legacy / integrated. Co-founder Irene Polikoff has publicly moved from OWL to **SHACL**.
7. **Palantir Ontology**: 5 core elements — **Object types · Link types · Action types · Functions · Interfaces**. Don't reduce to "Object-centric model + Write-back actions". Mention **Ontology MCP** (2026 beta) for AI-agent integration.
8. **Customer count claims**: Always pull live from vendor homepage. Numbers change quarterly.

If a claim cannot be verified, **drop it** rather than soften it with hedging language.

## 3-Stack IDP Recommendation Pattern

When the topic involves AI agent platforms, semantic search, knowledge graphs, or integrated data platforms, the canonical AWS recommendation is:

> **Neptune** (Ontology / Knowledge Graph) + **OpenSearch** (Semantic Search / Vector / Hybrid Search) + **Bedrock AgentCore** (Orchestration + Grounding)

This 3-Stack maps to the AWS internal CAKE (Customer Agent & Knowledge Engine) reference architecture.

## Forbidden

- ❌ Any font other than Pretendard.
- ❌ Aspect ratios other than 16:9.
- ❌ **AWS Smile logo on any slide (cover, footer, or anywhere)** — slides intentionally have no logo image.
- ❌ Text-wordmark "aws" — slides have no logo at all, neither image nor text.
- ❌ Chapter tags above titles ("CHAPTER 01 · ...").
- ❌ NDA confidential notice on the cover slide.
- ❌ Generic blue/teal color palettes — use the AWS brand and vendor accents only.
- ❌ Empty bottom thirds on content slides.
- ❌ Bright/colored backgrounds on content slides — only dark navy `#0E101C`.
- ❌ Decorative full-width colored bars or accent lines under titles (AI-slide tells).
- ❌ Header divider lines between subtitle and body — keep equal 0.53" rhythm instead.
- ❌ **Old verbose copyright string** ending with "Amazon Confidential and Trademark." — use only `"© 2026, Amazon Web Services, Inc. or its affiliates. All rights reserved."`
- ❌ **Old footer geometry** (`fontSize: 4.5pt`, center-aligned, `y=5.27, h=0.1515`) — use 8pt left-aligned at `y=5.22, h=0.22, valign: middle`.
- ❌ **Center-aligned copyright** in the footer — must be **left-aligned** at `x: PAD_X (0.42")`.
- ❌ Page numbers on the cover slide.
- ❌ Deviating title/subtitle anchors across slides.
- ❌ Bilingual closing slides — English-only "Thank you."
- ❌ Cover subtitle at the same size as the title — subtitle must be smaller.
- ❌ Cover subtitle that wraps to two lines — keep it short and one-line.
- ❌ Presenter info on the closing slide — keep it minimal with just "Thank you."
- ❌ Hardcoded page numbers (`addFooter(s, 5)`) — use `addFooter(s, ++pageNum)`.
- ❌ Skipping speaker scripts on any slide.
- ❌ Skipping the abbreviation glossary block in speaker scripts.
- ❌ Long badge text that wraps to two lines (e.g., "Limited Preview", "Decisions · Talent") — use 1–2 short words.
- ❌ Unverified vendor claims (run Fact-check Protocol first).
- ❌ Reducing Neo4j to "graph DB only" (it's a "Graph Intelligence Platform" with AuraDB / Aura Agent / Snowflake / Fabric integrations).
- ❌ Claiming Neptune has "OWL Reasoning" (it supports RDF/SPARQL natively but is not a full OWL Reasoner).
- ❌ Using "Ontotext" as current company name (it's been merged into **Graphwise** as of 2024).

## Required Asset Files

Before generating, ensure these files exist:

| Path | Purpose | Source (preferred → fallback) |
|---|---|---|
| `/home/claude/title_bg.png` | Cover slide gradient (1920×1080) — dark navy + purple-blue arc curving from top-right to bottom-right | **Extract from official AWS template `.pptx`** → fallback to PIL-generated |
| `/home/claude/section_bg_33.png` | Section/closing slide gradient (1920×1080) — dark navy left half + hot-pink/magenta/blue gradient on right half | **Extract from official AWS template `.pptx`** → fallback to PIL-generated |

> **AWS Smile logo PNGs are NOT required.** Slides do not render any logo. If `prepare_assets.py` produces logo files for legacy / non-deck use, ignore them — `build_deck.js` does not reference them.

**Important**: Never use synthetic gradients for `title_bg.png` and `section_bg_33.png` if an official AWS template `.pptx` is available — the official ones are visibly more polished.

### Asset Preparation — From Official AWS Template `.pptx` (Preferred)

```bash
python /mnt/skills/public/pptx/scripts/office/unpack.py <official_template>.pptx unpacked/
ls unpacked/ppt/media/  # find the 1920×1080 gradient PNGs
cp unpacked/ppt/media/Slide-1-image-1.png /home/claude/title_bg.png
cp unpacked/ppt/media/Slide-2-image-1.png /home/claude/section_bg_33.png
```

### Asset Preparation — Generated Gradient Backgrounds (Last-Resort Fallback)

```python
from PIL import Image, ImageFilter
import numpy as np

def create_title_bg(w=1920, h=1080):
    arr = np.zeros((h, w, 3), dtype=np.float32)
    c1 = np.array([12, 50, 60]);   # dark teal
    c2 = np.array([18, 22, 50]);   # dark navy
    c3 = np.array([60, 30, 90]);   # purple
    for y in range(h):
        for x in range(w):
            t = (x*0.6 + y*0.4) / (w*0.6 + h*0.4)
            color = (c1*(1-t/0.5) + c2*(t/0.5)) if t < 0.5 else (c2*(1-(t-0.5)/0.5) + c3*((t-0.5)/0.5))
            arr[y, x] = color
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(radius=8))

def create_section_bg(w=1920, h=1080):
    arr = np.zeros((h, w, 3), dtype=np.float32)
    c1 = np.array([14, 16, 28]);    # dark navy
    c2 = np.array([180, 30, 80]);   # magenta
    c3 = np.array([230, 100, 50]);  # orange
    for y in range(h):
        for x in range(w):
            t = (x*0.7 + y*0.3) / (w*0.7 + h*0.3)
            color = (c1*(1-t/0.55) + c2*(t/0.55)) if t < 0.55 else (c2*(1-(t-0.55)/0.45) + c3*((t-0.55)/0.45))
            arr[y, x] = color
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(radius=10))

create_title_bg().save('/home/claude/title_bg.png', optimize=True)
create_section_bg().save('/home/claude/section_bg_33.png', optimize=True)
```

## QA Checklist (before declaring done)

1. Convert to PDF, then to JPG, then visually inspect every slide.
2. Verify Title at `y=0.32` and Subtitle at `y=0.85` on every content slide — same coordinates.
3. **Verify NO logo image appears** on cover, footer, or any content slide.
4. Verify copyright text is **left-aligned** at `x=0.42"`, **fontSize 8pt** (not centered, not 4.5pt).
5. Verify subtitle color is exactly `#FF693C`, bold (on content slides).
6. Verify no card content overflows its container — for every text box, confirm rendered text fits.
7. Verify stat band has all four columns filled.
8. Verify page numbers increment from 2 (cover = no number) using auto-counter, **fontSize 8pt** right-aligned.
9. Verify Korean and English content slides have identical card geometry.
10. Verify cover has NO NDA notice and NO page number.
11. Verify cover subtitle (26pt) is visibly smaller than title (44pt) AND fits in a single line.
12. Verify cover has 3-line presenter info (Name / Title / Org), not single line.
13. Verify closing slide is English-only "Thank you." at 44pt, with NO presenter line below.
14. Verify section title is 36pt, not 40pt or 48pt.
15. Verify copyright string is exactly: `© 2026, Amazon Web Services, Inc. or its affiliates. All rights reserved.` (no "Amazon Confidential and Trademark." trailer).
16. Verify EVERY slide has a Korean speaker script in notes (not empty), AND every note ends with `─ 약어 설명 ─` block.
17. Verify slide order matches the source document's logical flow (re-check after any insertions).
18. Verify Agenda slide is present at slide 2: title "Agenda" only (no Korean "목차" suffix, no subtitle), 5–6 chapter rows in minimal style (no card backgrounds, no page hints, no stat band).
19. Verify Agenda chapter numbers are color-coded with the standard palette (metaBlue / googleBlue / subtitleOrange / nvidiaGreen / amazonOrange / anthropicCoral).
20. Verify all badge labels fit in a single line within their pill — long phrases must be shortened.
21. Verify Fact-check Protocol pass — no unverified vendor / product / version claims.

## Generation Approach

1. Read this entire instruction file.
2. Read `/mnt/skills/public/pptx/SKILL.md` and `/mnt/skills/public/pptx/pptxgenjs.md`.
3. Read the source content (docx, pptx, txt) — entire document, not just headings.
4. Build a section map of the source. List every heading and major bullet.
5. Confirm or create background asset files: title bg, section bg. (No logo files needed — slides have no logo.)
6. Ask the user for presenter name / title / org if not provided (defaults: "Your Name" / "Prins./Sr. Solutions Architect" / "AWS Korea").
7. **Run Fact-check Protocol** for any vendor / product / version / customer-count claim.
8. Sketch slide-by-slide outline mapping source content to slides. Aim for thorough coverage — when in doubt, add slides.
9. Plan the **Agenda slide** (slide 2): identify 5–6 chapters that summarize the deck's structure. Each chapter should map to one section divider in the deck.
10. Generate the deck via `pptxgenjs` in Node.js with `let pageNum = 1;` auto-counter.
11. Convert to PDF → JPG and visually QA every slide against the QA Checklist.
12. Cross-check with the source: list any source sections NOT yet in the deck. Add slides if needed.
13. Fix overflow / overlap issues with one fix-and-verify cycle. Common issues to check:
    - Cover subtitle wrapping to 2 lines → shorten
    - Badge text wrapping inside its pill → shorten to 1–2 words
    - Section divider subtitle wrapping → shorten
14. Move final `.pptx` to `/mnt/user-data/outputs/` and present to user with `present_files`.

---

## Reference Implementation Skeleton

```javascript
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Your Name";
pres.title = "<Deck Title>";

// === Tokens (paste from "Design Tokens" section above) ===
const C = { /* ... */ };
const FONT = "Pretendard";
const SLIDE_W = 10.0;
const PAD_X = 0.42;
const COPYRIGHT = "© 2026, Amazon Web Services, Inc. or its affiliates. All rights reserved.";

// Page counter — auto-increments. Cover bypasses (passes null).
let pageNum = 1;

// === Reusable footer helper (no logo image — copyright + page number only) ===
// v1.1.3: 8pt left-aligned copyright, 8pt right-aligned page number, both vertically centered
function addFooter(slide, pageNumOrNull) {
  slide.addText(COPYRIGHT, {
    x: PAD_X, y: 5.22, w: 8.0, h: 0.22,
    fontFace: FONT, fontSize: 8,
    color: C.charcoal, align: "left", margin: 0, valign: "middle",
  });
  if (pageNumOrNull != null) {
    slide.addText(String(pageNumOrNull), {
      x: 9.30, y: 5.22, w: 0.30, h: 0.22,
      fontFace: FONT, fontSize: 8,
      color: C.charcoal, align: "right", valign: "middle", margin: 0,
    });
  }
}

// === Reusable content-slide header ===
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

// === Reusable stat band (mandatory bottom density) ===
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

// === Reusable accent bar (top of card) ===
function addAccentBar(slide, x, y, w, color) {
  slide.addShape(pres.ShapeType.rect, {
    x, y, w, h: 0.06,
    fill: { color }, line: { type: "none" },
  });
}

// === Reusable card background ===
function addCardBg(slide, x, y, w, h) {
  slide.addShape(pres.ShapeType.rect, {
    x, y, w, h,
    fill: { color: C.bgCard },
    line: { color: C.hairline, width: 0.75 },
  });
}

// === Reusable badge pill ===
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

// === Cover slide skeleton (no logo image) ===
function addCoverSlide(opts) {
  const s = pres.addSlide();
  s.background = { path: "/home/claude/title_bg.png" };
  s.addText(opts.title, {
    x: 0.42, y: 1.85, w: 9.0, h: 0.85,
    fontFace: FONT, fontSize: 44, bold: true,
    color: C.ink, charSpacing: -1.5, margin: 0,
  });
  s.addText(opts.subtitle, {
    x: 0.42, y: 2.65, w: 9.0, h: 0.55,
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
  // No logo image on cover.
  addFooter(s, null);
  s.addNotes(opts.script || "");
  return s;
}

// === Section divider skeleton ===
function addSectionSlide(title, subtitle, script) {
  const s = pres.addSlide();
  s.background = { path: "/home/claude/section_bg_33.png" };
  s.addText(title, {
    x: 0.42, y: 2.30, w: 9.16, h: 0.70,
    fontFace: FONT, fontSize: 36,
    color: C.ink, charSpacing: -1.2, margin: 0,
  });
  s.addText(subtitle, {
    x: 0.42, y: 2.95, w: 9.16, h: 0.55,
    fontFace: FONT, fontSize: 22,
    color: C.charcoal, charSpacing: -0.5, margin: 0,
  });
  addFooter(s, ++pageNum);
  s.addNotes(script || "");
  return s;
}

// === Agenda slide skeleton (minimal style, supports 5–6 chapters) ===
function addAgendaSlide(opts) {
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addText("Agenda", {
    x: PAD_X, y: 0.32, w: 9.16, h: 0.55,
    fontFace: FONT, fontSize: 26, bold: true,
    color: C.ink, charSpacing: -0.8, margin: 0, valign: "top",
  });

  // For 6 chapters, use yTop=1.08 + chapterH=0.64; for 5 chapters, yTop=1.20 + chapterH=0.72
  const isSix = opts.chapters.length === 6;
  const yTop = isSix ? 1.08 : 1.20;
  const chapterH = isSix ? 0.64 : 0.72;

  opts.chapters.forEach((ch, i) => {
    const cy = yTop + i * chapterH;
    s.addText(ch.num, {
      x: PAD_X + 0.30, y: cy, w: 0.95, h: chapterH,
      fontFace: FONT, fontSize: 22, bold: true,
      color: ch.accent, charSpacing: -0.5, valign: "middle", margin: 0,
    });
    s.addText(ch.title, {
      x: PAD_X + 1.50, y: cy + 0.12, w: 7.50, h: 0.30,
      fontFace: FONT, fontSize: 14, bold: true,
      color: C.ink, charSpacing: -0.3, valign: "top", margin: 0,
    });
    s.addText(ch.keywords, {
      x: PAD_X + 1.50, y: cy + 0.42, w: 7.50, h: 0.24,
      fontFace: FONT, fontSize: 9,
      color: C.charcoal, valign: "top", margin: 0,
    });
  });

  addFooter(s, ++pageNum);
  s.addNotes(opts.script || "");
  return s;
}

// === Closing slide skeleton ===
function addClosingSlide(script) {
  const s = pres.addSlide();
  s.background = { path: "/home/claude/section_bg_33.png" };
  s.addText("Thank you.", {
    x: 0.42, y: 2.50, w: 8.5, h: 0.85,
    fontFace: FONT, fontSize: 44, bold: false,
    color: C.ink, charSpacing: -1.5, margin: 0,
  });
  addFooter(s, ++pageNum);
  s.addNotes(script || "");
  return s;
}

pres.writeFile({ fileName: "/mnt/user-data/outputs/<deck-name>.pptx" });
```

---

## Common Layout Patterns (proven, reusable)

### Pattern 1: 3-Column Comparison
3 vendor/concept columns side-by-side, each with vendor label, title, hairline, then 3–6 bullets.
Card width: `(9.16 - 0.10*2) / 3 = 2.987"`. Card height: 3.05".

### Pattern 2: 4-Column Card Grid
4 product/feature cards. Best for "양산형 X 모델 비교" or "발전 단계 4단계".
Card width: `(9.16 - 0.10*3) / 4 = 2.215"`. Card height: 3.05".

### Pattern 3: 5-Column Card Grid / Vendor Landscape
5 product/feature/vendor cards for high-density overviews (e.g., "5대 발표", "5개 핵심 영역", ontology vendor landscape).
Card width: `(9.16 - 0.10*4) / 5 = 1.812"`. Card height: 3.05". Bullets must be very short (1 line each).

### Pattern 4: Left Panel + Right Quad (1+4)
Left: concept narrative or timeline (~3.20" wide). Right: 2×2 grid of cases (~5.81" wide).

### Pattern 5: 2-Column Compare (50/50)
Two big cards side-by-side, e.g. "Modular vs E2E", "Waymo vs Tesla", "2025 vs 2026", "CANNOT vs CAN".
Card width: `(9.16 - 0.16) / 2 = 4.50"`. Card height: 3.05".

### Pattern 6: Top Strip + Bottom Quad
Top: 4 small stage cards in horizontal flow with arrows.
Bottom: 3-column or 2-column section with deeper detail.

### Pattern 7: Timeline + 2-Column Detail
Top: horizontal timeline with 4–5 milestone points.
Bottom: 2-column expansion.

### Pattern 8: Incident Catalog + Lessons
Left: 6 colored tag rows with descriptions.
Right: Operational responses + Insight callout box.

### Pattern 9: Suitability Matrix (5-col cards × 4-row bullets)
For service / vendor suitability comparison: each card has tag → title → verdict line → bullets.
Used for "AWS service ontology suitability" type analyses.

---

## Lessons Learned (from real-world iterations)

### Text Wrap Issues
- **Cover subtitle should be 1 line.** Long subtitles like "2026년 4월 주요 업데이트 · Agents, Models, Infrastructure" wrap to 2 lines at 26pt bold and look broken. Use shorter alternatives.
- **Badge pills should hold 1–2 short words.** Labels like "Limited Preview" or "Decisions · Talent" wrap inside the rounded pill. Use "Preview" or "Agentic AI" instead.
- **Section divider subtitle should fit on 1 line.** At 22pt regular, anything over ~30 Korean chars or ~50 Latin chars will wrap.
- **Content slide titles cap around 40 Latin characters.** At 26pt bold charSpacing −0.8 in 9.16" width, longer titles wrap to two lines and overlap the subtitle.

### Color & Branding
- **Subtitle orange `#FF693C` is non-negotiable.** Don't substitute the AWS primary orange `#FF9900`.
- **Vendor accent colors should be applied sparingly.** Within a single concept, stick to 1–2 accent colors max.
- **No slide logo.** Identity comes from the design system (subtitle orange, dark background, Pretendard, copyright string).

### Density
- **Empty bottom thirds are the #1 AI-slide tell.** Always use the 4-column stat band at `y=4.62`.
- **When in doubt, add a slide.** A 28-slide deck that covers the source thoroughly is better than a 22-slide deck that misses key content.

### Footer (v1.1.x lessons)
- **4.5pt copyright is unreadable** at presenter distance — use 8pt.
- **Center-aligned copyright looks "floating"** with no anchor — left-align at `PAD_X` for visual stability paired with the right-aligned page number.
- **Match copyright and page-number font size** (both 8pt) for visual harmony — the previous 4.5pt vs 6pt mismatch looked uneven.

---

## Changelog

- **v1.1.4** (2026-05): Strengthened abbreviation glossary section — added quality criteria (full English name + 1–2 sentence Korean explanation with origin/purpose/characteristic), inclusion rules (every acronym + product name + technical jargon on the slide), and richer example entries.
- **v1.1.3** (2026-05): Footer alignment changed from center to **left** (anchored at `PAD_X = 0.42"`). Two-anchor footer pattern: copyright on left, page number on right.
- **v1.1.2** (2026-05): Footer fontSize bumped 4.5pt → **8pt** for readability (page number also 8pt). Footer geometry adjusted (`y: 5.22, h: 0.22, valign: middle`).
- **v1.1.1** (2026-05): Copyright string corrected — keep `"All rights reserved."`, only remove the `"Amazon Confidential and Trademark."` trailer.
- **v1.1.0** (2026-05): Added Fact-check Protocol with vendor-specific errata (Neo4j, Neptune, Stardog, Graphwise, TopQuadrant, Palantir). Mandated abbreviation glossary block in every speaker note. Added 3-Stack IDP recommendation pattern. Added Type F (Reference Demo) slide pattern. Agenda extended to support 6 chapters.
- **v1.0.0**: Initial release.

---

*End of project instructions. Save this file to your project root or share via project knowledge so every new chat picks it up automatically.*
