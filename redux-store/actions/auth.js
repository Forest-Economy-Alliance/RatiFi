import {
  loginHandler,
  updateUserHandler,
  updatePasswordHandler,
  verifyOTPHandler,
} from '../../services/authService';
import {ToastAndroid} from 'react-native';
import {getDeviceHash} from '../../utils/DeviceUtil';

export const postOTPAction = (data, callback) => dispatch => {
  dispatch({type: 'ENABLE_LOADING'});
  return loginHandler(data)
    .then(async ({data: response}) => {
      console.log('RES', response);

      dispatch({type: 'SAVE_PROFILE', payload: response.data});
      const DD = await getDeviceHash();
    
      ToastAndroid.showWithGravityAndOffset(
        'OTP_SENT' + '  ' + response.data.otp,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      if (response.message === 'AVAILABLE') {
        dispatch({
          type: 'UPDATE_REGISTRATION_SCREEN_CODE',
          payload: 5,
        });
      }

      if (callback) {
        dispatch({type: 'SAVE_DD', payload: DD});
        dispatch({type: 'DISABLE_LOADING'});
        callback(response.data.success);
      }
    })
    .catch(err => {
      console.log('NETWOEK', err);
    });
};

export const verifyOTPAction = (data, callback) => dispatch => {
  dispatch({type: 'ENABLE_LOADING'});
  console.log(data);
  return verifyOTPHandler(data)
    .then(async ({data: response}) => {
      console.log('OTPR', response);
      if (response.success) {
        

        dispatch({type: 'SAVE_TOKEN', payload: response.data.token});
      }

      if (callback) {
        // if(response.message==="AVAILABLE")
        callback(response.message);
        dispatch({type: 'DISABLE_LOADING'});
      }
    })
    .catch(err => {
      console.log('NETWOEK', err);
      dispatch({type: 'DISABLE_LOADING'});
    });
};

export const updatePasswordAction = (data, callback) => dispatch => {
  dispatch({type: 'ENABLE_LOADING'});
  return updatePasswordHandler(data)
    .then(async ({data: response}) => {
      console.log('RES', response);
      if (response.success) {
        dispatch({type: 'SAVE_PROFILE', payload: response.data});

        dispatch({type: 'DISABLE_LOADING'});
      }

      if (callback) {
        callback(response.success);
      }
    })
    .catch(err => {
      console.log('NETWOEK', err);
    });
};

export const updateUserInfoAction = (data, callback) => dispatch => {
  console.log("DATA--",data);
  dispatch({type: 'ENABLE_LOADING'});
  return updateUserHandler(data)
    .then(async ({data: response}) => {
      console.log('RES--', response);

      dispatch({type: 'SAVE_PROFILE', payload: response.data});

      if (response.success) {
        dispatch({type: 'DISABLE_LOADING'});
      }
      console.log(response.success);
      if (callback) {
        // now checking if authLevel, i.e role Information is update
        // or location is updated as per code
        // location -> 4
        // role-> 5
        dispatch({
          type: 'UPDATE_REGISTRATION_SCREEN_CODE',
          payload: data.authLevel ? 5 : 4,
        });
        callback(response.success);
      }
    })
    .catch(err => {
      console.log('NETWOEK', err);
    });
};
