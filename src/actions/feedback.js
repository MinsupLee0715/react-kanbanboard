import axios from 'axios';
import * as types from './ActionTypes';

/* GET feedback */
export function getFeedback() {
  return { type: types.GET_FEEDBACK };
}

export function getFeedbackSuccess(result) {
  return { type: types.GET_FEEDBACK_SUCCESS, result };
}

export function getFeedbackFailure() {
  return { type: types.GET_FEEDBACK_FAILURE };
}

export function getFeedbackRequest(kanbanID) {
  return (dispatch) => {
    dispatch(getFeedback());

    return axios
      .get(`/api/classroom/kanban/feedback/${ kanbanID }`)
      .then((res) => {
        dispatch(getFeedbackSuccess(res.data.result));
      })
      .catch((err) => {
        dispatch(getFeedbackFailure());
      });
  };
}


/* POST feedback */
export function postFeedback() {
  return { type: types.POST_FEEDBACK };
}

export function postFeedbackSuccess() {
  return { type: types.POST_FEEDBACK_SUCCESS };
}

export function postFeedbackFailure() {
  return { type: types.POST_FEEDBACK_FAILURE };
}

export function postFeedbackRequest(kanbanID, content) {
  return (dispatch) => {
    dispatch(postFeedback());

    return axios
      .post('/api/classroom/kanban/feedback', { kanbanID, content })
      .then((res) => {
        dispatch(postFeedbackSuccess());
      })
      .catch((err) => {
        dispatch(postFeedbackFailure());
      });
  };
}
