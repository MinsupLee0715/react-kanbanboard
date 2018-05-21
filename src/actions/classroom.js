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
export function selectClass(classInfo) {
  return { type: types.SELECT_CLASS, classInfo };
}

export function selectClassRequest(classInfo) {
  return (dispatch) => {
    dispatch(selectClass(classInfo));
  };
}

/* get class student */
export function getClassStudent() {
  return { type: types.GET_CLASS_STUDENT };
}

export function getClassStudentSuccess(classStudent) {
  return { type: types.GET_CLASS_STUDENT_SUCCESS, classStudent };
}

export function getClassStudentFailure() {
  return { type: types.GET_CLASS_STUDENT_FAILURE };
}

export function getClassStudentRequest(classID) {
  return (dispatch) => {
    dispatch(getClassStudent());

    return axios
      .get(`/api/classroom/getClassStudent?classID=${ classID }`)
      .then((res) => {
        dispatch(getClassStudentSuccess(res.data.result));
      })
      .catch((err) => {
        dispatch(getClassStudentFailure());
      });
  };
}