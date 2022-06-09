import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    language: 'en',
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
    },
});

// To dispatch an action, you can call the reducer function directly:
export const { setLanguage } = userSlice.actions;

// Selectors to pull info out
export const selectLanguage = (state) => {
    return state.user.language;
};

export default userSlice.reducer;
