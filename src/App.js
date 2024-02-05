// Importa React y otras dependencias necesarias
import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import {
  AppBar,
  Button,
  CssBaseline,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { connect, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, useHistory } from 'react-router-dom';
import { deepmerge } from '@mui/utils';

// Importa el componente de carga
import LoadingCircle from './views/LoadingCircle';

import { appThemes, appColors } from './theme/AppThemes';
import { GlobalStyle } from './GlobalStyles';
import AppContent from './AppContent';
import AppTopBar from './components/layout/AppTopBar';
import AppFooter from './components/layout/AppFooter';

// Resto de tu código ...

function App(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Estado para controlar la carga
  const {
    showLoginBar,
    accessToken,
    currentUser,
    defaultTheme,
    themeAppearance,
  } = props;

  const [theme, setTheme] = useState(defaultTheme);
  const [onServerError, setOnServerError] = useState(false);

  useLayoutEffect(() => {
    setTheme(
      createTheme(
        deepmerge(
          appThemes[themeAppearance.customTheme],
          appColors[themeAppearance.customColor]
        )
      )
    );
  }, [themeAppearance]);

  let viewport = undefined;
  if (theme) {
    if (useMediaQuery(theme.breakpoints.only('xs'))) viewport = 'xs';
    if (useMediaQuery(theme.breakpoints.only('sm'))) viewport = 'sm';
    if (useMediaQuery(theme.breakpoints.only('md'))) viewport = 'md';
    if (useMediaQuery(theme.breakpoints.only('lg'))) viewport = 'lg';
    if (useMediaQuery(theme.breakpoints.only('xl'))) viewport = 'xl';
  }

  useEffect(() => {
    // Simula una carga de datos (puedes reemplazarlo con tu lógica real)
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula una carga de 2 segundos
      setLoading(false); // Actualiza el estado de carga cuando la carga está completa
    };

    loadData();
  }, []);

  useEffect(() => {
    // if (currentUser.detail) {
    dispatch({
      type: 'SET_APP_VIEWPORT',
      payload: viewport,
    });
    switch (viewport) {
      case 'xs':
      case 'sm':
        dispatch({
          type: 'SET_MENU_STATE',
          payload: 'hidden',
        });
        break;
      default:
        dispatch({
          type: 'SET_MENU_STATE',
          payload: 'expanded',
        });
        break;
    }
    // }
    return () => {};
  }, [viewport, currentUser.detail]);

  function getConfirmation(message, callback) {
    setConfirmCallback(() => callback);
    setConfirm(true);
  }

  return (
    <Fragment>
      {loading ? ( // Muestra el componente de carga si la aplicación está cargando
        <LoadingCircle />
      ) : onServerError ? (
        <ThemeProvider theme={theme}>
          <h1>Error por el servicio no esta listo.</h1>
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={theme}>
          <BrowserRouter getUserConfirmation={getConfirmation}>
            <CssBaseline />
            <GlobalStyle theme={theme} />
            <AppTopBar />
            <AppContent {...props} viewport={viewport} />
            <AppFooter /> 
          </BrowserRouter>
        </ThemeProvider>
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => state;
const ConnectedApp = connect(mapStateToProps)(App);
export default ConnectedApp;
