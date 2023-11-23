# 카피바라

<!-- 여기 메인 이미지 넣기 -->

### 📓 프로젝트 개요
- 설명 : 예금 상품 조회 및 추천 서비스
- 기간 : 2023.11.15(수) ~ 2023.11.24(금)


### 🦝 서비스 특징

- MBTI 성격 유형에 기반하여 알맞은 상품을 추천함
- 유저 경험(UX)을 우선하여 로그인없이 대부분의 서비스 제공
 

### ⚙ 주요 기능

- 실시간 환율 계산기
- 지도에서 은행 지점 정보 제공
- MBTI 성격 유형에 따른 예금 상품 추천 알고리즘
- 시중 은행의 예금 상품 및 옵션에 따른 금리 조회
- 관심있는 상품과 옵션 모아보기 및 비교 차트 제공
- 다른 사용자와 금융 이야기를 나눌 수 있는 커뮤니티 게시판


### 🦾 팀 소개 
- **김상훈** : 팀장, Django를 활용한 BackEnd 개발, ERD 설계, 코드 품질 관리 및 리팩토링, 환율 계산, 추천 알고리즘 개발, BackEnd 배포

- **김지연** : Vue.js를 활용한 FrontEnd 개발, UI 디자인, 지도 검색, FrontEnd 배포, 서비스 테스트 및 디버깅

<br/>

## 🛒 기술 스택

### Frontend
![Vue.js](https://img.shields.io/badge/vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)&nbsp;
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)&nbsp;
![Html5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)&nbsp;
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)&nbsp;
![Vuetify](https://img.shields.io/badge/Vuetify-1867C0?style=for-the-badge&logo=vuetify&logoColor=white)&nbsp;
![sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)&nbsp;
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)&nbsp;

### Backend
![Python](https://img.shields.io/badge/Python-3776AB.svg?style=for-the-badge&logo=python&logoColor=white)&nbsp;
![Django](https://img.shields.io/badge/Django-092E20.svg?style=for-the-badge&logo=django&logoColor=white)&nbsp;
![sqlite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=nodedotjs&logoColor=white)&nbsp;

### DevOps
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)&nbsp;
![GitLab](https://img.shields.io/badge/GitLab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white)&nbsp;
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)&nbsp;
![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)&nbsp;
![Amazon EC2](https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white)&nbsp;

### Tools
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)&nbsp;
![VS code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)&nbsp;
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)&nbsp;

<br />

## 개발 환경

🔧 **Backend**


🔧 **Frontend**


🔧 **CI/CD**


🔧 **DB**


<br/>

## 💿 프로젝트 폴더 구조

- Frontend - Vue.js
```
frontend
├─public
└─src
    ├─assets
    ├─components
    ├─router
    ├─stores
    └─views
        ├─accounts
        ├─algorithm
        ├─articles
        ├─etc
        └─finances
```
- Backend - Django
```
backend
├─accounts
├─api
├─articles
└─finlife
```

<br/>

## 🖨 ERD

<!-- erd 이미지 넣기 -->


### 🖱 코드 컨벤션

<details>
<summary><b>명명법</b></summary> 

- 프론트엔드
    - 변수명, 메서드명
        - `camelCase`
    - HTML 템플릿
        - `kebab-case`
    - CSS 클래스
        - 고유한 클래스명 부여하여 부모 컴포넌트 내의 속성 상속을 방지
    - 의미없는 변수명 사용 지양

- 백엔드
    - 클래스명
        - `PascalCase`
    - 함수명
        - `snake_case`
    - 의미없는 변수명 사용 지양
</details>

<br/>

## 🔈 기능 상세 설명
### 메인페이지
- carousel slide 이미지를 통해 사용자 니즈에 따른 서비스 내용을 직관적으로 설명
- 주요 기능 링크를 내비게이션 바 및 이미지 위 버튼으로 제공
   
### MBTI 상품추천 페이지
- 사용자의 MBTI 입력 값에 따라 서로 다른 예금 상품 추천
- 상품 상세 페이지로 이동해 옵션 찜하기 기능까지 연결
- 추천 결과를 브라우저 단에 저장하여 페이지 이탈 후에도 다시 조회가 가능
- 로그인하지 않아도 참여가 가능하게 만들어 서비스 유입량 향상

### 예적금 상품 조회
- 시중 은행의 예금 상품과 그에 따른 옵션 정보 제공
- 예금 상품에 대한 자세한 설명 제공하여 사용자가 한 페이지 내에서 비교 가능하게 함
- 관심있는 상품에 대한 상세 조회 시 기간에 따른 옵션, 저축 금리 및 최대 금리 정보 제공
- 비교를 원하는 상품 옵션을 찜하면 모아볼 수 있는 페이지 제공
- 관심 상품들의 금리를 차트로 도형화하여 직관적인 정보 전달
- 관심 상품 목록은 브라우저단에 저장하여 페이지 이탈 후에도 유지됨
- 로그인하지 않은 사용자도 이용 가능하여 사용자 편의성 증대

### 커뮤니티 게시판
- 카피바라 회원들 간의 금융 지식 공유가 가능한 공간
- 댓글 기능을 통해 의견을 나눌 수 있음
- 로그인한 사용자만 조회와 게시가 가능하여 exclusive한 경험 제공
  
### 환율계산기
- 출발 통화와 도착 통화를 선택하면 실시간 환율 정보 제공
- 사용자가 환전하고자하는 금액 입력 시 예상 환전 금액 제공

### 주변 은행 지도
- 지역과 은행 선택시 해당 지역 및 인근 지역의 은행 지점 정보 제공
- 찾고자 하는 은행만 선택시 전국의 은행 지점 표출

### 회원 페이지
- 회원 가입을 통해 닉네임을 설정하고 커뮤니티 게시판 사용이 가능
- 회원정보 조회 및 수정, 비밀번호 변경, 로그아웃 기능 포함


## 📃 문서

[💻Notion](https://bustling-trade-bc8.notion.site/project-edee400fdbb84c5ebda96cba3ada5c77?pvs=4)
