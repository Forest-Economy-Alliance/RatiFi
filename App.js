import React from 'react';
import Redux from './redux-store';
import {Provider, useDispatch} from 'react-redux';
import {Text} from 'react-native';
import {PersistGate} from 'redux-persist/es/integration/react';
import {Navigation} from './Navigation';
const {store, persistor} = Redux;

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
