import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import post from './post';


// 초기 앱에 대한 데이터 구조를 잡아놓는다. 까먹은건 그때그때 추가해도 상관없다.
const initialState = {
  user: {},
  post: {}
}


const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', action);
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        post
      });
      return combinedReducer(state, action)
    }
  }
};


export default rootReducer;