import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { eventoService } from '../../services/evento.service';
import md5 from 'md5';
import { storage } from "../../storage.js";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Typography, Divider, TextField, InputAdornment, Button } from '@mui/material';
import AppFooter from '../../components/layout/AppFooter.js';
import SearchIcon from '@mui/icons-material/Search';
import { styled, css } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import fondo from '../../imagenes/fondotodos.png'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Swal from 'sweetalert2';
import Checkbox from '@mui/material/Checkbox';

// Coloca las funciones encriptar y desencriptar aquí
const encriptar = (data) => {
  return btoa(data);
};

const desencriptar = (data) => {
  return atob(data);
};

const ListarUsuario = (props) => {
  const fondoStyle = {
    backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${fondo})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
  };
  const history = useHistory();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    listar();
  }, []);

  const listar = async () => {
    let _body = { Accion: "BUSCARTODOS" };
    try {
      const res = await eventoService.obtenerUsuario(_body);

      if (res && res[0]) {
        setData(res[0]);

        // Obtener y almacenar los accesos de subida
        const accesosSubidaData = res[0].reduce((acc, item) => {
          acc[item.Sgm_cUsuario] = item.Sgm_cAccesodeSubida;
          return acc;
        }, {});
        setAccesosSubida(accesosSubidaData);
      } else {
        console.error("Error: No se obtuvieron datos o los datos están en un formato incorrecto.");
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredData = (data || []).filter((item) =>
    item?.Sgm_cNombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const FooterRoot = styled('footer')(
    ({ theme }) => css`
      margin: 0 auto;
      text-align: center;
      width: 32%;
      margin-top: 30px !important;
  
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
        font-size: 0.6rem;
        justify-content: space-between;
      }
    `
  );

  const crear = () => {
    history.push({
      pathname: '/crear',
      state: {}
    });
  }

  const editar = (Sgm_cUsuario, Sgm_cNombre, Sgm_cObservaciones, Sgm_cPerfil, Sgm_cAccesodeSubida) => {
    const usuario = { Sgm_cObservaciones, Sgm_cPerfil, Sgm_cUsuario, Sgm_cNombre, Sgm_cAccesodeSubida };
    history.push({
      pathname: `/editar`,
      state: { usuario }
    });
  };

  const eliminar = async (Sgm_cUsuario, Sgm_cContrasena, Sgm_cNombre, Sgm_cObservaciones, Sgm_cPerfil, Sgm_cAccesodeSubida) => {
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esto",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo"
      });

      if (result.isConfirmed) {
        const _body = {
          Accion: "ELIMINAR",
          Sgm_cUsuario,
          Sgm_cContrasena,
          Sgm_cNombre,
          Sgm_cObservaciones,
          Sgm_cPerfil,
          Sgm_cAccesodeSubida
        };

        const res = await eventoService.obtenerUsuario(_body);

        if (res.error) {
          throw res.error;
        }

        Swal.fire({
          title: "¡Eliminado!",
          text: "El usuario ha sido eliminado.",
          icon: "success"
        });

        listar();
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error"
      });
    }
  };

  const [accesosSubida, setAccesosSubida] = useState(() => {
    const storedState = localStorage.getItem('accesosSubida');
    return storedState ? JSON.parse(desencriptar(storedState)) : {};
  });
  
  useEffect(() => {
    localStorage.setItem('accesosSubida', encriptar(JSON.stringify(accesosSubida)));
  }, [accesosSubida]);
  

  const handleAccesosSubidaChange = async (usuario, newValue) => {
    console.log("Cambio de estado para usuario", usuario, "Nuevo valor:", newValue);
    try {
      // Cambia el estado local primero
      setAccesosSubida((prevAccesos) => ({ ...prevAccesos, [usuario]: newValue }));
  
      // Luego realiza la actualización en el backend
      const _body = {
        Accion: "ACTUALIZARACCESOSUBIDA",
        Sgm_cUsuario: usuario,
        Sgm_cAccesodeSubida: newValue
      };
  
      const res = await eventoService.obtenerUsuario(_body);
  
      if (res.error) {
        throw res.error;
      }
  
      //console.log("Actualización exitosa en el backend");
      listar();
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
      
      // En caso de error, restaura el estado local
      setAccesosSubida((prevAccesos) => ({ ...prevAccesos, [usuario]: prevAccesos[usuario] === 'A' ? 'X' : 'A' }));
    }
  };
  

  return (
    <div style={{ ...fondoStyle, marginTop: '35px' }}>
      <Paper
        sx={{
          p: 2,
          margin: 1,
          maxWidth: 'auto',
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      >
        <Box>
          <Typography
            variant="h5"
            color="black"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            MANTENIMIENTO DE USUARIOS
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <TextField
              label="Buscar por Nombre"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon style={{ color: '#8b0000' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="left"
                    sx={{ backgroundColor: 'darkred', color: 'white', fontWeight: 'bold' }}
                  >Usuario</TableCell>
                  <TableCell align="left"
                    sx={{ backgroundColor: 'darkred', color: 'white', fontWeight: 'bold' }}
                  >Nombre</TableCell>
                  <TableCell align="left"
                    sx={{ backgroundColor: 'darkred', color: 'white', fontWeight: 'bold' }}
                  >Observaciones</TableCell>
                  <TableCell align="left"
                    sx={{ backgroundColor: 'darkred', color: 'white', fontWeight: 'bold' }}
                  >Perfil</TableCell>
                  <TableCell align="center"
                    sx={{ backgroundColor: 'darkred', color: 'white', fontWeight: 'bold' }}
                  >Accesos de subida</TableCell>
                  <TableCell align="left"
                    sx={{ backgroundColor: 'darkred', color: 'white', fontWeight: 'bold' }}
                  ></TableCell>
                  <TableCell align="left"
                    sx={{ backgroundColor: 'darkred', color: 'white', fontWeight: 'bold' }}
                  ></TableCell>
                   <TableCell align="left"
                    sx={{ backgroundColor: 'darkred', color: 'white', fontWeight: 'bold' }}
                  ></TableCell>
                  <TableCell align="left" sx={{ backgroundColor: 'darkred', color: 'white', fontWeight: 'bold' }}>
                    <IconButton>
                      <AddCircleOutlineOutlinedIcon style={{ color: 'white', fontSize: '32px' }}
                        onClick={crear}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData.map((item, index) => (
                  <TableRow key={item.Sgm_cUsuario}>
                    <TableCell align="left">{item.Sgm_cUsuario}</TableCell>
                    <TableCell align="left">{item.Sgm_cNombre}</TableCell>
                    <TableCell align="left">{item.Sgm_cObservaciones}</TableCell>
                    <TableCell align="left">{item.Sgm_cPerfil}</TableCell>
                    {/* <TableCell align="center">{item.Sgm_cAccesodeSubida}</TableCell> */}
                    <TableCell align="center">
                      <Checkbox
                        checked={accesosSubida[item.Sgm_cUsuario] === 'A'}
                        onChange={(e) => handleAccesosSubidaChange(item.Sgm_cUsuario, e.target.checked ? 'A' : 'X')}
                        inputProps={{ 'aria-label': 'Marcar/Desmarcar Accesos en Subida' }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="medium" color="primary" onClick={() => editar(item.Sgm_cUsuario, item.Sgm_cNombre, item.Sgm_cObservaciones, item.Sgm_cPerfil, item.Sgm_cAccesodeSubida)}>
                        <EditNoteOutlinedIcon tyle={{ fontSize: '30px' }} />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="medium" style={{ color: 'orange' }}
                        onClick={() => eliminar(item.Sgm_cUsuario, item.Sgm_cContrasena, item.Sgm_cNombre, item.Sgm_cObservaciones, item.Sgm_cPerfil, item.Sgm_cAccesodeSubida)}
                      >
                        <DeleteForeverOutlinedIcon style={{ fontSize: '30px' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px', alignItems: 'center' }}>
            <Typography variant="body2" color="textSecondary" sx={{ marginRight: '10px', fontWeight: 'bold' }}>
              Página {currentPage} de {totalPages}
            </Typography>
            <Button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              sx={{
                marginRight: '5px',
                color: 'black',
                backgroundColor: '',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '',
                },
              }}
            >
              <NavigateBeforeIcon />
            </Button>
            <Button
              disabled={indexOfLastItem >= filteredData.length}
              onClick={() => handlePageChange(currentPage + 1)}
              sx={{
                marginRight: '5px',
                color: 'black',
                backgroundColor: '',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '',
                },
              }}
            >
              <NavigateNextIcon />
            </Button>
          </Box>

        </Box>
      </Paper>
      <FooterRoot>
        <div></div>
        <Divider />
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '10px' }}>Copyright© 2024 - Management Group S.A.</div>
          <div></div>
        </div>
      </FooterRoot>
      <AppFooter />
      <Divider />
    </div>
  );
};

export default ListarUsuario;
