import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  getClasses: {
    status: "INIT",
    classroom: {}
  },
  selectedClass: {
    classInfo: {}
  },
  classStudent: {
    status: "INIT",
    student: {}
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
          classInfo: { $set: action.classInfo }
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