# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Version policy:
- **MAJOR**: design tokens, anchor coordinates, or core constraints changed
- **MINOR**: new layout patterns, new sample decks, new helper functions
- **PATCH**: bug fixes, documentation, refactoring without behavior change

## [Unreleased]

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
