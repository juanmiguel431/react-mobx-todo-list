import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { createStore, StoreProvider } from './stores';

const store = createStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <StoreProvider value={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
