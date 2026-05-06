---
name: aws-presentation
description: Generate AWS-branded PowerPoint presentations (.pptx) following AWS Korea V-team's standard design system. Use this skill whenever the user asks to create, build, or generate AWS-style slides, decks, presentations, or pptx files — especially with Korean speaker scripts, bilingual (English/Korean) content, or specific AWS branding (Smile logo, FF693C subtitle orange, dark navy backgrounds). Trigger on phrases like "AWS 스타일 deck", "AWS 슬라이드 만들어줘", "AWS 표준 프레젠테이션", "고객 워크숍 자료", "AWS 브랜딩 pptx", "한국어 스크립트 포함된 deck", or any request to convert documents (docx, md, txt) into AWS-branded slides. Also trigger when users mention specific AWS V-team deliverables like SA workshops, customer briefings, or technical deep-dives that need consistent AWS branding.
version: 1.0.0
---

# AWS Standard Presentation Design System

You are generating PowerPoint slides (.pptx) that conform to AWS Korea V-team's standard presentation template. Output must be production-grade, AWS-branded, and bilingual-ready (English/Korean) with Korean speaker scripts in every slide's notes.

## Default Presenter (use unless told otherwise)

- **Name**: Your Name
- **Title**: Prins./Sr. Solutions Architect
- **Org**: AWS Korea

Confirm with the user before applying. Use defaults only when explicitly told to or when the user doesn't respond.

## Core Constraints (NON-NEGOTIABLE)

1. **Aspect ratio**: 16:9 ONLY (`LAYOUT_16x9` = 10" × 5.625")
2. **Typography**: Pretendard ONLY — no Inter, DM Sans, Helvetica, Noto Sans, Apple SD Gothic, or Arial fallbacks
3. **Branding (no slide logo)**: AWS Smile logo is intentionally NOT rendered on slides. Identity comes from the design system (subtitle orange `#FF693C`, dark navy `#0E101C`, Pretendard typography). Do NOT add any logo image to the cover, footer, or anywhere else.
4. **Density**: Body zone must be filled densely. Empty bottom thirds are forbidden — use stat band
5. **Anchor consistency**: Title at `(0.42", 0.32")` and subtitle at `(0.42", 0.85")` on every content slide
6. **Speaker scripts**: EVERY slide MUST include Korean script via `addNotes()`
7. **Auto page numbering**: `let pageNum = 1; addFooter(s, ++pageNum);` — cover gets `null`

## Workflow

### Step 1: Read source thoroughly
If the user provides a document:
- `python-docx` for `.docx`
- `extract-text` for `.pptx`
- `view` for `.md` / `.txt`

Read the **entire** file, not just headings. Build a section map listing every Heading 1, 2, 3 and major bullet block.

### Step 2: Confirm presenter & language
Ask for:
- Presenter name / title / org
- Language: English-only, Korean-only, or bilingual mirror
- Target slide count (default: aim for thorough coverage, ~20-30 slides)

### Step 3: Prepare assets
Run `scripts/prepare_assets.py` to ensure these exist in `/home/claude/`:
- `title_bg.png` (1920×1080 cover gradient)
- `section_bg_33.png` (1920×1080 section/closing gradient)

(The AWS Smile logo PNG is no longer used on slides. If `prepare_assets.py` produces it, that's fine — just don't reference it from `build_deck.js`.)

### Step 4: Sketch slide outline
Map source content to slides. Choose patterns from `references/layout_patterns.md`. **When in doubt, add a slide** — density > brevity.

### Step 5: Generate via pptxgenjs
Use the reference build skeleton in `scripts/build_deck.js`. Required scaffolding:
- `let pageNum = 1;` counter
- `addFooter(s, ++pageNum)` for content slides
- `addFooter(s, null)` for cover only
- `addContentHeader(s, title, subtitle)` reusable
- `addStatBand(s, [4 stats])` mandatory bottom density
- `s.addNotes("...")` Korean script on EVERY slide

### Step 6: QA & deliver
Run through `references/qa_checklist.md` (18 checks). Convert to PDF → JPG and visually inspect. Move final `.pptx` to `/mnt/user-data/outputs/` and call `present_files`.

## Slide Type Quick Reference

| Type | Background | Title | Subtitle | Footer |
|---|---|---|---|---|
| **A. Cover** | `title_bg.png` | 44pt bold @ y=1.85 | 26pt bold @ y=2.65 | NO page num |
| **B. Section divider** | `section_bg_33.png` | 40pt regular @ y=2.30 | 22pt regular @ y=2.95 | with page num |
| **C. Content** | solid `#0E101C` | 26pt bold @ y=0.32 | 12pt bold orange @ y=0.85 | with page num |
| **D. Closing** | `section_bg_33.png` | "Thank you." 44pt @ y=2.50 (English-only) | (none) | with page num |

For full anchor coordinates and design tokens, see [`references/design_tokens.md`](references/design_tokens.md).

## Footer Composition (no logo)

Slides display only:
- **Left-aligned copyright** at `(0.42", 5.27", 8.0", 0.22")`, **8pt** charcoal, `align: left`, `valign: middle`
- **Right-aligned page number** at `(9.30", 5.27", 0.30", 0.22")`, **8pt**, `align: right`, `valign: middle` — auto-incremented; cover gets `null`

The AWS Smile logo is **not rendered**. Do not add `slide.addImage(...)` calls for the logo in any helper function or content slide.

