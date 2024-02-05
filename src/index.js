// import './wdyr'; // <--- first import
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createTheme } from '@mui/material';
import { appThemes } from './theme/AppThemes';

const storedTheme = store.getState().themeAppearance;

const defaultTheme = createTheme({
  ...appThemes[storedTheme.customTheme],
});

ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <Provider store={store}>
        <App defaultTheme={defaultTheme} />
      </Provider>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('app')
);
