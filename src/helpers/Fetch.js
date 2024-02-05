//fecth.js
import { store } from '../store.js';

//const apiHost = 'http://localhost:5000';
const apiHost = `${SERVICE_URL}`;



async function request(url, params = {}, method = 'POST', options) {
  const { currentPortalID = 0, activeTabID = 0 } = store.getState();
  // const _options = { method, credentials: 'include', ...options };
  const _options = { method, credentials: 'same-origin', ...options };

  let _portalID = params.portalID || currentPortalID;
  let _tabID = params.tabID || activeTabID;


  return await fetch(apiHost + url, _options);
}

async function requestFile(url, formData, options) {
  const { currentPortalID = 0, activeTabID = 0 } = store.getState();
  const _options = {
    method: 'POST',
    credentials: 'same-origin',
    ...options,
    body: formData,
  };

  return await fetch(apiHost + url, _options);
}


// async function request_old(url, params = {}, method = 'GET', options) {
//   const { currentPortalID = 0, activeTabID = 0 } = store.getState();
//   let fullUrl = `${apiHost}${url}`;
//   const requestOptions = { method, credentials: 'same-origin', ...options };

//   if (method === 'PUT' || method === 'DELETE') {
//     requestOptions.headers = {
//       ...requestOptions.headers,
//       'Content-Type': 'application/json',
//     };
//     requestOptions.body = JSON.stringify(params);
//   } else if (method === 'POST' || method === 'GET') {
//     // Construye la URL correctamente para GET
//     const queryString = objectToQueryString({ ...params });

//     // Asegúrate de que la URL tenga un slash ("/") entre el host y la ruta
//     const formattedUrl = url.startsWith('/') ? url : `/${url}`;

//     // Concatena la cadena de consulta solo si hay parámetros
//     fullUrl = `${apiHost}${formattedUrl}${queryString ? `?${queryString}` : ''}`;
//   }
//   //console.log(fullUrl, requestOptions)
//   return await fetch(fullUrl, requestOptions);
// }


// function objectToQueryString(obj) {
//   return Object.keys(obj)
//     .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
//     .join('&');
// }



// function get(url, params, options) {
//   const formattedUrl = url.startsWith('/') ? url : `/${url}`;
//   return request(formattedUrl, params, 'GET', options);
// }

// function post(url, params, options) {
//   const formattedUrl = url.startsWith('/') ? url : `/${url}`;
//   return request(formattedUrl, params, 'POST', options);
// }

function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => key + '=' + obj[key])
    .join('&');
}

function get(url, params, options) {
  return request(url, params, 'GET', options);
}

function post(url, params, options) {
  return request(url, params, 'POST', options);
}

function postFile(url, formData, options) {
  return requestFile(url, formData, options);
}

function update(url, params, options) {
  return request(url, params, 'PUT', options);
}

function remove(url, params, options) {
  return request(url, params, 'DELETE', options);
}

export default {
  get,
  post,
  update,
  remove,
  postFile,
};