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

export const logoutHandler = data => {
  return request(
    '/logout',
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

export const verifyyMember = data => {
  return request(
    '/verify-member',
    {
      method: 'PATCH',
      data,
    },
    false,
    false,
  );
};

export const viewFRCMember = data => {
  return request(
    '/fetch-frcTeam',
    {
      method: 'POST',
      data,
    },
    false,
    false,
  );
};
export const setGender = data => {
  return request(
    '/set-gender',
    {
      method: 'PATCH',
      data,
    },
    false,
    false,
  );
};

export const checkAccount = data => {
  return request(
    '/account-details',
    {
      method: 'POST',
      data,
    },
    false,
    false,
  );
};

export const postSignInHandler = data => {
  return request(
    '/sigin',
    {
      method: 'POST',
      data,
    },
    false,
    false,
  );
};
