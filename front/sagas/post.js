import { all, fork, takeLatest, delay, put, throttle } from "redux-saga/effects";
import axios from "axios";
import shortid from "shortid";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";
import { 
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, 
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, 
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE, generateDummyPost
} from "../reducers/post";


function loadPostAPI(data) {
  return axios.get('/api/posts', data)
}

function addPostAPI(data) {
  return axios.post('/api/post/${data.postId}/comment', data)
}

function removePostAPI(data) {
  return axios.delete('/api/post', data)
}

function addCommentAPI(data) {
  return axios.post('/api/post', data)
}

function* loadPosts() {
  try {
    // const result = yield call(loadPostsAPI)
    yield delay(1000)
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10)
    })
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.responce.data
    })
  }
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data)
    yield delay(1000)

    const id = shortid.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data
      }
    })
    yield put({
      type: ADD_POST_TO_ME,
      data: id
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      data: err.responce.data
    })
  }
}

function* removePost(action) {
  try {
    // const result = yield call(addPostAPI, action.data)
    yield delay(1000)
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data
    })
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.responce.data
    })
  }
}

function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data)
    yield delay(1000)
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data
    })
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.responce.data
    })
  }
}


function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts)
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost)
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost)
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

export default function* userSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment)
  ])
}