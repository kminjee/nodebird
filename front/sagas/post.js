import axios from "axios";
import { all, fork, takeLatest, put, throttle, call } from "redux-saga/effects";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";
import { 
  ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, 
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, 
  REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
  LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE, 
  LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE, 
  LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,  UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE,
  UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS, UPLOAD_IMAGES_FAILURE, 
  RETWEET_REQUEST, RETWEET_SUCCESS, RETWEET_FAILURE, LOAD_USER_POSTS_REQUEST, LOAD_HASHTAG_POSTS_REQUEST, LOAD_HASHTAG_POSTS_FAILURE, LOAD_HASHTAG_POSTS_SUCCESS, LOAD_USER_POSTS_SUCCESS, LOAD_USER_POSTS_FAILURE, 
} from "../reducers/post";


function uploadImagesAPI(data) {
  return axios.post('/post/images', data) // formdata는 { } 로 감싸면 안 된다. json 형태가 되버리기 때문 / 폼데이터는 그대로 전달해야한다.
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data) // action.data = imageFormData
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data
    })
  } catch (err) {
    console.log(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data
    })
  }
}


/* 단일 게시글 */
function loadPostAPI(data) {
  return axios.get(`/post/${data}`)
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data)
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data
    })
  } catch (err) {
    console.log(err);
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data
    })
  }
}


/* 특정 유저 게시글 리스트 */
function loadUserPostsAPI(data, lastId) {
  return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`)
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data, action.lastId)
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: err.response.data
    })
  }
}


/* 특정 해시태그 게시글 리스트 */
function loadHashtagPostsAPI(data, lastId) {
  return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`)
}

function* loadHashtagPosts(action) {
  try {
    console.log('loadHashtag console')
    const result = yield call(loadHashtagPostsAPI, action.data, action.lastId)
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: err.response.data
    })
  }
}


// get방식으로 데이터를 받아올때는 api주소 뒤에 ?key=value 로 작성한다.
function loadPostsAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`) // 마지막아이디가 undefined인 경우는 0으로.
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.lastId)
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data
    })
  }
}


function addPostAPI(data) {
  return axios.post('/post', data)
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data)
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
    })
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data
    })
  }
}


function removePostAPI(data) {
  return axios.delete(`/post/${data}`)
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data)
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data
    })
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data
    })
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data
    })
  }
}


function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data) 
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data)
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data
    })
  } catch (err) {
    console.log(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data
    })
  }
}


function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`) 
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data)
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data
    })
  } catch (err) {
    console.log(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data
    })
  }
}


function unlikePostAPI(data) {
  return axios.delete(`/post/${data}/like`, data) 
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data)
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data
    })
  } catch (err) {
    console.log(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data
    })
  }
}


function retweetAPI(data) {
  return axios.post(`/post/${data}/retweet`) 
}

function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data)
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data
    })
  } catch (err) {
    console.log(err)
    yield put({
      type: RETWEET_FAILURE,
      error: err.response.data
    })
  }
}


function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages)
}

function* watchlikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost)
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost)
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts)
}

function* watchLoadUserPosts() {
  yield throttle(5000, LOAD_USER_POSTS_REQUEST, loadUserPosts)
}

function* watchLoadHashtagPosts() {
  yield throttle(5000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts)
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

function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet)
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost)
}

export default function* userSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchRetweet),
    fork(watchUploadImages),
    fork(watchlikePost),
    fork(watchUnlikePost),
    fork(watchLoadUserPosts),
    fork(watchLoadHashtagPosts),
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment)
  ])
}