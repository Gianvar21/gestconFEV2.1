//evento.service.js
import { authHeader, handleResponse } from '../helpers';
import Fetch from '../helpers/Fetch';

import Swal from 'sweetalert2';
export const eventoService = {
  obtenerUsuario,
  obtenerUsuariov2,
  obtenerToken,
  obtenerFilesv2,
  obtenerDirectorios,
  obtenerTabParametros,
  cargarArchivo
};

function obtenerToken(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/gescon/auth`;
  return Fetch.post(url, params, options).then((res) =>


    handleResponse(res, false)
  );
}

async function cargarArchivo(file, urlActual, filename) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('urlDestino', urlActual);
    formData.append('filename', filename);

    const url = '/api/gescon/cargararchivo';

    const response = await Fetch.postFile(url, formData);

    if (!response.ok) {
      const text = await response.text();

      // Muestra el mensaje de error al usuario utilizando SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar el archivo',
        text: 'El archivo es demasiado pesado o ya existe'
      });

      // Retorna desde la función sin lanzar el error de nuevo
      return;
    }

    return handleResponse(response, false);

  } catch (error) {
    console.error('Error en la función cargarArchivo:', error);

    // Muestra el mensaje de error al usuario utilizando SweetAlert2
    Swal.fire({
      icon: 'error',
      title: 'Error al cargar el archivo',
      text: error.message || 'Error desconocido'
    });
  }
}



// function cargarArchivo(file, category) {
//   try {
//     const options = { headers: authHeader() };

//     // Agrega los parámetros directamente en la URL
//     const url = `/api/gescon/cargararchivo?file=${encodeURIComponent(file)}&category=${encodeURIComponent(category)}`;
//     console.log('URL de carga de archivo:', url);

//     return Fetch.post(url, null, options).then((res) =>
//       handleResponse(res, false)
//     );
//   } catch (error) {
//     console.error('Error en la solicitud de carga de archivo:', error);
//     throw error;
//   }
// }

function obtenerDirectorios() {


  const options = { headers: authHeader() };
  const params = {};



  const url = `/api/gescon/directorios`;
  return Fetch.get(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerUsuario(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  //console.log(dataJson);

  const url = `/api/gescon/sgm_usuarios/auth`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerUsuariov2(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  //console.log(dataJson);

  const url = `/api/gescon/sgm_usuarios`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}



function obtenerTabParametros(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  //console.log(dataJson);

  const url = `/api/gescon/sgm_tabparametros`;
  return Fetch.post(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}

function obtenerFilesv2(category) {
  try {
    const options = { headers: authHeader() };
    const params = {};
    const encodedCategory = encodeURIComponent(category)
    // Utiliza Fetch.get para realizar una solicitud GET
    const url = `/api/gescon/documentos?category=${encodedCategory}`;

    //console.log(url);
    //console.log(category);

    return Fetch.post(url, params, options).then((res) =>
      handleResponse(res, false)
    );
  } catch (error) {
    console.error('Error en la solicitud:', error);
    // Puedes lanzar o devolver un objeto de error personalizado si es necesario.
    throw error;
  }
}