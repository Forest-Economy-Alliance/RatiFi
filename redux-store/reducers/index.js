import {combineReducers} from 'redux';
import entities from './entities';

const appReducers = combineReducers({
  entities,
});

const rootReducer = (state, action) => {
  return appReducers(state, action);
};

export default rootReducer;
