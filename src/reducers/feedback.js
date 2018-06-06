import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  get: {
    status: "INIT",
    feedback: []
  },
  post: { status: "INIT" }
};

export default function feedback(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {

    /* get notice */
    case types.GET_FEEDBACK:
      return update(state, {
        get: {
          status: { $set: "WAIT" }
        }
      });
    case types.GET_FEEDBACK_SUCCESS:
      return update(state, {
        get: {
          status: { $set: "SUCCESS" },
          feedback: { $set: action.result }
        }
      });
    case types.GET_FEEDBACK_FAILURE:
      return update(state, {
        get: {
          status: { $set: "FAILURE" }
        }
      });

    /* post notice */
    case types.POST_FEEDBACK:
      return update(state, {
        post: {
          status: { $set: "WAIT" }
        }
      });
    case types.POST_FEEDBACK_SUCCESS:
      return update(state, {
        post: {
          status: { $set: "SUCCESS" }
        }
      });
    case types.POST_FEEDBACK_FAILURE:
      return update(state, {
        post: {
          status: { $set: "FAILURE" }
        }
      });

    default: return state;
  }
}