import auth from './auth';
import classroom from './classroom';

import { combineReducers } from 'redux';

export default combineReducers({
  auth,
  classroom
});