import { all, fork, takeLatest, put, delay, call } from "redux-saga/effects";
import axios from "axios";
import { 
  LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, 
  LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, 
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, 
  FOLLOW_REQUEST, FOLLOW_FAILURE, FOLLOW_SUCCESS, 
  UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE, 
  LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE, 
} from "../reducers/user";


function loadUserAPI() {
  return axios.get('/user')
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data
    })
  } catch (err) {
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data
    })
  }
}


function signupAPI(data) {
  return axios.post('/user', data)
}

function* signup(action) {
  try {
    const result = yield call(signupAPI, action.data);
    console.log(result)
    yield put({
      type: SIGN_UP_SUCCESS,
    })
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data
    })
  }
}


function loginAPI(data) {
  return axios.post('/user/login', data)
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data)
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data // 서버로부터 받아온 사용자의 정보를 담음.
    })
  } catch (err) {
    console.log(err)
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data
    })
  }
}


function logoutAPI() {
  return axios.post('/user/logout')
}

function* logout() {
  try {
    yield call(logoutAPI)
    yield put({
      type: LOG_OUT_SUCCESS,
    })
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data
    })
  }
}



function followAPI() {
  return axios.post('/user/follow')
}

function* follow(action) {
  try {
    // const result = yield call(followAPI)
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data
    })
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data
    })
  }
}


function unfollowAPI() {
  return axios.post('/user/unfollow')
}

function* unfollow(action) {
  try {
    // const result = yield call(unfollowAPI)
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data
    })
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data
    })
  }
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser)
}


function* watchSignup() {
  yield takeLatest(SIGN_UP_REQUEST, signup)
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login)
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout)
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow)
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow)
}

export default function* userSaga() {
  yield all([
    fork(watchLoadUser),
    fork(watchSignup),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchFollow),
    fork(watchUnfollow)
  ])
}