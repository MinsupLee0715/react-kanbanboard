import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  get: {
    status: "INIT",
    message: []
  },
};

export default function message(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {

    /* get message */
    case types.GET_MESSAGE:
      return update(state, {
        get: { status: { $set: "WAIT" } }
      });
    case types.GET_MESSAGE_SUCCESS:
      return update(state, {
        get: {
          status: { $set: "SUCCESS" },
          message: { $set: action.message }
        }
      });
    case types.GET_MESSAGE_FAILURE:
      return update(state, {
        get: { status: { $set: "FAILURE" } }
      });

    default: return state;
  }
}