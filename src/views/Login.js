import React, { useState } from 'react'
import { Grid, Container, Paper, Avatar, Typography, TextField, Button, CssBaseline } from '@material-ui/core'
import { makeStyles } from '@mui/styles';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { eventoService } from '../services/evento.service';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { storage } from "../storage.js";


const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
	root: {

	},
	container: {
		opacity: '1',
		height: '50%',

		marginTop: theme.spacing(0),
		[theme.breakpoints.down(400 + theme.spacing(0) + 0)]: {
			marginTop: 0,
			width: '100%',
			height: '100%'
		}
	},
	div: {

		marginTop: theme.spacing(0),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},





	avatar: {
		margin: theme.spacing(0),
		backgroundColor: theme.palette.primary.main
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(0)
	},
	button: {
		margin: theme.spacing(0, 0, 0)

	}
}))

const Login = () => {
	const [body, setBody] = useState({ nickname: '', password: '' })
	const classes = useStyles()
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [logeo, setLogeo] = useState('');
	const [error, setError] = useState('');
	const [Token, setToken] = useState('');
	const [showPassword, setShowPassword] = useState(false);


	const BuscarToken = async () => {
		try {
			let _body = { Sgm_cUsuario: username, Sgm_cContrasena: md5(password) };

			// obtenemos el token
			const tokenResponse = await eventoService.obtenerToken(_body);

			// Utiliza la variable local en lugar del estado Token
			if (tokenResponse) {
				storage.SetStorage("token", tokenResponse.token);
				//cookies.set('token', tokenResponse.token, { path: "/" });
				setError('');
			}
		} catch (error) {
			setError('An error occurred while trying to login - token');
		}
	};



	const handleLogin = async () => {
		try {
			// Genera un token
			await BuscarToken();
			const token = storage.GetStorage("token");
			// Valida si encontró el token
			if (!token) {
				throw "Error: Token no existe";
			}

			let _body = { Accion: "VALIDARUSUARIO", Sgm_cUsuario: username, Sgm_cContrasena: md5(password) };
			let _result;

			// Si encontró el token ingresa al login
			await eventoService.obtenerUsuariov2(_body).then(
				(res) => {
					setLogeo(res[0]);
					_result = res[0];
				},
				(error) => {
					console.log(error);
					throw "Error al obtener el usuario";
				}
			);

			if (_result[0].Sgm_cUsuario === username) {
				// cookies.set('Sgm_cUsuario', _result[0].Sgm_cUsuario, { path: "/" });
				// cookies.set('Sgm_cNombre', _result[0].Sgm_cNombre, { path: "/" });
				//cookies.set('Sgm_cContrasena', _result[0].Sgm_cContrasena, { path: "/" });
				//cookies.set('Sgm_cObservaciones', _result[0].Sgm_cObservaciones, { path: "/" });
				//cookies.set('Sgm_cPerfil', _result[0].Sgm_cPerfil, { path: "/" });
				// cookies.set('Sgm_cAccesodeSubida', _result[0].Sgm_cAccesodeSubida, { path: "/" });
				// cookies.set('IsLoged', true, { path: "/" });

				storage.SetStorage("IsLoged", "true");
				storage.SetStorage("Sgm_cUsuario", _result[0].Sgm_cUsuario);
				storage.SetStorage("Sgm_cNombre", _result[0].Sgm_cNombre);
				storage.SetStorage("Sgm_cAccesodeSubida", _result[0].Sgm_cAccesodeSubida);
				storage.SetStorage("Sgm_cPerfil", _result[0].Sgm_cPerfil);
				
				setError('');


				if (token) {
					window.location.href = "./gestcon";
				}
			}
		} catch (error) {
			setError('');
			console.error('Error durante el inicio de sesión:', error);

			// Muestra una notificación en caso de error
			toast.error('Usuario o contraseña incorrectos', {
				position: toast.POSITION.TOP_CENTER,
			});
		}
	};



	return (
		<Container component="main" maxWidth="xs" style={{ border: '1.5px solid #8b0000', borderRadius: '5px', padding: '16px' }}>
			<Paper elevation={0}>
				<form>

					<label style={{ fontWeight: 'bold', fontSize: '1.2em', textAlign: 'center', color: 'darkred' }}>Ingreso al Sistema</label>
					<div>.</div>
					<div style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', textAlign: 'left', fontWeight: 'bold' }}>
						<label htmlFor="username">Usuario:</label>
						<TextField
							id="username"
							autoFocus
							variant="outlined"
							margin="normal"
							style={{ width: '200px' }}
							value={username}
							onChange={(e) => setUsername(e.target.value.toUpperCase())}
							onKeyDown={(e) => {
								if (e.key === 'Tab') {
									e.preventDefault();
									document.getElementById('password').focus();
								}
								if (e.key === 'Enter') {
									e.preventDefault();
									handleLogin();
								}
							}}
							autoComplete="username"
						/>
					</div>
					{/* Etiqueta y campo de Contraseña */}
					<div>.</div>
					<div style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', textAlign: 'left', marginTop: '-20px', fontWeight: 'bold' }}>

						<label htmlFor="username">Contraseña:</label>
						<TextField
							id="password"
							type={showPassword ? 'text' : 'password'}
							variant="outlined"
							margin="normal"
							style={{ width: '200px' }}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							onKeyPress={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault();
									handleLogin();
								}
							}}
							autoComplete="current-password"
							InputProps={{
								endAdornment: (
									<Button
										onClick={() => setShowPassword(!showPassword)}
										style={{ padding: 0, minWidth: 0 }}
										disableRipple
									>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</Button>
								),
							}}
						/>
					</div>

					{/* Botón de Ingresar */}
					<Button variant="contained" style={{ backgroundColor: '#8b0000', color: 'white' }} fullWidth onClick={handleLogin}>
						Ingresar
					</Button>
				</form>
			</Paper>

			{/* ToastContainer para mostrar notificaciones */}
			<ToastContainer />
		</Container>
	);
};

export default Login
