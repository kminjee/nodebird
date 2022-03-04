# React NodeBird SNS
<div align="center">
  <img src="https://user-images.githubusercontent.com/86812090/156683151-2c43d0d9-2586-4645-95f1-d5d9e7074b38.png" width="200"/>
</div>
<br/>

트위터 비슷한 SNS 만들기로 Zerocho님의 강의를 보고 만든 프로젝트입니다. React를 기반으로한 웹 어플리케이션으로 NextJs 프레임워크로 SSR을 구현해보고 Redux-saga 미들웨어로 비동기처리를 하였습니다.

<br/>

<!-- -------------------------------------------------------------------------------------------------------------------------------- -->

## 사용기술
`front`
* React
* Next.js
* Redux & Redux-saga
* immer
* Faker / Shortid
* Moment.js
* Styled Components
* Ant Design

`back`
* Node.js
* Sequelize - MYSQL
* Passport
* Bcrypt


<br/>

<!-- -------------------------------------------------------------------------------------------------------------------------------- -->

## 서비스기능
* 회원가입
* 로그인 및 로그아웃
* 프로필
* 게시글 등록 및 삭제
* 팔로우 및 언팔로우
* 댓글
* 좋아요
* 리트윗
* 이미지 업로드(미리보기) 및 상세보기
* 인피니트 스크롤링

<br/>

<!-- -------------------------------------------------------------------------------------------------------------------------------- -->

## 프로젝트를 통해 배운것

### 📑 Front-end 📑
#### 🔸 Redux 
리액트는 단방향 데이터 흐름이 특징이다. 개발을 하다보면 여러 컴포넌트들에서 공통적으로 쓰이는 데이터들이 있는데 예를 들어 로그인한 유저의 정보를 다른 컴포넌트에서도 사용해야 하는 경우다. 컴포넌트가 분리되어 있으면 데이터들도 흩어져있기 마련인데 이런 경우 컴포넌트 간에 데이터를 전달하려면 부모컴포넌트의 부모컴포넌트의 자식컴포넌트의 자식컴포넌트의...복잡하게 데이터를 전달해야하는 번거로움이 생긴다. 데이터들을 흩어지게 하려면 부모컴포넌트를 하나만 두어서 부모컴포넌트가 데이터를 각 컴포넌트에게 전달하는 것이 좋다. 리덕스는 중앙에서 데이터를 관리하고 컴포넌트들은 필요할 때마다 데이터를 가져다 쓸수 있도록 제공하고 있다. <br/><br/>
단점은 store에 있는 각 다른 데이터를 변경하고자 할 때 매번 action과 reducer도 만들어주어야해서 코드량이 많아진다. 하지만 그럼에도 redux는 그것들이 히스토리가 된다는 장점이 있다. action 하나 하나가 기록이 되면서 내가 어떤 데이터를 어떻게 바꿔왔는지 추적이 가능해서 버그를 잡을 때 매우 편리하다. 크롬의 확장 프로그램인 redux-devtool로 문제점을 쉽게 파악할 수있다.

#### 🔸 Redux-thunk
리덕스 미들웨어 중 하나로 비동기 작업을 다루고 객체가 아닌 함수를 반환할 수 있게 해준다. 즉 객체가 아닌 함수를 반환함으로써 필요할 때 함수를 호출할 수 있는 형태가 된다. 
아래 사진은 액션이 디스패치 되는 것들을 로깅할 수 있는 미들웨워다.

<img src="https://user-images.githubusercontent.com/86812090/156685865-86eb564b-c77a-4310-88ac-bdc546ab6e6d.jpg" width="500" />

#### 🔸 Redux-saga
리덕스 미들웨어로 thunk보다 많이 쓰이며 제너레이터를 사용하여 yield를 통해 순차적인 처리를 하고 액션리스너로 상태관리하기에 매우 좋다. thunk는 딜레이 실행의 경우 직접 구현해야하는 불편함이 있지만 사가는 이 기능을 지원하고 있어 사용이 편리하다.

<img src="https://user-images.githubusercontent.com/86812090/156191560-d3111feb-397f-4db3-98c3-b0fed91ffce2.jpg" width="400" /> <img src="https://user-images.githubusercontent.com/86812090/156701522-1c64b389-f183-4022-a5a0-c346809df7ab.jpg" width="400"/>

