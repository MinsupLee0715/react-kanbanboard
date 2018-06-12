import axios from 'axios';
import * as types from './ActionTypes';

/* GET SearchProject */
export function getSearchProject() {
  return { type: types.GET_MESSAGE };
}

export function getSearchProjectSuccess(project) {
  return { type: types.GET_MESSAGE_SUCCESS, project };
}

export function getSearchProjectFailure() {
  return { type: types.GET_MESSAGE_FAILURE };
}

export function getSearchProjectRequest(searchData) {
  return (dispatch) => {
    dispatch(getSearchProject());

    return axios
      .get(`/api/classroom/search/${ searchData }`)
      .then((res) => {
        dispatch(getSearchProjectSuccess(res.data.result));
      })
      .catch((err) => {
        dispatch(getSearchProjectFailure());
      });
  };
}
