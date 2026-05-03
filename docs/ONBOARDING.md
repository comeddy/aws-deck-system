# V-team 온보딩 가이드

> AWS Korea V-team 팀원이 이 deck system을 처음 사용할 때 거치는 5단계.

## 1. 레포 접근

레포는 개인 계정(private)에 호스팅되어 있습니다. 메인테이너에게 collaborator 추가를 요청하세요.

```bash
git clone <your-repo-url>/aws-deck-system.git
cd aws-deck-system
```

## 2. 사용 경로 선택

| 경로 | 적합한 사용자 | 셋업 시간 |
|---|---|---|
| 🅰 Claude Project | Claude.ai 사용자, 가장 쉬움 | 2분 |
| 🅱 Skill 직접 설치 | Claude Code 사용자 | 5분 |
| 🅲 로컬 Node.js | 자동화/CI 통합 필요 | 10분 |

### 🅰 Claude Project (권장)

1. [Claude.ai](https://claude.ai) → "New project" 클릭
2. Project Settings → Custom Instructions
3. [`docs/PROJECT_INSTRUCTIONS.md`](./PROJECT_INSTRUCTIONS.md) 전체 내용을 붙여넣기
4. 새 채팅에서 테스트:
   ```
   AWS 스타일로 Bedrock 소개 deck 5장 만들어줘
   ```

### 🅱 Skill 직접 설치

[GitHub Releases](#)에서 최신 `.skill` 파일 다운로드:

```bash
mkdir -p ~/.claude/skills/aws-presentation
unzip aws-presentation-v1.0.0.skill -d ~/.claude/skills/aws-presentation/
```

또는 레포에서 직접:

```bash
cp -r skill ~/.claude/skills/aws-presentation
```

### 🅲 로컬 Node.js

```bash
git clone <your-repo-url>/aws-deck-system.git
cd aws-deck-system
npm install pptxgenjs
pip install pillow numpy --break-system-packages
python skill/scripts/prepare_assets.py
node samples/physicalai-deck/build.js
# → /mnt/user-data/outputs/physicalai-deck.pptx
```

## 3. Slack 채널 합류

`#aws-deck-automation` 채널에 합류하세요 (AWS Korea Slack 워크스페이스).

수신 콘텐츠:
- 새 릴리즈 자동 공지 (GitHub Action)
- 매월 첫째 금요일 14:00 KST 오피스아워 알림
- 사용 사례 / 결과물 공유
- 트러블슈팅 Q&A

## 4. 첫 deck 만들기

다음 프롬프트로 첫 deck을 생성해 보세요:

```
AWS Korea SA 워크숍에서 사용할 [주제] deck을 만들어줘.
- 발표자는 [이름], [직책], AWS Korea
- 12-15장 정도
- 한국어 발표 스크립트 포함
- AWS 스타일
```

실행 후 `output.pptx`를 PowerPoint나 Google Slides에서 열어보고 18-point QA checklist (`skill/references/qa_checklist.md`)로 검수하세요.

## 5. 기여하기

레포에 기여하고 싶다면:

1. [`CONTRIBUTING.md`](../CONTRIBUTING.md) 읽기
2. Issue 먼저 (새 패턴, 새 샘플, 버그)
3. PR 생성
4. CI 통과 + 1 reviewer 승인 후 머지

## Slack Webhook 설정 (메인테이너용)

`#aws-deck-automation` 채널에 자동 알림을 보내려면:

1. Slack workspace → 채널 우클릭 → Integrations → Add apps
2. "Incoming Webhooks" 추가
3. Webhook URL 복사
4. GitHub repo Settings → Secrets and variables → Actions:
   - Name: `SLACK_WEBHOOK_DECK_AUTOMATION`
   - Value: webhook URL

GitHub Action이 release 발행 시 자동으로 채널에 공지합니다.

## FAQ

**Q. Claude가 다른 디자인 시스템과 섞여서 동작합니다.**
A. Project Instructions를 사용하세요. 일반 채팅의 경우 매번 "AWS 스타일로"라고 명시.

**Q. Pretendard 폰트가 PowerPoint에 없으면?**
A. macOS / Windows 모두 [Pretendard 공식](https://github.com/orioncactus/pretendard)에서 무료 설치 가능. 폰트 부재 시 PowerPoint가 자동 substitute하지만 보기에 차이가 큽니다.

**Q. 공식 AWS 로고를 사용하고 싶어요.**
A. AWS 내부에서 받은 공식 SVG가 있다면:
```bash
python skill/scripts/prepare_assets.py --svg /path/to/aws.svg --force
```
SVG가 없으면 placeholder가 사용됩니다 (production에서는 SVG 필수).

**Q. 한국어 스크립트가 어색해요.**
A. `skill/references/speaker_script_guide.md`의 톤 캘리브레이션 섹션을 참고하세요. Claude에게 "더 자연스러운 발표 톤으로 다시 써 줘"라고 요청해도 됩니다.

## 도움 요청

- `#aws-deck-automation` Slack 채널
- GitHub Issues
- 매월 첫째 금요일 14:00 KST 오피스아워
