import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import MeNavBarDisplay from '../common/others/MeNavBarDisplay';
import { useDispatch } from 'react-redux';
import { store } from '../../store';
import { useTheme } from 'styled-components';



const AppTopBar = (props) => {
  

  const dispatch = useDispatch();
  const { global, menuState } = store.getState();

  const theme = useTheme();

  return (

    <AppBar style={{ backgroundColor :theme.palette.sbAppBarYMenuBG?.main }}>
      <Toolbar variant="dense" style={{ justifyContent: 'space-between' }}>
        <div className="toolbar-left">
          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() =>
                dispatch({
                  type: 'SET_MENU_STATE',
                  payload:
                    menuState.current === 'expanded' ? 'hidden' : 'expanded',
                })
              }
              size="large"
            >
              <MenuIcon />
              
            </IconButton>
            

            {menuState.current === 'icons' && <span>{global.portalName}</span>}

            
          </div>
        </div>

        

        <div className="toolbar-left">
        <Typography variant="h6" color="white" component="div">
            Sistema de Gestión de Contenido - GESCONT v 2.0
          </Typography>
        </div>

        <div className="toolbar-right">
          <MeNavBarDisplay setTheme={(event) => props.setter(event)}  />
        </div>
      </Toolbar>
      


    </AppBar>

  );
};

export default AppTopBar;
