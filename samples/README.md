# Golden Sample Decks

> 디자인 시스템이 실제로 어떤 결과물을 만들어내는지 보여주는 reference 구현. V-team 팀원이 출발점으로 사용할 수 있습니다.

## 샘플 목록

### 1. `physicalai-deck/` ✅ 빌드 완료

**주제**: Physical AI on AWS — Simulation에서 Sim-to-Real까지

**다루는 패턴**:
- Pattern 1 (3-Column Comparison): 시뮬레이터 비교
- Pattern 2 (4/5-Column Card Grid): 휴머노이드 5종, NPU 파트너 4사
- Pattern 3 (Left Panel + Right Quad): 한국 고객 사례 4건
- Pattern 4 (2-Column Compare): Modular vs E2E VLA
- Pattern 5 (Top Strip + Bottom Quad): Physical AI Flywheel
- Pattern 6 (Timeline + 2-Column Detail): Robotics 65년 발전사
- Pattern 7 (Incident Catalog + Lessons): Sim-to-Real 6대 실패 패턴

**구성**: 13장 (cover + 3 sections + 8 content + closing)

**빌드**:
```bash
node samples/physicalai-deck/build.js
# → /mnt/user-data/outputs/physicalai-deck.pptx
```

**파일**:
- `build.js` — 전체 빌드 스크립트
- `output.pptx` — 빌드 결과물 (~960KB)
- `preview.png` — 첫 슬라이드 프리뷰

---

### 2. `genai-workshop-deck/` 🚧 추가 예정

**주제**: GenAI 고객 워크숍 표준 deck (Bedrock, Claude API, GenAI Apps 중심)

기여를 환영합니다 — `CONTRIBUTING.md` 참조.

---

## 활용 방법

### A. 출발점으로 복사

```bash
cp -r samples/physicalai-deck samples/my-new-deck
cd samples/my-new-deck
# build.js의 SLIDE 섹션을 본인 콘텐츠로 교체
node build.js
```

### B. Claude에게 패턴으로 지시

```
"samples/physicalai-deck의 Pattern 5 (Top Strip + Bottom Quad) 스타일로
Generative AI Flywheel deck을 만들어줘"
```

### C. 비주얼 검수 자료로

PR 리뷰 시 sample이 모든 패턴을 demonstrating하므로 디자인 변경의 영향을 빠르게 확인할 수 있습니다.

---

## 새 샘플 추가하기

1. `samples/<deck-name>/` 폴더 생성
2. `build.js` 작성 (`physicalai-deck/build.js` 참고)
3. 빌드 검증 후 `output.pptx` + `preview.png` 첨부
4. 이 README에 항목 추가
5. PR 제출

자세한 가이드: [CONTRIBUTING.md](../CONTRIBUTING.md)
