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

export function getNoticeRequest(classid) {
  return (dispatch) => {
    dispatch(getNotice());

    return axios
      .get(`/api/classroom/notice?classid=${ classid }`)
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

export function postNoticeRequest(classid, title, content) {
  return (dispatch) => {
    dispatch(postNotice());

    return axios
      .post('/api/classroom/notice', { classid, title, content })
      .then((res) => {
        dispatch(postNoticeSuccess());
      })
      .catch((err) => {
        dispatch(postNoticeFailure());
      });
  };
}