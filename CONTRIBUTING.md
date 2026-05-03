# Contributing to AWS Standard Presentation Design System

이 프로젝트에 기여해 주셔서 감사합니다. 이 문서는 PR 절차, 코딩 스타일, 그리고 새 패턴/샘플을 추가하는 방법을 정리합니다.

## 기여 유형

| 유형 | 영향 | 예시 |
|---|---|---|
| **PATCH** | 버그/문서 | 오타, 좌표 보정, 문서 보강 |
| **MINOR** | 신규 기능 | 새 레이아웃 패턴, 새 sample deck |
| **MAJOR** | 설계 변경 | 디자인 토큰 수정, anchor 좌표 변경 |

## PR 워크플로

1. **Issue 먼저** — 새 기능이나 변경은 PR 전에 issue로 논의
2. **Branch 생성** — `feature/<topic>`, `fix/<topic>`, `docs/<topic>` 네이밍
3. **로컬 검증**:
   ```bash
   # Sample deck 빌드 성공 확인
   npm install pptxgenjs
   pip install pillow numpy --break-system-packages
   python skill/scripts/prepare_assets.py
   node samples/physicalai-deck/build.js
   ```
4. **PR 생성** — 최소 1명의 reviewer 지정. 디자인 변경 시 디자인 리드 추가
5. **CI 통과 확인** — `validate_samples.yml`이 자동으로 빌드 검증
6. **머지** — Squash merge 권장

## 디자인 변경 (MAJOR) 가이드

토큰/anchor를 수정하는 경우:
- 변경 이유와 시각적 비포/애프터 스크린샷을 PR에 첨부
- 모든 sample deck을 재빌드하고 비주얼 검수
- `CHANGELOG.md`에 명시
- 디자인 리드 1명 + 운영 메인테이너 1명 승인 필요

## 새 레이아웃 패턴 추가 (MINOR)

1. `skill/references/layout_patterns.md`에 패턴 항목 추가:
   - 사용 시기 (decision tree에 추가)
   - 정확한 좌표 / 크기 (재현 가능해야 함)
   - 대표 사례 1-2개
2. `skill/scripts/build_deck.js`에 helper function 추가 (필요 시)
3. Sample deck에서 적어도 한 번 실제 사용 demonstration
4. `CHANGELOG.md` 업데이트

## 새 Sample Deck 추가 (MINOR)

1. `samples/<deck-name>/` 폴더 생성
2. `build.js` 작성 (`samples/physicalai-deck/build.js`를 출발점으로 복사)
3. 빌드 검증 후 다음 파일을 commit:
   - `build.js`
   - `output.pptx` (빌드 결과)
   - `preview.png` (첫 슬라이드 캡처)
4. `samples/README.md`에 항목 추가
5. `.github/workflows/validate_samples.yml`의 matrix.sample에 추가

## 코딩 스타일

### JavaScript (build scripts)
- ES6+ syntax
- pptxgenjs API만 사용 (외부 의존성 최소화)
- 좌표는 inch 단위, 소수점 2자리까지
- 헬퍼 함수는 모든 sample에서 동일하게 재사용

### Python (asset scripts)
- Python 3.11+
- PEP 8 따름
- CLI는 `argparse` 사용

### Markdown (references)
- 모든 reference 파일은 한 가지 주제에 집중
- 헤더 위계: `#` → `##` → `###`
- 코드 블록은 항상 language 지정

## 보안 / 라이선스 주의

- 외부 이미지나 폰트 파일 commit 금지 (assets/ 안의 공식 자산만 허용)
- PII나 고객 정보가 들어간 sample 금지
- AWS 내부 정보 노출 금지

## 질문

- Issue 또는 `#aws-deck-automation` Slack 채널 활용
