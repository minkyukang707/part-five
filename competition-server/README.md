# Part Five Arena API

GitHub Pages는 공부 화면과 파일을 전달합니다. 서로 다른 사용자의 초대, 서버 시각, 답안, 점수를 공유하려면 별도의 서버와 데이터베이스가 필요합니다. 영어·일본어·스페인어·터키어·프랑스어 공부 자체와 언어 선택은 기존 정적 사이트에서 계속 동작합니다.

공유 서버는 [Part Five Arena](https://part-five-arena.hummingpixie16.chatgpt.site)에 배포되어 있으며 API 기본 경로는 `/api`입니다. Sites의 Cloudflare Worker와 D1을 사용합니다. GitHub Pages 배포는 화면을 갱신합니다. 이 폴더의 서버 코드를 수정한 경우에는 연결된 Sites 프로젝트 `appgprj_6afd0205227081918486242121a061f2`에도 새 버전을 배포해야 합니다.

## 실행

Node 24 이상에서 외부 패키지 없이 로컬 검증할 수 있습니다.

```powershell
node --test competition-server/arena.test.mjs
node competition-server/local.mjs
```

기본 주소는 `http://127.0.0.1:8790/api/health`입니다. 로컬 SQLite 파일은 `competition-server/.local/arena.sqlite`에 저장되며 Git에서 제외됩니다. `PORT`, `ALLOWED_ORIGINS` 환경변수로 포트와 쉼표로 구분한 허용 웹 출처를 바꿀 수 있습니다. 로컬 서버는 기본적으로 이 PC의 loopback에만 바인딩합니다.

실제 배포는 `worker.js`의 기본 객체 `fetch(request, env)`를 호출하고 `env.DB`에 Cloudflare D1 바인딩을 전달합니다. `schema.sql`을 한 번 적용하거나 동일 테이블을 정의한 `schema.ts`로 Drizzle 마이그레이션을 만듭니다. 원격 마이그레이션은 새 DB 생성 후 배포 과정에서 실행해야 합니다.

프런트엔드 `competition-config.js`의 `window.COMPETITION_CONFIG.apiBase`에 검증한 HTTPS 주소의 `/api` 경로를 설정합니다. 빈 값이면 서버 준비 중 화면이 표시되고 모의 경기나 모의 순위를 만들지 않습니다. 기본 허용 출처는 `https://minkyukang707.github.io`이며 추가 출처는 서버의 `ALLOWED_ORIGINS`에 명시해야 합니다.

## 경기 규칙과 보존

- 공개 게스트 프로필: 서버가 256비트 참가 토큰을 발급하고 DB에는 SHA-256 해시만 저장합니다. 토큰은 이 브라우저에서 30일간 유효합니다. 이름과 완료된 경기 성적은 공개 리더보드에 표시됩니다. 계정 로그인, 기기간 복구, 닉네임 소유 인증은 없습니다.
- 8자리 초대 코드로 같은 언어의 두 사람만 참가합니다. 두 번째 사람이 들어오면 3초 후 시작하고 서버 기준 정확히 90초 동안 진행합니다. 시작 전에는 문제를 보내지 않습니다.
- 같은 방의 두 사람에게 같은 문제와 보기 순서를 제공합니다. 문법과 단어가 번갈아 나오고 정답마다 10점입니다. 장비나 로컬 캐릭터 레벨은 점수에 영향을 주지 않습니다. 영어·프랑스어는 최대 120문항, 일본어·스페인어·터키어는 현재 기초 자료에 맞춰 최대 96문항입니다. 모두 풀면 종료 시각까지 기다립니다.
- 정답과 해설은 채점 전 응답에 포함하지 않습니다. 공개 클라이언트가 보내는 점수 필드는 무시합니다. nonce·문항 순서·시작/마감·최소 답안 간격을 서버에서 검사하고 D1 조건부 UPDATE와 batch로 하나의 답안을 한 번만 반영합니다. 재전송은 이미 저장한 채점 영수증을 반환합니다.
- 종료 결과는 `(room_id, player_id)` 고유 키로 한 번만 확정합니다. 실제 완료 경기만 언어별로 집계하고 승수 → 최고 점수 → 누적 정답 순으로 순위를 표시합니다. 동점은 무승부입니다.
- 기다리는 초대는 15분 뒤 만료됩니다. 진행 중에 브라우저를 닫아도 서버의 90초는 계속 흐르며 다시 열면 이어집니다. 종료 경기의 정답·시도·승패 기록과 공개 이름은 서버에 남습니다. 로컬 참가 정보를 지우거나 30일이 지나 새 게스트로 시작해도 이전 공개 기록은 삭제되지 않습니다.
- 유효한 참가 정보가 있는 동안 ‘공개 경기 기록 삭제’로 본인의 모든 언어 결과와 닉네임을 삭제할 수 있습니다. 상대의 결과는 유지되고 자신의 토큰은 즉시 무효화됩니다. 대기 중이면 초대를 취소하고, 진행 중이면 경기 종료 후 삭제합니다. 삭제한 결과는 과거 경기 재조회로 다시 생성되지 않습니다.

## 보안 범위

이 기능은 친구들과 학습 동기를 높이기 위한 공개 게스트 경쟁입니다. 기존 공개 학습 자료를 재사용하므로 문제 원문 검색, 자동 풀이, 다중 게스트 계정, 지인 간 승수 교환을 완전히 막는 시험 감독 시스템은 아닙니다. 금전 보상이나 신원 인증을 전제로 하지 않습니다. 서버 점수 권한, 마감 시각, 동시 요청과 중복 답안은 검증합니다.

요청 크기는 8 KiB, 답안 간격은 최소 500ms, IP/게스트별 요청량 제한이 있습니다. CORS는 명시한 프런트엔드에만 허용하고 참가 토큰은 Authorization 헤더로 전송합니다. 서버 토큰·DB 관리 키는 정적 프런트엔드에 넣지 않습니다.

## API

| 경로 | 동작 |
|---|---|
| `GET /api/health` | 공개 서비스 상태 |
| `POST /api/session` | `{name}`으로 게스트 발급 |
| `GET /api/session` | 인증한 참가자와 진행 중인 경기 복원 |
| `DELETE /api/session` | 본인의 모든 언어 결과 삭제·닉네임 익명화·토큰 무효화 |
| `POST /api/rooms` | `{language}`로 초대 생성 |
| `POST /api/rooms/join` | `{code, language}`로 참가 |
| `GET /api/rooms/:id` | 참가자만 점수·현재 문제 조회 |
| `POST /api/rooms/:id/answer` | `{nonce, choice}` 서버 채점 |
| `POST /api/rooms/:id/cancel` | 방장이 대기 중 초대 취소 |
| `GET /api/leaderboard?language=en` | 해당 언어 완료 경기 순위 |

인증 경로는 `Authorization: Bearer <token>`을 사용합니다. 사용자의 비밀번호나 이메일을 받지 않습니다. `bank.js`는 공개 학습 자료에서 생성한 서버 전용 빌드 파일이며 `node competition-server/build-bank.cjs`로 다시 만듭니다. 이 파일을 프런트엔드 배포 폴더에 복사하지 마세요.

## 참고한 공식 문서

- [Cloudflare D1 batch와 트랜잭션](https://developers.cloudflare.com/d1/worker-api/d1-database/#batch)
- [Cloudflare D1 제한](https://developers.cloudflare.com/d1/platform/limits/)
- [Node 24 SQLite](https://nodejs.org/download/release/v24.20.0/docs/api/sqlite.html)

확인일: 2026-11-20. 로컬 SQLite 호환 테스트와 실제 D1 배포 검증은 구분합니다. 배포 후 두 브라우저의 초대·정답·마감·리더보드까지 별도로 확인해야 합니다.
