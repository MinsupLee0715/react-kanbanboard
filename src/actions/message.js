import axios from 'axios';
import * as types from './ActionTypes';

/* GET message */
export function getMessage() {
  return { type: types.GET_MESSAGE };
}

export function getMessageSuccess(message) {
  return { type: types.GET_MESSAGE_SUCCESS, message };
}

export function getMessageFailure() {
  return { type: types.GET_MESSAGE_FAILURE };
}

export function getMessageRequest() {
  return (dispatch) => {
    dispatch(getMessage());

    return axios
      .get('/api/account/message')
      .then((res) => {
        dispatch(getMessageSuccess(res.data.result));
      })
      .catch((err) => {
        dispatch(getMessageFailure());
      });
  };
}

/* PUT Read Message */
export function putReadMessageRequest(messageID) {
  return (dispatch) => {
    return axios
      .put('/api/classroom/read', { messageID })
      .then((res) => {
        console.log('메시지를 읽음');
      });
  };
}