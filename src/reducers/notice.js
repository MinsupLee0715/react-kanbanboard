import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  get: { status: "INIT" },
  post: { status: "INIT" },
  delete: { status: "INIT" },
  notice: []
};

export default function classroom(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {

    /* get notice */
    case types.GET_NOTICE:
      return update(state, {
        get: {
          status: { $set: "WAIT" }
        }
      });
    case types.GET_NOTICE_SUCCESS:
      return update(state, {
        get: {
          status: { $set: "SUCCESS" }
        },
        notice: { $set: action.selected }
      });
    case types.GET_NOTICE_FAILURE:
      return update(state, {
        get: {
          status: { $set: "FAILURE" }
        }
      });

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

      /* delete notice */
      case types.DELETE_NOTICE:
        return update(state, {
          delete: {
            status: { $set: "WAIT" }
          }
        });
      case types.DELETE_NOTICE_SUCCESS:
        return update(state, {
          delete: {
            status: { $set: "SUCCESS" }
          }
        });
      case types.DELETE_NOTICE_FAILURE:
        return update(state, {
          delete: {
            status: { $set: "FAILURE" }
          }
        });

    default: return state;
  }
}