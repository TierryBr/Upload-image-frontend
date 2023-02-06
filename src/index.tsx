import React from 'react';
import { PersistGate } from 'redux-persist/es/integration/react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { persistor, store } from './store/index';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
