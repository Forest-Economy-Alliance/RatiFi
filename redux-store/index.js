import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './reducers/index';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['requests'],
  stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, rootReducer);

console.log('pReducer', pReducer);
const store = createStore(pReducer, applyMiddleware(thunk));

const persistor = persistStore(store);

export default {
  store,
  persistor,
};
