import axios from 'axios';
import * as types from './ActionTypes';

/* GET notice */
export function getNotice() {
  return { type: types.GET_NOTICE };
}

export function getNoticeSuccess(selected) {
  return { type: types.GET_NOTICE_SUCCESS, selected };
}

export function getNoticeFailure() {
  return { type: types.GET_NOTICE_FAILURE };
}

export function getNoticeRequest(classID) {
  return (dispatch) => {
    dispatch(getNotice());

    return axios
      .get(`/api/classroom/notice?classID=${ classID }`)
      .then((res) => {
        dispatch(getNoticeSuccess(res.data.result));
      })
      .catch((err) => {
        dispatch(getNoticeFailure());
      });
  };
}

/* POST notice */
export function postNotice() {
  return { type: types.POST_NOTICE };
}

export function postNoticeSuccess() {
  return { type: types.POST_NOTICE_SUCCESS };
}

export function postNoticeFailure() {
  return { type: types.POST_NOTICE_FAILURE };
}

export function postNoticeRequest(classID, title, content) {
  return (dispatch) => {
    dispatch(postNotice());

    return axios
      .post('/api/classroom/notice', { classID, title, content })
      .then((res) => {
        dispatch(postNoticeSuccess());
      })
      .catch((err) => {
        dispatch(postNoticeFailure());
      });
  };
}

/* NOTICE notice */
export function deleteNotice() {
  return { type: types.DELETE_NOTICE };
}

export function deleteNoticeSuccess() {
  return { type: types.DELETE_NOTICE_SUCCESS };
}

export function deleteNoticeFailure() {
  return { type: types.DELETE_NOTICE_FAILURE };
}

export function deleteNoticeRequest(noticeID) {
  return (dispatch) => {
    dispatch(deleteNotice());

    return axios
      .delete(`/api/classroom/notice/${ noticeID }`)
      .then((res) => {
        dispatch(deleteNoticeSuccess());
      })
      .catch((err) => {
        dispatch(deleteNoticeFailure());
      });
  };
}