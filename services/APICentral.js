/** Siddharth Kumar Yadav
 * © All rights reserved
 */

import axios from 'axios';
const BASE_URL = 'https://ratifi-backend.herokuapp.com';

export const request = async (
  options,
  url,
  isHeader = true,
  isMultiPartFormData = false,
) => {
  let authHeader = null;

  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWUxOTYyMDg1NDg1N2Y1ODBlNzJkMTkiLCJlbWFpbCI6InNpZGRoYXJ0aHNrMTAxQGdtYWlsLmNvbSIsImlhdCI6MTY0MjE3ODg2OCwiZXhwIjoxNjQ0NzcwODY4fQ.I1JLFk4gOz8mEGnZCDWcesQYaDbTsQsYFPzxso_EmLc';
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
