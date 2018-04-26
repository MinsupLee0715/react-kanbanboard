import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  post: { status: "INIT" }
};

export default function classroom(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {

    /* post notice */
    case types.POST_NOTICE:
      return update(state, {
        post: {
          status: { $set: "WAIT" }
        }
      });
    case types.POST_NOTICE_SUCCESS:
      return update(state, {
        post: {
          status: { $set: "SUCCESS" }
        }
      });
    case types.POST_NOTICE_FAILURE:
      return update(state, {
        post: {
          status: { $set: "FAILURE" }
        }
      });

    default: return state;
  }
}