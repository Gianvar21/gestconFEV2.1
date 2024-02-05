import { createStore, compose, applyMiddleware } from 'redux';
import { storage } from './storage.js'

import {
  createStateSyncMiddleware,
  initMessageListener,
} from 'redux-state-sync';

import { browserName } from 'react-device-detect';

let nsActiveTabID = localStorage.getItem('NSActiveTabID')
  ? parseInt(JSON.parse(localStorage.getItem('NSActiveTabID')))
  : 0;

let nsUserInfo = localStorage.getItem('NSUserInfo')
  ? JSON.parse(localStorage.getItem('NSUserInfo'))
  : '';

let currentTheme = localStorage.getItem('NSThemeMode')
  ? localStorage.getItem('NSThemeMode')
  : null;

const hiddenMenuWidth = '0px';
const iconsMenuWidth = '65px';
const expandedMenuWidth = '240px';

const initialState = {
  browser: browserName,
  accessToken: {
    token: '',
    lastRefreshTokenDate: '',
    onLogin: false,
    isRefreshing: false,
  },
  global: {},
  currentUser: {
    detail: nsUserInfo,
    userRoles: nsUserInfo?.roles || [],
    userHasRoles: nsUserInfo.roles ? true : false,
  },
  mixedRoute: false,
  showLoginBar: true,
  portalTabs: [],
  currentPortalID: 0,
  activeTabID: nsActiveTabID || 0,
  appAlerts: [],
  isPageInEditMode: false,
  showEditAlertModal: false,
  appViewport: 'lg',
  menuState: {
    current: 'expanded',
    width: expandedMenuWidth,
  },
  themeAppearance: {
    customTheme: currentTheme ? currentTheme.split('|')[0] : 'lightTheme',
    customColor: currentTheme ? currentTheme.split('|')[1] : 'green',
  },
};

const reduxStateSyncConfig = {
  // whitelist: ['LOGIN_SUCCESS', 'LOGOUT', 'SET_ACCESS_TOKEN'],
  whitelist: [],
};

// state represent the previous state
// acction reprenset the current action begin proceessed
// reducer always return a new state or the old stat. It never modify the state
const reducer = (state = initialState, action) => {

  storage.IniciaVariablesGlobales();

  switch (action.type) {
    case 'SET_GLOBALS':
      return { ...state, global: action.payload };
    case 'SET_MIXED_ROUTE':
      return { ...state, mixedRoute: action.payload };
    case 'SET_SHOW_LOGIN':
      return { ...state, showLoginBar: action.payload };
    case 'SET_PORTAL_TABS':
      return { ...state, portalTabs: action.payload };
    case 'setCurrentPortalID':
      return { ...state, currentPortalID: action.payload };
    case 'SET_ACTIVE_TAB_ID':
      return { ...state, activeTabID: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        currentUser: {
          detail: action.payload,
          userRoles: action.payload?.roles || [],
          userHasRoles: action.payload?.roles.length > 0 ? true : false,
        },
        accessToken: {
          onLogin: action.onLogin,
        },
      };
    case 'SET_ACCESS_TOKEN':
      return {
        ...state,
        accessToken: {
          token: action.payload.token || state.accessToken.token,
          lastRefreshTokenDate: action.payload.lastRefreshTokenDate || '',
          onLogin: action.payload.onLogin,
          isRefreshing: action.payload.isRefreshing || false,
        },
      };
    case 'SET_PAGE_IN_EDIT_MODE':
      return { ...state, isPageInEditMode: action.payload };
    case 'SET_SHOW_EDIT_ALERT_MODAL':
      return { ...state, showEditAlertModal: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('NSUserInfo');
      localStorage.removeItem('NSActiveTabID');
      localStorage.removeItem('NSCurrentPortalID');
      localStorage.removeItem('portalTabs');
      localStorage.removeItem('NSPortalContext');
      return {
        ...state,
        global: { isAuthenticated: false },
        activeTabID: 0,
        portalTabs: [],
        currentUser: {
          detail: '',
          userRoles: [],
          userHasRoles: false,
        },
        accessToken: { token: '' },
        menuState: { current: 'hidden', width: hiddenMenuWidth },
      };
    case 'clearAlerts':
      return { ...state, appAlerts: [] };
    case 'pushNewAlert':
      let alerts = [...state.appAlerts];
      alerts = alerts.filter((i) => i.message.indexOf('[Replace]') === -1);
      return { ...state, appAlerts: [...alerts, action.payload] };
    case 'removeAlert':
      return {
        ...state,
        appAlerts: state.appAlerts.filter((i) => i !== action.payload),
      };
    case 'SET_MENU_STATE':
      switch (action.payload) {
        case 'hidden':
          return {
            ...state,
            menuState: { current: action.payload, width: hiddenMenuWidth },
          };
        case 'icons':
          return {
            ...state,
            menuState: {
              current: action.payload,
              width: ['xs', 'sm'].includes(state.appViewport)
                ? expandedMenuWidth
                : iconsMenuWidth,
            },
          };
        case 'expanded':
          return {
            ...state,
            menuState: { current: action.payload, width: expandedMenuWidth },
          };
        default:
          break;
      }
    case 'SET_APP_VIEWPORT':
      return {
        ...state,
        appViewport: action.payload,
      };
    case 'SET_CURRENT_THEME':
      let customTheme =
        action.payload.customTheme || state.themeAppearance.customTheme;
      let customColor =
        action.payload.customColor || state.themeAppearance.customColor;

      localStorage.setItem('NSThemeMode', customTheme + '|' + customColor);

      return {
        ...state,
        themeAppearance: {
          customTheme: customTheme,
          customColor: customColor,
        },
      };
    default:
  }

  return state;
};

// export const store = createStore(reducer, initialState);
const env = BUILD_ENV;
const composeEnhancer =
  (env === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  reducer,
  initialState,
  composeEnhancer(
    applyMiddleware(createStateSyncMiddleware(reduxStateSyncConfig))
  )
);
initMessageListener(store);