#### 🔸 Custom Hook 
useState와 changehendler함수를 합쳐 기존 hook을 커스텀할 수있다. 헨들러가 필요할 때마다 useState를 만들고 함수를 만들어야하는 번거로움을 공통 hook처럼 만들어 아래 사진처럼 useInput을 호출함과 동시에 props로 초기값을 전달하고 setter에 onChange함수를 전달해서 useInput에 value값을 할당하고 반환할 수 있다.

<img src="https://user-images.githubusercontent.com/86812090/156198113-38ef6a7f-262b-4734-8df5-3a3266e9abba.jpg" width="400"/> <img src="https://user-images.githubusercontent.com/86812090/156198109-adf8e43e-d12a-40fc-a5c2-d334500e506b.jpg" width="400"/>

#### 🔸 Immer
기존에는 ...state로 이전 상태값을 참조하여 불변성을 지키면서 새로운 상태로 만들어내야 했는데 그로 인해 길어지고 가독성이 떨어졌는데 알아서 불변성을 지켜주면서 다음 상태로 만들어준다는 immer를 통해 쉽게 관리할 수 있다.

<img src="https://user-images.githubusercontent.com/86812090/155526502-79f1e625-0266-4ad0-b4fb-5e9b1d2de054.jpg" width="450"/> <img src="https://user-images.githubusercontent.com/86812090/155525933-02f5899a-192e-4831-b076-9dacc91150ea.jpg" width="450"/>

#### 🔸 ShortId / Faker
백엔드 구현 전에 미리 더미데이터를 활용해서 크게 구별되는 테이블은 대문자로 구별하여 객체를 만들고 연결된 테이블에도 객체 안에서 객체를 만들어 연결해주는 방식으로 진행하였고 안에 소문자는 테이블 컬럼을 뜻한다. 여기서 스크롤링이나 페이지네이션 같은 많은 양의 데이터를 필요로 할 때 일일히 입력해야하는 번거로움을 shortId로 새 id값을 생성하고 faker를 통해 랜덤으로 데이터를 만들수 있고 또 Saga에서 delay 이펙트를 통해 백엔드가 비동기 처리 작업을 하는 것 같은 효과를 줄 수 있다.

<img src="https://user-images.githubusercontent.com/86812090/155551839-1809b3de-e41e-410d-acc9-2e2e3b7b83f1.jpg" width="450"/>

#### 🔸 SSG(Server Site Generation) & SSR(Server Side Rendering)
* SSG는 정적 생성으로 빌드 시간에 맞춰 서버에서 컴포넌트를 미리 렌더링한다. 사용자는 페이지에 들어왔을 때 데이터가 업데이트 되지 않은 상태여도 UI를 미리 볼 수 있다. 페이지가 렌더링 될 때 서버에서 해당 컴포넌트를 렌더링 함으로써 사용자는 미리 HTML을 볼 수 있는데 만약 useEffect()로 데이터를 불러고오 있다면 데이터를 모두 받아오기 전까진 로딩화면을 먼저 보게끔 할 수 있다.

* SSR은 서버 측 렌더링으로 서버에서 HTML을 미리 만들고 필요한 데이터까지 모두 삽입한 후에 완벽한 페이지를 렌더링하는 방식이다. 클라이언트에 요청한 것들을 실행시키고 응답하는데까지 시간이 소요되기 때문에 사용자는 페이지를 들어왔을 때 UI도 보이지 않는 빈 화면의 상태를 보게 된다. 하지만 데이터는 모두 최신 상태가 된다. getServerSideProps function을 이용해 서버 측에 데이터 요청을 하고 응답 받은 데이터를 해당 컴포넌트 props로 전달하여 미리 렌더링된 HTML에 데이터까지 완벽하게 삽입한 후에 사용자에게 보여준다.<br/><br/>
브라우저가 프론트에게 /main 이라는 페이지를 요청하면 프론트는 백엔드에게 /main에 대한 데이터를 요청한다. 백엔드는 DB에 데이터를 요청하고 받은 데이터를 다시 프론트에게 전달한다. 그리고 프론트가 브라우저에게 데이터를 전달해주면서 데이터와 HTML을 합친다. <br/><br/>
반면 CSR(Client Side Rendering)은 브라우저가 프론트에게 /main 페이지를 요청하면 프론트는 브라우저에게 HTML/CSS/JS/Image를 전달한다. 다시 브라우저는 백엔드에게 데이터를 요청하는데 그 동안에 브라우저에 로딩화면을 띄우고 백엔드는 DB에 데이터를 요청하고 받은 데이터를 다시 브라우저에게 전달한다.

