# React NodeBird SNS
Zerocho님의 강의를 보고 만든 프로젝트입니다.
<br/>

## 사용기술
* React
* Next.js
* Redux & Redux-saga
* Styled Components
* Ant Design
* Faker/Shortid
* immer
* axios
* Node.js

## 서비스기능
* 회원가입
* 로그인 및 로그아웃
* 프로필
* 게시글 등록 및 삭제
* 팔로우 및 언팔로우
* 댓글
* 좋아요
* 이미지 업로드 / 이미지 상세보기
* 인피니트 스크롤링

## 미리보기

#### 로그인 및 헤더 변경
<img src="https://user-images.githubusercontent.com/86812090/155519663-fbac3895-6f45-440e-a478-1ec522b92d53.gif" width="600" height="600"/>

<br/>

#### 이미지 상세보기
<img src="https://user-images.githubusercontent.com/86812090/155520920-aed49d1d-acb6-48b6-b460-5b5492ff6830.gif" width="600" height="600"/>

<br/>

#### 인피니트 스크롤링
<img src="https://user-images.githubusercontent.com/86812090/155521122-e194cf1e-2151-422d-9493-4f8e06423248.gif" width="600" height="600"/>

<br/>

#### 댓글 등록 / 좋아요 / 내 게시글 삭제
<img src="https://user-images.githubusercontent.com/86812090/155520000-bf6386ec-5914-477c-99ac-8964f8cd3037.gif" width="600" height="600"/>



## etc
#### 리덕스를 사용하는 이유와 리덕스의 장단점
리액트의 특징 중 하나가 단방향 데이터 흐름이다. 그런데 개발을 하다보면 여러 컴포넌트들에서 공통적으로 쓰이는 데이터들이 있는데 예를 들어 로그인한 유저의 정보를 다른 컴포넌트에서도 사용해야하는 경우다. 그런 데이터들을 흩어지게 하기 위해선 부모컴포넌트를 하나만 두고 자식컴포넌트들에게 데이터를 전달하는 것이 좋다. 그래서 리덕스는 중앙에서 데이터를 관리하고 각 컴포넌트는 필요할 때마다 데이터를 가져다 쓸 수 있도록 제공하고 있다.

리덕스의 단점은 각각 다른 데이터를 변경하고자 할 때 매번 action을 만들어주어야 한다. action을 계속 만들수록 reducer도 만들어주어야 하기 때문에 코드량이 그만큼 많아진다. 그러나 단점을 커버할만한 장점으로 action 하나하나가 모두 히스토리로 기록이 된다는 것이다. 작성해놓은 action들을 보면서 내가 어떤 데이터들을 어떻게 바꿔왔는가를 추적할 수 있고 버그를 잡을 때 매우 편리하다. 또 히스토리들이 있으면 타임머신 역햘을 하기도 하는데 이 때 사용하는 것이 Redux-DevTools이다. DevTools를 사용해서 어느 지점에서 문제가 생겼는지 쉽게 확인할 수 있다.

<br/>

#### Immer를 사용해 쉽게 불변성 관리 하기
불변성을 지키다보니 길어지고 가독성 떨어지는 코드를 immer를 통해 쉽게 관리하였다. 이전에는 ...state로 이전 상태값을 참조하여 불변성을 지키면서 새로운 상태로 만들어내야 했는데 immer는 알아서 불변성을 지켜주면서 다음 상태로 만들어준다. 

<img src="https://user-images.githubusercontent.com/86812090/155526502-79f1e625-0266-4ad0-b4fb-5e9b1d2de054.jpg" width="450"/> <img src="https://user-images.githubusercontent.com/86812090/155525933-02f5899a-192e-4831-b076-9dacc91150ea.jpg" width="450"/>

<br/>

#### shortId와 faker로 데이터 생성하기
더미데이터를 이용하면서 shortId로 새로운 id값을 생성할 수 있고, faker를 통해 랜덤으로 데이터를 만들어 낼 수 있다.

<img src="https://user-images.githubusercontent.com/86812090/155551839-1809b3de-e41e-410d-acc9-2e2e3b7b83f1.jpg" width="450"/>
