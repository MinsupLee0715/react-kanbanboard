import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  getClasses: {
    status: "INIT",
    classroom: {}
  },
  selectedClass: {
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

    default: return state;
  }
}