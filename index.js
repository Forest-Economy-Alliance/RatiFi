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
  new Worker('UpdatePasswordWorker', async payload => {
    return new Promise(async resolve => {
      resolve();
    }).catch(err => {
      console.log(`ERR--->${payload?.docName}`, err);
    });
  }),
);

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
