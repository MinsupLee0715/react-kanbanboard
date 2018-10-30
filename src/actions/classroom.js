import axios from 'axios';
import * as types from './ActionTypes';

/* getClassList */
export function getClassList() {
  return { type: types.GET_CLASS_LIST };
}

export function getClassListSuccess(classes) {
  return { type: types.GET_CLASS_LIST_SUCCESS, classes };
}

export function getClassListFailure() {
  return { type: types.GET_CLASS_LIST_FAILURE };
}

export function getClassListRequest() {
  return (dispatch) => {
    dispatch(getClassList());

    return axios
      .post('/api/classroom/myclassrooms')
      .then((res) => {
        dispatch(getClassListSuccess(res.data.result));
      })
      .catch((err) => {
        dispatch(getClassListFailure());
      });
  };
}

/* getClassInfo */
export function getClassInfo() {
  return { type: types.GET_CLASS_INFO };
}
export function getClassInfoSuccess(classInfo) {
  return { type: types.GET_CLASS_INFO_SUCCESS, classInfo };
}
export function getClassInfoFailure() {
  return { type: types.GET_CLASS_INFO_FAILURE };
}
export function getClassInfoRequest(classID) {
  return (dispatch) => {
    dispatch(getClassInfo());

    return axios
      .get(`/api/classroom/getClassInfo/${ classID }`)
      .then((res) => {
        dispatch(getClassInfoSuccess(res.data.result));
      })
      .catch((err) => {
        dispatch(getClassInfoFailure());
      });
  };
}

/* select class */
/* export function selectClass(classInfo) {
  return { type: types.SELECT_CLASS, classInfo };
} */

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