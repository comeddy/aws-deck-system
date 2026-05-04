# AWS Deck System — No-Logo Patch

이 패치는 `aws-deck-system` 리포지토리에서 **AWS Smile 로고를 슬라이드에서 완전히 제거**합니다.

## 변경 이유

이전 1.0.0 릴리스는 모든 슬라이드 footer와 커버에 AWS Smile 로고를 렌더링했습니다. 디자인 검토 결과, 슬라이드에서는 로고를 빼고 다음 요소들로 AWS 정체성을 표현하는 것이 더 깔끔하다고 결정했습니다:

- `#FF693C` 서브타이틀 오렌지 (AWS 템플릿 정확)
- `#0E101C` 다크 네이비 콘텐츠 배경
- Pretendard 타이포그래피
- 표준 copyright 문자열

로고 자체는 brand asset으로 보존되지만, **`build_deck.js`에서 더 이상 참조하지 않습니다**.

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
| `skill/scripts/build_deck.js` | `addFooter()`, `addCoverSlide()`에서 `slide.addImage({path: ASSETS.logo, ...})` 호출 제거. `ASSETS` 객체에서 `logo` 항목 삭제. 헤더 prerequisites 갱신. |
| `samples/physicalai-deck/build.js` | 동일하게 처리 |
| `skill/SKILL.md` | Core Constraint #3을 "no slide logo"로 교체. "Logo Sizing Standard"와 "Logo PNG Generation Standard" 섹션 삭제. "Footer Composition (no logo)" 섹션 신설. Forbidden 항목 갱신. |
| `docs/PROJECT_INSTRUCTIONS.md` | Core #3, Type A Cover, Persistent Footer 표, Reference Implementation 코드, Forbidden 섹션 모두 갱신 |
| `docs/TROUBLESHOOTING.md` | "Footer 로고 stretch" 섹션 → "슬라이드에 AWS Smile 로고가 보임" 트러블슈팅으로 교체 |
| `skill/references/design_tokens.md` | Cover slide vertical anchors와 Footer Layout 표에서 logo 행 제거 |
| `skill/references/qa_checklist.md` | Check #3, #9, #17을 "logo 부재" 검증으로 교체. troubleshooting 표 갱신. |
| `skill/scripts/prepare_assets.py` | 헤더 docstring에서 `aws_logo_white.png`를 OPTIONAL로 표기 (생성은 계속 가능, 슬라이드에서 사용 안 함) |
| `README.md` | "핵심 디자인 원칙" 표의 Logo 행 → Branding 행으로 교체. asset tree에서 logo를 optional 표기. |
| `CHANGELOG.md` | `[Unreleased]` 섹션을 logo-removal 변경 내역으로 재작성 |

## Footer 구성 (변경 후)

| Element | x | y | w | h |
|---|---|---|---|---|
| Copyright (centered) | 0" | 5.27" | 10.0" | 0.1515" |
| Page number (right) | 9.40" | 5.27" | 0.20" | 0.18" |

로고 이미지는 어디에도 없습니다.

## Cover 슬라이드 구성 (변경 후)

- Title 44pt bold @ y=1.85"
- Subtitle 26pt bold @ y=2.65"
- Presenter 3 lines @ y=4.05/4.32/4.59
- **NO logo image**
- Footer (copyright only, no page number)

## 호환성

이 패치는 기존 deck 빌드에 **breaking visual change**입니다. v1.0.0으로 빌드된 기존 deck들은 logo를 표시하지만, 이 패치를 적용한 뒤 다시 빌드하면 logo가 사라집니다. 모든 기존 deck도 재생성하는 것을 권장합니다.

## 보존된 자산

- `assets/aws_logo_white.png` 파일 자체는 brand asset으로 리포지토리에 보존됩니다
- `prepare_assets.py`는 logo PNG를 계속 생성할 수 있습니다 (legacy/non-deck 용도)
- 단, `build_deck.js`에서 이 파일을 참조하지 않습니다

## 검증

`grep -rn "ASSETS\.logo" --include="*.js"`로 검색했을 때, 실제 코드에는 `ASSETS.logo` 참조가 남아있지 않습니다. 문서에 남은 언급은 모두 "이렇게 하지 마세요" 또는 "이전에는 이랬다"는 의도적 컨텍스트입니다.
