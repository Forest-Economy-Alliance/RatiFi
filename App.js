import React from 'react';
import Redux from './redux-store';
import {Provider, useDispatch} from 'react-redux';
import {ToastProvider} from 'react-native-toast-notifications';
import {Text} from 'react-native';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Navigation} from './Navigation';
const {store, persistor} = Redux;
console.log = () => {};
function App() {
  return (
    <ToastProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </ToastProvider>
  );
}
export default App;
