# A/B test
* * *

## 😀 Project Description

### ⭐️ A/B test
- A/B test란 실사용자를 대상으로 실험군과 대조군으로 나누어서 어떤 특정한 UI를 비교하는 방법으로, 웹사이트로 예를 들면 빨간 버튼(실험군)과 파란 버튼(대조군)을 비교하여 어떤 버튼이 더 선호되는지를 비교하는 테스트입니다.

### 🤔 A/B test를 기획하게 된 이유!
- 본 프로젝트를 기획하면서 "개발자들이 만드는 웹사이트의 UI에 있어서 실사용자들이 선호하는 부분들을 데이터로 만들어 분석해서 보여주는 tool을 만들어 실시간 사용자들에 대한 데이터를 분석하여 시각화함으로써 개발자로서 개발자들에게 도움을 줄 수 있는 사이트를 만들어 보자" 라는 생각으로 A/B test를 기획하고 만들어보게 되었습니다.

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

<details>
<summary><span style="font-size:23px">로그인하지 않은 경우 Home 페이지</span></summary>
<div markdown="1">

![login](/readme_assets/login.png)

- 구글 계정으로 로그인 할 수 있습니다.
- 만약 기존에 가입되어있지 않은 유저가 로그인을 시도한 경우 회원가입과 동시에 자동으로 로그인 됩니다.
</div>
</details>

<details>
<summary><span style="font-size:23px">로그인되어있는 경우 Home 페이지</span></summary>
<div markdown="1">

![Home](/readme_assets/mainpage.png)

- 구글 계정으로 로그인하고 나면 project 등록 버튼과 my page 버튼이 나타나게됩니다.
- 상단 topbar에도 로그인을 한 경우에 이동할 수 있는 목록들이 나타납니다.
</div>
</details>

<details>
<summary><span style="font-size:23px">Project 등록 페이지</span></summary>
<div markdown="1">

![Home](/readme_assets/register-project.png)

- Starting project 버튼이나 상단에 Register를 누르게 되면 프로젝트를 등록할 수 있는 모달창이 뜨게 됩니다.
- 빈칸입력시 알림창이 뜨고, 입력을 한 뒤 등록버튼을 누르면 프로젝트가 생성됩니다.
- 등록하기를 원하지 않는다면 취소 버튼이나 바깥 화면을 클릭하게 되면 Home 페이지로 돌아가게 됩니다.
</div>
</details>

<details>
<summary><span style="font-size:23px">User 페이지</span></summary>
<div markdown="1">

![Home](/readme_assets/userpage.png)

- My page 버튼을 클릭하거나 상단의 My page 메뉴를 누르게 된다면 유저가 등록한 프로젝트 리스트를 볼 수 있는 페이지로 이동하게 됩니다.
- Delete 버튼을 누르면 프로젝트를 삭제할 수 있습니다. (프로젝트를 삭제하게 된다면 프로젝트 안에 등록한 테스트 URL 목록들 및 데이터들이 모두 삭제가 됩니다.)
- View Result 버튼을 누르면 해당 테스트하는 url들에 대한 분석 데이터를 시각화하여 보여주는 결과 페이지로 이동하게 됩니다.
- 프로젝트 이름을 클릭하여 test url을 등록할 수 있는 페이지로 이동할 수 있습니다.
- Back 버튼을 누르면 Home 페이지로 이동하게 됩니다.
</div>
</details>

<details>
<summary><span style="font-size:23px">Test 등록 페이지</span></summary>
<div markdown="1">

![Home](/readme_assets/register-test.png)

- 유저가 Test URL을 등록한 목록을 볼 수 있고, 또는 등록할 수 있습니다.
- Delete 버튼을 누르면 해당 URL을 삭제할 수 있습니다. (URL을 삭제하게 된다면 해당 URL에서 얻은 데이터들이 모두 삭제가 됩니다.)
- Script을 누르면 테스트할 웹페이지 html에 입력할 수 있는 script 코드를 확인할 수 있는 모달창이 나타나게 됩니다.
- Screen shot을 누르면 해당 웹페이지에서 발생한 click 위치를 표시해주는 screenshot이 뜨는 페이지로 이동하게 됩니다.
- Back 버튼을 누르면 프로젝트 목록 페이지로 이동하게됩니다.
</div>
</details>

<details>
<summary><span style="font-size:23px">Screen shot 페이지</span></summary>
<div markdown="1">

![Home](/readme_assets/screenshot.png)

