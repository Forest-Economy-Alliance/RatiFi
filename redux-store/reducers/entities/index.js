import {combineReducers} from 'redux';
import auth from './auth';
import appUtil from './appUtil';
export default combineReducers({
  auth,
  appUtil,
});
