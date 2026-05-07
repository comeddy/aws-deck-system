# QA Checklist

> 18-point checklist before declaring any deck complete. Convert .pptx → PDF → JPG and visually inspect every slide.

## Conversion for Visual Inspection

```bash
# .pptx → PDF
libreoffice --headless --convert-to pdf deck.pptx

# PDF → JPG (one image per page)
pdftoppm -jpeg -r 100 deck.pdf slide
```

## The 18 Checks

### Layout & Anchors

- [ ] **1. Title anchor**: Every content slide has Title at exactly `(0.42", 0.32")` — no drift.
- [ ] **2. Subtitle anchor**: Every content slide has Subtitle at exactly `(0.42", 0.85")`.
- [ ] **3. No logo on slides**: AWS Smile logo is NOT present on any slide (cover, footer, content) — slides intentionally have no logo image.
- [ ] **4. Copyright centered**: Footer copyright horizontally centered across the full slide width.
- [ ] **5. Subtitle color**: Content slide subtitle is exactly `#FF693C`, bold, 12pt.
- [ ] **6. No content overflow**: Every text box fits its container.
- [ ] **7. Stat band complete**: All four columns filled.
- [ ] **8. Page numbering**: Increments from 2 (cover = no number).

### Cover Slide Specific

- [ ] **9. Cover anchor compliance**:
  - Title at `(0.42", 1.85")` 44pt bold
  - Subtitle at `(0.42", 2.65")` 26pt bold
  - 3 presenter lines at y=4.05/4.32/4.59
  - NO logo image on cover
- [ ] **10. No NDA notice** on cover.
- [ ] **11. No page number on cover**.
- [ ] **12. Cover subtitle smaller than title** (26pt vs 44pt).
- [ ] **13. 3-line presenter info** (Name / Title / Org), not single line.

### Agenda (Type E)

- [ ] **A1. Agenda present at slide 2** for any deck with 3+ chapters (or 10+ total slides).
- [ ] **A2. Title is exactly "Agenda"** at 26pt bold — no Korean "목차" suffix, no orange subtitle.
- [ ] **A3. Chapter count is 5 or 6** with correct geometry: 5 → `yTop=1.20, chapterH=0.72`; 6 → `yTop=1.08, chapterH=0.64`.
- [ ] **A4. Hierarchy preserved**: chapter num 22pt bold > title 14pt bold > keywords 9pt.
- [ ] **A5. Color-coded chapter numbers** from the standard palette (metaBlue / googleBlue / subtitleOrange / nvidiaGreen / amazonOrange / anthropicCoral).
- [ ] **A6. Minimal style enforced**: NO card backgrounds, NO accent bars, NO page-number hints (`p.7 →`), NO stat band.

### Section & Closing

- [ ] **14. Section title size** is 36pt regular (not 48pt, not bold).
- [ ] **15. Closing is English-only** "Thank you." 44pt with NO presenter line.

### Branding & Copyright

- [ ] **16. Copyright string exact**:
  ```
  © 2026, Amazon Web Services, Inc. or its affiliates. All rights reserved.
  ```
- [ ] **17. No logo verification**: Confirm visually (PDF preview) that no AWS Smile logo appears on cover, footer, or any content slide.

### Content Coverage

- [ ] **18. Korean speaker scripts**: EVERY slide has a Korean script in `addNotes()`. Not empty.

## Cross-check Against Source

After 18 visual checks, content cross-check:

- [ ] List every Heading 1, 2, 3 in source
- [ ] For each heading, confirm a slide covers it
- [ ] Common omissions to verify:
  - Architecture diagrams or technical figures
  - Korean / domestic case studies
  - Industry partnerships
  - Incident / failure cases
  - Awards / recognition
  - Historical timelines
  - Comparison tables

If any source section is missing, **add a slide** rather than declaring done.

## Bilingual Mirror Check

If producing both English and Korean versions:

- [ ] Card geometry identical (same x, y, w, h)
- [ ] Vendor accent colors identical
- [ ] Stat band positions identical
- [ ] Korean version uses same `#FF693C` subtitle
- [ ] Closing is English-only ("Thank you.") in BOTH versions

## Common Failures & Fixes

| Symptom | Fix |
|---|---|
| Text overflow in cards | Reduce text or split to 2 slides |
| Subtitle not orange | Verify `color: C.subtitleOrange` (not `awsOrange`) |
| Logo accidentally rendered | Remove all `slide.addImage({...logo...})` calls — the design system has no slide logo |
| Page numbers off-by-one | Use `let pageNum = 1; addFooter(s, ++pageNum)` |
| Empty bottom third | Add stat band — never skip |
| Header divider line under title | Remove the line; use 0.53" rhythm |
| Korean script empty | Audit every `s.addNotes(...)` call |
| Cover has page number | Use `addFooter(s, null)` for cover |

## Sign-off

Mark deck as "ready for delivery" only when:
- All 18 checks pass
- Source cross-check shows no major omissions
- File is in `/mnt/user-data/outputs/`
- `present_files` has been called
