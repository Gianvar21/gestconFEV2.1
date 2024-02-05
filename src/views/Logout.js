import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import styled from 'styled-components';
import { storage } from "../storage.js";

const cookies = new Cookies();

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logout = () => {
  const [showAlert, setShowAlert] = useState(true);

  const cerrarSesion = () => {
    // Lógica para cerrar sesión y redirigir
    // cookies.remove('Sgm_cUsuario', { path: '/' });
    // //cookies.remove('Sgm_cPerfil', { path: '/' });
    // cookies.remove('Sgm_cNombre', { path: '/' });
    //cookies.remove('Sgm_cContrasena', { path: '/' });
    //cookies.remove('Sgm_cObservaciones', { path: '/' });
    // cookies.remove('Sgm_cAccesodeSubida', { path: '/' });
    // cookies.remove('token', { path: '/' });
    // cookies.remove('IsLoged', { path: '/' });

    console.log('Logout .. ini')

    storage.DelStorage("IsLoged","");
    storage.DelStorage("token","");
    storage.DelStorage("Sgm_cNombre","");
    storage.DelStorage("Sgm_cUsuario","");
    storage.DelStorage("Sgm_cPerfil","");
    storage.DelStorage("Sgm_cAccesodeSubida","");
    storage.DelStorage("accesosSubida","");

    console.log('Logout .. fin')

    // Oculta la alerta después de cierto tiempo (opcional)
    setTimeout(() => {
      setShowAlert(false);
      window.location.href = './gestcon'; // Redirige después de cerrar sesión
    }, 500); // 1000 milisegundos (1 segundo) - ajusta según sea necesario
  };

  useEffect(() => {
    cerrarSesion();
  }, []);

  return (
    <Container>
      <Alert
        severity="info"
        onClose={() => setShowAlert(false)}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 101,
          fontSize: '1.5rem', // Ajusta el tamaño de la fuente según sea necesario
        }}
        open={showAlert}
      >
        <AlertTitle>Información de Cierre de Sesión</AlertTitle>
        Saliendo de la sesión...
      </Alert>
    </Container>
  );
};

export default Logout;