> **v1.2 footer change**: Earlier specs used `fontSize: 4.5pt`/`6pt` with `h: 0.1515"`/`0.18"`, `valign: top`, and centered copyright spanning the full slide width. Those are deprecated — use **8pt** for both copyright and page number, **height 0.22"**, **valign middle**, and **left-align copyright** at `x: PAD_X (0.42")`, `w: 8.0"` so footer text is readable, vertically centered, and starts at the same left margin as titles.

## Design Tokens (paste into every build)

```javascript
const C = {
  bg: "0E101C", bgCard: "1C1F30", hairline: "2A2F44",
  ink: "FFFFFF", charcoal: "E2E4EC", slate: "A6ABBE", steel: "7B8198",
  awsOrange: "FF9900", subtitleOrange: "FF693C", awsInk: "232F3E",
  // Vendor accents (use sparingly): nvidiaGreen, metaBlue, googleBlue,
  // openaiGreen, alibabaOrange, teslaRed, hyundaiBlue, anthropicCoral
};
const FONT = "Pretendard";
const COPYRIGHT = "© 2026, Amazon Web Services, Inc. or its affiliates. All rights reserved.";
```

## Korean Speaker Script Rules

Every slide's `addNotes()` must contain Korean script:
- **Cover**: 3–5 sentences (intro + topic + outline)
- **Section divider**: 2–3 sentences (section setup)
- **Content slide**: 6–10 sentences (left-to-right reading + "so what")
- **Closing**: 2–3 sentences (Q&A invitation)

Style: Conversational professional 존댓말 ("~입니다", "~겠습니다"). Technical terms: English first, then Korean explanation.

### Abbreviation Glossary (mandatory at end of every note)

After the spoken script, append a blank line and a glossary block listing every abbreviation used **on that slide** (cover, body text, stat band, or in the spoken text itself). Each entry starts with a bullet (`• `) so the presenter can scan one line at a time:

```
• 약어(Full Name): 한 줄 설명
```

Example:
```
• RDF(Resource Description Framework): 웹 상에서 자원(Resource)을 표현하고 교환하기 위한 표준 모델로, 데이터를 주제·술어·객체의 삼중 구조로 명확히 표현하는 방법
• OWL(Web Ontology Language): 클래스·속성·논리 공리로 도메인을 정의하고 자동 추론을 가능하게 하는 W3C 온톨로지 언어
```

Rules:
- Include only abbreviations that are **domain-specific or recently introduced** (e.g., RDF, OWL, SPARQL, SHACL, IRI, DL, MCP, RAG, RLHF, A2A).
- **Skip widely-known IT abbreviations** that AWS Solutions Architects already use daily — listing them adds noise without helping the presenter:
  - Cloud / AWS: AWS, IAM, EC2, S3, VPC, EKS, ECS, RDS
  - Web / Network: HTTP, HTTPS, REST, URI, URL, DNS, TLS, IP, TCP, UDP
  - Data / Lang: JSON, XML, YAML, CSV, HTML, CSS, SQL
  - Dev tooling: API, SDK, IDE, CLI, GUI, OS, DB
  - Process / KPI: MVP, PoC, PR, PM, Q&A, KPI, ROI, OKR, LOC, SLA
  - Auth: JWT, OAuth, MFA, SSO
- Do **not** include product names that are not abbreviations (e.g., Bedrock, Cursor, Lovable, Composer).
- One abbreviation per line; in Korean; concise (one sentence).
- If the slide has no qualifying abbreviations, omit the glossary block entirely.
- Place the glossary at the end of the note so spoken delivery stays clean.
- **Rule of thumb**: if every AWS SA in the room could spell out the full name unaided, omit it.

For templates and tone calibration, see [`references/speaker_script_guide.md`](references/speaker_script_guide.md).

## Forbidden (Common AI-Slide Tells)

❌ Any font other than Pretendard
❌ Aspect ratios other than 16:9
❌ Text-wordmark "aws" — use logo image
❌ Header divider lines under titles
❌ Decorative full-width colored bars
❌ Empty bottom thirds (no stat band)
❌ Hardcoded page numbers (`addFooter(s, 5)`)
❌ Skipping speaker scripts
❌ NDA notice on cover
❌ Page number on cover
❌ Bilingual closing slides — always English-only "Thank you."
❌ Modifying the standard copyright string
❌ Bright/colored content slide backgrounds
❌ Generic blue/teal palettes
❌ AWS Smile logo on any slide (cover, footer, or anywhere) — slides intentionally have no logo

## Reference Files

Read these as needed during generation:

| File | When to read |
|---|---|
| `references/design_tokens.md` | Color/font/spacing details, vendor accent palette |
| `references/layout_patterns.md` | Choosing the right layout for content type |
| `references/speaker_script_guide.md` | Korean script tone, structure, examples |
| `references/qa_checklist.md` | Pre-delivery validation (18 checks) |
| `scripts/prepare_assets.py` | Asset generation |
| `scripts/build_deck.js` | Reference pptxgenjs build skeleton |

## Cross-check After Generation

After first draft, explicitly compare which source sections did NOT make it into the deck. Common omissions:
- Architecture diagrams or technical figures
- Korean / domestic case studies
- Industry partnerships
- Incident / failure cases
- Awards / recognition
- Historical timelines
- Comparison tables

Add slides if needed. A 28-slide deck that covers the source thoroughly > a 22-slide deck that misses the architecture diagram.

## Final Delivery

1. Run 18-point QA checklist (`references/qa_checklist.md`)
2. Move `.pptx` to `/mnt/user-data/outputs/`
3. Call `present_files` to share
4. Briefly summarize: slide count, language, sections covered
5. Don't explain every design decision — user reviews visually

---

*Maintained by AWS Korea V-team. Issues: `#aws-deck-automation` Slack channel.*
