import axios from 'axios';
import * as types from './ActionTypes';

/* GET project */
export function getProject() {
  return { type: types.GET_PROJECT };
}

export function getProjectSuccess(result) {
  return { type: types.GET_PROJECT_SUCCESS, result };
}

export function getProjectFailure() {
  return { type: types.GET_PROJECT_FAILURE };
}

export function getProjectRequest(classID, projectID) {
  return (dispatch) => {
    dispatch(getProject());

    return axios
      .get(`/api/classroom/project?classID=${ classID }&peojectID=${ projectID }`)
      .then((res) => {
        dispatch(getProjectSuccess(res.data.result));
      })
      .catch((err) => {
        dispatch(getProjectFailure());
      });
  };
}

/* POST project */
export function postProject() {
  return { type: types.POST_PROJECT };
}

export function postProjectSuccess() {
  return { type: types.POST_PROJECT_SUCCESS };
}

export function postProjectFailure() {
  return { type: types.POST_PROJECT_FAILURE };
}

export function postProjectRequest(classid, title, content) {
  return (dispatch) => {
    dispatch(postProject());

    return axios
      .post('/api/classroom/project', { classid, title, content })
      .then((res) => {
        dispatch(postProjectSuccess());
      })
      .catch((err) => {
        dispatch(postProjectFailure());
      });
  };
}

/* PUT project */
export function putProject() {
  return { type: types.PUT_PROJECT };
}

export function putProjectSuccess() {
  return { type: types.PUT_PROJECT_SUCCESS };
}

export function putProjectFailure() {
  return { type: types.PUT_PROJECT_FAILURE };
}

export function putProjectRequest(projectid, status) {
  return (dispatch) => {
    dispatch(putProject());

    return axios
      .put('/api/classroom/project', { projectid, status })
      .then((res) => {
        dispatch(putProjectSuccess());
      })
      .catch((err) => {
        dispatch(putProjectFailure());
      });
  };
}

/* GET standby project */
export function getStandbyProject() {
  return { type: types.GET_STANDBY_PROJECT };
}

export function getStandbyProjectSuccess() {
  return { type: types.GET_STANDBY_PROJECT_SUCCESS };
}

export function getStandbyProjectFailure() {
  return { type: types.GET_STANDBY_PROJECT_FAILURE };
}

export function getStandbyProjectRequest(classID) {
  return (dispatch) => {
    dispatch(getStandbyProject());

    return axios
      .get(`/api/classroom/project?classID=${ classID }`)
      .then((res) => {
        dispatch(getStandbyProjectSuccess());
      })
      .catch((err) => {
        dispatch(getStandbyProjectFailure());
      });
  };
}