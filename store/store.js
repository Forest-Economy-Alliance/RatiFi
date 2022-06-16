import {configureStore} from '@reduxjs/toolkit';
import user from '../slices/userSlice';
import auth from '../slices/authSlice';
// redux-persist wrappers
import {
  persistStore,
  persistReducer,
  persistCombineReducers,
} from 'redux-persist';
// the local storage we'll be using to persist data
import AsyncStorage from '@react-native-async-storage/async-storage';
// redux-persist merge level
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {curryGetDefaultMiddleware} from '@reduxjs/toolkit/dist/getDefaultMiddleware';

// persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};
// wrap persist API around root reducer and store
const persistedReducers = persistCombineReducers(persistConfig, {
  user: user,
  auth: auth,
});

export const store = configureStore({
  reducer: persistedReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// });
