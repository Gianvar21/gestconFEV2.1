import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';

import AppRoutes from './AppRoutes';
import Menu from './components/layout/menu/Index';
import ComponentAlert from './components/common/others/ComponentAlert';


const AppBarOffset = styled('div')(({ theme }) => theme.mixins.toolbar);

const useStyles = makeStyles((theme) => ({
  root: ({ isUserLogged }) => ({
    display: isUserLogged ? 'flex' : 'block',
    '& .MuiAppBar-positionFixed': { zIndex: 1201 },

    '& .MuiAppBar-root': {
      padding: 0,
      paddingRight: '0 !important',

      '& .MuiToolbar-root': {
        '& .toolbar-left': {
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',

          '& div:first-child': {
            marginRight: '15px',
          },
        },
        '& .toolbar-right': {},
      },
    },

    '& .content': {
      width: '100%',
    },

    // '& .contentsm': {
    //   width: '100%',
    //   marginTop:'-15px'
    // },
  }),
}));

function AppContent(props) {
  const { accessToken, portalTabs, menuState, viewport } = props;

  const appAlerts = useSelector((state) => state.appAlerts);

  const classes = useStyles({
    // isUserLogged: accessToken.token ? true : false,
    isUserLogged: accessToken.token ? true : true,
  });

  return (
    <div className={classes.root}>
      
      <Menu
        viewport={viewport}
        state={menuState}
        global={props.global}
        tabs={portalTabs}
      />
      <main className="content">
        {appAlerts.length > 0 && <ComponentAlert menuState={menuState} />}
        <AppBarOffset />
        <AppRoutes {...props} />
      </main>
    </div>
  );
}

export default AppContent;
