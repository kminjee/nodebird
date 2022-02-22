import shortId from "shortid";
import produce from "immer";
import faker from "faker";

export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '또리'
    },
    content: '첫번째 게시글 #해시태그 #익스프레스',
    Images: [
      { 
        id: shortId.generate(),
        src: 'https://cdn4.iconfinder.com/data/icons/weatherful/72/Moon-256.png' 
      },
      { 
        id: shortId.generate(),
        src: 'https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Star_Gold-256.png' 
      },
      { 
        id: shortId.generate(),
        src: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-256.png' 
      }
    ],
    Comments: [
      { 
        id: shortId.generate(),
        User: { 
          id: shortId.generate(), 
          nickname: '망고' 
        },
        content: '예뻐요'
      },
      {
        id: shortId.generate(),
        User: { 
          id: shortId.generate(),
          nickname: '체리' 
        },
        content: '멋져요'
      }
    ]
  }],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
}

initialState.mainPosts = initialState.mainPosts.concat(
  Array(20).fill().map(() => ({
    id: shortId.generate(),
    User: {
      id: shortId.generate(),
      nickname: faker.name.findName()
    },
    content: faker.lorem.paragraph(),
    Images: [
      { src: faker.image.imageUrl() }
    ],
    Comments: [
      { 
        User: {
          id: shortId.generate(),
          nickname: faker.name.findName()
        },
        content: faker.lorem.sentence()
      }
    ]
  }))
)

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: '짱구'
  },
  Images: [],
  Comments: []
})

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '짱구'
  }
})


export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

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


const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      draft.addPostLoading = true
      draft.addPostDone = false
      draft.addPostError = null
      break;
    case ADD_POST_SUCCESS:
      draft.mainPosts.unshift(dummyPost(action.data))
      draft.addPostLoading = false
      draft.addPostDone = true
      break;
    case ADD_POST_FAILURE:
      draft.addPostLoading = false
      draft.addPostError = action.error
      break;
    case REMOVE_POST_REQUEST:
      draft.removePostLoading = true
      draft.removePostDone = false
      draft.removePostError = null
      break;
    case REMOVE_POST_SUCCESS:
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data)
      draft.removePostLoading = false
      draft.removePostDone = true
      break;
    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false
      draft.removePostError = action.error
      break;
    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true
      draft.addCommentDone = false
      draft.addCommentError = null
      break;
    case ADD_COMMENT_SUCCESS:
      const post = draft.mainPosts.find((v) => v.id === action.data.postId)
      post.Comments.unshift(dummyComment(action.data.content))
      draft.addCommentLoading = false
      draft.addCommentDone = true
      break;
    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false
      draft.addCommentError = action.error
      break;
    default: 
      break;
  }
})

export default reducer;