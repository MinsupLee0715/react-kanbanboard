import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  getClasses: {
    status: "INIT",
    classroom: {}
  },
  selectedClass: {
    status: "INIT",
    classInfo: {}
  }
};

export default function classroom(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {

    /* Get Classrooms */
    case types.GET_CLASSROOM:
      return update(state, {
        getClasses: {
          status: { $set: "WAIT" }
        }
      });
    case types.GET_CLASSROOM_SUCCESS:
      return update(state, {
        getClasses: {
          status: { $set: "SUCCESS" },
          classroom: { $set: action.classes }
        }
      });
    case types.GET_CLASSROOM_FAILURE:
      return update(state, {
        getClasses: {
          status: { $set: "FAILURE" }
        }
      });

    /* Select Class */
    case types.SELECT_CLASS:
      return update(state, {
        selectedClass: {
          status: { $set: "WAIT" }
        }
      });
    case types.SELECT_CLASS_SUCCESS:
      return update(state, {
        selectedClass: {
          status: { $set: "SUCCESS" },
          classInfo: { $set: action.selected }
        }
      });
    case types.SELECT_CLASS_FAILURE:
      return update(state, {
        selectedClass: {
          status: { $set: "FAILURE" }
        }
      });

    default: return state;
  }
}