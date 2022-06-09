import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import App from './App';

import { Provider } from 'react-redux'

import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import { store } from './store/store';

const firebaseConfig = {
  apiKey: "AIzaSyCqxScfwQkm4ms0vrN_r74dEO97hNZSh6w",
  authDomain: "ratifi-backend.firebaseapp.com",
  databaseURL: "https://ratifi-backend-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ratifi-backend",
  storageBucket: "ratifi-backend.appspot.com",
  messagingSenderId: "438893236796",
  appId: "1:438893236796:web:9cc456b1ff39dabce22939"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase, Auth};

const Setup = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default Setup;
