# React NodeBird SNS
Zerocho님의 강의를 보고 만든 프로젝트입니다.
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

#### 이미지 상세보기
<img src="https://user-images.githubusercontent.com/86812090/155520920-aed49d1d-acb6-48b6-b460-5b5492ff6830.gif" width="600" height="600"/>

<br/>

#### 인피니트 스크롤링
<img src="https://user-images.githubusercontent.com/86812090/155521122-e194cf1e-2151-422d-9493-4f8e06423248.gif" width="600" height="600"/>

<br/>

#### 댓글 등록 / 좋아요 / 내 게시글 삭제
<img src="https://user-images.githubusercontent.com/86812090/155520000-bf6386ec-5914-477c-99ac-8964f8cd3037.gif" width="600" height="600"/>



## etc

#### Immer를 사용해 쉽게 불변성 관리 하기
기존에는 ...state로 이전 상태값을 참조하여 불변성을 지키면서 새로운 상태로 만들어내야 했는데 그로 인해 길어지고 가독성 떨어졌는데, 알아서 불변성을 지켜주면서 다음 상태로 만들어준다는 immer를 통해 쉽게 관리하였습니다.

<img src="https://user-images.githubusercontent.com/86812090/155526502-79f1e625-0266-4ad0-b4fb-5e9b1d2de054.jpg" width="450"/> <img src="https://user-images.githubusercontent.com/86812090/155525933-02f5899a-192e-4831-b076-9dacc91150ea.jpg" width="450"/>

<br/>

#### shortId와 faker로 데이터 생성하기
백엔드 구현 전에 미리 더미데이터를 활용해서 shortId로 새 id값을 생성하고 faker를 통해 랜덤으로 데이터를 만들어 미리 테스트를 해봤습니다.

<img src="https://user-images.githubusercontent.com/86812090/155551839-1809b3de-e41e-410d-acc9-2e2e3b7b83f1.jpg" width="450"/>
