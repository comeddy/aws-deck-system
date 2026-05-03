# AWS Standard Presentation Design System

> **AWS Korea V-team의 PowerPoint 자동화 표준** — Claude로 일관된 AWS 브랜드 deck을 생성합니다.

[![Skill](https://img.shields.io/badge/Anthropic-Skill-orange)](./skill/SKILL.md)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](./CHANGELOG.md)
[![Slack](https://img.shields.io/badge/slack-%23aws--deck--automation-4A154B)](#slack)

이 레포는 V-team이 동일한 디자인 시스템(16:9, Pretendard, AWS Smile 로고, `#FF693C` subtitle, 한국어 발표 스크립트)으로 production-grade `.pptx`를 만들 수 있도록 하는 **단일 진실 공급원(Single Source of Truth)**입니다.

---

## 4가지 구성 요소

```
┌─────────────────────────────────────────────────────────────────┐
│  📦 GitHub Repo (Single Source of Truth)  ← 이 레포             │
│      └── 모든 명세 · 토큰 · 패턴 · 스크립트의 정본              │
│                                                                  │
│  🤖 Anthropic Skill (skill/)                                     │
│      └── Claude가 자동으로 트리거하는 패키징                    │
│                                                                  │
│  🎨 Golden Sample Decks (samples/)                               │
│      └── 7가지 패턴이 모두 적용된 reference 결과물              │
│                                                                  │
│  💬 Slack 채널 (#aws-deck-automation)                            │
│      └── 릴리즈 자동 공지 · Q&A · 사용 사례 공유                │
└─────────────────────────────────────────────────────────────────┘
```

---

## Quick Start (3가지 경로)

### 🅰 가장 빠른 길 — Claude Project Instructions

1. [Claude.ai](https://claude.ai)에서 새 Project 생성
2. [`docs/PROJECT_INSTRUCTIONS.md`](./docs/PROJECT_INSTRUCTIONS.md) 전체를 Project Instructions에 붙여넣기
3. 새 채팅에서 **"AWS 스타일로 [주제] deck 만들어줘"** → 완성

### 🅱 Skill 직접 설치 — Claude Code 사용자

```bash
git clone <your-repo-url>/aws-deck-system.git
mkdir -p ~/.claude/skills/
cp -r aws-deck-system/skill ~/.claude/skills/aws-presentation
```

또는 `.skill` 파일을 GitHub Releases에서 다운로드해서 압축 해제.

### 🅲 로컬 Node.js 직접 실행 — 자동화/CI 통합

```bash
git clone <your-repo-url>/aws-deck-system.git
cd aws-deck-system
npm install pptxgenjs
pip install pillow numpy --break-system-packages
python skill/scripts/prepare_assets.py
node samples/physicalai-deck/build.js
```

---

## 레포 구조

```
aws-deck-system/
├── README.md                       ← 이 파일
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
│
├── skill/                          ← 🤖 Anthropic Skill 패키징
│   ├── SKILL.md                    ← YAML frontmatter + 인스트럭션
│   ├── references/                 ← progressive disclosure 자료
│   │   ├── design_tokens.md
│   │   ├── layout_patterns.md
│   │   ├── speaker_script_guide.md
│   │   └── qa_checklist.md
│   └── scripts/
│       ├── prepare_assets.py       ← 로고/배경 자산 생성
│       └── build_deck.js           ← 레퍼런스 빌드 스켈레톤
│
├── samples/                        ← 🎨 Golden Sample Decks
│   ├── README.md
│   ├── physicalai-deck/
│   │   ├── build.js
│   │   ├── output.pptx             ← 빌드 결과물
│   │   └── preview.png
│   └── genai-workshop-deck/        ← 🚧 추가 예정
│
├── docs/                           ← 📖 사용자 문서
│   ├── PROJECT_INSTRUCTIONS.md     ← Claude Project용 통합 인스트럭션
│   ├── ONBOARDING.md
│   └── TROUBLESHOOTING.md
│
├── scripts/                        ← 🔧 운영 스크립트
│   ├── package_skill.sh            ← .skill 파일 빌드
│   └── slack_notify.sh             ← Slack 알림
│
├── assets/                         ← 🖼 공식 에셋
│   ├── aws_logo_white.png
│   ├── title_bg.png
│   └── section_bg_33.png
│
└── .github/
    ├── workflows/
    │   ├── package_skill.yml       ← 릴리즈 시 .skill 자동 빌드 + Slack 알림
    │   └── validate_samples.yml    ← PR 시 샘플 빌드 검증
    └── ISSUE_TEMPLATE/
```

---

## 핵심 디자인 원칙

| | |
|---|---|
| **Aspect** | 16:9 only (`LAYOUT_16x9`) |
| **Font** | Pretendard ONLY (no fallbacks) |
| **Subtitle** | `#FF693C` 오렌지 (AWS template-exact) |
| **Background** | `#0E101C` 다크 네이비 (콘텐츠 슬라이드) |
| **Logo** | 공식 AWS Smile (white, 1.5:1 aspect) |
| **Page numbering** | `let pageNum = 1; ++pageNum` 자동 카운터 |
| **Speaker scripts** | 모든 슬라이드에 한국어 발표 스크립트 (`addNotes`) |

상세는 [`skill/references/design_tokens.md`](./skill/references/design_tokens.md).

---

## 7가지 레이아웃 패턴

1. **3-Column Comparison** — 3개 비교
2. **4/5-Column Card Grid** — 제품/기능 그리드
3. **Left Panel + Right Quad (1+4)** — 컨셉 + 4 사례
4. **2-Column Compare (50/50)** — Head-to-head
5. **Top Strip + Bottom Quad** — 4단계 프로세스 + 상세
6. **Timeline + 2-Column Detail** — 시간 흐름 + 비교
7. **Incident Catalog + Lessons** — 실패 사례 + 교훈

상세 가이드: [`skill/references/layout_patterns.md`](./skill/references/layout_patterns.md).

---

## <a name="slack"></a>Slack — `#aws-deck-automation`

AWS Korea Slack 워크스페이스의 `#aws-deck-automation` 채널에 합류하세요:

- **새 릴리즈 자동 공지**: GitHub Release 발행 시 채널에 자동 전송
- **사용 사례 공유**: 만든 deck 결과물을 자유롭게 공유
- **Q&A**: 트러블슈팅, 패턴 추천
- **오피스아워**: 매월 첫째 금요일 14:00 KST

채널 셋업은 [`docs/ONBOARDING.md`](./docs/ONBOARDING.md) 참조.

---

## 거버넌스

- **버전**: [Semantic Versioning](https://semver.org/) — MAJOR(토큰/anchor) · MINOR(신규 패턴) · PATCH(버그/문서)
- **승인**: 1 reviewer + 디자인 리드 (디자인 변경 시)
- **CI**: 모든 PR은 sample deck 빌드 검증 통과 필수

자세한 내용은 [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## 라이선스

AWS Internal Use Only. © 2026 Amazon Web Services, Inc.

**Maintainers**: AWS Korea V-team Solutions Architects
**Contact**: `#aws-deck-automation` Slack channel
