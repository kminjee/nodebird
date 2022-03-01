# React NodeBird SNS
트위터 비슷한 SNS 만들기로 Zerocho님의 강의를 보고 만든 프로젝트입니다.
(서버사이드렌더링 및 백엔드 구현 진행중입니다)

<br/>

## 사용기술
* React
* Next.js
* Redux & Redux-saga
* Styled Components
* Ant Design
* Faker / Shortid
* immer
* axios
* Node.js
* Sequelize

<br/>

## 서비스기능
* 회원가입
* 로그인 및 로그아웃
* 프로필
* 게시글 등록 및 삭제
* 팔로우 및 언팔로우
* 댓글
* 좋아요
* 이미지 상세보기
* 인피니트 스크롤링

<br/>

## 미리보기

### 이미지 상세보기
<img src="https://user-images.githubusercontent.com/86812090/155520920-aed49d1d-acb6-48b6-b460-5b5492ff6830.gif" width="600" height="600"/>

<br/>

### 인피니트 스크롤링
<img src="https://user-images.githubusercontent.com/86812090/155521122-e194cf1e-2151-422d-9493-4f8e06423248.gif" width="600" height="600"/>

<br/>

### 댓글 등록 / 좋아요 / 내 게시글 삭제
<img src="https://user-images.githubusercontent.com/86812090/155520000-bf6386ec-5914-477c-99ac-8964f8cd3037.gif" width="600" height="600"/>

<br/>

### 닉네임 변경
<img src="https://user-images.githubusercontent.com/86812090/156193301-088f96aa-ebc3-4f52-82c1-827d77e90534.gif" width="600"/>

<br/>

### 팔로우/언팔로우
<img src="https://user-images.githubusercontent.com/86812090/156192994-e79b2597-ad3a-49ed-b5cc-05f3ce19353b.gif" width="600"/>

<br/>


## 프로젝트 진행사항 

### 커스텀 훅을 사용하여 중복된 훅들을 함수 하나로 관리하기
useInput을 호출함과 동시에 props로 초기값을 전달하고 setter에 onChange함수를 전달해서 useInput에 value값을 할당하고 반환했습니다.

<img src="https://user-images.githubusercontent.com/86812090/156198113-38ef6a7f-262b-4734-8df5-3a3266e9abba.jpg" width="400"/> <img src="https://user-images.githubusercontent.com/86812090/156198109-adf8e43e-d12a-40fc-a5c2-d334500e506b.jpg" width="400"/>

<br/>

### Redux-saga 사용하기
컴포넌트에서 REQUEST를 디스패치하면 사가에서는 REQUEST가 호출됨에 따라 API를 호출하는 제너레이터 함수를 실행시켜 데이터를 요청하고, 서버에서 넘겨주는 데이터를 완전히 리턴할 때까지 기다리는 call이펙트를 사용해 값을 받아오면 SUCCESS를 디스패치하는 방식입니다. 

<img src="https://user-images.githubusercontent.com/86812090/156191560-d3111feb-397f-4db3-98c3-b0fed91ffce2.jpg" width="400" />

<br/>

### Immer를 사용해 쉽게 불변성 관리 하기
기존에는 ...state로 이전 상태값을 참조하여 불변성을 지키면서 새로운 상태로 만들어내야 했는데 그로 인해 길어지고 가독성 떨어졌는데, 알아서 불변성을 지켜주면서 다음 상태로 만들어준다는 immer를 통해 쉽게 관리하였습니다.

<img src="https://user-images.githubusercontent.com/86812090/155526502-79f1e625-0266-4ad0-b4fb-5e9b1d2de054.jpg" width="450"/> <img src="https://user-images.githubusercontent.com/86812090/155525933-02f5899a-192e-4831-b076-9dacc91150ea.jpg" width="450"/>

<br/>

### shortId와 faker로 데이터 생성하기
백엔드 구현 전에 미리 더미데이터를 활용해서 shortId로 새 id값을 생성하고 faker를 통해 랜덤으로 데이터를 만들어 미리 테스트를 해봤습니다.

<img src="https://user-images.githubusercontent.com/86812090/155551839-1809b3de-e41e-410d-acc9-2e2e3b7b83f1.jpg" width="450"/>

<br/>

## 프로젝트를 통해 배운것

### SSG(Server Site Generation) & SSR(Server Side Rendering)
* SSG는 정적 생성으로 빌드 시간에 맞춰 서버에서 컴포넌트를 미리 렌더링한다. 사용자는 페이지에 들어왔을 때 데이터가 업데이트 되지 않은 상태여도 UI를 미리 볼 수 있다. 페이지가 렌더링 될 때 서버에서 해당 컴포넌트를 렌더링 함으로써 사용자는 미리 HTML을 볼 수 있는데 만약 useEffect()로 데이터를 불러고오 있다면 데이터를 모두 받아오기 전까진 로딩화면을 먼저 보게끔 할 수 있다.

