import {
  USER,
  USER_SIGNIN,
  USER_SIGNUP,
  USER_LOGOUT,
  USER_LOADING,
  // USER_STOP_LOADING
  GET_USER,
  USER_FOLLOW,
  USER_UNFOLLOW,
  USER_UPDATE_PIC
  // GET_OWN_USER
} from '../types';

const initialState = {
  userInfo: {},
  loading: false,
  authenticated: false,
  otherUser: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER:
      return {
        ...state,
        userInfo: action.payload,
        authenticated: true,
        loading: false
      };
    case USER_LOADING:
      return { ...state, loading: true };
    case USER_SIGNUP:
      return { ...state, loading: false, success: true };
    case USER_SIGNIN:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        authenticated: true
      };
    case USER_LOGOUT:
      return initialState;
    case GET_USER:
      return {
        ...state,
        loading: false,
        otherUser: action.payload
      };
    case USER_FOLLOW:
      state.otherUser.user.followers = [
        action.payload._id,
        ...state.otherUser.user.followers
      ];
      return {
        ...state,
        userInfo: action.payload
      };
    case USER_UNFOLLOW:
      state.otherUser.user.followers = state.otherUser.user.followers.filter(
        (item) => item !== action.payload._id
      );
      return {
        ...state,
        userInfo: action.payload
      };
    case USER_UPDATE_PIC:
      return {
        ...state,
        userInfo: action.payload
      };

    default:
      return state;
  }
}
