import produce from 'immer';

export const initialState = {
  loginLoding: false,   // 로그인 시도중
  loginDone: false,
  loginError: null,
  logoutLoding: false,  // 로그아웃 시도중
  logoutDone: false,
  logoutError: null,
  signupLoding: false,  // 회원가입 시도중
  signupDone: false,
  signupError: null,
  changeNicnameLoding: false,  // 닉네임 변경 시도중
  changeNicnameDone: false,
  changeNicnameError: null,
  me: null,
  signupData: {},
  loginData: {}
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';



const dummyUser = (data) => ({
  ...data,
  nickname: '또리',
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [
    { nickname: '몽이' },
    { nickname: '망고' },
    { nickname: '별이' }
  ],
  Followers: [
    { nickname: '몽이' },
    { nickname: '망고' },
    { nickname: '별이' }
  ]
})

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data
  }
}

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST
  }
}

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      draft.loginLoding = true
      draft.loginDone = false
      draft.loginError = null
      break;
    case LOG_IN_SUCCESS:
      draft.loginLoding = false
      draft.loginDone = true
      draft.me = dummyUser(action.data)
      break;
    case LOG_IN_FAILURE:
      draft.loginLoding = false
      draft.loginDone = false
      draft.loginError = action.error
      break;

    case LOG_OUT_REQUEST:
      draft.logoutLoding = true
      draft.logoutDone = false
      draft.logoutError = null
      break;
    case LOG_OUT_SUCCESS:
      draft.logoutLoding = false
      draft.logoutDone = true
      draft.me = null
      break;
    case LOG_OUT_FAILURE:
      draft.logoutLoding = false
      draft.logoutError = action.error
      break;

    case SIGN_UP_REQUEST:
      draft.singupLoding = true
      draft.singupDone = false
      draft.singupError = null
      break;
    case SIGN_UP_SUCCESS:
      draft.singupLoding = false
      draft.singupDone = true
      break;
    case SIGN_UP_FAILURE:
      draft.singupLoding = false
      draft.singupError = action.error
      break;

    case CHANGE_NICKNAME_REQUEST:
      draft.changeNicknameLoding = true
      draft.changeNicknameDone = false
      draft.changeNicknameError = null
      break;
    case CHANGE_NICKNAME_SUCCESS:
      draft.changeNicknameLoding = false
      draft.changeNicknameDone = true
      break;
    case CHANGE_NICKNAME_FAILURE:
      draft.changeNicknameLoding = false
      draft.changeNicknameError = action.error
      break;
    case ADD_POST_TO_ME:
      draft.me.Posts.unshift({ id: action.data })
      break;
    case REMOVE_POST_OF_ME:
      draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data)
      break;
    default:
      break;
  }
})

export default reducer;