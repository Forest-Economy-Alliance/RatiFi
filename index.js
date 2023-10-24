/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import RNFS from 'react-native-fs';

import store from './redux-store';

import {LogBox} from 'react-native';
import queue, {Worker} from 'react-native-job-queue';

import ignoreWarnings from 'ignore-warnings';
import {YellowBox} from 'react-native';
import {getGCPUrlImageHandler} from './services/commonService';
import {patchClaimHandler} from './services/claimService';
import { updatePasswordHandler, updateUserHandler } from './services/authService';

console.disableYellowBox = true;

if (!__DEV__) {
  console.log = () => {};
}

queue.configure({
  onQueueFinish: executedJobs => {
    console.log('Queue stopped and executed', executedJobs);
    store.store.dispatch({
      type: 'UPDATE_APPUTIL_KEY',
      payload: {
        key: 'formUploadSyncStatus',
        value: false,
      },
    });
    store.store.dispatch({
      type: 'UPDATE_APPUTIL_KEY',
      payload: {
        key: 'globalSyncStatus',
        value: false,
      },
    });
  },
});

queue.addWorker(
  new Worker('testWorker', async payload => {
    return new Promise(async resolve => {
      const r = await RNFS.readFile(payload.localPath, 'base64');
      getGCPUrlImageHandler({
        fileName: 'Hello',
        base64Data: r,
        isPdf: false,
        userId: payload?.userId || 'unknown-asset',
      })
        .then(async rr => {
          console.log('OK', rr.data.response.Location);
          console.log('DONE');
          await RNFS.unlink(payload?.localPath);
          const rssponse = await patchClaimHandler({
            claimId: payload?.claimId,
            title: payload?.docName,
            storageUrl: rr.data.response.Location,
          });

          console.log('rssponse');

          resolve();
        })
        .catch(err => {
          console.log(`ERR--->${payload?.docName}`, err);
        });
    });
  }),
);

queue.addWorker(
  new Worker('UPDATEPasswordWorker', async payload => {
    return new Promise(async function(resolve, reject){
      updatePasswordHandler({
        mobile: payload?.mobile,
        password: payload?.password,
      })
        .then(async ({data: response}) => {
          console.log('RES updatepassword action', response);
          const args = response?.success;
          store.store.dispatch({type: 'SAVE_PROFILE', payload: response.data})
          store.store.dispatch({type: 'DISABLE_LOADING'})
          store.store.dispatch({
      type: 'UPDATE_APPUTIL_KEY',
      payload: {
        key: 'globalSyncStatus',
        value: true,
      },
    });

    if(args) {
      // screen code 3 means , password set
      store.store.dispatch({type: 'UPDATE_REGISTRATION_SCREEN_CODE', payload: 3});
      
    }
    resolve();
        })
        .catch(err => {
          console.log('NETWOEK', err);
          reject();
        });
    }).catch(err => {
      console.log(`ERR--->`, err);
    });
  }),
);


queue.addWorker(
  new Worker('UPDATELocationWorker', async data => {
    return new Promise(async function(resolve, reject){
      


      console.log('DATA--', data);
  // dispatch({type: 'ENABLE_LOADING'});

  let updatingRole = false;
  if (
    //including data?.isMemeber we have = 4
    Object.keys(data).length === 4 &&
    data?.authLevel &&
    data?.postLevel &&
    data?.village
  ) {
    updatingRole = true;
  }

  return updateUserHandler(data)
    .then(async ({ data: response }) => {
      console.log('RES--', response);

      if (response.success) {
        store.store.dispatch({ type: 'SAVE_PROFILE', payload: response.data });
        store.store.dispatch({ type: 'DISABLE_LOADING' });
      }
      console.log(response.success);
      if (true) {
        // now checking if authLevel, i.e role Information is update
        // or location is updated as per code
        // location -> 4
        // role-> 5

        // 22 April 2023 Edit - Check if role already exists in village or not

        store.store.dispatch({
          type: 'UPDATE_REGISTRATION_SCREEN_CODE',
          payload: data.authLevel ? 5 : 4,
        });
        // callback(response.success);

      }
      resolve();
    })
    .catch(err => {
      console.log('NETWOEK', err);
      reject()
    });

  })
}
));

ignoreWarnings('warn', ['ViewPropTypes', '[react-native-gesture-handler]']);

LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
  'NativeBase: The contrast ratio of',
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
AppRegistry.registerComponent(appName, () => App);
