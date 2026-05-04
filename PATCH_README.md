# AWS Deck System — Logo Sizing Standard Patch

이 패치는 `aws-deck-system` 리포지토리 전체에 **AWS Smile 로고 사이즈/비율 표준**을 일관되게 반영합니다.

## 변경 이유

기존 1.0.0 릴리스는 로고 aspect ratio를 **1.5:1로 강제**하고 있었습니다. 그러나 공식 AWS Smile 마크의 자연 비율은 **1.62:1** (smile 부분만 외곽 padding 없이)입니다. 1.5:1로 늘리면 smile mark가 미묘하게 왜곡되고, footer의 작은 로고는 너무 두꺼워 보입니다.

사용자(Youngjin Kim) 검증을 통해 다음 사이즈가 시각적으로 완벽하다고 확정되었습니다:

| 위치 | 좌표 (x, y) | 크기 (w × h) | aspect |
|---|---|---|---|
| **커버 우측 하단 hero 로고** | (8.65", 4.45") | 0.92" × 0.57" | 1.61:1 |
| **모든 슬라이드 footer 로고** | (0.42", 5.23") | 0.283" × 0.175" | 1.62:1 |

## 적용 방법

이 폴더 전체를 기존 `aws-deck-system` 리포지토리에 덮어씁니다:

```bash
# 옵션 1: 전체 덮어쓰기 (가장 간단)
cp -r aws-deck-system-update/* /path/to/aws-deck-system/

# 옵션 2: 개별 파일만 적용
cp aws-deck-system-update/docs/PROJECT_INSTRUCTIONS.md /path/to/aws-deck-system/docs/
cp aws-deck-system-update/docs/TROUBLESHOOTING.md /path/to/aws-deck-system/docs/
cp aws-deck-system-update/README.md /path/to/aws-deck-system/
cp aws-deck-system-update/CHANGELOG.md /path/to/aws-deck-system/
cp aws-deck-system-update/skill/SKILL.md /path/to/aws-deck-system/skill/
cp aws-deck-system-update/skill/scripts/build_deck.js /path/to/aws-deck-system/skill/scripts/
cp aws-deck-system-update/skill/scripts/prepare_assets.py /path/to/aws-deck-system/skill/scripts/
cp aws-deck-system-update/skill/references/design_tokens.md /path/to/aws-deck-system/skill/references/
cp aws-deck-system-update/skill/references/qa_checklist.md /path/to/aws-deck-system/skill/references/
cp aws-deck-system-update/samples/physicalai-deck/build.js /path/to/aws-deck-system/samples/physicalai-deck/
```

## Claude Project에 반영

`docs/PROJECT_INSTRUCTIONS.md`의 내용을 Claude Project Settings → Custom Instructions에 다시 복사 붙여넣기하면 됩니다. 이미 등록되어 있다면 기존 내용을 새 내용으로 교체하세요.

## 변경된 파일 (10개)

| 파일 | 변경 내용 |
|---|---|
| `docs/PROJECT_INSTRUCTIONS.md` | Core Constraints, Type A Cover, Persistent Footer, Reference Implementation, Forbidden 섹션 |
| `docs/TROUBLESHOOTING.md` | "Footer 로고 stretch" 섹션 |
| `README.md` | Quick reference 표 |
| `CHANGELOG.md` | `[Unreleased]` 섹션에 변경 내역 추가 |
| `skill/SKILL.md` | Core Constraints, asset 설명, Logo Sizing Standard / PNG Generation Standard 섹션 신규 추가, Forbidden |
| `skill/scripts/build_deck.js` | `addFooter()`, `addCoverSlide()` |
| `skill/scripts/prepare_assets.py` | 헤더 docstring |
| `skill/references/design_tokens.md` | Footer Layout 표, Cover slide vertical anchors |
| `skill/references/qa_checklist.md` | Check #3, #9, 트러블슈팅 표 |
| `samples/physicalai-deck/build.js` | footer + cover hero logo 사이즈 |

## 검증

이 변경 사항은 다음 deck에서 사용자가 시각적으로 검증한 상태입니다:
- `frontier-ai-dev-tools-comparison.pptx` (16개 슬라이드)
- 커버 슬라이드 우측 하단 hero 로고
- 모든 콘텐츠 슬라이드 좌측 하단 footer 로고

사용자 코멘트: "하단 슬라이드 aws logo 및 첫장 제목 슬라이드내 aws logo 위치 크기, 모양 모두 완벽하다."

## 호환성

이 패치는 기존 deck 빌드에 **breaking change**입니다 (로고 좌표가 바뀌었기 때문). 기존 deck을 다시 빌드하면 로고 위치/크기가 변경됩니다. 새 표준이 더 정확하고 공식 AWS 디자인 가이드라인에 부합하므로, 모든 기존 deck도 재생성하는 것을 권장합니다.