- 유저가 테스트하는 해당 웹페이지에서 발생한 실시간 사용자들이 클릭한 위치를 표시해주는 screenshot 페이지입니다.
</div>
</details>

<details>
<summary><span style="font-size:23px">Result 페이지</span></summary>
<div markdown="1">

<!-- ![Home](/readme_assets/screenshot.png) -->

- 유저가 테스트하는 해당 웹페이지에서 발생한 데이터들을 수집해 시각화해서 결과를 보여주는 페이지입니다.
- 보여주는 데이터는
  - 방문 횟수
  - 재방문 횟수
  - 유입경로 (Chrome 인지 Firefox 인지...등)
  - 모바일인지 데스크탑인지에 대한 분석
  - 사용자들의 접속 시간 분석
</div>
</details>

* * *

# 📅 프로젝트 스케쥴

## 1주차 (6.27 ~ 7.3)

### 프로젝트 기획 및 기술 검증

- 아이디어 수집 및 선정
- [Mock up](https://www.notion.so/Mock-up-31d53710218e48f0b56778c95a153464)
- [API Docs](https://www.notion.so/API-Docs-3f3d6756cb0c4113a03ac9f2873cfb6c)
- [DB Schema modeling](https://www.notion.so/DB-Schema-modeling-eae00705d277467fab04a76089f8c7ae)
- 기술 검증
- Tech Stack 정하기
- 칸반 작성

## 2주차 (7.4 ~ 7.10)

- 프로젝트 기능 구현

## 3주차 (7.11 ~ 7.15)

- 프로젝트 리펙토링
- 배포
- UI

* * *

# 😃 소감

## 😭 Challenge
-

## 🙇 프로젝트 소감

- 아쉬운점

    프로젝트를 하며 제가 부족하거나 몰랐던 부분들에 대해서 많이 배울 수 있어서 좋은 경험이 되었고, 아쉬운 점은 새로운 상태관리 recoil에 대해 써봤지만 깊게 써보지 못했다는 것이고, react-query와 같이 사용하는 것으로 알고 있는데 이러한 부분도 같이 적용시켜봤으면 좋았을 것 같다는 생각이 들었습니다.

    그리고 완성도 있는 프로젝트를 만들고 싶다는 욕심이 있었기때문에 제 실력이 조금 더 좋고, 개념이나 흐름 등에 대해 더 잘 알고 있었다면 어땠을까 하는 아쉬움이 있었습니다.

    마지막으로 기능 구현을 위주로 하다보니 깔끔하고 가독성 좋은 코드를 작성하려고 최대한 신경을 썼지만, 올바르게 썼는지, 어떤 부분들을 더 깔끔하게 작성할 수 있는지에 대한 부분들이 아직 명확하지 않아 로직이 깔끔하지 않은 것 같습니다.

- 소감

    바닐라 부트캠프에서 과제를 하며 배우는 도중에 들은 말인데, “개인 프로젝트를 하게되면 팀 프로젝트가 더 좋았다는 것을 알게 될 거다”라는 이 말이 크게 와닿았습니다.

    팀 프로젝트를 하면 팀원들과 소통을 할 수 있기때문에 문제해결이나 계획에 대해 보다 원활하게 진행할 수 있지만, 개인 프로젝트는 하나부터 열까지 모두 다 개인 스스로 계획 및 기획, 기능 개발, 리팩토링, css, 문제 해결 등 모든 부분들을 혼자 헤쳐 나가야하기 때문입니다.

    이런 부분들을 시작 전부터 생각해야 되고 자꾸 생각하다 보니 부담감이 더욱 커지고 과연 “내 실력으로 프로젝트를 시작부터 끝까지 잘 마무리할 수 있을까?” 라는 의구심이 들고 저 자신이 많이 위축되었지만, 켄님의 조언과 성장하는 과정에서는 당연한 부분이라고, 그리고 최대한 계획한 부분까지라도 완성시켜보자는 생각으로 저 자신을 매일매일 다독이며 계획대로 끝내기 위해 열심히 한 결과, 지금까지 올 수 있었던 것 같고, 마음가짐의 중요성에 대해 알게 되는 좋은 경험이였습니다.

    또한 이번 개인 프로젝트를 통해 보다 좋은 개발자가 되기 위해서는 개발 실력도 중요하지만 전반적인 개발 흐름에 대해서 잘 알고 적재적소 사용할 줄 알아야 하고, 문제해결을 위해 끊임없이 파고들어야 하는 자세를 가져야 한다는 것을 알게 되었습니다.
