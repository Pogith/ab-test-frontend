# A/B test
* * *

## Project Description

- A/B test란 실사용자를 대상으로 실험군과 대조군으로 나누어서 어떤 특정한 UI를 비교하는 방법으로, 웹사이트로 예를 들면 빨간 버튼(실험군)과 파란 버튼(대조군)을 비교하여 어떤 버튼이 더 선호되는지를 비교하는 테스트입니다.

- 본 프로젝트를 기획하면서 "개발자들이 만드는 웹사이트의 UI에 있어서 실사용자들이 선호하는 부분들을 데이터로 만들어 분석해서 보여주는 tool을 만들어 개발자로서 개발자들에게 도움을 줄 수 있는 사이트를 만들어 보자" 라는 생각으로 A/B test를 기획하고 만들어보게 되었습니다.

- 개인이나 기업에서 개발하는 웹사이트를 유저가 제 웹사이트에 등록하여 script src 태그를 발급 받은 후, 유저의 웹 사이트에 발급받은 script tag를 작성해 넣으면 해당 웹사이트에서 발생하는 이벤트들(방문 횟수, 재방문 횟수, 유입경로(chrome or firefox...), desktop인지 mobile인지, 유입시간대)에 대한 정보들을 서버에 저장하여 데이터를 분석해주는 사이트입니다.

- [A/B test 사이트 이동하기](https://ab-test-tool.netlify.app/)
- 구글 크롬 환경에서는 원활하게 작동합니다.

* * *

# ⚙️ Teck Stack

## Frontend
- React
- Recoil
- D3.js
- Firebase
- SCSS

## Backend
- Node.js
- Express
- Firebase-admin
- Mongoose
- MongoDB

* * *

# How to use

## Frontend

### Installation

```sh
git clone https://github.com/Pogith/ab-test-frontend.git

npm install
```

### Development

```sh
npm start
```

### 환경변수 설정
- 프로젝트 폴더 root 위치에 .env 파일을 만들고 다음과 같이 환경변수를 설정해주셔야합니다.

- firebase 로그인을 위해 필요한 환경변수입니다.

```sh
REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID
```

- server에게 fetch 요청을 보내기 위해 필요한 환경변수입니다.

```sh
REACT_APP_SERVER_URL
```

## Backend

### Installation

```sh
git clone https://github.com/Pogith/ab-test-backend.git

npm install

npm install nodemon -D
```

### Development

```sh
npm run dev
```

### 환경변수 설정
- 프로젝트 폴더 root 위치에 .env 파일을 만들고 다음과 같이 환경변수를 설정해주셔야합니다.

- mongoDB 접속을 위해 필요한 환경변수입니다.

```sh
MONGODB_URL = "mongodb atlas 주소 입력하기"
```

- firebase 로그인을 위해 필요한 환경변수입니다.

```sh
SERVICE_SECRET_KEY = "firebase-admin 환경변수"
```

- server PORT입니다.
```sh
PORT = "서버 PORT"
```

* * *

# 🛠 Description(기능)
