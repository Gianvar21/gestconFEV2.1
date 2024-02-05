//menavbardisplay.js
import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import Login from '../../../views/Login';

import Crear from '../../../mantenimientos/Usuario/CrearUsuario';

import {
  Button,
  Menu,
  Box,
  Avatar,
  ListItemIcon,
  Divider,
  ButtonGroup,
  ListItemText,
} from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';

import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import { store } from '../../../store';

import { useDispatch } from 'react-redux';
import { appThemes, appColors } from '../../../theme/AppThemes';
import { AccountBoxOutlined } from '@mui/icons-material';
import Cookies from 'universal-cookie';
import { storage } from "../../../storage.js";
const cookies = new Cookies();

const StyledMenu = styled(Menu)(
  ({ theme }) => css`
    & .menuItem {
      .MuiButtonGroup-grouped {
        min-width: 30px;
      }

      .activeBtnInGroup {
        color: ${theme.palette.primary.main};
      }

      .MuiMenuItem-root {
        justify-content: space-between;
      }

      .menuItemLabel {
        display: flex;
        min-width: 170px;
        align-items: center;
      }

      .MuiListItemIcon-root {
        min-width: 30px;
      }

      .menu-list-box {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  `
);

const MeNavBarDisplay = (props) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const currentAppThemeFullName = theme.palette.typeFullName;
  const currentPrimaryAppColor = theme.palette.primary.main;

  const { mixedRoute, currentUser } = store.getState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [localize, setLocalize] = useState('English');


  const [isLoged, setIsLoged] = useState(false);
  const [username, setUsername] = useState("");


  const openMenu = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    if (e.key !== 'Tab') {
      setAnchorEl(null);
    }
  };
  const [showLoginForm, setShowLoginForm] = useState(!isLoged); 
  const handleLogin = () => {
    setIsLoged(true);
    setUsername(currentUser.detail.username);
    setShowLoginForm(false);
    // Additional logic if needed
  };

  const handleLogout = () => {
    setIsLoged(false);
    setUsername("");
    setShowLoginForm(false);
    window.location.href = "../logout";
  };


  const handleProfile = () => {
    history.push(
      currentUser.userRoles.includes('Customer')
        ? `/profile/customer/${currentUser.detail.userID}`
        : `/profile/agent/${currentUser.detail.publicID}`
    );
  };

  const languageButtons = [
    <Button
      color={'default'}
      key="en"
      onClick={(e) => {
        setLocalize('English');
        i18n.changeLanguage('en');
      }}
    >
      <span className={`${localize === 'English' ? 'activeBtnInGroup' : ''}`}>
        EN
      </span>
    </Button>,
    <Button
      color={'default'}
      key="es"
      onClick={(e) => {
        setLocalize('Spanish');
        i18n.changeLanguage('es');
      }}
    >
      <span className={`${localize === 'Spanish' ? 'activeBtnInGroup' : ''}`}>
        ES
      </span>
    </Button>,
  ];

  // Load de Pagina
  useEffect(() => {
    
    const _IsLoged= storage.GetStorage("IsLoged");
    setIsLoged(_IsLoged);
// console.log('_IsLoged : ', _IsLoged);


  }, [])



  return (
    <React.Fragment>
      <Box>
        <Button
          color="inherit"
          onClick={handleMenu}
          startIcon={<AccountCircleOutlinedIcon />}
        >
          {isLoged ? `${username} CERRAR` : "INGRESAR"}
        </Button>
      </Box>
      <StyledMenu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        style={{ marginTop: '10px' }}
        variant="menu"
      >
        {!isLoged && showLoginForm && <Login />}

        {isLoged && (
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cerrar Sesion</ListItemText>
          </MenuItem>
        )}
      </StyledMenu>
    </React.Fragment>
  );
};
export default MeNavBarDisplay;

