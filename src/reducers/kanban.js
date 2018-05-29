import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  getList: {
    status: "INIT",
    kanbanList: []
  },
  get: {
    status: "INIT",
    kanban: []
  },
  post: { status: "INIT" },
  put: { status: "INIT" },
  putStatus: { status: "INIT" },
  delete: { status: "INIT" }
};

export default function kanban(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {

    /* get kanbanList */
    case types.GET_KANBAN_LIST:
      return update(state, {
        getList: {
          status: { $set: "WAIT" }
        }
      });
    case types.GET_KANBAN_LIST_SUCCESS:
      return update(state, {
        getList: {
          status: { $set: "SUCCESS" },
          kanbanList: { $set: action.result }
        }
      });
    case types.GET_KANBAN_LIST_FAILURE:
      return update(state, {
        getList: {
          status: { $set: "FAILURE" }
        }
      });

    /* get one kanban */
    case types.GET_KANBAN:
      return update(state, {
        get: {
          status: { $set: "WAIT" }
        }
      });
    case types.GET_KANBAN_SUCCESS:
      return update(state, {
        get: {
          status: { $set: "SUCCESS" },
          kanban: { $set: action.result }
        }
      });
    case types.GET_KANBAN_FAILURE:
      return update(state, {
        get: {
          status: { $set: "FAILURE" }
        }
      });

    /* post kanban */
    case types.POST_KANBAN:
      return update(state, {
        post: {
          status: { $set: "WAIT" }
        }
      });
    case types.POST_KANBAN_SUCCESS:
      return update(state, {
        post: {
          status: { $set: "SUCCESS" }
        }
      });
    case types.POST_KANBAN_FAILURE:
      return update(state, {
        post: {
          status: { $set: "FAILURE" }
        }
      });

    /* put kanban */
    case types.PUT_KANBAN:
      return update(state, {
        put: {
          status: { $set: "WAIT" }
        }
      });
    case types.PUT_KANBAN_SUCCESS:
      return update(state, {
        put: {
          status: { $set: "SUCCESS" }
        }
      });
    case types.PUT_KANBAN_FAILURE:
      return update(state, {
        put: {
          status: { $set: "FAILURE" }
        }
      });

    /* put kanban status */
    case types.PUT_KANBAN_STATUS:
      return update(state, {
        putStatus: {
          status: { $set: "WAIT" }
        }
      });
    case types.PUT_KANBAN_STATUS_SUCCESS:
      return update(state, {
        putStatus: {
          status: { $set: "SUCCESS" }
        }
      });
    case types.PUT_KANBAN_STATUS_FAILURE:
      return update(state, {
        putStatus: {
          status: { $set: "FAILURE" }
        }
      });

    /* delete kanban */
    case types.DELETE_KANBAN:
      return update(state, {
        delete: {
          status: { $set: "WAIT" }
        }
      });
    case types.DELETE_KANBAN_SUCCESS:
      return update(state, {
        delete: {
          status: { $set: "SUCCESS" }
        }
      });
    case types.DELETE_KANBAN_FAILURE:
      return update(state, {
        delete: {
          status: { $set: "FAILURE" }
        }
      });

    default: return state;
  }
}