* SSR은 서버 측 렌더링으로 서버에서 HTML을 미리 만들고 필요한 데이터까지 모두 삽입한 후에 완벽한 페이지를 렌더링하는 방식이다. 클라이언트에 요청한 것들을 실행시키고 응답하는데까지 시간이 소요되기 때문에 사용자는 페이지를 들어왔을 때 UI도 보이지 않는 빈 화면의 상태를 보게 된다. 하지만 데이터는 모두 최신 상태가 된다. getServerSideProps function을 이용해 서버 측에 데이터 요청을 하고 응답 받은 데이터를 해당 컴포넌트 props로 전달하여 미리 렌더링된 HTML에 데이터까지 완벽하게 삽입한 후에 사용자에게 보여준다.<br/><br/>
브라우저가 프론트에게 /main 이라는 페이지를 요청하면 프론트는 백엔드에게 /main에 대한 데이터를 요청한다. 백엔드는 DB에 데이터를 요청하고 받은 데이터를 다시 프론트에게 전달한다. 그리고 프론트가 브라우저에게 데이터를 전달해주면서 데이터와 HTML을 합친다. <br/><br/>
반면 CSR(Client Side Rendering)은 브라우저가 프론트에게 /main 페이지를 요청하면 프론트는 브라우저에게 HTML/CSS/JS/Image를 전달한다. 다시 브라우저는 백엔드에게 데이터를 요청하는데 그 동안에 브라우저에 로딩화면을 띄우고 백엔드는 DB에 데이터를 요청하고 받은 데이터를 다시 브라우저에게 전달한다.

<br/>

### Redux의 필요성 
리액트는 단방향 데이터 흐름이 특징이다. 개발을 하다보면 여러 컴포넌트들에서 공통적으로 쓰이는 데이터들이 있는데 예를 들어 로그인한 유저의 정보를 다른 컴포넌트에서도 사용해야 하는 경우다. 컴포넌트가 분리되어 있으면 데이터들도 흩어져있기 마련인데 이런 경우 컴포넌트 간에 데이터를 전달하려면 부모컴포넌트의 부모컴포넌트의 자식컴포넌트의 자식컴포넌트의...복잡하게 데이터를 전달해야하는 번거로움이 생긴다. 데이터들을 흩어지게 하려면 부모컴포넌트를 하나만 두어서 부모컴포넌트가 데이터를 각 컴포넌트에게 전달하는 것이 좋다. 리덕스는 중앙에서 데이터를 관리하고 컴포넌트들은 필요할 때마다 데이터를 가져다 쓸수 있도록 제공하고 있다. <br/><br/>
단점은 store에 있는 각 다른 데이터를 변경하고자 할 때 매번 action과 reducer도 만들어주어야해서 코드량이 많아진다. 하지만 그럼에도 redux는 그것들이 히스토리가 된다는 장점이 있다. action 하나 하나가 기록이 되면서 내가 어떤 데이터를 어떻게 바꿔왔는지 추적이 가능해서 버그를 잡을 때 매우 편리하다. 크롬의 확장 프로그램인 redux-devtool로 문제점을 쉽게 파악할 수있다.

<br/>

### state의 불변성

<img src="https://user-images.githubusercontent.com/86812090/156204297-f33bf61d-35c9-4fb4-b75c-30e95b98fd08.jpg" width="200"/> <img src="https://user-images.githubusercontent.com/86812090/156204302-132c4a0a-62fe-4969-ab4b-1c36b8162df9.jpg" width="300"/>

객체의 개념을 잘 알아두어야 한다. 객체는 생성할 때마다 새로운 값이다. 객체와 객체를 비교하면 다른 대상이므로 false가 나오고 하나의 객체를 참조하는 경우에는 true이다. 리듀서에서 예를 들 수 있다. return에서 {}는 객체를 말한다. 즉, 리턴할 때마다 새로운 객체를 생성하는 것인데 기존의 state값을 그대로 참조하고 바꾸고 싶은 데이터만 변경해서 새 객체를 만든다. 그리고 새로운 객체로 리턴해야 하는 이유는 객체를 새로 만들어야 변경 내역들이 추적이 가능하다. 객체가 서로 다른 경우에는 이전 기록과 현재 기록이 모두 남게되는데 참조된 데이터를 변경하게 되면 결과를 찍었을 때 이전 데이터가 남지 않는다. 또 state를 참조하는 이유는 코드량이 길어지지 않는 이유도 있지만 메모리를 아끼기 위해서다.


<br/>

### Styled-Component를 사용하는 이유
Element는 style을 적용할 때 {}로 감싸서 객체를 만들면 안 된다. 컴포넌트가 리렌더링 될 때마다 함수를 실행시키는데 엘리먼트에 적용시킨 style 객체가 새로 생성된다. 객체는 생성되는 것마다 서로 다른 객체가 되기 때문에 VirtureDOM으로 검사를 하면서 어디가 달라졌는지 확인하다가 이전 객체와 새 객체가 다른 것을 판단하고 리렌더링을 해버린다. 즉 불필요한 렌더링이 되버린다. 그래서 이런 현상을 막기위해 스타일 컴포넌트를 사용한다.

<br/>
