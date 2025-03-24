// src/store/reducers/authReducer.ts
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/authActions';

const initialState = {
  token: null,
  error: null,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, token: action.payload, error: null };
    case LOGIN_FAILURE:
      return { ...state, error: action.payload };
    case LOGOUT:
      return { ...state, token: null, error: null };
    default:
      return state;
  }
};

export default authReducer;