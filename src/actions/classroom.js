import axios from 'axios';
import * as types from './ActionTypes';

/* getClassroom */
export function getClassroom() {
  return { type: types.GET_CLASSROOM };
}

export function getClassroomSuccess(classes) {
  return { type: types.GET_CLASSROOM_SUCCESS, classes };
}

export function getClassroomFailure() {
  return { type: types.GET_CLASSROOM_FAILURE };
}

export function getClassroomRequest() {
  return (dispatch) => {
    dispatch(getClassroom());

    return axios
      .post('/api/classroom/myclassrooms')
      .then((res) => {
        dispatch(getClassroomSuccess(res.data.result));
      })
      .catch((err) => {
        dispatch(getClassroomFailure());
      });
  };
}

/* select class */
export function selectClass() {
  return { type: types.SELECT_CLASS };
}

export function selectClassSuccess(selected) {
  return { type: types.SELECT_CLASS_SUCCESS, selected };
}

export function selectClassFailure() {
  return { type: types.SELECT_CLASS_FAILURE };
}

export function selectClassRequest(classid) {
  return (dispatch) => {
    dispatch(selectClass());

    return axios
      .post('/api/classroom', { classid })
      .then((res) => {
        dispatch(selectClassSuccess(res.data.result[0]));
      })
      .catch((err) => {
        dispatch(selectClassFailure());
      });
  };
}
