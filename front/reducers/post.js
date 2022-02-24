import shortId from "shortid";
import produce from "immer";
import faker from "faker";

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
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

export const generateDummyPost = (num) => Array(20).fill().map(() => ({
  id: shortId.generate(),
  User: {
    id: shortId.generate(),
    nickname: faker.name.findName()
  },
  content: faker.lorem.paragraph(),
  Images: [],
  Comments: [
    { 
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName()
      },
      content: faker.lorem.sentence()
    }
  ]
}));

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: '또리'
  },
  Images: [
    { src: "https://images.unsplash.com/photo-1640622656891-04960a7aa678?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" },
    { src: 'https://images.unsplash.com/photo-1645690846939-fb89fe0797c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60' },
    { src: 'https://images.unsplash.com/photo-1645645082782-afc5a007f3e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60' }
  ],
  Comments: []
})

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '또리'
  }
})

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

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
    case LOAD_POSTS_REQUEST:
      draft.loadPostsLoading = true
      draft.loadPostsDone = false
      draft.loadPostsError = null
      break;
    case LOAD_POSTS_SUCCESS:
      draft.mainPosts = action.data.concat(draft.mainPosts)
      draft.loadPostsLoading = false
      draft.loadPostsDone = true
      draft.hasMorePosts = draft.mainPosts.length < 50;
      break;
    case LOAD_POSTS_FAILURE:
      draft.loadPostsLoading = false
      draft.loadPostsError = action.error
      break;

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