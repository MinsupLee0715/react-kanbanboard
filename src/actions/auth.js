import axios from 'axios';
import * as types from './ActionTypes';

/* getStatus */
export function getStatus() {
  return { type: types.AUTH_GET_STATUS };
}

export function getStatusSuccess(userinfo) {
  return { type: types.AUTH_GET_STATUS_SUCCESS, userinfo };
}

export function getStatusFailure() {
  return { type: types.AUTH_GET_STATUS_FAILURE };
}

export function getStatusRequest() {
  return (dispatch) => {
    dispatch(getStatus());

    return axios
      .get('/api/account/isLogin')
      .then((res) => {
        dispatch(getStatusSuccess(res.data.result));
      })
      .catch((err) => {
        dispatch(getStatusFailure());
      });
  };
}

/* Login */
export function login() {
  return { type: types.AUTH_LOGIN };
}

export function loginSuccess(userinfo) {
  return { type: types.AUTH_LOGIN_SUCCESS, userinfo };
}

export function loginFailure() {
  return { type: types.AUTH_LOGIN_FAILURE };
}

export function loginRequest(userid, password, type) {
  return (dispatch) => {
    dispatch(login());

    return axios
      .post('/api/account/login', { userid, password, type })
      .then((res) => {
        dispatch(loginSuccess(res.data.result));
      })
      .catch((err) => {
        dispatch(loginFailure());
      });
  };
}

/* Logout */

export function logout() {
  return { type: types.AUTH_LOGOUT };
}

export function logoutRequest() {
  return (dispatch) => {
    return axios
      .get('/api/account/logout')
      .then((res) => {
        dispatch(logout());
      });
  };
}