import { store } from '../store';

const dispatchAlert = (message, hasError = false, withRedirect = undefined) => {
  store.dispatch({
    type: 'pushNewAlert',
    payload: {
      // keepOpen: true,
      open: true,
      color: !hasError ? 'success' : 'error',
      message: '[Replace]' + message,
      withRedirect: withRedirect,
    },
  });
};

const dispatchAlertDialog = (
  message,
  hasError = false,
  withRedirect = undefined
) => {
  store.dispatch({
    type: 'pushNewAlert',
    payload: {
      isRelative: true,
      open: true,
      color: !hasError ? 'success' : 'error',
      message: '[Replace]' + message,
      withRedirect: withRedirect,
    },
  });
};

export { dispatchAlert, dispatchAlertDialog };
