import {combineReducers} from 'redux';

const INIT_STATE = {
  loading: false,
  registrationScreenCode: 0,
  language: 'hi', // not used yet
  name: '',
};

const appUtil = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'ENABLE_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'DISABLE_LOADING':
      return {
        ...state,
        loading: false,
      };
    case 'UPDATE_REGISTRATION_SCREEN_CODE':
      return {
        ...state,
        registrationScreenCode: action.payload,
      };
    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};

export const selectName = state => state.entities.appUtil.appUtil.name;

export default combineReducers({
  appUtil,
});
