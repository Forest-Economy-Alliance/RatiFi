import React from 'react';
import Redux from './redux-store';
import {Provider, useSelector} from 'react-redux';
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
import messaging, {firebase} from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import ClaimTypeSelectionScreen from './Screens/ChooseIFRorCFR';
import {MarkBoundry} from './Screens/MarkBoundry';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import PasswordScreen from './Screens/Password/PasswordScreen';

ignoreWarnings('warn', ['ViewPropTypes']);

LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
]);

function App() {
  const netInfo = useNetInfo();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));

      // Request permissions (required for iOS)
      await notifee.requestPermission();

      // Create a channel (required for Android)
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      // Display a notification
      await notifee.displayNotification({
        title: 'Claim Filing Alert',
        body: 'SDLC has updated a comment in Claim - A107',
        android: {
          channelId,
          // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
          },
        },
      });
    });

    return unsubscribe;
  }, []);

  const fetchData = async () => {
    await firebase.messaging().registerDeviceForRemoteMessages();

    const fcmToken = await firebase.messaging().getToken();
    console.log('fcm', fcmToken);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatSpeed = sp => {
    if (sp < 1) {
      return (sp * 1000)?.toString() + ' Kb/s';
    }
    return sp?.toString() + ' Mb/s';
  };

  return (<View style={{flex:1,backgroundColor:'gray'}}>


    <ToastProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        
          {/* <MarkBoundry/> */}
        </PersistGate>
      </Provider>
    </ToastProvider>
    </View>
  );
}
export default App;
