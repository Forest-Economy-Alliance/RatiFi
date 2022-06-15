import React from 'react';
import Redux from './redux';
import {Provider} from 'react-redux';
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
