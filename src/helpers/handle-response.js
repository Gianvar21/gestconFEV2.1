import { userService } from '../services/user.service';
import { startNewTimerForRefreshedToken } from '.';

export function handleResponse(response, resetToken = true) {
  return response.text().then((text) => {
    let data;

    if (IsValidJSONString(text)) {
      data = text && JSON.parse(text);
    } else {
      data = text;
    }

    if (!response.ok) {
      if (response.status === 401) {
        /************************************************************** 
        The 401 (Unauthorized) status code indicates that the request 
        has not been applied because it lacks valid authentication 
        credentials for the target resource. The server generating a 401 
        response MUST send a WWW-Authenticate header field (Section 4.1)
        containing at least one challenge applicable to the target resource.
        **************************************************************/
        // auto logout if 401 was return
        userService.logout().then((re) => {
        //  history.push('/login');
          // location.reload(); // important to reinstate all the default values. THIS IS A MUST!
        });
      } else if (response.status === 403) {
        return Promise.reject('You are not authorized to see this content.');
      } else if (response.status === 500) {
        return Promise.reject(data);
      } else if (response.status === 400) {
        return Promise.reject(data);
      } else if (response.status === 404) {
        return Promise.reject('The request URL was not found on this server.');
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    } else {
      /************************************************************** 
      Code BELOW will handle the refresh token to keep user logged
      **************************************************************/
      // if (resetToken) {
      //   startNewTimerForRefreshedToken();
      // }
      /************************************************************** 
      Code ABOVE will handle the refresh token to keep user logged
      **************************************************************/
    }

    return data;
  });
}

function IsValidJSONString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
