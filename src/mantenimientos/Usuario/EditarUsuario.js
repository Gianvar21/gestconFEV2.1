import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { eventoService } from '../../services/evento.service';
import md5 from 'md5';
import AppFooter from '../../components/layout/AppFooter.js';
import { Divider } from '@mui/material';
import { styled, css } from '@mui/system';
import fondo from '../../imagenes/fondotodos.png'
import Swal from 'sweetalert2';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
const EditaUsuario = (props) => {

    const fondoStyle = {
        backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${fondo})`, // Opacidad agregada con rgba
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        // Otras propiedades de estilo según tus necesidades
    };

    const history = useHistory()
    const [data, setData] = useState([])
    const [error, setError] = useState([])
    const [loading, setLoading] = useState([])

    const [Sgm_cUsuario, setUsuario] = useState('')
    const [Sgm_cNombre, setNombre] = useState('')
    const [Sgm_cContrasena, setContrasena] = useState('')
    const [Sgm_cObservaciones, setObservaciones] = useState('')
    const [Sgm_cPerfil, setPerfil] = useState('')
    const [Sgm_cAccesodeSubida, setAccesoSubida] = useState('')



    const { location } = props;
    const { usuario } = location.state;

    // Load de Pagina
    useEffect(() => {
        setUsuario(usuario.Sgm_cUsuario);
        setNombre(usuario.Sgm_cNombre);
        setContrasena(usuario.Sgm_cContrasena);
        setObservaciones(usuario.Sgm_cObservaciones);
        setPerfil(usuario.Sgm_cPerfil);
        setAccesoSubida(usuario.Sgm_cAccesodeSubida);

        //  listarusuario()
    }, [])

    // const listarusuario = async () => {
    //     try {
    //         let _body = { Accion: "BUSCARREGISTRO" , Sgm_cUsuario : Sgm_cUsuario , Sgm_cContrasena : Sgm_cContrasena }; // Declarar _body aquí

    //         const res = await eventoService.obtenerUsuariov2(_body);



    //         if (res && res[0].length > 0) {
    //             const item = res[0][0];
    //             setUsuario(item.Sgm_cUsuario);
    //             setNombre(item.Sgm_cNombre);
    //             setContrasena(item.Sgm_cContrasena);
    //             setObservaciones(item.Sgm_cObservaciones);
    //             setPerfil(item.Sgm_cPerfil);
    //         } else {
    //             setError('Usuario no encontrado');
    //         }
    //     } catch (error) {
    //         console.error('Error al obtener datos:', error);
    //         setError('Error al cargar el usuario');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // procedimiento para EDITAR un catalogo con SP MySQL


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

  const editarUsuario = async (e) => {
    try {
        // Validate that none of the required fields are empty
        if (!Sgm_cUsuario || !Sgm_cNombre || !Sgm_cContrasena || !Sgm_cObservaciones || !Sgm_cPerfil ) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se actualizó , falta llenar los campos'
            });
            return;
        }

        let _body = {
            Accion: "EDITAR",
            Sgm_cUsuario: Sgm_cUsuario,
            Sgm_cNombre: Sgm_cNombre,
            Sgm_cContrasena: md5(Sgm_cContrasena),
            Sgm_cObservaciones: Sgm_cObservaciones,
            Sgm_cPerfil: Sgm_cPerfil,
            Sgm_cAccesodeSubida: Sgm_cAccesodeSubida
        };

        await eventoService.obtenerUsuariov2(_body).then(
            (res) => {
                setData(res[0]);
                Swal.fire({
                        
                    icon: 'success',
                    title: 'Usuario',
                    text: 'Actualizado',
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            (error) => {
                console.log(error);
                setError(error);
            }
        );

    } catch (error) {
        alert(error);
    } finally {
        history.push({
            pathname: '/MantUsuario'
        });
        setLoading(false);
    }
};

    const cancelar = async (e) => {
        history.push({
            pathname: '/MantUsuario'
        });
        setLoading(false);
    }

    //     const listarPerfil = async () => {
    //     let _body = { Accion: "BUSCARPERFIL" };
    //     try {
    //         const res = await eventoService.obtenerTabParametros(_body);

    //         if (res && Array.isArray(res[0]) && res[0].length > 0) {
    //             const restricciones = res[0].map(item => item.Sgm_cRestricciones.trim());
    //             return restricciones;
    //         } else {
    //             console.error("Error: No se obtuvieron datos o los datos están en un formato incorrecto.");
    //             return [];
    //         }
    //     } catch (error) {
    //         console.error("Error al obtener datos:", error);
    //         return [];
    //     }
    // };

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

                <Box sx={{ flexGrow: 1 }}>
                    <div align="left">
                        <h2 >EDITAR USUARIOS</h2>
                    </div>

                    <Grid container spacing={2}>

                        <Grid item xs={4}>

                            <TextField
                                label="Usuario"
                                value={Sgm_cUsuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                name="textformat"
                                id="usuario"
                                variant="standard"
                                disabled
                            />
                            <TextField
                                label="Nombre"
                                value={Sgm_cNombre}
                                onChange={(e) => setNombre(e.target.value)}
                                name="textformat"
                                id="nombre"
                                variant="standard"

                            />
                            <TextField
                                label="Contraseña"
                                value={Sgm_cContrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                name="textformat"
                                id="contrasena"
                                variant="standard"
                            />
                            <TextField
                                label="Observaciones"
                                value={Sgm_cObservaciones}
                                onChange={(e) => setObservaciones(e.target.value)}
                                name="textformat"
                                id="observaciones"
                                variant="standard"

                            />
                            <TextField
                                label="Perfil"
                                value={Sgm_cPerfil}
                                onChange={(e) => setPerfil(e.target.value)}
                                name="textformat"
                                id="perfil"
                                variant="standard"

                            />
                              <TextField
                                label="Accesos de Subida"
                                value={Sgm_cAccesodeSubida}
                                onChange={(e) => setAccesoSubida(e.target.value)}
                                name="textformat"
                                id="accesodesubida"
                                variant="standard"
                                disabled

                            />
                               {/* <div>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={Sgm_cAccesodeSubida === 'A'}
                                            onChange={(e) => {
                                                console.log('Antes de cambiar:', Sgm_cAccesodeSubida);
                                                setAccesoSubida(e.target.checked ? 'A' : 'X');
                                                console.log('Después de cambiar:', Sgm_cAccesodeSubida);
                                            }}
                                            inputProps={{ 'aria-label': 'Marcar/Desmarcar Accesos en Subida' }}
                                        />
                                    }
                                    label="Accesos en Subida"
                                />
                                {Sgm_cAccesodeSubida}
                            </div> */}
                        </Grid>

                    </Grid>

                    <Grid container spacing={2} style={{marginTop:'2px'}}>
                        <Grid item xs={8}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Button variant="contained" size="small" style={{ color: 'white', backgroundColor: 'darkred' }} onClick={editarUsuario}>Actualizar</Button>
                                        </td>
                                        <td>
                                            <Button variant="contained" size="small" style={{ color: 'white', backgroundColor: 'darkred' }} onClick={cancelar}>Cancelar</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Grid>
                    </Grid>
                </Box >

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
        </div>
    )

}

export default EditaUsuario