import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import styled, { css } from 'styled-components';

const Spinner = styled.div`
  ${(props) =>
    props.forPage &&
    css`
      margin: 0 auto;
      display: flex;
      justify-content: center;
      text-align: center;
      align-items: center;
      height: calc(100vh - 135px);
    `}

  ${(props) =>
    props.forList &&
    css`
      margin: 0 auto;
      display: flex;
      justify-content: center;
      text-align: center;
      color: lightgray;
    `}

  ${(props) =>
    props.forButton &&
    css`
      padding-left: ${(props) => (props.lpad ? '10px' : '0px')};
      padding-right: ${(props) => (props.rpad ? '10px' : '0px')};
      img {
        vertical-align: middle;
      }
    `}
`;

const Loading = (props) => {
  const { msg = 'Loading...' } = props;

  return (
    <React.Fragment>
      {props.forPage && (
        <Spinner forPage>
          <Box sx={{ position: 'relative' }}>
            <CircularProgress />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            ></Box>
            <Typography component="div" color="textSecondary">
              {msg}
            </Typography>
          </Box>
        </Spinner>
      )}
      {props.apiRequest && (
        <Spinner forList color="default">
          <Box sx={{ position: 'relative', paddingTop: '100px' }}>
            <CircularProgress />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            ></Box>
            <Typography component="div" color="textSecondary">
              {msg}
            </Typography>
          </Box>
        </Spinner>
      )}
      {props.forList && (
        <Spinner forList color="default">
          <Box sx={{ position: 'relative', paddingTop: '10px' }}>
            <CircularProgress color="white" />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            ></Box>
            <Typography component="div" color="textSecondary">
              {msg}
            </Typography>
          </Box>
        </Spinner>
      )}
      {props.forButton && (
        <Spinner forButton lpad={props.lpad} rpad={props.rpad}>
          <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        </Spinner>
      )}
    </React.Fragment>
  );
};

export default Loading;
