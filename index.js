/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {LogBox} from 'react-native';
import ignoreWarnings from 'ignore-warnings';


if (!__DEV__) {
  console.log = () => {};
}


ignoreWarnings('warn', ['ViewPropTypes', '[react-native-gesture-handler]']);

LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
  'NativeBase: The contrast ratio of',
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);
AppRegistry.registerComponent(appName, () => App);
