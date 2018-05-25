import axios from 'axios';
import * as types from './ActionTypes';
import { message } from 'antd';

/* GET kanbanList */
export function getKanbanList() {
  return { type: types.GET_KANBAN };
}

export function getKanbanListSuccess(result) {
  return { type: types.GET_KANBAN_SUCCESS, result };
}

export function getKanbanListFailure() {
  return { type: types.GET_KANBAN_FAILURE };
}

export function getKanbanListRequest(projectID) {
  return (dispatch) => {
    dispatch(getKanbanList());

    return axios
      .get(`/api/classroom/kanban?projectID${ projectID }`)
      .then((res) => {
        dispatch(getKanbanListSuccess(res.data.result));
      })
      .catch((err) => {
        message.error('문제가 발생했습니다.');
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
      .get(`/api/classroom/kanban/${ kanbanID }`)
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

////////////////////////////////////////////////////////////////
// 아래로 미구현
////////////////////////////////////////////////////////////////

/* PUT kanban */
export function putKanban() {
  return { type: types.PUT_KANBAN };
}

export function putKanbanSuccess() {
  return { type: types.PUT_KANBAN_SUCCESS };
}

export function putKanbanFailure() {
  return { type: types.PUT_KANBAN_FAILURE };
}

export function putKanbanRequest(projectid) {
  return (dispatch) => {
    dispatch(putKanban());

    return axios
      .put('/api/classroom/kanban', { projectid })
      .then((res) => {
        dispatch(putKanbanSuccess());
      })
      .catch((err) => {
        dispatch(putKanbanFailure());
      });
  };
}

/* DELETE kanban */
export function deleteKanban() {
  return { type: types.PUT_KANBAN };
}

export function deleteKanbanSuccess() {
  return { type: types.PUT_KANBAN_SUCCESS };
}

export function deleteKanbanFailure() {
  return { type: types.PUT_KANBAN_FAILURE };
}

export function deleteKanbanRequest(projectid) {
  return (dispatch) => {
    dispatch(deleteKanban());

    return axios
      .put('/api/classroom/kanban', { projectid })
      .then((res) => {
        dispatch(deleteKanbanSuccess());
      })
      .catch((err) => {
        dispatch(deleteKanbanFailure());
      });
  };
}