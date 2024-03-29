import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { store } from '../../../store';
import { Button } from '@mui/material';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { sanitizeHTML } from '../../../helpers';

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    width: '100%',
    zIndex: '30',
    top: props.showLoginBar || props.useLogged ? '50px' : '0px',
    position: 'relative',

    [theme.breakpoints.down('md')]: {
      width: '100%',
    },

    '& .MuiAlert-root': {
      borderRadius: 0,
      marginBottom: '1px',
    },

    '& ul': {
      listStyle: 'disc !important',
    },
  }),
}));

const AlertItem = (props) => {
  const { alert } = props;
  const dispatch = useDispatch();
  const [parsedMessage, setparsedMessage] = useState('');
  const [parsedErrors, setParsedErrors] = useState([]);
  const [canRedirect, setCanRedirect] = useState(false);

  useEffect(() => {
    if (!alert.keepOpen) {
      setTimeout(() => {
        if (alert.withRedirect && !alert.withRedirect?.isButton) {
          setCanRedirect(true);
        }
        handleClose(alert);
      }, 5000);
    }
    return () => {};
  }, []);

  useEffect(() => {
    let parsedOBj = {};
    let errors = [];
    let warnings = [];

    if (IsValidJSONString(alert.message)) {
      parsedOBj = JSON.parse(alert.message);
      Object.getOwnPropertyNames(parsedOBj.Errors).forEach(function (val) {
        errors.push(parsedOBj.Errors[val]);
      });

      setparsedMessage(parsedOBj.Message);
      setParsedErrors(errors);
    } else {
      parsedOBj = alert.message;
      setparsedMessage(parsedOBj);
    }

    return () => {
      handleClose(alert);
    };
  }, [alert]);

  const IsValidJSONString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const handleClose = (alertToRemove) => {
    dispatch({
      type: 'removeAlert',
      payload: alertToRemove,
    });
  };

  if (canRedirect) {
    return <Redirect to={alert.withRedirect.to} />;
  }

  return (
    <Fragment>
      <Slide
        direction="down"
        in={alert.open}
        mountOnEnter
        unmountOnExit
        {...(alert.open ? { timeout: 250 } : {})}
      >
        <Alert
          variant="filled"
          onClose={(e) => handleClose(alert)}
          severity={alert.color}
          action={
            alert.withRedirect &&
            alert.withRedirect.isButton && (
              <Button
                color="white"
                component={Link}
                to={alert.withRedirect.to}
              >
                {alert.withRedirect?.text}
              </Button>
            )
          }
        >
          <div
            dangerouslySetInnerHTML={sanitizeHTML(
              parsedMessage.replace('[Replace]', '')
            )}
          />
          <ul>
            {parsedErrors.map((option, index) => (
              <li key={index} value={option}>
                {option}
              </li>
            ))}
          </ul>
        </Alert>
      </Slide>
    </Fragment>
  );
};

const ComponentAlert = (props) => {
  const { showLoginBar, accessToken } = store.getState();
  const alerts = useSelector((state) => state.appAlerts || []);
  const [reRenderAlert, setReRenderAlert] = useState([]);
  const onLoginSuccess = alerts[0]?.onLogin ? true : false;

  const classes = useStyles({
    alertCount: alerts.length || 0,
    menuIsShown: onLoginSuccess ? false : props.menuState,
    useLogged: accessToken.token ? true : false,
    showLoginBar: showLoginBar,
  });

  useEffect(() => {
    setReRenderAlert(alerts);
    if (!alerts[0]?.isRelative) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    return () => {};
  }, [alerts]);

  return (
    <div className={classes.root}>
      {reRenderAlert.map(
        (alert, index) =>
          !alert.isRelative && <AlertItem key={index} alert={alert} />
      )}
    </div>
  );
};

export default ComponentAlert;
