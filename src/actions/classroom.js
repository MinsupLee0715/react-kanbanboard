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
