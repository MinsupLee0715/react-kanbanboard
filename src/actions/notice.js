import axios from 'axios';
import * as types from './ActionTypes';

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

export function postNoticeRequest(_id, title, content) {
  return (dispatch) => {
    dispatch(postNotice());

    return axios
      .post('/api/classroom/notice', { _id, title, content })
      .then((res) => {
        dispatch(postNoticeSuccess());
      })
      .catch((err) => {
        dispatch(postNoticeFailure());
      });
  };
}