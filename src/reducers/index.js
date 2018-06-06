import auth from './auth';
import classroom from './classroom';
import notice from './notice';
import project from './project';
import kanban from './kanban';
import message from './message';
import feedback from './feedback';

import { combineReducers } from 'redux';

export default combineReducers({
  auth,
  classroom,
  notice,
  project,
  kanban,
  message,
  feedback
});