import { createGlobalStyle } from 'styled-components';
import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';

export const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        font-family: 'Open Sans Condensed', sans-serif;
    }

    *, *::before, *::after {
        box-sizing: inherit;
    }

    ul, li, h1, h2, h3, p, button {
        margin: 0;
    }

    ul {
        list-style: none;
    }

    body {
        background-color: ${(props) =>
          typeof props.theme.palette.nsAppBG !== 'undefined'
            ? props.theme.palette.nsAppBG.main
            : ''};
        margin: 0 auto;
        overscroll-behavior: none;
        width: 100%;
        font-size: 0.85rem;
        
        padding-right: 0px !important;
            overflow: auto !important;
    }

    .MuiFormLabel-root.MuiInputLabel-shrink {
        font-size: 17px;
    }

    .MuiFormLabel-asterisk {
        color: red;
    }

    .MuiInputBase-root.Mui-disabled {
        color: ${(props) =>
          props.theme.palette.mode === 'light' ? 'rgb(0 0 0 / 60%)' : ''};
    }

    #app {

        & .top-content-logo {
            margin-bottom: 10px;
        }
       
        & .MuiSnackbar-root {
            z-index: 5000;
        }

        & .MuiToolbar-root {

            & .MuiTypography-root {
                flex-grow: 0;
                padding-left: 15px;
            };

            & nav {
                flex-grow: 1;
            }
        };
            
        & .view-title {
            font-size: 25px;
            font-weight: 600;
            padding: 5px 0;
            margin-bottom: 15px;
        };

        & .comp-title {
            font-size: 1rem;
            padding-bottom: 20px;
            font-weight: 600;
        };

        & .comp-sub-title {
            position: relative;
            font-size: .85rem;
            font-weight: 600;
            min-height: 40px;
            line-height: 40px;
            display: flex;
            justify-content: space-between;
        };

        & .comp-sub-title-center {
            font-size: .8rem;
            padding: 15px 0px 5px;
            font-weight: 600;
            text-align: center;
        };

        & .comp-notes {
            font-size: .75rem; 
            margin-bottom: 12px;
        };

        & .comp-notes-center {
            text-align: center;
            font-size: .75rem; 
            margin: 5px;
        };

        & .comp-input-notes {
            font-size: .75rem; 
            margin-top: 9px;
            margin-bottom: 10px;
        };

        & .comp-input-notes.with-error {
            color: red !important;
        };

        & .comp-info {
            font-size: 12px;
        }

        & .environment-tag {
            color: aqua;
            font-size: 12px;
            margin-left: 10px;
            padding: 0px 5px 0px 5px;
        }
    }
`;
