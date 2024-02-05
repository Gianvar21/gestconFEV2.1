import React, { useCallback, useState, useEffect } from 'react';
import { eventoService } from '../services/evento.service';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import { Typography, Box, Paper, InputAdornment, TextField, Divider } from '@mui/material';
import { PictureAsPdf as PdfIcon } from '@mui/icons-material';
import { styled, css } from '@mui/system';
import AppFooter from '../components/layout/AppFooter';
import { makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Button from '@mui/material/Button';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import Swal from 'sweetalert2';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDropzone } from 'react-dropzone';
import fon from '../imagenes/buscar.png'
import { storage } from "../storage.js";
import { SHA256 } from 'crypto-js';
import {
  IconForXlsx,
  IconForImagenes,
  IconForOtherFile,
  IconForPptx,
  IconForVideo,
  IconForWinrar,
  IconForDocx,
  IconForZip,
  IconForMusic,
} from './export-iconos/IconComponents';
import LinearProgress from '@mui/material/LinearProgress';
const apiHost = `${SERVICE_URL}`;

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

const useStyles = makeStyles({

  customDataGrid: {
    '& .MuiDataGrid-cell': {
      fontSize: '15px',  // Ajusta el tamaño de letra según tus necesidades
    },

  },
});

const LoadFiles = (props) => {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [documentos, setDocumentos] = useState([]);
  const [hoveredDocument, setHoveredDocument] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [urlActual, setUrlActual] = useState('');
  const [titulo, setTitulo] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  const itemsPerPage = 10;
  const [data, setData] = useState(null);

  const [isLoged, setIsLoged] = useState(false);

  let _accesoSubida = '';
  let _validarUsuario = '';

  const onDrop = useCallback((acceptedFiles) => {
    // Actualiza el estado con los archivos seleccionados
    setSelectedFile(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    multiple: true, // Permite la carga de múltiples archivos
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar la ventana emergente
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Load de Pagina
  useEffect(() => {

    const _IsLoged = storage.GetStorage("IsLoged");
    setIsLoged(_IsLoged);
    //console.log('_IsLoged : ', _IsLoged);


  }, [])




  useEffect(() => {



    //---------------------------------
    // Obtén la cadena de consulta de la URL
    const queryString = window.location.search;

    // Parsea la cadena de consulta para obtener los parámetros
    const urlParams = new URLSearchParams(queryString);

    // Obtiene el valor del parámetro 'path'
    const pathValue = urlParams.get('path');

    setUrlActual(pathValue);

    const ultimoDirectorio = obtenerUltimoDirectorio(queryString);
    setTitulo(ultimoDirectorio.toUpperCase());
    //---------------------------------


    const category = String(pathValue);


    setSelectedCategory(category);

    function obtenerUltimoDirectorio(url) {
      // Obtener el valor del parámetro 'path' de la URL
      const queryParams = new URLSearchParams(url.split('?')[1]);
      const path = queryParams.get('path');

      // Separar el path en partes utilizando el carácter '\'
      const partesPath = path.split('\\');

      // Obtener el último valor del array resultante
      const ultimoDirectorio = partesPath.pop();

      return ultimoDirectorio;
    }

    const fetchDocumentosData = async () => {
      try {





        const res = await eventoService.obtenerFilesv2(category);

        if (res && res.files && Array.isArray(res.files) && res.files.length > 0) {
          setDocumentos(res.files);
        } else {
          console.warn('La propiedad files no es un array válido:', res.files);
          setDocumentos([]);
        }
      } catch (error) {
        console.error('Error fetching documents:', error.message);
      }
    };

    if (category) {
      fetchDocumentosData();
    } else {
      setDocumentos([]);
    }
  }, [props.pCategory]);




  const handleDocumentClick = (document) => {
    const encodedCategory = encodeURIComponent(selectedCategory);
    const encodedDocument = encodeURIComponent(document);
    const documentUrl = apiHost + `/con/archivos?category=${encodedCategory}&document=${encodedDocument}`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.open(documentUrl, '_system');
    } else {
      // Mostrar un modal con opciones personalizadas

      window.open(documentUrl, '_blank')
      //console.log(documentUrl);
    }
  };



  const handleFileChange = (event) => {
    // Aquí actualizamos el estado con el archivo seleccionado
    setSelectedFile(event.target.files[0]);
  };



  const listarRestricciones = async () => {
    let _body = { Accion: "BUSCARRESTRIC" };
    try {
      const res = await eventoService.obtenerTabParametros(_body);

      if (res && Array.isArray(res[0]) && res[0].length > 0) {
        const restricciones = res[0].map(item => item.Sgm_cRestricciones.trim());
        return restricciones;
      } else {
        console.error("Error: No se obtuvieron datos o los datos están en un formato incorrecto.");
        return [];
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
      return [];
    }
  };

  const listaTamanio = async () => {
    let _body = { Accion: "BUSCARTAMANIO" };
    try {
      const res = await eventoService.obtenerTabParametros(_body);

      if (res && Array.isArray(res[0]) && res[0].length > 0) {
        const tamanioPermitidoString = res[0][0]?.Sgm_cRestricciones?.replace(/,/g, ''); // Elimina comas
        //console.log(tamanioPermitidoString);
        //console.log(Sgm_cRestricciones);
        const tamanioPermitido = parseInt(tamanioPermitidoString, 10);
        //console.log(tamanioPermitido);
        return tamanioPermitido;
      } else {
        console.error("Error: No se obtuvieron datos o los datos están en un formato incorrecto.");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
      return null;
    }
  };



  const handleFileUpload = async () => {
    try {



      if (!selectedFile || selectedFile.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se ha seleccionado ningún archivo.'
        });
        return;
      }

      const restricciones = await listarRestricciones();
      const tamanioPermitido = await listaTamanio();

      if (!restricciones || restricciones.length === 0 || tamanioPermitido === null) {
        console.error('Error: No se obtuvieron restricciones o tamaño permitido.');
        return;
      }

      let successFlag = true;

      for (const file of selectedFile) {
        // Verificar si ya existe un archivo con el mismo nombre
        const existingFile = documentos.find((doc) => doc.fileName === file.name);
        if (existingFile) {
          successFlag = false;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ya existe un archivo con el mismo nombre.'
          });
          break;
        }
        if (file.size > tamanioPermitido) {
          successFlag = false;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El tamaño del archivo supera el límite permitido de 50mb.'
          });
          break;
        }

        // Verificar si la extensión del archivo está en la lista de restricciones
        const fileExtension = file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);
        if (restricciones.includes(`.${fileExtension}`)) {
          successFlag = false;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `La carga de archivos con extensión .${fileExtension} está restringida.`
          });
          break;
        }

        const response = await eventoService.cargarArchivo(file, urlActual, file.name);

        if (response && response.success) {
          successFlag = false;
          console.error(`Error al cargar el archivo ${file.name}:`, response.message || 'Error desconocido');
          break;
        }
      }

      if (successFlag) {
        Swal.fire({
          icon: 'success',
          title: 'Todos los archivos cargados con éxito'
        }).then(() => {
          setIsModalOpen(false);
          window.location.reload();
        });
      }
    } catch (error) {
      console.error('Error durante la carga de archivos:', error.message || 'Error desconocido');
      alert(error.message || 'Error desconocido');
    }
  };




  const handleButtonClick = (item) => {
    handleDocumentClick(item.fileName);
  };

  const filteredDocumentos = documentos.filter((documento) =>
    documento.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDocumentos = filteredDocumentos.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredDocumentos.length / itemsPerPage);

  const renderFileTypeIcon = (fileName) => {
    const fileExtension = fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();

    switch (fileExtension) {
      case 'pdf':
        return <PdfIcon style={{ fontSize: 30, color: 'darkred' }} />;
      case 'docx':
        // Agrega aquí el icono para archivos Word
        return <IconForDocx />; // Reemplaza esto con tu propio icono o componente
      case 'xlsx':
      case 'xls':
      case 'xlsm':
      case 'xml':
        return <IconForXlsx />;
      case 'pptx':
        return <IconForPptx />;
      case 'jpg':
      case 'png':
      case 'jpeg':
      case 'jpe':
      case 'bmp':
        return <IconForImagenes />;
      case 'mp4':
      case 'wmv':
        return <IconForVideo />;
      case 'zip':
        return <IconForZip />;
      case 'rar':
        return <IconForWinrar />;
      case 'mp3':
      case 'm4a':
      case 'wav':
        return <IconForMusic />;
      default:
        return <IconForOtherFile />;
    }
  };

  const dropzoneStyle = {
    border: '2px dashed #cccccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '20px',
  };


  return (
    <div style={{ marginTop: '35px' }}>
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
 {isLoged && (
      <Button
        variant="contained"
        onClick={async () => {
          try {
            // Utilizar el token del estado local
            const response = await fetch('/ruta/del/servidor/para/verificar/acceso', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                // Incluir el token JWT en las cabeceras para autenticación en el backend
                'Authorization': 'Bearer ' + token,
              },
              body: JSON.stringify({
                Sgm_cUsuario: storage.GetStorage("Sgm_cUsuario"),
              }),
            });

            if (response.ok) {
              // Acceso válido, abrir el modal
              openModal();
            } else {
              // Acceso no válido, mostrar advertencia
              Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Debes tener acceso para subir.',
              });
            }
          } catch (error) {
            // Manejar errores de la solicitud
            console.error('Error en la solicitud al servidor:', error);
          }
        }}
        style={{ marginLeft: 'auto', backgroundColor: 'darkred', marginBottom: '10px' }}
      >
        Subir Archivo
      </Button>
    )}

        {isModalOpen && (
          <div style={{
            position: 'fixed',
            zIndex: 1,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            overflow: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
            <div style={{
              backgroundColor: '#eeeeee',
              margin: '15% auto',
              padding: '50px',
              border: '1px solid #888',
              width: '60%',
              position: 'relative',
            }}>
              {/* Icono "X" en la esquina superior derecha */}
              <div style={{
                color: 'darkred',
                fontSize: '35px',
                fontWeight: 'bold',
                cursor: 'pointer',
                position: 'absolute',
                top: '10px',
                right: '30px',
              }} onClick={closeModal}>
                &times;
              </div>
              <Typography variant="h6" color="black" gutterBottom>
                Seleccione los archivos a cargar
              </Typography>
              <div {...getRootProps()} style={dropzoneStyle}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Suelta los archivos aquí...</p>
                ) : (
                  <div>
                    {acceptedFiles.length > 0 ? (
                      <div>

                        <ul>
                          {acceptedFiles.map((file, index) => (
                            <li key={index}>{file.name}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p style={{ fontSize: '70px', color: 'gray', opacity: '0.3' }}>+</p>
                    )}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: 'gray', width: '48%' }}
                  onClick={closeModal}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: 'darkred', width: '48%' }}
                  onClick={handleFileUpload}
                >
                  Empezar a Cargar
                </Button>

              </div>
            </div>
          </div>
        )}

        <Typography
          variant="h5"
          color="black"
          align="center"
          fontWeight="bold"
          gutterBottom
        >
          {titulo}
        </Typography>
        <Typography
          variant="h6"
          color="black"
          align="left"
          fontSize="16px"
          fontWeight="normal"
          gutterBottom
        >
          Directorio: {urlActual}
        </Typography>

        {/* Agrega condición para el label "Buscar por Nombre" */}
        {!isModalOpen && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <TextField
              label="Buscar por Nombre"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" >
                    <SearchIcon style={{ color: '#8b0000' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        )}
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ backgroundColor: 'darkred', color: 'white', fontWeight: 'bold' }}
                >
                  Tipo
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ backgroundColor: 'darkred', color: 'white', fontWeight: 'bold' }}
                >
                  Nombre del Archivo
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ backgroundColor: 'darkred', color: 'white', fontWeight: 'bold' }}
                >
                  Fecha de Modificación
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ backgroundColor: 'darkred', color: 'white', fontWeight: 'bold' }}
                >
                  Tamaño del Archivo
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ backgroundColor: 'darkred', color: 'white', fontWeight: 'bold' }}
                >
                  Visualización
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentDocumentos.map((item, idx) => (
                <TableRow key={`${idx}_${indexOfFirstItem + idx}`}>
                  <TableCell align="center">
                    {renderFileTypeIcon(item.fileName)}
                  </TableCell>
                  <TableCell align="left">{item.fileName}</TableCell>
                  <TableCell align="center">{item.lastModified}</TableCell>
                  <TableCell align="center">{item.fileSize}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      variant="contained"
                      size="small"
                      color="black"
                      onClick={() => handleButtonClick(item)}
                    >
                      <img src="../imagenes/buscar.png" alt="" width="23" height="25" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Agrega la paginación */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px', alignItems: 'center' }}>
          <Typography variant="body2" color="textSecondary" sx={{ marginRight: '10px', fontWeight: 'bold' }}>
            Página {currentPage} de {totalPages}
          </Typography>
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
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
            disabled={indexOfLastItem >= filteredDocumentos.length}
            onClick={() => setCurrentPage(currentPage + 1)}
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
      </Paper>
      {/* Nuevo código que quieres agregar */}
      <FooterRoot>
        <div></div>
        <Divider />
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '10px' }}>Copyright© 2024 - Management Group S.A.</div>
          <div></div>
        </div>
      </FooterRoot>
      <AppFooter />
    </div>
  );
};

export { LoadFiles };