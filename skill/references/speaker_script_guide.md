# Korean Speaker Script Guide

> Every slide MUST contain a Korean speaker script in `addNotes()`. This guide defines tone, structure, and templates.

## Core Principles

1. **존댓말 (formal Korean)**: "~입니다", "~겠습니다", "~말씀드립니다"
2. **Conversational but professional**: 딱딱한 written-language 패턴 회피
3. **Read left-to-right matching visual layout**
4. **Paraphrase, don't read bullets verbatim** — context를 더해야 함
5. **Technical terms**: English → Korean explanation. e.g., "VLA, 즉 Vision-Language-Action 모델은..."
6. **End with transition or implication** — facts만으로 끝나지 않게
7. **Abbreviation glossary at end** — append every abbreviation used on the slide with full name + 한 줄 설명 (see "Abbreviation Glossary Block" below)

## Speaking Time Targets

| Slide Type | Sentences | Speaking Time |
|---|---|---|
| Cover | 3–5 | ~30–45 sec |
| Section divider | 2–3 | ~15–25 sec |
| Content slide | 6–10 | ~60–90 sec |
| Closing | 2–3 | ~15–20 sec |

## Templates

### Cover Slide

```
안녕하세요. AWS Korea의 [Name]입니다.
오늘은 [Topic]에 대해 말씀드리고자 합니다.
[Topic]은 [최근 동향 / 왜 지금 중요한가 1문장].
이 자리에서는 크게 [Section 1], [Section 2], [Section 3]을 다루겠습니다.
끝까지 함께 해 주시면 감사하겠습니다.
```

### Section Divider

```
이번 섹션에서는 [Section name]을 살펴보겠습니다.
[이 섹션이 왜 중요한지 1문장].
[다음 슬라이드에서 무엇을 보게 될지 1문장].
```

### Content Slide (3-Column Comparison)

```
이 슬라이드에서는 [3가지 비교 대상]을 비교해 보겠습니다.

먼저 왼쪽의 [Item 1]은 [핵심 특징 1문장].
[근거 / 차별점 1-2문장].

가운데 [Item 2]는 [핵심 특징 1문장].
[Item 1과의 차이점 1문장].

오른쪽 [Item 3]은 [핵심 특징 1문장].
[강점 / 약점 1문장].

종합하면, [세 가지의 트레이드오프 / 선택 기준 1-2문장].
[다음 슬라이드 연결 1문장].
```

### Content Slide (Stat-heavy)

```
이 슬라이드의 핵심 메시지는 [한 문장 요약]입니다.

[큰 숫자 1]은 [의미 / 출처]를 나타냅니다.
[큰 숫자 2]는 [비교 대상 대비 / 변화율 / 임팩트].
[큰 숫자 3]은 [기술적 또는 비즈니스 시사점].
[큰 숫자 4]는 [향후 전망 또는 투자 방향].

이 데이터들이 시사하는 바는 [실무적 함의 1-2문장]입니다.
저희 고객 분들께서는 [구체적 액션 / 고려사항]을 검토해 보시기 바랍니다.
```

### Content Slide (Architecture/Technical)

```
이 슬라이드는 [System name]의 아키텍처를 보여드립니다.

전체 흐름은 [Stage 1] → [Stage 2] → [Stage 3]로 이어집니다.

먼저 [Stage 1]에서는 [역할 / 사용되는 AWS 서비스].
[Stage 1]의 핵심 고려사항은 [scaling, latency, cost 중 하나].

이어서 [Stage 2]는 [역할 / 사용되는 서비스].
이 단계에서 [기술 용어, 즉 한국어 풀이]가 동작합니다.

마지막으로 [Stage 3]에서 [최종 산출물 / 사용자 경험].

이 아키텍처를 채택하면 [정량적 효과] 또는 [정성적 효과]를 얻을 수 있습니다.
다음 슬라이드에서는 실제 사례를 보여드리겠습니다.
```

### Closing Slide

```
오늘 [Total slide count] 페이지에 걸쳐 [Topic]을 살펴보았습니다.
핵심 메시지는 [한 줄 요약]입니다.
질문이나 추가로 논의하고 싶으신 부분이 있으시면 자유롭게 말씀해 주십시오.
감사합니다.
```

## Abbreviation Glossary Block

After the spoken script, append a blank line and a glossary listing every abbreviation that appears on the slide (in the body, stat band, or spoken text). The glossary helps the presenter recall meanings while reading and is read off-script during Q&A.

