import auth from './auth';
import classroom from './classroom';
import notice from './notice';
import project from './project';
import kanban from './kanban';

import { combineReducers } from 'redux';

export default combineReducers({
  auth,
  classroom,
  notice,
  project,
  kanban
});