import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { eventoService } from '../../services/evento.service';
import md5 from 'md5'; // Importa la función md5 si aún no lo has hecho
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
const ListarRestricciones = (props) => {

  const fondoStyle = {
    backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${fondo})`, // Opacidad agregada con rgba
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    // Otras propiedades de estilo según tus necesidades
  };
  const history = useHistory();
  const [data, setData] = useState([]);
  const [searchTermRestriccion, setSearchTermRestriccion] = useState('');
  const [searchTermTipo, setSearchTermTipo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);


  // Cargar al inicio de la página
  useEffect(() => {
    listar();
  }, []);



  const listar = async () => {
    let _body = { Accion: "BUSCARTODOS" };
    try {
      const res = await eventoService.obtenerTabParametros(_body);

      //console.log("Respuesta de la API:", res);

      if (res && res[0]) {
        //  console.log(res[0]);
        setData(res[0]);
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
    item?.Sgm_cRestricciones?.toLowerCase().includes(searchTermRestriccion.toLowerCase()) &&
    item?.Sgm_cTipo?.toLowerCase().includes(searchTermTipo.toLowerCase())
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
        font-size: 0.6  rem;
        justify-content: space-between;
      }
    `
  );

  // procedimiento para CREAR un catalogo con SP MySQL
  const crear = () => {
    history.push({
      pathname: '/crearRestric',
      state: {}
    });
  }

  const editar = (Sgm_cRestricciones, Sgm_cTipo) => {

    const restriccion = { Sgm_cRestricciones, Sgm_cTipo };

    history.push({
      pathname: `/editarRestric`,
      state: { restriccion }
    });
  };

  const eliminar = async (Sgm_cRestricciones, Sgm_cTipo) => {
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
          Sgm_cRestricciones,
          Sgm_cTipo,
        };

        const res = await eventoService.obtenerTabParametros(_body);

        if (res.error) {
          throw res.error;
        }

        Swal.fire({
          title: "¡Eliminado!",
          text: "La Restriccion ha sido eliminado.",
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

  const limpiarcampos = () => {
    setSearchTermRestriccion('');
    setSearchTermTipo('');
  }
  return (
    <div style={{ ...fondoStyle, marginTop: '35px' }}>
      <Paper
        sx={{
          p: 2,
          margin: 1,
          maxWidth: '80%',
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
            MANTENIMIENTO DE RESTRICCIONES
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <TextField
              label="Buscar por Restriccion"
              variant="outlined"
              size="small"
              value={searchTermRestriccion}
              onChange={(e) => setSearchTermRestriccion(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon style={{ color: '#8b0000' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ marginRight: '20px' }}
            />

            <TextField
              label="Buscar por Tipo"
              variant="outlined"
              size="small"
              value={searchTermTipo}
              onChange={(e) => setSearchTermTipo(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon style={{ color: '#8b0000' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button
            variant="contained"
            onClick={limpiarcampos}
            style={{ marginLeft: 'auto', backgroundColor: 'darkred', marginBottom: '10px' }}
          >
            Limpiar Campos
          </Button>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="left"
                    sx={{ backgroundColor: 'darkred', color: 'white', fontWeight: 'bold' }}
                  >Restricciones</TableCell>
                  <TableCell align="left"
                    sx={{ backgroundColor: 'darkred', color: 'white', fontWeight: 'bold' }}
                  >Tipo</TableCell>
                  <TableCell align="left"
                    sx={{ backgroundColor: 'darkred', color: 'white', fontWeight: 'bold' }}
                  ></TableCell>
                  <TableCell align="left"
                    sx={{ backgroundColor: 'darkred', color: 'white', fontWeight: 'bold' }}
                  ></TableCell>
                  <TableCell align="center" sx={{ backgroundColor: 'darkred', color: 'white', fontWeight: 'bold' }}>
                    <IconButton
                      onClick={crear}  // Mueve el evento onClick al componente IconButton
                    >
                      <AddCircleOutlineOutlinedIcon style={{ color: 'white', fontSize: '32px' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{item.Sgm_cRestricciones}</TableCell>
                    <TableCell align="left">{item.Sgm_cTipo}</TableCell>
                    <TableCell align="center">
                      <IconButton size="medium" color="primary" onClick={() => editar(item.Sgm_cRestricciones, item.Sgm_cTipo)}>
                        <EditNoteOutlinedIcon tyle={{ fontSize: '30px' }} />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="medium" style={{ color: 'orange' }}
                        onClick={() => eliminar(item.Sgm_cRestricciones, item.Sgm_cTipo)}
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

export default ListarRestricciones;