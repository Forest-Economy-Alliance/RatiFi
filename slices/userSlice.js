import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  language: 'en',
  name: '-1',
  mobile: '-1',
  village: '-1',
  panchayat: '-1',
  tehsil: '-1',
  district: '-1',
  stateName: '-1',
  claims: [],
};

let reducers = {
  setLanguage: (state, action) => {
    state.language = action.payload;
  },
  setName: (state, action) => {
    state.name = action.payload;
  },
  setMobile: (state, action) => {
    state.mobile = action.payload;
  },
  setVillage: (state, action) => {
    state.village = action.payload;
  },
  setPanchayat: (state, action) => {
    state.panchayat = action.payload;
  },
  setDistrict: (state, action) => {
    state.district = action.payload;
  },
  setStateName: (state, action) => {
    state.stateName = action.payload;
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: reducers,
});

// To dispatch an action, you can call the reducer function directly:
export const {
  setLanguage,
  setName,
  setMobile,
  setVillage,
  setPanchayat,
  setDistrict,
  setStateName,
} = userSlice.actions;

// Selectors to pull info out
export const selectLanguage = state => {
  return state.user.language;
};
export const getName = state => state.user.name;
export const getMobile = state => state.user.mobile;
export const getVillage = state => state.user.village;
export const getPanchayat = state => state.user.panchayat;
export const getDistrict = state => state.user.district;
export const getStateName = state => state.user.stateName;

export default userSlice.reducer;
