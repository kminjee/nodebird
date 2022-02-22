export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '또리'
    },
    content: '첫번째 게시글 #해시태그 #익스프레스',
    Images: [
      { src: 'https://cdn4.iconfinder.com/data/icons/weatherful/72/Moon-256.png' },
      { src: 'https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Star_Gold-256.png' },
      { src: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-256.png' }
    ],
    Comments: [
      { 
        User: { nickname: '망고' },
        content: '예뻐요'
      },
      {
        User: { nickname: '체리' },
        content: '멋져요'
      }
    ]
  }],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null
}

const dummyPost = {
  id: 2,
  content: '더미데이터',
  User: {
    id: 1,
    nickname: '짱구'
  },
  Images: [],
  Comments: []
}


export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';


export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data
})

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data
})


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null
      }
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      }
    case ADD_POST_FAILURE:
      return {
        addPostLoading: false,
        addPostError: action.error,
      }

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null
      }
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
      }
    case ADD_COMMENT_FAILURE:
      return {
        addCommentLoading: false,
        addCommentError: action.error,
      }
      
    default: 
      return state
  }
}

export default reducer;