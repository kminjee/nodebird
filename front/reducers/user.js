
export const initialState = {
  loginLoding: false, // 로그인 시도 중
  loginDone: false,
  loginError: null,
  logoutLoding: false,  // 로그아웃 시도 중
  logoutDone: false,
  logoutError: null,
  signupLoding: false,  // 회원가입 시도 중
  signupDone: false,
  signupError: null,
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

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

// dummyUser = me
const dummyUser = (data) => ({
  ...data,
  nickname: '밍지',
  id: 1,
  Posts: [],
  Followings: [],
  Followers: []
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        loginLoding: true,
        loginDone: false,
        loginError: null
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        loginLoding: false,
        loginDone: true,
        me: dummyUser(action.data)
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        loginLoding: false,
        loginDone: false,
        loginError: action.error
      };

    case LOG_OUT_REQUEST:
      return {
        ...state,
        logoutLoding: true,
        logoutDone: false,
        logoutError: null
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logoutLoding: false,
        logoutDone: true,
        me: null
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logoutLoding: false,
        logoutError: action.error
      };

    case SIGN_UP_REQUEST:
      return {
        ...state,
        singupLoding: true,
        singupDone: false,
        singupError: null
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        singupLoding: false,
        singupDone: true,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        singupLoding: false,
        singupError: action.error
      };  
    
    default:
      return state;
  }
}

export default reducer;