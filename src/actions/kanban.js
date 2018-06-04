import axios from 'axios';
import * as types from './ActionTypes';
import { message } from 'antd';

/* GET kanbanList */
export function getKanbanList() {
  return { type: types.GET_KANBAN_LIST };
}

export function getKanbanListSuccess(result) {
  return { type: types.GET_KANBAN_LIST_SUCCESS, result };
}

export function getKanbanListFailure() {
  return { type: types.GET_KANBAN_LIST_FAILURE };
}

export function getKanbanListRequest(projectID) {
  return (dispatch) => {
    dispatch(getKanbanList());

    return axios
      .get(`/api/classroom/kanban?projectID=${ projectID }`)
      .then((res) => {
        dispatch(getKanbanListSuccess(res.data.result));
      })
      .catch((err) => {
        message.info('데이터가 없습니다.');
        dispatch(getKanbanListFailure());
      });
  };
}

/* GET kanban */
export function getKanban() {
  return { type: types.GET_KANBAN };
}

export function getKanbanSuccess(result) {
  return { type: types.GET_KANBAN_SUCCESS, result };
}

export function getKanbanFailure() {
  return { type: types.GET_KANBAN_FAILURE };
}

export function getKanbanRequest(kanbanID) {
  return (dispatch) => {
    dispatch(getKanban());

    return axios
      .get(`/api/classroom/kanban/kanbanInfo/${ kanbanID }`)
      .then((res) => {
        dispatch(getKanbanSuccess(res.data.result));
      })
      .catch((err) => {
        message.error('문제가 발생했습니다.');
        dispatch(getKanbanFailure());
      });
  };
}

/* POST kanban */
export function postKanban() {
  return { type: types.POST_KANBAN };
}

export function postKanbanSuccess() {
  return { type: types.POST_KANBAN_SUCCESS };
}

export function postKanbanFailure() {
  return { type: types.POST_KANBAN_FAILURE };
}

export function postKanbanRequest(projectID, title, content) {
  return (dispatch) => {
    dispatch(postKanban());

    return axios
      .post('/api/classroom/kanban', { projectID, title, content })
      .then((res) => {
        dispatch(postKanbanSuccess());
      })
      .catch((err) => {
        message.error('문제가 발생했습니다.');
        dispatch(postKanbanFailure());
      });
  };
}

/* PUT kanban status */
export function putKanbanStatus() {
  return { type: types.PUT_KANBAN_STATUS };
}

export function putKanbanStatusSuccess() {
  return { type: types.PUT_KANBAN_STATUS_SUCCESS };
}

export function putKanbanStatusFailure() {
  return { type: types.PUT_KANBAN_STATUS_FAILURE };
}

export function putKanbanStatusRequest(classID, kanbanID, status) {
  return (dispatch) => {
    dispatch(putKanbanStatus());

    return axios
      .put('/api/classroom/kanban/status', { classID, kanbanID, status })
      .then((res) => {
        dispatch(putKanbanStatusSuccess());
      })
      .catch((err) => {
        message.error('문제가 발생했습니다.');
        dispatch(putKanbanStatusFailure());
      });
  };
}


/* PUT kanban info */
export function putKanbanInfo() {
  return { type: types.PUT_KANBAN_INFO };
}

export function putKanbanInfoSuccess() {
  return { type: types.PUT_KANBAN_INFO_SUCCESS };
}

export function putKanbanInfoFailure() {
  return { type: types.PUT_KANBAN_INFO_FAILURE };
}

export function putKanbanInfoRequest(kanbanID, title, content, contribute) {
  return (dispatch) => {
    dispatch(putKanbanInfo());

    return axios
      .put('/api/classroom/kanban', { kanbanID, title, content, contribute })
      .then((res) => {
        dispatch(putKanbanInfoSuccess());
      })
      .catch((err) => {
        message.error('문제가 발생했습니다.');
        dispatch(putKanbanInfoFailure());
      });
  };
}

/* DELETE kanban */
export function deleteKanban() {
  return { type: types.DELETE_KANBAN };
}

export function deleteKanbanSuccess() {
  return { type: types.DELETE_KANBAN_SUCCESS };
}

export function deleteKanbanFailure() {
  return { type: types.DELETE_KANBAN_FAILURE };
}

export function deleteKanbanRequest(kanbanID) {
  return (dispatch) => {
    dispatch(deleteKanban());

    return axios
      .delete(`/api/classroom/kanban/${ kanbanID }`)
      .then((res) => {
        dispatch(deleteKanbanSuccess());
      })
      .catch((err) => {
        message.error('문제가 발생했습니다.');
        dispatch(deleteKanbanFailure());
      });
  };
}