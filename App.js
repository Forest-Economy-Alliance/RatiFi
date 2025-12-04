import React from 'react';
import Redux from './redux-store';
import {Provider, useSelector} from 'react-redux';
import {initialize} from 'react-native-clarity';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Navigation} from './Navigation';
const {store, persistor} = Redux;
import {
  Alert,
  Button,
  LogBox,
  PermissionsAndroid,
  Text,
  View,
} from 'react-native';
import ignoreWarnings from 'ignore-warnings';
import {ToastProvider} from 'react-native-toast-notifications';
import HomeScreen from './Screens/HomeScreen/homeScreen';
import ProfileScreen from './Screens/ProfileScreen/profilescreen';
import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import notifee from '@notifee/react-native';
import ClaimTypeSelectionScreen from './Screens/ChooseIFRorCFR';
import {MarkBoundry} from './Screens/MarkBoundry';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import * as Sentry from '@sentry/react-native';

// React Native Firebase auto-initializes from google-services.json on Android
// No need to call firebase.initializeApp() manually

Sentry.init({
  dsn: 'https://f6df349b4939644ef5fd3693c17e766c@o4505605336662016.ingest.sentry.io/4506120617721856',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
  debug: true,
});

initialize('jh0anvjjb2');

ignoreWarnings('warn', ['ViewPropTypes']);

LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
]);

function App() {
  const netInfo = useNetInfo();

  // Set up Firebase messaging handlers
  useEffect(() => {
    let unsubscribe;
    
    const setupMessaging = async () => {
      try {
        // Give Firebase time to auto-initialize from google-services.json
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Set up foreground message handler
        unsubscribe = messaging().onMessage(async remoteMessage => {
          try {
            await notifee.requestPermission();
            const channelId = await notifee.createChannel({
              id: 'default',
              name: 'Default Channel',
            });
            await notifee.displayNotification({
              title: 'Claim Filing Alert',
              body: 'SDLC has updated a comment in Claim - A107',
              android: {
                channelId,
                pressAction: {
                  id: 'default',
                },
              },
            });
          } catch (error) {
            console.error('Error displaying notification:', error);
          }
        });

        // Set up background message handler
        messaging().setBackgroundMessageHandler(async remoteMessage => {
          console.log('Message handled in the background!', remoteMessage);
        });

        // Register device and get FCM token
        await messaging().registerDeviceForRemoteMessages();
        const fcmToken = await messaging().getToken();
        console.log('FCM Token:', fcmToken);
        
      } catch (error) {
        console.error('Firebase messaging setup error:', error);
      }
    };

    setupMessaging();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const formatSpeed = sp => {
    if (sp < 1) {
      return (sp * 1000)?.toString() + ' Kb/s';
    }
    return sp?.toString() + ' Mb/s';
  };

  return (
    <View style={{flex: 1, backgroundColor: 'gray'}}>
      <ToastProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navigation />
          </PersistGate>
        </Provider>
      </ToastProvider>
    </View>
  );
}
export default Sentry.wrap(App);
