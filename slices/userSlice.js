import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  language: 'en',
  name: null,
  mobile: null,
  village: null,
  panchayat: null,
  tehsil: null,
  district: null,
  stateName: null,
  claims: [],
  password: null,
  level: null,
  position: null,
  uidNum: null,
  uidType: null,
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
  setTehsil: (state, action) => {
    state.tehsil = action.payload;
  },
  setDistrict: (state, action) => {
    state.district = action.payload;
  },
  setStateName: (state, action) => {
    state.stateName = action.payload;
  },
  setPassword: (state, action) => {
    state.password = action.payload;
  },
  setLevel: (state, action) => {
    state.level = action.payload;
  },
  setPosition: (state, action) => {
    state.position = action.payload;
  },
  setUidNum: (state, action) => {
    state.uidNum = action.payload;
  },
  setUidType: (state, action) => {
    state.uidType = action.payload;
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
  setTehsil,
  setDistrict,
  setStateName,
  setPassword,
  setLevel,
  setPosition,
  setUidNum,
  setUidType,
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
export const getTehsil = state => state.user.tehsil;
export const getStateName = state => state.user.stateName;
export const getPassword = state => state.user.password;
export const getLevel = state => state.user.level;
export const getPosition = state => state.user.position;
export const getUidNum = state => state.user.uidNum;
export const getUidType = state => state.user.uidType;

export default userSlice.reducer;
