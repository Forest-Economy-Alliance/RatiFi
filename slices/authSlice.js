import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  jwToken: '-1',
  signupLatitude: -1.0,
  signupLongitude: -1.0,
  createdAt: '-1',
  updatedAt: '-1',
};
// All the reduceers for authSlice
let reducers = {
  setToken: (state, action) => {
    state.jwToken = action.payload;
  },
  setSignupLocation: (state, action) => {
    // This expects an object with latitude and longitude
    if (action.payload.latitude && action.payload.longitude) {
      state.signupLatitude = action.payload.latitude;
      state.signupLongitude = action.payload.longitude;
    } else {
      console.warn('Invalid location object');
    }
  },
  setCreatedAt: (state, action) => {
    state.createdAt = action.payload;
  },
  setUpdatedAt: (state, action) => {
    state.updatedAt = action.payload;
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: reducers,
});

// export all the actions
export const {setToken, setSignupLocation, setCreatedAt, setUpdatedAt} =
  authSlice.actions;

//#region Selectors
export const getToken = state => state.auth.jwToken;
export const getSignupLocation = state => {
  latitude: state.auth.signupLatitude;
  longitude: state.auth.signupLongitude;
};
export const getCreatedAt = state => state.auth.createdAt;
export const getUpdatedAt = state => state.auth.updatedAt;
//#endregion

export default authSlice.reducer;
