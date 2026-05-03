# Layout Patterns Reference

> 7 proven, reusable layout patterns. Choose based on content type using the decision tree below.

## Decision Tree

```
콘텐츠가 뭐예요?
│
├── 2~5개를 비교
│   ├── 2개 → Pattern 4 (2-Column Compare 50/50)
│   ├── 3개 → Pattern 1 (3-Column Comparison)
│   └── 4~5개 → Pattern 2 (4/5-Column Card Grid)
│
├── 프로세스/진화 표현
│   ├── 4단계 흐름 → Pattern 5 (Top Strip + Bottom Quad)
│   └── 시간 기반 → Pattern 6 (Timeline + 2-Column Detail)
│
├── 컨셉 + 사례 묶음
│   └── Pattern 3 (Left Panel + Right Quad, 1+4)
│
└── 실패 사례 / 교훈 카탈로그
    └── Pattern 7 (Incident Catalog + Lessons)
```

---

## Pattern 1: 3-Column Comparison

**Use for**: 3개 vendor/접근/컨셉 비교

**Geometry**:
- Card width: `(9.16 - 0.10*2) / 3 = 2.987"`
- Card height: 3.05"
- Body y-range: 1.38" → 4.43"

**Anatomy** (per column):
- Top accent bar (vendor color, 0.06" tall)
- VENDOR LABEL (uppercase, 8pt bold)
- Title (13pt bold white)
- Hairline divider
- 3-6 bullets (8.4pt charcoal)

**Examples**: "NVIDIA vs Tesla vs Waymo 자율주행", "Modular vs E2E vs Hybrid VLA"

---

## Pattern 2: 4/5-Column Card Grid

**Use for**: 4-5개 제품/기능을 동등 비중으로

**Geometry (4-col)**: `(9.16 - 0.10*3) / 4 = 2.215"` × 3.05"
**Geometry (5-col)**: `(9.16 - 0.10*4) / 5 = 1.748"` × 3.05"

**Examples**: "양산형 휴머노이드 5종" (5-col), "Foundation Model 발전 4단계" (4-col)

---

## Pattern 3: Left Panel + Right Quad (1+4)

**Use for**: 컨셉 narrative + 4 case studies

**Geometry**:
- Left panel: 3.20" × 3.05" (narrative or timeline)
- Right grid: 5.81" × 3.05", 2×2 grid
  - Each case card: ~2.85" × 1.45"
  - Gutter: 0.10"

**Examples**: "축적의 시간 → 압축의 시간" (concept on left, 4 cases on right)

---

## Pattern 4: 2-Column Compare (50/50)

**Use for**: 2개 entity head-to-head

**Geometry**:
- Card width: `(9.16 - 0.16) / 2 = 4.50"`
- Card height: 3.05"
- Each card: vendor label + title + tagline + 5-7 bullets

**Examples**: "Modular vs E2E", "Waymo vs Tesla", "2025 vs 2026 Robotics"

---

## Pattern 5: Top Strip + Bottom Quad

**Use for**: 4단계 프로세스 + 상세

**Geometry**:
- Top strip: y=1.38" to y=2.30" (height 0.92")
  - 4 small stage cards horizontal
  - Card width: ~2.10"
  - Arrows between (→ characters or shapes)
- Bottom: y=2.45" to y=4.43" (height 1.98")
  - 3-column or 2-column expansion

**Examples**: "지각 → 인코딩 → 정책 → 액션" (top) + "BC · SFT · RL" (bottom)

---

## Pattern 6: Timeline + 2-Column Detail

**Use for**: 역사적 진화 + 현재 상태 확장

**Geometry**:
- Top timeline: y=1.38" to y=2.10" (height 0.72")
  - 5 milestone points horizontally
  - Connecting line at y=1.74"
  - Year labels above, descriptions below
- Bottom: y=2.30" to y=4.43" (height 2.13")
  - 2-column expansion

**Examples**: "Robotics 발전사 1959-2026" (top) + "현재 양산 사례" (bottom)

---

## Pattern 7: Incident Catalog + Lessons

**Use for**: 실패/edge case 나열 + 학습

**Geometry**:
- Left catalog: 4.50" wide, 6 colored tag rows
  - Each row: ~0.42" tall
  - Color tag (0.30" wide) + description text
- Right side: 4.50" wide
  - Top: "Operational Responses" — 4 bullets (1.85" tall)
  - Bottom: Insight callout box (1.05" tall, accent bar on top)

**Examples**: "Sim-to-Real Gap 6대 실패 패턴 + AWS 운영 대응"

---

## When you have too much content

**Don't shrink fonts.** Add another slide. Two well-paced slides > one cramped slide.

## Quick Selection Reference

| 소스에 ... 가 있으면 | 사용 |
|---|---|
| 3개 대안 | Pattern 1 |
| 4-5개 대안 | Pattern 2 |
| 컨셉 + 사례들 | Pattern 3 |
| Head-to-head | Pattern 4 |
| 4단계 프로세스 | Pattern 5 |
| 시간 기반 진화 | Pattern 6 |
| 실패 + 교훈 | Pattern 7 |
| 단일 hero point | Big hero + supporting strip |
