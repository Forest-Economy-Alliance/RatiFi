import axios from 'axios';
import store from '../redux-store/index';
// Local DEV
// export const BASE_URL = 'http://172.16.77.25:3001';

// APFRA DEV 
export const  BASE_URL = 'https://smjq8cb5fb.us-east-1.awsapprunner.com';

// ISB DEV
// export const  BASE_URL = 'https://hnspuesper.us-east-1.awsapprunner.com';



export const request = async (
    url,
    options,
    isHeader = true,
    isMultiPartFormData = false,
) => {
    let authHeader = null;
    // var state = store.getState();
    let token = store.store.getState().entities.auth.userInfo.token;
    authHeader = token != ' ' ? `Bearer ${token}` : '';
    console.log('Auth Header:', authHeader);
    console.log('Base URL:', BASE_URL+url);
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

    console.log('API done')
    return client(options);
};

