

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
  postAdded: false
}

const ADD_POST = 'ADD_POST'
export const addPost = {
  type: ADD_POST
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true
      }
    default:
      return state;
  }
}

export default reducer;