**Format** — each entry starts with `• ` (bullet + space) for one-line scannability:
```
• 약어(Full Name): 한 줄 설명
```

**Realistic example** (placed at the end of an `addNotes("...")` string):
```
... [last sentence of spoken script] ...

• RDF(Resource Description Framework): 웹 상에서 자원(Resource)을 표현하고 교환하기 위한 표준 모델로, 데이터를 주제·술어·객체의 삼중 구조로 명확히 표현하는 방법
• SPARQL(SPARQL Protocol and RDF Query Language): RDF 그래프를 조회·갱신하는 W3C 표준 쿼리 언어
```

**Rules**
- Include only abbreviations that are **domain-specific or recently introduced** (e.g., RDF, OWL, SPARQL, SHACL, IRI, DL, MCP, RAG, RLHF, A2A).
- **Skip widely-known IT abbreviations** that AWS Solutions Architects already use daily — listing them adds noise without helping the presenter:
  - Cloud / AWS: AWS, IAM, EC2, S3, VPC, EKS, ECS, RDS
  - Web / Network: HTTP, HTTPS, REST, URI, URL, DNS, TLS, IP, TCP, UDP
  - Data / Lang: JSON, XML, YAML, CSV, HTML, CSS, SQL
  - Dev tooling: API, SDK, IDE, CLI, GUI, OS, DB
  - Process / KPI: MVP, PoC, PR, PM, Q&A, KPI, ROI, OKR, LOC, SLA
  - Auth: JWT, OAuth, MFA, SSO
- Do **not** include product names that aren't abbreviations (Bedrock, Cursor, Lovable, Composer).
- One entry per line, in Korean, one sentence each.
- If the slide contains no qualifying abbreviations, omit the glossary entirely.
- Place the glossary **after** the spoken script so delivery stays clean.
- Repeat the same abbreviation across slides if it reappears — each slide's note is self-contained.
- **Rule of thumb**: if every AWS SA in the room could spell out the full name unaided, omit it.

## Tone Calibration

### Too stiff (avoid)
> "본 슬라이드는 NVIDIA Isaac Sim에 대해 설명한다. 이는 GPU 기반 시뮬레이터이다."

### Right tone
> "이 슬라이드에서는 NVIDIA Isaac Sim을 살펴보겠습니다. Isaac Sim은 GPU를 활용해 수천 개의 환경을 병렬로 돌릴 수 있는 시뮬레이터입니다."

### Too casual (avoid)
> "Isaac Sim은 진짜 빨라요. 막 수천 개 막 돌아가요."

## Common Pitfalls

❌ **Bullets verbatim**: "첫째, GPU 기반. 둘째, 1만 환경 병렬. 셋째, USD 포맷."
✅ **Paraphrasing**: "Isaac Sim의 강점은 GPU를 활용한 대규모 병렬화입니다. 단일 머신에서 1만 개 환경을 동시에 굴릴 수 있다는 점이 학습 속도 측면에서 큰 차이를 만듭니다."

❌ **No transition**: 마지막 문장이 그냥 사실
✅ **Bridge to next**: "...라는 점이 다음 슬라이드에서 살펴볼 시뮬레이션 활용 사례로 이어집니다."

❌ **English-only terms**: "VLA의 generalization 능력이..."
✅ **English + Korean**: "VLA, 즉 Vision-Language-Action 모델의 일반화 능력이..."

## Adapting for Audiences

### Technical (engineers, ML researchers)
- 한국어 설명 짧게, 아키텍처/지표 중심, 트레이드오프 명시

### Business (executives)
- 한국어 설명 친절하게, ROI/time-to-market 중심, "그래서 무엇을 할 것인가"

### Mixed (default)
- 기술 용어 간단히 풀어주되 깊이 유지, 사례+데이터 섞기

## Quality Checklist

- [ ] 6-10 문장 (content slide 기준)
- [ ] 존댓말 일관성
- [ ] 좌→우 또는 위→아래 시각 흐름과 일치
- [ ] 기술 용어에 한국어 풀이
- [ ] 마지막 문장이 transition 또는 시사점
- [ ] 카드/불릿을 그대로 읽지 않음
- [ ] 1-2 문장의 "so what" 포함
- [ ] **약어 용어집 블록**: 슬라이드에 등장하는 모든 약어가 `약어(Full Name): 한 줄 설명` 형식으로 노트 끝에 정리됨