#### 🔸 state의 불변성
객체의 개념을 잘 알아두어야 한다. 객체는 생성할 때마다 새로운 값이다. 객체와 객체를 비교하면 다른 대상이므로 false가 나오고 하나의 객체를 참조하는 경우에는 true이다. 리듀서에서 예를 들 수 있다. return에서 {}는 객체를 말한다. 즉, 리턴할 때마다 새로운 객체를 생성하는 것인데 기존의 state값을 그대로 참조하고 바꾸고 싶은 데이터만 변경해서 새 객체를 만든다. 그리고 새로운 객체로 리턴해야 하는 이유는 객체를 새로 만들어야 변경 내역들이 추적이 가능하다. 객체가 서로 다른 경우에는 이전 기록과 현재 기록이 모두 남게되는데 참조된 데이터를 변경하게 되면 결과를 찍었을 때 이전 데이터가 남지 않는다. 또 state를 참조하는 이유는 코드량이 길어지지 않는 이유도 있지만 메모리를 아끼기 위해서다.

<img src="https://user-images.githubusercontent.com/86812090/156204297-f33bf61d-35c9-4fb4-b75c-30e95b98fd08.jpg" width="200"/> <img src="https://user-images.githubusercontent.com/86812090/156204302-132c4a0a-62fe-4969-ab4b-1c36b8162df9.jpg" width="300"/>

#### 🔸 SWR
리덕스와 같이 모든 상태관리를 하고 비동기 작업을 도와주는 Hooks 라이브러리이다. 리덕스에서 매번 액션을 만들어주면서 길어지는 코드로 인해 복잡해진 구조를 간단하게 만들 수 있다. 

<br/>

### 📑 Back-end 📑
#### 🔸 Node.js
Node.js는 서버가 아니다. V8엔진을 사용한 자바스크립트 런타임이다. 노드를 통해 다양한 자바스크립트 앱을 실행할 수 있으며 서버를 실행하는 데 가장 많이 사용된다. Node에서 제공하는 HTTP모듈이 서버역할을 해주고 웹 서버에서 별도의 소프트웨어 없이 동작이 가능하다. 이 프로젝트에서는 clinent의 사가에서 axios로 API 주소를 통해 요청한 데이터를 받아 그에 대한 응답을 한다. 여러개의 데이터가 필요한 경우 한번 요청 보낸 것을 여러개의 데이터로 묶어서 보내거나 또는 요청을 여러번 보내서 각각 응답을 보낸다. 

#### 🔸 Sequelize
자바스크립트로 MySql 데이터베이스를 조작할 수 있으며 자바스크립트가 알아서 SQL로 바꿔준다. $ npm i sequelize sequelize-cli mysql2 은 Node.js와 MySql을 연결해주는 드라이버로 필수로 설치해야 한다. 시퀄라이즈에서는 테이블을 모델이라고 부르고 자바스크립트에서 모델명을 단수로 입력하면 DB에서 복수형태로 변환된다. 모델 간에 관계 설정을 위해 ( 1:1 / 1:n / n:m ) 잘 따져보고 연결을 하는데 그 때 두 모델 사이에 관계테이블이 하나 생성되는데 검색할 때 매우 편리하다.

<img src="https://user-images.githubusercontent.com/86812090/156697091-8bb88f48-c050-4bb7-8ee5-c7308db59eef.png"  width="" />

#### 🔸 Passport
패스포트는 클라이언트가 서버에 요청할 자격이 있는지 인증할 때 사용하는 미들웨어다. 카카오/구글/페이스북 등 다양한 로그인들을 한번에 관리할 수 있다. passport에는 serializeUser와 deserializeUser메서드가 존재하는데 serializeUser에는 유저의 고유 id값을 저장하고 로그인 시 단 한번만 실행이 된다. 그 반대인 deserializeUser에는 페이지를 이동할 때마다 저장된 id값을 통해 유저 정보를 조회한다. 또 isAuthenticated를 제공하는데 isAuthenticated가 true일 땐 로그인 한 상태를 의미한다.

