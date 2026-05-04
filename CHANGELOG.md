# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Version policy:
- **MAJOR**: design tokens, anchor coordinates, or core constraints changed
- **MINOR**: new layout patterns, new sample decks, new helper functions
- **PATCH**: bug fixes, documentation, refactoring without behavior change

## [Unreleased]

### Removed
- **AWS Smile logo removed from all slides** (cover hero + footer). The design system no longer renders a logo image; identity comes from `#FF693C` subtitle, `#0E101C` background, Pretendard typography, and the standard copyright string.
- Removed `addImage` calls for `ASSETS.logo` from `addFooter()` and `addCoverSlide()` in both `skill/scripts/build_deck.js` and `samples/physicalai-deck/build.js`
- Removed `logo` entry from `ASSETS` object in build scripts
- Removed "Logo Sizing Standard" and "Logo PNG Generation Standard" sections from `skill/SKILL.md`

### Changed
- `prepare_assets.py` header docstring marks `aws_logo_white.png` as OPTIONAL (still produced for legacy/non-deck use, but unused by build scripts)
- Forbidden lists in `SKILL.md` and `PROJECT_INSTRUCTIONS.md` now forbid any logo on slides
- QA checklist #3, #9, #17 rewritten to verify logo absence (not presence)
- README.md, design_tokens.md, TROUBLESHOOTING.md updated to reflect no-logo branding

### Note for v1.0.0 users
This is a breaking visual change. Existing decks built with v1.0.0 will display the logo; rebuilding with this version removes it. Re-run `node build_deck.js` to refresh.

### Files updated
- `docs/PROJECT_INSTRUCTIONS.md` (Core #3, Type A, Persistent Footer, Reference Implementation, Forbidden)
- `docs/TROUBLESHOOTING.md` (logo stretch → no-logo verification)
- `README.md` (Branding row, asset tree)
- `skill/SKILL.md` (Core #3, Step 3, new "Footer Composition" section, Forbidden)
- `skill/scripts/build_deck.js` (`addFooter`, `addCoverSlide`, ASSETS, header)
- `skill/scripts/prepare_assets.py` (header docstring)
- `skill/references/design_tokens.md` (Footer Layout table, Cover anchors)
- `skill/references/qa_checklist.md` (checks #3, #9, #17, troubleshooting table)
- `samples/physicalai-deck/build.js` (footer + cover hero, ASSETS)

## [1.0.0] - 2026-05-03

### Added
- Initial release of AWS Standard Presentation Design System
- `skill/SKILL.md` with YAML frontmatter for Anthropic Skill packaging
- 4 reference files for progressive disclosure:
  - `design_tokens.md` — color palette, typography scale, anchor coordinates
  - `layout_patterns.md` — 7 proven layout patterns with decision tree
  - `speaker_script_guide.md` — Korean script tone, structure, templates
  - `qa_checklist.md` — 18-point pre-delivery validation
- `prepare_assets.py` — supports SVG/template/fallback modes for logo and gradient backgrounds
- `build_deck.js` — reference pptxgenjs build skeleton with all helper functions
- Golden Sample: `physicalai-deck` — 13 slides demonstrating all 7 patterns
- Placeholder for second sample: `genai-workshop-deck`
- `scripts/package_skill.sh` — package skill/ as `.skill` zip file
- `scripts/slack_notify.sh` — 5 notification types (release, new-sample, tip, announcement, pr-merged)
- GitHub Actions:
  - `package_skill.yml` — release-triggered packaging + Slack notification
  - `validate_samples.yml` — PR-triggered sample build verification
- Issue templates: bug_report, pattern_request
- `docs/PROJECT_INSTRUCTIONS.md` — Claude Project drop-in instructions
- `docs/ONBOARDING.md` — V-team onboarding guide
- `docs/TROUBLESHOOTING.md` — common issues and fixes

### Design constraints
- 16:9 aspect ratio only (`LAYOUT_16x9` = 10" × 5.625")
- Pretendard font only (no fallbacks)
- AWS Smile logo (1.5:1 aspect, white variant)
- Subtitle color `#FF693C` (template-exact)
- Content slide background `#0E101C`
- Auto page numbering via `let pageNum = 1; ++pageNum`

[Unreleased]: https://github.com/USER/aws-deck-system/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/USER/aws-deck-system/releases/tag/v1.0.0
