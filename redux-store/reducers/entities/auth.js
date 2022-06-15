import {combineReducers} from 'redux';

const INIT_STATE = {
  profile: null,
  DD: '-1',
  token: null,
};

const userInfo = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'SAVE_PROFILE':
      return {
        ...state,
        profile: action.payload,
      };
    case 'SAVE_DD':
      return {
        ...state,
        DD: action.payload,
      };
    case 'SAVE_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  userInfo,
});
