import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  login: {
    status: "INIT"
  },
  status: {
    valid: false,
    isLogin: false,
    currentUser: {}
  }
};

export default function auth(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {

    /* Get Status */
    case types.AUTH_GET_STATUS:
      return update(state, {
        status: {
          isLogin: { $set: true }
        }
      });
    case types.AUTH_GET_STATUS_SUCCESS:
      return update(state, {
        status: {
          valid: { $set: true },
          currentUser: { $set: action.userinfo }
        }
      });
    case types.AUTH_GET_STATUS_FAILURE:
      return update(state, {
        status: {
          valid: { $set: false },
          isLogin: { $set: false }
        }
      });

    /* Login */
    case types.AUTH_LOGIN:
      return update(state, {
        login: {
          status: { $set: "WAITING" }
        }
      });
    case types.AUTH_LOGIN_SUCCESS:
      return update(state, {
        login: {
          status: { $set: "SUCCESS" }
        },
        status: {
          isLogin: { $set: true },
          currentUser: { $set: action.userinfo }
        }
      });
    case types.AUTH_LOGIN_FAILURE:
      return update(state, {
        login: {
          status: { $set: "FAILURE" }
        }
      });

    /* Logout */
    case types.AUTH_LOGOUT:
      return update(state, {
        status: {
          isLogin: { $set: false },
          currentUser: { $set: {} }
        }
      });

    default: return state;
  }
}