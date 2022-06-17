import React from 'react';
import Redux from './redux-store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Navigation} from './Navigation';
const {store, persistor} = Redux;
import {LogBox} from 'react-native';
import ignoreWarnings from 'ignore-warnings';

ignoreWarnings('warn', ['ViewPropTypes']);

LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}
export default App;