#### 🔸 CORS
서버는 browser/client/server/database 로 구성되어 있는데, browser와 client는 도메인이 동일하고 server, database는 도메인이 다르다. 이 때 브라우저가 서버로 요청을 보낼 때 cors 에러가 발생하는데 같은 도메인일 때는 에러가 없지만 다른 도메인일 때는 보낼 수 없도록 되어있다. 그래서 cors 미들웨어를 통해 client에서 server의 도메인을 연결해서 브라우저는 클라이언트에게 요청을, 클라이언트는 서버에게 요청을 보내면서 응답하는 방식으로 해결할 수 있다. 이 방식을 proxy 방식이라고 한다.

#### 🔸 Credentials 
Credentials는 쿠키를 공유할 때 사용한다. 도메인/서버가 다르면 쿠키를 전달할 수 없는데 다른 도메인/서버 간에 쿠키를 전달할 수 있도록 해주는 역할을 한다. 단 기본값은 false로 전달할 수 없는 상태고 서로 공유하기를 원하면 credentials를 true로 바꿔준다. 여기서 중요한 것은 credentials를 true로 바꿔주고 access-control-allow-origin을 모두 허용하도록 해놓는다면 보안상 위험하기 때문에 access-control-allow-origin를 true로 설정하거나 localhost의 주소를 정확하게 적어주어야 한다.

#### 🔸 Multer
이미지 업로드를 구현할 때 사용한다. 일반적으로 클라이언트가 서버로 데이터를 보낼 때 서버에서는 json, urlencoded 형식으로만 받도록 되어있다. json은 axios로 데이터를 보낼 때 쓰이고 urlencoded는 일반 form을 보낼 때 받아진다. 보통 이미지, 비디오는 multipart 데이터로 올라간다. 프로젝트에서도 이미지가 multipart/form-data 형식으로 되어있어 서버에서 이 형식을 그대로 받기 위해 multer 미들웨어를 설치한다. 

#### 🔸 Query String
쿼리스트링은 주소만 봐도 데이터가 담겨있어서 주소를 캐싱하면 그 데이터까지 같이 캐싱이 된다. 단 post/put/patch는 데이터 캐싱이 되지 않는다. 사용 방법은 express의 API인 req.query와 req.params가 있는데 params는 url에 경로가 있으면 그 속성으로 값을 가져온다. (예_ /:postId/retweet = req.params.postId로 데이터 추출) qeury는 url주소의 쿼리 값을 가져온다. (예_localhost:3000/user/posts?lastId=10 = req.query.lastId) 

#### 🔸 REST API 와 RESTful API
REST는 CRUD를 수행하기 위해 URI로 메소드와 함께 요청을 보내고 응답하는 네트워크 상의 클라이언트와 서버 사이의 통신 방식 중 하나다. REST API는 운영체제나 프로그래밍 언어가 제공하는 기능을 제어할 수 있게 만든 인터페이스이고 REST의 특징을 기반으로한 API다. 각 요청이 어떤 동작이나 정보를 위한 것인지를 요청한 모습 자체로도 해석이 가능하다는 특징이 있다. RESTful API는 REST의 설계 규칙을 잘 지킨 API이다. 

<br/>

<!-- -------------------------------------------------------------------------------------------------------------------------------- -->

## 미리보기

### 이미지 상세보기
<img src="https://user-images.githubusercontent.com/86812090/155520920-aed49d1d-acb6-48b6-b460-5b5492ff6830.gif" width="600" height="600"/>

<br/>

### 인피니트 스크롤링
<img src="https://user-images.githubusercontent.com/86812090/155521122-e194cf1e-2151-422d-9493-4f8e06423248.gif" width="600" height="600"/>

<br/>

### 팔로우/언팔로우
<img src="https://user-images.githubusercontent.com/86812090/156192994-e79b2597-ad3a-49ed-b5cc-05f3ce19353b.gif" width="600"/>
