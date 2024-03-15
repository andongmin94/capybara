# 카피바라 프런트엔드

Vue 3와 TypeScript로 구현한 카피바라 사용자 화면입니다. 기본 설정은 모든 화면을 서버 없이 사용하는 가상 데이터 모드이며, 상품·커뮤니티·환율 데이터는 지원 범위 안에서 Real 모드로 전환할 수 있습니다.

## 요구 환경

- Node.js 20.19.x 또는 22.12 이상
- npm 10 이상

## 실행

저장소 루트에서 다음 명령을 실행합니다.

```bash
cd frontend
npm ci
npm run dev
```

`http://localhost:5173`에서 앱을 확인합니다.

## 데이터 모드

### Mock

별도 설정이 없을 때 사용하는 기본 모드입니다.

```dotenv
VITE_DATA_MODE=mock
```

- 가상 금융상품·환율·지점·사용자·게시글 사용
- 백엔드 및 외부 API 요청 없음
- 검색, 상세, 조건 탐색, 찜 상태 변경 재현

### Real

```dotenv
VITE_DATA_MODE=real
VITE_API_BASE_URL=http://127.0.0.1:8000
```

- 상품 목록·상세·조건 탐색은 Django 금융상품 API를 사용합니다.
- 환율 계산은 외부 환율 조회 API를 사용합니다.
- 커뮤니티는 Django 인증 토큰이 브라우저에 저장된 경우 목록·상세·작성·댓글을 연동합니다.
- 가상 계정 화면과 가상 지점 지도는 Mock 모드용이며 Real 로그인 UI와 실제 지점 공급자는 제공하지 않습니다.

백엔드 환경, 인증 토큰 연결과 실행 순서는 [루트 README의 실행 방법](../README.md#실행-방법)을 참고합니다.

## 주요 경로

| 경로 | 기능 |
| --- | --- |
| `/#/` | 홈 |
| `/#/interest` | 상품 검색·필터 |
| `/#/interestDetail/:id` | 상품 코드로 상세 조회·옵션 찜 |
| `/#/algorithm` | 조건 기반 상품 탐색 |
| `/#/algorithmresult` | 입력 조건에 따른 상위 3개 결과 |
| `/#/cart` | 찜한 옵션 비교 |
| `/#/exchange` | 환율 계산 |
| `/#/map` | 은행 지점 찾기 |
| `/#/article` | 커뮤니티 |

상품 검색 상태는 `q`, `bank`, `term` query에 저장됩니다. 조건 탐색 결과는 `term`, `priority`, `channel`, 지점 검색은 `province`, `city`, `bank` query를 사용합니다. 상세 화면은 상품 코드를 route에서 읽으므로 새로고침과 직접 접근이 가능합니다.

## 검증

```bash
npm run lint
npm run type-check
npm run test
npm run build
npm run preview
```

브라우저 확인 항목:

- Mock 모드에서 외부 네트워크 요청이 발생하지 않는지
- 검색어·금융회사·기간이 URL과 양방향으로 동기화되는지
- 상세 URL을 직접 열고 새로고침해도 상품 정보가 유지되는지
- 같은 탐색 조건이 같은 결과를 반환하는지
- 찜 추가·중복 방지·삭제와 새로고침 후 복원이 동작하는지
- 정적 자산 404와 콘솔 오류가 없는지
