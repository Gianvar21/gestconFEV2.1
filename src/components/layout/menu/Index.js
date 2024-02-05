import React, { Fragment, useState, useEffect } from 'react';


import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import logoImage from '../../../imagenes/mgsa.jpg'
import { Avatar, Chip, Drawer } from '@mui/material';
import { useDispatch } from 'react-redux';


import { makeStyles } from '@mui/styles';


import TreeComponent from './TreeComponent';

const useStyles = makeStyles({
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logo: {
    width: '210px',
    margin: '0 15px',
    borderBottom: '0px solid #dcdcdc', // Añade un borde inferior a la imagen
  },
});




const StyledMenu = styled(Drawer)(
  ({ theme, viewport, state }) => css`
    display: ${['expanded', 'icons'].includes(state.current)
      ? 'block'
      : 'none'};
    width: ${state.width};
    position: sticky;
    top: 50px;
    border-top: 10;

    .MuiPaper-root {
      border-top: 0;
      width: ${state.width};
      margin-top: ${['xs', 'sm'].includes(viewport) ? '0px' : '0px'};
      justify-content: space-between;
      background-color: white;
    }

    #menu-dev-info {
      text-align: center;
      color:white;
    }

    #logo-and-timer {
      height: 150px;

      .portalLogo {
        img {
          max-width: 200px;
          display: block;
          margin: auto;
        }
      }

      .appTimer {
        display: flex;
        justify-content: center;

        div:first-child {
          color: brown;
          font-weight: 600;
          padding-right: 10px;
        }
      }
    }
  `
);

const Menu = (props) => {

  const theme = useTheme();
  const dispatch = useDispatch();
  const { viewport, state, global } = props;
  const classes = useStyles();

  const drawerContent = (
    <Fragment>
      <div id="menu-tabs">

        <TreeComponent  />
        

      </div>

      {/* Contenedor flex para centrar verticalmente */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', top: '-45px' }}>
        {/* Agrega la imagen debajo del menú */}
        <div id="menu-image">
          <img src={""} alt="" className={classes.logo} />
        </div>
      </div>
    </Fragment>
  );

  const container = !window ? () => window().document.body : undefined;

  return (
    <>
      <StyledMenu
        state={state}
        viewport={viewport}
        container={container}
        variant="temporary"
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={state.current === 'expanded' ? true : false}
        onClose={() =>
          dispatch({
            type: 'SET_MENU_STATE',
            payload: 'hidden',
          })
        }
        ModalProps={{ keepMounted: true }}
        sx={{ display: { sm: 'block', md: 'none' } }}
      >
        {drawerContent}



      </StyledMenu>



      <StyledMenu
        state={state}
        viewport={viewport}
        variant="permanent"
        open={state.current === 'expanded' ? true : false}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        {drawerContent}

      </StyledMenu>


    </>
  );
};

export default Menu;
