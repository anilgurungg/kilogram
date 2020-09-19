import {
  SET_ERRORS,
  CLEAR_ERRORS,
  USER_SIGNIN,
  USER_SIGNUP,
  USER_LOGOUT,
  USER_LOADING,
  GET_USER,
  LOADING_UI,
  STOP_LOADING_UI,
  USER_FOLLOW,
  USER_UNFOLLOW,
  USER_UPDATE_PIC
} from '../types';
import axios from 'axios';

const signup = (email, name, username, password) => async (dispatch) => {
  dispatch({ type: USER_LOADING });
  try {
    const { data } = await axios.post('/api/signup', {
      email,
      name,
      username,
      password
    });
    dispatch({ type: USER_SIGNUP, payload: data.message });
    dispatch({ type: CLEAR_ERRORS });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data.error });
  }
};

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOADING });

  try {
    const { data } = await axios.post('/api/signin', {
      email,
      password
    });

    dispatch({ type: USER_SIGNIN, payload: data.user });
    dispatch({ type: CLEAR_ERRORS });
    setAuthorizationHeaders(data.token, data.user);
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({ type: SET_ERRORS, payload: error.response.data.error });
  }
};

// const getOwnUser = () => async (dispatch) => {
//   try {
//     dispatch({ type: USER_LOADING });
//     const { data } = await axios.get('/api/user/');
//     console.log(data);
//     dispatch({ type: GET_OWN_USER, payload: data });
//   } catch (error) {
//     dispatch({ type: SET_ERRORS, payload: error.response.data.error });
//   }
// };

// get user
const getUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_UI });
    const { data } = await axios.get(`/api/user/${id}`);
    console.log(data);
    dispatch({ type: GET_USER, payload: data });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data.error });
  }
};

const logout = () => (dispatch) => {
  console.log('logout');
  localStorage.removeItem('token');
  localStorage.removeItem('userInfo');
  axios.defaults.headers.common['Authorization'] = '';
  dispatch({ type: USER_LOGOUT });
};

// follow user
const followUser = (userId, ownId) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/user/${userId}/follow`);
    console.log(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: USER_FOLLOW, payload: data });
  } catch (error) {
    // dispatch({ type: SET_ERRORS, payload: error.response.data.error });
  }
};

// unfollow user
const unfollowUser = (userId, ownId) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/user/${userId}/unfollow`);
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch({ type: USER_UNFOLLOW, payload: data });
  } catch (error) {
    // dispatch({ type: SET_ERRORS, payload: error.response.data.error });
  }
};

// change profile pic
const changeProfilePic = (pic) => async (dispatch) => {
  try {
    console.log('change pic action called', pic);
    const { data } = await axios.put('/api/user/updatepic', { pic });
    localStorage.setItem('userInfo', JSON.stringify(data));
    console.log(data);
    dispatch({ type: USER_UPDATE_PIC, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data.error });
  }
};

const setAuthorizationHeaders = (token, user) => {
  localStorage.setItem('token', `Bearer ${token}`);
  localStorage.setItem('userInfo', JSON.stringify(user));
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export {
  signup,
  signin,
  logout,
  getUser,
  followUser,
  unfollowUser,
  changeProfilePic
};
