/** Siddharth Kumar Yadav
 * © All rights reserved
 */

import axios from 'axios';
const BASE_URL = 'https://ratifi-backend.herokuapp.com';

export const request = async (
  url,
  options,
  isHeader = true,
  isMultiPartFormData = false,
) => {
  let authHeader = null;

  console.log(url);
  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTYxMThhMjcyZGY3ODE5ZTczZjc2YSIsImlhdCI6MTY1NTM4MDI0MiwiZXhwIjoxNjU1NDIzNDQyfQ.gJcX4WT_x60S7fajfMD8QbC2elSGCC9kl38kjKICTPg';
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

  console.log('CLEINT', client);

  return client(options);
};
