import {request} from './APICentral';

export const loginHandler = data => {
  return request(
    '/send-otp',
    {
      method: 'POST',
      data,
    },
    false,
    false,
  );
};

export const verifyOTPHandler = data => {
  return request(
    '/verify-otp',
    {
      method: 'POST',
      data,
    },
    false,
    false,
  );
};

export const updatePasswordHandler = data => {
  return request(
    '/update-password',
    {
      method: 'POST',
      data,
    },
    false,
    false,
  );
};

export const updateUserHandler = data => {
  console.log(data);
  
  return request(
    '/update-user',
    {
      method: 'PATCH',
      data,
    },
    true, // JWT Token
    false,
  );
};
