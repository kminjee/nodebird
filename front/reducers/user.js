import produce from 'immer';

export const initialState = {
  loadMyInfoLoding: false,  // 내 정보 가져오기 시도중
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loadUserLoding: false,  // 남의 유저 정보 가져오기 시도중
  loadUserDone: false,
  loadUserError: null,
  loginLoding: false,     // 로그인 시도중
  loginDone: false,
  loginError: null,
  logoutLoding: false,    // 로그아웃 시도중
  logoutDone: false,
  logoutError: null,
  signupLoding: false,    // 회원가입 시도중
  signupDone: false,
  signupError: null,
  changeNicknameLoding: false,  // 닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: null,
  followLoding: false,    // 팔로우 시도중
  followDone: false,
  followError: null,
  unfollowLoding: false,  // 언팔로우 시도중
  unfollowDone: false,
  unfollowError: null,
  loadFollowingsLoding: false,  // 팔로잉 리스트 가져오기 시도중
  loadFollowingsDone: false,
  loadFollowingsError: null,
  loadFollowersLoding: false,  // 팔로워 리스트 가져오기 시도중
  loadFollowersDone: false,
  loadFollowersError: null,
  removeFollowerLoding: false,  // 팔로워 지우기 시도중
  removeFollowerDone: false,
  removeFollowerError: null,
  me: null,
  userInfo: null
}

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

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

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';




export const loginRequestAction = (data) => ({
    type: LOG_IN_REQUEST,
    data
});

export const logoutRequestAction = () => ({
    type: LOG_OUT_REQUEST
});

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case LOAD_MY_INFO_REQUEST:
      draft.loadMyInfoLoding = true
      draft.loadMyInfoDone = false
      draft.loadMyInfoError = null
      break;
    case LOAD_MY_INFO_SUCCESS:
      draft.loadMyInfoLoding = false
      draft.loadMyInfoDone = true
      draft.me = action.data
      break;
    case LOAD_MY_INFO_FAILURE:
      draft.loadMyInfoLoding = false
      draft.loadMyInfoDone = false
      draft.loadMyInfoError = action.error
      break;

    case LOAD_USER_REQUEST:
      draft.loadUserLoding = true
      draft.loadUserDone = false
      draft.loadUserError = null
      break;
    case LOAD_USER_SUCCESS:
      draft.loadUserLoding = false
      draft.loadUserDone = true
      draft.userInfo = action.data
      break;
    case LOAD_USER_FAILURE:
      draft.loadUserLoding = false
      draft.loadUserDone = false
      draft.loadUserError = action.error
      break;

    case LOG_IN_REQUEST:
      draft.loginLoding = true
      draft.loginDone = false
      draft.loginError = null
      break;
    case LOG_IN_SUCCESS:
      draft.loginLoding = false
      draft.loginDone = true
      draft.me = action.data
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
      draft.signupLoding = true
      draft.signupDone = false
      draft.signupError = null
      break;
    case SIGN_UP_SUCCESS:
      draft.signupLoding = false
      draft.signupDone = true
      break;
    case SIGN_UP_FAILURE:
      draft.signupLoding = false
      draft.signupError = action.error
      break;

    case CHANGE_NICKNAME_REQUEST:
      draft.changeNicknameLoding = true
      draft.changeNicknameDone = false
      draft.changeNicknameError = null
      break;
    case CHANGE_NICKNAME_SUCCESS:
      draft.changeNicknameLoding = false
      draft.changeNicknameDone = true
      draft.me.nickname = action.data.nickname
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

    case LOAD_FOLLOWINGS_REQUEST:
      draft.loadFollowingsLoding = true
      draft.loadFollowingsDone = false
      draft.loadFollowingsError = null
      break;
    case LOAD_FOLLOWINGS_SUCCESS:
      draft.loadFollowingsLoding = false
      draft.me.Followings = action.data
      draft.loadFollowingsDone = true
      break;
    case LOAD_FOLLOWINGS_FAILURE:
      draft.loadFollowingsLoding = false
      draft.loadFollowingsError = action.error
      break;

    case LOAD_FOLLOWERS_REQUEST:
      draft.loadFollowersLoding = true
      draft.loadFollowersDone = false
      draft.loadFollowersError = null
      break;
    case LOAD_FOLLOWERS_SUCCESS:
      draft.loadFollowersLoding = false
      draft.me.Followers = action.data
      draft.loadFollowersDone = true
      break;
    case LOAD_FOLLOWERS_FAILURE:
      draft.loadFollowersLoding = false
      draft.loadFollowersError = action.error
      break;

    case FOLLOW_REQUEST:
      draft.followLoding = true
      draft.followDone = false
      draft.followError = null
      break;
    case FOLLOW_SUCCESS:
      draft.followLoding = false
      draft.me.Followings.push({ id: action.data.UserId });
      draft.followDone = true
      break;
    case FOLLOW_FAILURE:
      draft.followLoding = false
      draft.followError = action.error
      break;

    case UNFOLLOW_REQUEST:
      draft.unfollowLoding = true
      draft.unfollowDone = false
      draft.unfollowError = null
      break;
    case UNFOLLOW_SUCCESS:
      draft.unfollowLoding = false
      draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data.UserId)
      draft.unfollowDone = true
      break;
    case UNFOLLOW_FAILURE:
      draft.unfollowLoding = false
      draft.unfollowError = action.error
      break;

    case REMOVE_FOLLOWER_REQUEST:
      draft.removeFollowerLoding = true
      draft.removeFollowerDone = false
      draft.removeFollowerError = null
      break;
    case REMOVE_FOLLOWER_SUCCESS:
      draft.removeFollowerLoding = false
      draft.removeFollowerDone = true
      draft.me.Followers = draft.me.Followers.filter((v) => v.id !== action.data.UserId)
      break;
    case REMOVE_FOLLOWER_FAILURE:
      draft.removeFollowerLoding = false
      draft.removeFollowerDone = false
      draft.removeFollowerError = action.error
      break;

    default:
      break;
  }
})

export default reducer;
