import {combineReducers} from 'redux';

const INIT_STATE = {
  loading: false,
  registrationScreenCode: 0,
  typeOfClaim: 'CFR',
  formSaveDir: '',
  language: 'hi', // not used yet
  name: '',
  formData: [],
  verificationAadharFrontUrl: '',
  verificationAadharBackUrl: '',
  formUploadSyncStatus: false,
  globalSyncStatus: false,
  OneSignalSubsToken: '',
  forgotFeature: false,
  extraImageFormCountForSync: {
    SDM_SUMMON_RESULT_1: 0,
    SDM_SUMMON_RESULT_2: 0,
    SDM_SUMMON_RESULT_3: 0,
    SDM_SUMMON_RESULT_4: 0,
    SDM_SUMMON_RESULT_5: 0,
    SDM_SUMMON_RESULT_6: 0,
    SDM_SUMMON_RESULT_7: 0,
    SDM_SUMMON_RESULT_8: 0,
    SDM_SUMMON_RESULT_9: 0,
    SDM_SUMMON_RESULT_10: 0,
    SDM_SUMMON_RESULT_11: 0,
    SDM_SUMMON_RESULT_12: 0,
    SDM_SUMMON_RESULT_13: 0,
    SDM_SUMMON_RESULT_14: 0,
    SDM_SUMMON_RESULT_15: 0,
    SDM_SUMMON_RESULT_16: 0,
    SDM_SUMMON_RESULT_17: 0,
    SDM_SUMMON_RESULT_18: 0,
  },
};

const appUtil = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_TYPE_OF_CLAIM':
      return {
        ...state,
        typeOfClaim: action.payload,
      };
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
      console.log('OO', oldFormData);
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

    case 'UPDATE_APPUTIL_KEY':
      return {
        ...state,
      };
    case 'UPDATE_TOSYNC_COUNT':
      console.warn('skydone', action.payload);

      let olddata = Object.assign({}, state?.extraImageFormCountForSync);
      olddata[action.payload?.label] = action.payload?.value;
      return {
        ...state,
        extraImageFormCountForSync: olddata,
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
