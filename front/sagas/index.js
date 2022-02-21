import { all, fork, call, put, take } from 'redux-saga/effects';


// login
function loginAPI(data) {
  return axois.post('/api/login', data)
}
function* login(action) {
  try {
    const result = yield call(loginAPI, action.data)
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data
    })
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.responce.data
    })
  }
}

// logout
function logoutAPI() {
  return axois.post('/api/logout')
}
function* logout() {
  try {
    const result = yield call(logoutAPI)
    yield put({
      type: 'LOG_OUT_SUCCESS',
      data: result.data
    })
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.responce.data
    })
  }
}

// post
function addPostAPI(data) {
  return axois.post('/api/post', data)
}
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data)
    yield put({
      type: 'ADD_POST_SUCCESS',
      data: result.data
    })
  } catch (err) {
    yield put({
      type: 'ADD_POST_FAILURE',
      data: err.responce.data
    })
  }
}

function* watchLogin() {
  yield take('LOG_IN_REQUEST', login)
}

function* watchLogout() {
  yield take('LOG_OUT_REQUEST', logout)
}

function* watchAddPost() {
  yield take('ADD_POST_REQUEST', addPost)
}


// saga 사용 방법
// 보통 메인 사가를 만들고 만들고 싶은 비동기 액션들을 넣어준다.
export default function* rootSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchAddPost)
  ])
}