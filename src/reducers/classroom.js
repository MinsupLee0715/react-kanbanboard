import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  getClasses: {
    status: "INIT",
    classroom: []
  },
  getClassInfo: {
    status: "INIT",
    info: {}
  },
  classStudent: {
    status: "INIT",
    student: []
  }
};

export default function classroom(state, action) {
  if (typeof state === "undefined") {
    state = initialState;
  }

  switch (action.type) {

    /* Get Classrooms */
    case types.GET_CLASS_LIST:
      return update(state, {
        getClasses: {
          status: { $set: "WAIT" }
        }
      });
    case types.GET_CLASS_LIST_SUCCESS:
      return update(state, {
        getClasses: {
          status: { $set: "SUCCESS" },
          classroom: { $set: action.classes }
        }
      });
    case types.GET_CLASS_LIST_FAILURE:
      return update(state, {
        getClasses: {
          status: { $set: "FAILURE" }
        }
      });

    /* Get Class Info */
    case types.GET_CLASS_INFO:
      return update(state, {
        getClassInfo: {
          status: { $set: "WAIT" }
        }
      });
    case types.GET_CLASS_INFO_SUCCESS:
      return update(state, {
        getClassInfo: {
          status: { $set: "SUCCESS" },
          info: { $set: action.classInfo }
        }
      });
    case types.GET_CLASS_INFO_FAILURE:
      return update(state, {
        getClassInfo: {
          status: { $set: "FAILURE" }
        }
      });

    /* Get Class Student */
    case types.GET_CLASS_STUDENT:
      return update(state, {
        classStudent: {
          status: { $set: "WAIT" }
        }
      });
    case types.GET_CLASS_STUDENT_SUCCESS:
      return update(state, {
        classStudent: {
          status: { $set: "SUCCESS" },
          student: { $set: action.classStudent }
        }
      });
    case types.GET_CLASS_STUDENT_FAILURE:
      return update(state, {
        classStudent: {
          status: { $set: "FAILURE" }
        }
      });

    default: return state;
  }
}