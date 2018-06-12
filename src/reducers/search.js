import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  status: "INIT",
  project: []
};

export default function search(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {

    /* Search Project */
    case types.GET_SEARCH_PROJECT:
      return update(state, {
        status: { $set: "WAIT" }
      });
    case types.GET_SEARCH_PROJECT_SUCCESS:
      return update(state, {
        status: { $set: "SUCCESS" },
        project: { $set: action.project }
      });
    case types.GET_SEARCH_PROJECT_FAILURE:
      return update(state, {
        status: { $set: "FAILURE" }
      });

    default: return state;
  }
}