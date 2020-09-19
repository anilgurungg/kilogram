import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI
} from '../types';

const initialState = { loading: false, errors: {} };

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_UI:
      return { ...state, loading: true };
    case STOP_LOADING_UI:
      return { ...state, loading: false };
    case SET_ERRORS:
      return { loading: false, errors: action.payload };
    case CLEAR_ERRORS:
      return { loading: false, errors: {} };
    default:
      return state;
  }
}
