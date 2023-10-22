import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App"
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import store from './config/Redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <React.StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        <SnackbarProvider anchorOrigin={{vertical : "top" ,horizontal :"center"}} maxSnack={3}>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
