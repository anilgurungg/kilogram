import {
  CREATE_POST,
  DELETE_POST,
  LIKE_POST,
  SET_MY_POSTS,
  SET_POST,
  SET_POSTS,
  UNLIKE_POST,
  COMMENT_ON_POST,
  SET_SUB_POSTS
} from '../types';

const initialState = {
  posts: [],
  post: {},
  myPosts: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case SET_SUB_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload
      };
    case SET_MY_POSTS:
      return {
        ...state,
        myPosts: action.payload
      };

    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        post:
          state.post._id === action.payload._id ? action.payload : state.post
      };
    case UNLIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        post:
          state.post._id === action.payload._id ? action.payload : state.post
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        post: state.post._id === action.payload ? {} : state.post
      };
    case COMMENT_ON_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        post:
          state.post._id === action.payload._id ? action.payload : state.post
      };
    case CREATE_POST:
      return { ...state, posts: [action.payload, ...state.posts] };

    default:
      return state;
  }
}
