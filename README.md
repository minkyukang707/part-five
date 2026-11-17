# Part Five

[영어 공부 시작하기](https://minkyukang707.github.io/part-five/)

객관식 문법 문제와 오답 복습으로 몬스터와 대결합니다. 단어장은 3,000개 단어를 30개씩 연습하고, Writing에서는 작성한 문장의 문법과 어휘를 한국어로 검토합니다. GPT나 API 키 없이 작동합니다.

진도, 장비, 골드, 단어 학습 기록과 Writing 초안은 사용 중인 브라우저에 저장됩니다. 브라우저의 사이트 데이터를 지우면 기록도 삭제됩니다. 첫 방문 때 기본 학습 자료를 저장하고, Writing 검사기는 처음 피드백을 요청할 때 내려받습니다.

오른쪽 위 **캐릭터 설정**에서 이름과 남자·여자 기사를 고를 수 있습니다. 저장한 뒤에는 같은 위치의 이름을 눌러 다시 편집합니다. 캐릭터 변경은 장비와 전투 진도를 유지합니다. 게임·공부 진도 초기화도 이 설정 창에서 이용할 수 있습니다.

## 수정과 배포

학습 화면과 데이터는 `site/`, 문장 수집기와 정적 사이트 빌드는 `scripts/`에 있습니다. Node.js 22 이상에서 다음 명령으로 확인할 수 있습니다.

```sh
node scripts/check.cjs
node scripts/build.cjs
python -m http.server 8000 --directory dist
```

브라우저에서 `http://localhost:8000/`을 엽니다. `main`에 푸시하면 GitHub Actions에서 검증과 Pages 배포를 수행합니다. 저장소의 **Settings → Pages → Source**는 **GitHub Actions**입니다.

## 온라인 문제

GitHub Actions가 매일 Europe PMC 공개 논문, NASA 뉴스, Tatoeba/ManyThings 문장 자료를 확인합니다. Tatoeba 언어 팩은 매일 돌아가면서 처리합니다. 새 문제는 출처를 붙이고 중복을 제거해 누적합니다. 방문자는 **새 문장 받기**로 최신 문제를 내려받을 수 있습니다. 자동 받기가 켜져 있으면 사이트를 열 때도 갱신합니다.

즉시 갱신하려면 **Actions → Part Five Pages → Run workflow**에서 **Refresh the sentence library**를 선택합니다. 자료별 출처와 라이선스는 [학습 자료 고지](site/notices/learning-data.txt)에 수록했습니다.
