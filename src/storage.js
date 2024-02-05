import CryptoJS from 'crypto-js';

export const storage = {
  IniciaVariablesGlobales,
  SetStorage,
  GetStorage,
  GetStorageN,
  DelStorage,
  SetStorageObj,
  GetStorageObj,
  hideAccesoSubida,
  isAccesoSubidaHidden
};

let secretKey = "";

async function obtenerSgm_cUsuario() {
  try {
    const secretKey = storage.GetStorage('Sgm_cUsuario');
    console.log('Valor de Sgm_cUsuario (desencriptado):', secretKey);
  } catch (error) {
    console.error('Error al obtener Sgm_cUsuario:', error);
  }
}
obtenerSgm_cUsuario();

function IniciaVariablesGlobales() {
  // console.log("Antes de eliminar:", sessionStorage.getItem("Sgm_cAccesodeSubida"));
  
  // // No eliminamos físicamente, sino que "ocultamos" el campo
  // storage.hideAccesoSubida();

  // console.log("Después de ocultar:", sessionStorage.getItem("Sgm_cAccesodeSubida"));
  
  return true;
}

function SetStorage(pVariable, pValue) {
  if (pValue !== undefined) {
    try {
      // Encriptar usando AES y luego codificar en base64
      const encryptedValue = CryptoJS.AES.encrypt(pValue, secretKey).toString();
      const base64Value = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encryptedValue));

      // Almacenar en sessionStorage
      sessionStorage.setItem(pVariable, base64Value);
      return true;
    } catch (error) {
      console.error('Error durante el cifrado:', error);
      return false;
    }
  } else {
    console.error('pValue es indefinido');
    return false;
  }
}

function SetStorageObj(pVariable, pValue) {
  const obj = JSON.stringify(pValue);
  try {
    // Encriptar usando AES y luego codificar en base64
    const encryptedValue = CryptoJS.AES.encrypt(obj, secretKey).toString();
    const base64Value = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encryptedValue));

    // Almacenar en sessionStorage
    sessionStorage.setItem(pVariable, base64Value);
    return true;
  } catch (error) {
    console.error('Error durante el cifrado:', error);
    return false;
  }
}

function DelStorage(pVariable) {
  // Eliminar el elemento de sessionStorage
  sessionStorage.removeItem(pVariable);
  return true;
}

function GetStorage(pVariable) {
  // Obtener el valor de sessionStorage
  const base64Value = sessionStorage.getItem(pVariable) || "";

  if (base64Value === "") {
    return "";
  }

  try {
    // Decodificar en base64 y luego descifrar usando AES
    const decryptedValue = CryptoJS.AES.decrypt(CryptoJS.enc.Base64.parse(base64Value).toString(CryptoJS.enc.Utf8), secretKey).toString(CryptoJS.enc.Utf8);
    return decryptedValue || "";
  } catch (error) {
    console.error('Error durante el descifrado:', error);
    return "";
  }
}
function GetStorageN(pVariable) {
  const encryptedValue = sessionStorage.getItem(pVariable) || "";

  if (encryptedValue === "") {
    return "";
  }

  try {
    const decryptedValue = CryptoJS.AES.decrypt(encryptedValue, secretKey).toString(CryptoJS.enc.Utf8);
    return decryptedValue || "";
  } catch (error) {
    console.error('Error durante el descifrado:', error);
    return "";
  }
}

function GetStorageObj(pVariable) {
  const encryptedValue = sessionStorage.getItem(pVariable) || "";

  if (encryptedValue === "") {
    return [];
  }

  try {
    const decryptedValue = CryptoJS.AES.decrypt(encryptedValue, secretKey).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedValue) || [];
  } catch (error) {
    console.error('Error durante el descifrado:', error);
    return [];
  }
}

function hideAccesoSubida() {
  // No almacenamos la clave en el sessionStorage, solo establecemos el valor en memoria
  storage.Sgm_cAccesodeSubidaHidden = true;
}

function isAccesoSubidaHidden() {
  // Verificamos si el campo está "oculto" en memoria
  return storage.Sgm_cAccesodeSubidaHidden === true;
}
