import { store } from '../store';
import { authHeader } from '../helpers';


export const userService = {
  login,
  logout,
};

function login() {
  // tu trabajo
}

function logout() {
  const { accessToken } = store.getState();
  const requestOptions = {
    method: 'POST',
    credentials: 'include',
    headers: authHeader(),
    body: JSON.stringify(accessToken?.token),
  };

  let resStatus = 0;
  if (accessToken?.token) {
    return fetch(`${SERVICE_URL}/users/revoke-token`, requestOptions)
      .then(() => {
        store.dispatch({ type: 'LOGOUT', payload: false });
      })
      .catch((error) => {
        store.dispatch({ type: 'LOGOUT', payload: false });
      });
  }
}
