import axios from 'axios';
import { all, fork } from 'redux-saga/effects';
import postSaga from "./post";
import userSaga from "./user";

// 공통 설정
axios.defaults.baseURL = 'http://localhost:3030';
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(postSaga)
  ])
}