import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import LoadingCircle from './views/LoadingCircle'; // Ajusta la ruta según la ubicación real del componente
import fondo from './imagenes/FONDO_AGS_2024.jpg';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled as muiStyled, css } from '@mui/system';
import Divider from '@mui/material/Divider';
const WhiteBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  border: 0px solid red; /* Añade un borde rojo para verificar la posición y tamaño */
  display: ${(props) => (props.loading === 'true' ? 'block' : 'none')};
`;

const StyledLoadingCircle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 102; /* Asegura que el StyledLoadingCircle esté encima del WhiteBackground */
`;

const StyledImage = styled.img`
  width: 100vw;
  height: 90vh;
  object-fit: cover; // O ajusta según tus necesidades (cover, contain, etc.)
`;

const StyledImageContainer = styled.div`
  overflow-x: hidden;
`;

const FooterRoot = muiStyled('footer')(
  ({ theme }) => css`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-35%);
  text-align: center;
  width: 60%;  /* Ajusta el ancho según tus necesidades */
  margin-top: 10px; /* Ajusta el margen superior según tus necesidades */
  z-index: 1; /* Asegura que esté encima de la imagen. */



    & > div:nth-child(1) {
      position: relative;
      display: flex;
      justify-content: space-evenly;
      align-items: end;
      height: 40px;
    }

    small {
      color: #5e6c79;
    }

    & .MuiBox-root {
      display: flex;
      flex-direction: column;
      align-items: center;
      -webkit-box-align: start;
      margin: 7px;
    }

    .MuiDivider-wrapperVertical {
      padding: 0px;
    }

    & > .MuiDivider-root:nth-child(2) {
      margin: 5px auto;
    }

    .MuiButton-textDefault {
      text-transform: capitalize;
      line-height: 10px;
    }

    .legal {
      display: flex;
      font-size: 0.7rem;
      justify-content: space-between;
    }
  `
);
const Soporte = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 700)); // Ajusta el tiempo según sea necesario
      setLoading(false);
    };
  
    loadData();
  }, []);


  return (
    <Container component="main" maxWidth="xs" sx={{ height: '80vh', display: 'flex', alignItems: 'center' }}>
      <CssBaseline />
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <StyledImageContainer>
        <StyledImage src={fondo} alt="" />
        </StyledImageContainer>
        <WhiteBackground loading={loading.toString()} />
        {loading && <StyledLoadingCircle />} {/* Muestra el LoadingCircle solo cuando loading es true */}
        <div>{/* Contenido adicional */}</div>
      </Box>
      <FooterRoot>
        <div></div>
        <Divider />
        <div>
        <div style={{ fontWeight: 'bold' , fontSize:'10px'}}>Copyright© 2024 - Management Group S.A.</div>
          <div></div>
        </div>
      </FooterRoot>

    </Container>
  );
};

export default Soporte;
