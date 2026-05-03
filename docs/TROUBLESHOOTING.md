# 트러블슈팅

## 빌드 단계

### `Cannot find module 'pptxgenjs'`

```bash
npm install pptxgenjs
```

또는 글로벌 설치:
```bash
npm install -g pptxgenjs
```

### `PIL not found` / `numpy not found`

```bash
pip install pillow numpy --break-system-packages
```

### `cairosvg not installed` (SVG 변환 시)

```bash
pip install cairosvg --break-system-packages
```

### `Asset file not found: /home/claude/aws_logo_white.png`

```bash
python skill/scripts/prepare_assets.py
```

`/home/claude/` 경로에 직접 생성됩니다. 다른 경로를 사용하려면 build script의 `ASSETS` 객체를 수정하세요.

## 출력 검수

### 텍스트가 카드 밖으로 넘침

원인 1: bullet이 너무 많거나 길다
→ 카드 당 최대 4-5 bullet, 각 bullet 1줄 이내

원인 2: charcoal 텍스트의 글자 크기가 카드 너비보다 큼
→ font size를 8.4pt로 통일, 5-column 그리드는 8pt 권장

원인 3: 한글 + 영문 혼합으로 line height 늘어남
→ paraSpaceAfter 값 줄이기 (5 → 3)

### 페이지 번호가 1, 1, 2, 3 식으로 잘못됨

`let pageNum = 1;` 카운터 사용 확인:
```javascript
let pageNum = 1;
// cover
addFooter(coverSlide, null);  // ← null이어야 함

// content slides
addFooter(s, ++pageNum);  // ← ++ 연산자 (선증가) 사용
```

### 서브타이틀 색이 노랑(#FF9900)으로 나옴

`C.subtitleOrange`(`#FF693C`)와 `C.awsOrange`(`#FF9900`)를 혼동한 경우:
```javascript
slide.addText(subtitle, {
  color: C.subtitleOrange,  // ✓ 정답
  // color: C.awsOrange,    // ✗ 틀림
});
```

### Footer 로고가 늘어나거나 찌그러짐

aspect ratio가 1.5:1이어야 합니다 (`w: 0.3450", h: 0.2300"`):
```javascript
slide.addImage({
  path: ASSETS.logo,
  x: 0.4200, y: 5.2080,
  w: 0.3450, h: 0.2300,  // ← 1.5:1 비율
});
```

`prepare_assets.py`로 생성한 logo는 자동으로 이 비율을 맞추지만, 직접 SVG/PNG를 사용하는 경우 별도 검증 필요.

### Cover에 페이지 번호가 표시됨

`addFooter`의 두 번째 인자에 `null`을 명시적으로 전달:
```javascript
addFooter(coverSlide, null);  // ← 페이지 번호 없음
addFooter(contentSlide, ++pageNum);  // ← 페이지 번호 있음
```

### 발표 노트가 비어있음

모든 슬라이드에 `s.addNotes(...)` 호출 확인:
```javascript
const s = pres.addSlide();
// ... 슬라이드 컨텐츠 ...
s.addNotes("이 슬라이드는 ...");  // ← 빠뜨리지 마세요
```

## Project Instructions

### Claude가 다른 디자인 시스템을 따름

원인 1: Project Instructions이 비어있거나 다른 내용
→ [`docs/PROJECT_INSTRUCTIONS.md`](./PROJECT_INSTRUCTIONS.md) 전체를 붙여넣기

원인 2: 다른 conflicting Skill이 활성화됨
→ Settings → Skills에서 다른 deck 생성 skill 비활성화

### Pretendard가 표시되지 않음

PowerPoint나 Keynote에 Pretendard 폰트가 설치되어 있지 않으면 substitute 폰트로 표시됩니다:

- macOS: [Pretendard GitHub](https://github.com/orioncactus/pretendard) → Pretendard.ttc 설치
- Windows: 동일 URL → 설치
- Google Slides: 자동으로 fallback

받는 사람의 환경에서 Pretendard가 없을 가능성이 있다면:
- Final 파일을 PDF로 export하면 폰트가 임베드됨
- 또는 PowerPoint Save As → "Embed fonts in the file" 체크

## GitHub Actions / Slack

### Release 발행했는데 Slack 알림이 안 옴

1. GitHub Secrets에 `SLACK_WEBHOOK_DECK_AUTOMATION`이 설정됐는지 확인
2. Webhook URL이 살아있는지 직접 테스트:
   ```bash
   curl -X POST -H 'Content-type: application/json' \
     --data '{"text":"테스트"}' \
     "$SLACK_WEBHOOK_DECK_AUTOMATION"
   ```
3. Action 로그에서 `notify-slack` job 확인

### CI에서 sample build 실패

Action 로그에서:
- `npm install pptxgenjs` 단계 → 의존성 설치 실패
- `Build sample` 단계 → 코드 에러
- `Verify output` 단계 → 파일 생성 안 됨 또는 너무 작음

로컬에서 동일 명령으로 재현:
```bash
npm install pptxgenjs
python skill/scripts/prepare_assets.py
node samples/physicalai-deck/build.js
```

## 도움 요청

위 가이드로 해결되지 않는 경우:

1. `#aws-deck-automation` Slack 채널에 질문
2. GitHub Issue 생성 (`bug_report.md` 템플릿 사용)
3. 매월 첫째 금요일 14:00 KST 오피스아워
