import axios from 'axios';
import {
  COMMENT_ON_POST,
  CREATE_POST,
  DELETE_POST,
  LIKE_POST,
  LOADING_UI,
  SET_ERRORS,
  SET_MY_POSTS,
  SET_POST,
  SET_SUB_POSTS,
  SET_POSTS,
  STOP_LOADING_UI,
  UNLIKE_POST
} from '../types';

// create posts
const createPost = (body, pic) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/post/', { body, pic });
    dispatch({ type: CREATE_POST, payload: data.post });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data.error });
  }
};

// set all posts
const setPosts = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_UI });
    const token = localStorage.getItem('token');
    const { data } = await axios.get('/api/post/', {
      headers: {
        Authorization: token
      }
    });
    dispatch({ type: SET_POSTS, payload: data.posts });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    console.log(error);
  }
};

// set my posts
const setMyPosts = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_UI });
    const token = localStorage.getItem('token');
    const { data } = await axios.get('/api/post/my', {
      headers: {
        Authorization: token
      }
    });
    dispatch({ type: SET_MY_POSTS, payload: data.myposts });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    console.error(error);
  }
};

// set sub posts
const setSubPosts = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_UI });
    const token = localStorage.getItem('token');
    const { data } = await axios.get('/api/post/sub', {
      headers: {
        Authorization: token
      }
    });
    dispatch({ type: SET_SUB_POSTS, payload: data.posts });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    console.error(error);
  }
};

// set one post
const setPost = (postId) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_UI });
    const { data } = await axios.get(`/api/post/${postId}`);
    dispatch({ type: SET_POST, payload: data.post });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    console.error(error);
  }
};

// like post
const likePost = (postId) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/post/${postId}/like`);
    dispatch({ type: LIKE_POST, payload: data.result });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data.error });
  }
};

// unlike post
const unlikePost = (postId) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/post/${postId}/unlike`);
    dispatch({ type: UNLIKE_POST, payload: data.result });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data.error });
  }
};

// delete post
const deletePost = (postId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/post/${postId}`);
    dispatch({ type: DELETE_POST, payload: postId });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data.error });
  }
};

// add comment
const addComment = (text, postId) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/post/${postId}/comment`, { text });
    dispatch({ type: COMMENT_ON_POST, payload: data.result });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data.error });
  }
};

export {
  createPost,
  setPosts,
  setSubPosts,
  setMyPosts,
  setPost,
  likePost,
  unlikePost,
  deletePost,
  addComment
};
