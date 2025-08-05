import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {store,persistor} from './Redux/store.js'
import { Provider } from 'react-redux'
import 'flowbite';
import { PersistGate } from 'redux-persist/integration/react';
import  ThemeProvider  from './Component/ThemeProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </PersistGate>
    </Provider>
  </StrictMode>
);
