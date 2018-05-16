import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  get: {
    status: "INIT",
    project: []
  },
  post: { status: "INIT" },
  put: { status: "INIT" },
  getStandbyProejct: { status: "INIT" }
};

export default function project(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {

    /* get project */
    case types.GET_PROJECT:
      return update(state, {
        get: {
          status: { $set: "WAIT" }
        }
      });
    case types.GET_PROJECT_SUCCESS:
      return update(state, {
        get: {
          status: { $set: "SUCCESS" },
          project: { $set: action.result }
        }
      });
    case types.GET_PROJECT_FAILURE:
      return update(state, {
        get: {
          status: { $set: "FAILURE" }
        }
      });

    /* post project */
    case types.POST_PROJECT:
      return update(state, {
        post: {
          status: { $set: "WAIT" }
        }
      });
    case types.POST_PROJECT_SUCCESS:
      return update(state, {
        post: {
          status: { $set: "SUCCESS" }
        }
      });
    case types.POST_PROJECT_FAILURE:
      return update(state, {
        post: {
          status: { $set: "FAILURE" }
        }
      });

    /* put project */
    case types.PUT_PROJECT:
      return update(state, {
        put: {
          status: { $set: "WAIT" }
        }
      });
    case types.PUT_PROJECT_SUCCESS:
      return update(state, {
        put: {
          status: { $set: "SUCCESS" }
        }
      });
    case types.PUT_PROJECT_FAILURE:
      return update(state, {
        put: {
          status: { $set: "FAILURE" }
        }
      });

    /* get project */
    case types.GET_STANDBY_PROJECT:
      return update(state, {
        getStandbyProejct: {
          status: { $set: "WAIT" }
        }
      });
    case types.GET_STANDBY_PROJECT_SUCCESS:
      return update(state, {
        getStandbyProejct: {
          status: { $set: "SUCCESS" }
        }
      });
    case types.GET_STANDBY_PROJECT_FAILURE:
      return update(state, {
        getStandbyProejct: {
          status: { $set: "FAILURE" }
        }
      });

    default: return state;
  }
}