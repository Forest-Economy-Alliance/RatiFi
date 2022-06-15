import {request} from './APICentral';

export const loginHandler = data => {
  return request('/send-otp', {}, false, false);
};

export const verifyOTPHandler = data => {
  return require('/verify-otp', {}, false, false);
};
