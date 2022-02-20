import { createWrapper } from 'next-redux-wrapper'
import { applyMiddleware, createStore, compose } from 'redux';
import reducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

// reducer의 역할: (이전상태, 액션) = 다음상태
const configureStore = () => {

  const middlewares = []
  const enhancer = process.env.NODE_ENV === 'production' ? compose(applyMiddleware(...middlewares)) : composeWithDevTools(applyMiddleware(...middlewares))

  const store = createStore(reducer, enhancer)

  store.dispatch({
    type: 'CHANGE_NAME',
    data: 'ddoring'
  }) 
  return store;
}

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development' })

export default wrapper;


