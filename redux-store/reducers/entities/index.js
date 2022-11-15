import {combineReducers} from 'redux';
import auth from './auth';
import appUtil from './appUtil';
import claimUtil from './claimUtil'
export default combineReducers({
  auth,
  appUtil,
  claimUtil
});
