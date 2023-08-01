import {combineReducers} from 'redux';

const INIT_STATE = {
  loading: false,
  registrationScreenCode: 0,
  formSaveDir: '',
  language: 'en', // not used yet
  name: '',
  formData: [],
};

const appUtil = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'SAVE_APP_LANGUAGE':
      return {
        ...state,
        language: action.payload,
      };
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
    case 'SAVE_FORM_DIR_URL':
      return {
        ...state,
        formSaveDir: action.payload,
      };
    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.payload,
      };

    case 'VERIFY_MEMBER':
      return {
        ...state,
        isVerified: true,
      };

    case 'UPDATE_FORMDATA':
      // console.log("ITS COMING");
      var oldFormData = state.formData || [];
      // console.log("OO",oldFormData)
      if (oldFormData?.length === 2) {
        oldFormData = [];
        oldFormData.push(action.payload);
      } else {
        oldFormData.push(action.payload);
      }
      // console.log("COMPLETE")
      return {
        ...state,
        formData: oldFormData,
      };

    case 'CLEAR_FORMS':
      return {
        ...state,
        formData: [],
      };
    default:
      return state;
  }
};

export const selectName = state => state.entities.appUtil.appUtil.name;

export default combineReducers({
  appUtil,
});
