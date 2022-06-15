import {combineReducers} from 'redux';

const INIT_STATE = {
  profile: null,
};

const userInfo = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'SAVE_PROFILE':
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  userInfo,
});
