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
const EditarRestricciones = (props) => {

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

    const [Sgm_cRestricciones, setRestricciones] = useState('')
    const [Sgm_cTipo, setTipo] = useState('')


    const { location } = props;
    const { restriccion } = location.state;



    // Load de Pagina
    useEffect(() => {
        if (restriccion) {
            setRestricciones(restriccion.Sgm_cRestricciones);
            //console.log(setRestricciones);
            setTipo(restriccion.Sgm_cTipo);
            //console.log(setTipo);
        }
    }, []);


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

    const editarRestric = async (e) => {
        try {
            // Validate that none of the required fields are empty
            if (!Sgm_cRestricciones || !Sgm_cTipo) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se actualizó , falta llenar los campos'
                });
                return;
            }

            let _body = {
                Accion: "EDITAR",
                Sgm_cRestricciones: Sgm_cRestricciones,
                Sgm_cTipo: Sgm_cTipo,
            };

            await eventoService.obtenerTabParametros(_body).then(
                (res) => {
                    setData(res[0]);
                    Swal.fire({

                        icon: 'success',
                        title: 'Restricción',
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
                pathname: '/MantRestric'
            });
            setLoading(false);
        }
    };

    const cancelar = async (e) => {
        history.push({
            pathname: '/MantRestric'
        });
        setLoading(false);
    }

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
                        <h2 >EDITAR RESTRICCIONES</h2>
                    </div>

                    <Grid container spacing={2}>

                        <Grid item xs={4}>

                            <TextField
                                label="Restricción"
                                value={Sgm_cRestricciones}
                                onChange={(e) => setRestricciones(e.target.value)}
                                name="textformat"
                                id="restriccion"
                                variant="standard"
                                autoFocus
                            />
                            <TextField
                                label="Tipo"
                                value={Sgm_cTipo}
                                onChange={(e) => setTipo(e.target.value.toUpperCase())}
                                name="Sgm_cTipo"
                                id="tipo"
                                variant="standard"
                                inputProps={{ maxLength: 2 }}
                                disabled
                            />
                        </Grid>

                    </Grid>

                    <Grid container spacing={2} style={{ marginTop: '2px' }}>
                        <Grid item xs={8}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Button variant="contained" size="small" style={{ color: 'white', backgroundColor: 'darkred' }} onClick={editarRestric}>Actualizar</Button>
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

export default EditarRestricciones