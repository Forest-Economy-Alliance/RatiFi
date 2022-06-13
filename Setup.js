import React from 'react';
import App from './App';

import {Provider} from 'react-redux';
import {persistor, store} from './store/store';
// the component we'll use to wrap our component tree
import {PersistGate} from 'redux-persist/lib/integration/react';

const Setup = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default Setup;
