import { createWrapper } from 'next-redux-wrapper'
import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from "redux-saga";

import reducer from '../reducers'
import rootSaga from '../sagas'


// DevTools를 대체하는 미들웨어함수 
const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  console.log(action)
  return next(action)
}

const configureStore = () => {

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [createSagaMiddleware, loggerMiddleware]
  const enhancer = process.env.NODE_ENV === 'production' ? compose(applyMiddleware(...middlewares)) : composeWithDevTools(applyMiddleware(...middlewares))

  store.sagaTask = sagaMiddleware.run(rootSaga)

  const store = createStore(reducer, enhancer)
  return store;
}

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development' })

export default wrapper;


