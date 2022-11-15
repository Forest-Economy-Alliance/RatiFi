/** Siddharth Kumar Yadav
 * © All rights reserved
 */

import axios from 'axios';
import store from '../redux-store/index';
export const BASE_URL = 'http://localhost:3000';
// export const BASE_URL='https://ratifi-backend.el.r.appspot.com';
// export const BASE_URL = 'https://ratifi-backend-v2.herokuapp.com';
export const  request = async (
  url,
  options,
  isHeader = true,
  isMultiPartFormData = false,
) => {
  let authHeader = null;

  // var state = store.getState();
  let token = store.store.getState().entities.auth.userInfo.token;
  authHeader = token != ' ' ? `Bearer ${token}` : '';

  const client = axios.create({
    baseURL: BASE_URL + url,
    headers: {
      Authorization: authHeader,
      accept: 'application/json',
      'Content-Type': isMultiPartFormData
        ? 'multipart/form-data'
        : 'application/json',
    },
  });

  return client(options);
};

