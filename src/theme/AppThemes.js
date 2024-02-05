import {
  deepPurple,
  green,
  indigo,
  lightBlue,
  grey,
  purple,
} from '@mui/material/colors';

const appThemes = {
  darkTheme1: {
    components: {
      MuiPaper: {
        defaultProps: {
          elevation: 0,
          variant: 'outlined',
        },
        styleOverrides: {
          root: {
            '& .MuiAccordion-root': {
              backgroundColor: 'white',
            },
            '& .MuiAccordionSummary-content': {
              margin: 0,
            },
            '& .MuiAccordionDetails-root': {
              backgroundColor: '#060c1087',
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          root: {
            '& .sectionTitle': {
              background: '#262626',
              border: '1px solid #404040',
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          autoComplete: '-off-',
          size: 'small',
          margin: 'dense',
          variant: 'outlined',
          fullWidth: true,
        },
        styleOverrides: {
          root: {
            '.MuiOutlinedInput-input': {
              fontSize: '0.85rem',
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          size: 'small',
          margin: 'dense',
          variant: 'outlined',
        },
        styleOverrides: {
          root: {
            fontSize: '0.75rem',
          },
        },
      },
      MuiLink: {
        defaultProps: {
          variant: 'body3',
        },
        styleOverrides: {
          root: {
            cursor: 'pointer',
          },
        },
      },
      MuiAutocomplete: {
        defaultProps: {
          autoComplete: '-off-',
        },
      },
      MuiFormControl: {
        defaultProps: {
          autoComplete: '-off-',
          size: 'small',
          margin: 'dense',
          variant: 'outlined',
          fullWidth: true,
        },
      },
    },
    palette: {
      mode: 'dark',
      typeFullName: 'darkTheme1',
      default: {
        main: '#c7c4c4',
      },
      primary: {
        main: '#15d683',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#1976d2',
      },
      danger: {
        main: '#C62828',
      },
      error: {
        main: '#E53935',
      },
      nsAppBG: {
        main: '',
      },
      nsAppDialogHeaderBG: {
        main: '#1976d2',
      },
      nsTileHeaderBG: {
        main: '',
      },
      nsTileBodyBG: {
        main: '',
      },
      nsAppHeaderBG: {
        main: '',
      },
      nsLeftMenuTextColor: 'black',
      nsDangerColor: {
        main: 'black',
        hover: 'black',
        contrastText: '#8b0000',
      },
      nsTableRowUpload: {
        main: '#6b6e6e',
      },
      nsTableHeaderBG: {
        main: '#424242',
      },
      nsTableBodyBG: {
        main: '',
      },
      nsTableRowHoverBG: {
        main: '#8b0000',
      },
      nsStickDivBG: {
        main: '#303030',
      },
      nsPanelInfoBG: {
        main: '',
      },
    },
  },

  darkTheme2: {
    components: {
      MuiPaper: {
        defaultProps: {
          elevation: 0,
          variant: 'outlined',
        },
        styleOverrides: {
          root: {
            '& .MuiAccordion-root': {
              backgroundColor: 'white',
            },
            '& .MuiAccordionSummary-content': {
              margin: 0,
            },
            '& .MuiAccordionDetails-root': {
              backgroundColor: '#060c1087',
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          root: {
            '& .MuiPaper-root': {
              backgroundColor: '#263238',
            },
            '& .sectionTitle': {
              background: '#0d1316',
              border: '1px solid #243138',
            },
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          autoComplete: '-off-',
          size: 'small',
          margin: 'dense',
          variant: 'outlined',
          fullWidth: true,
        },
        styleOverrides: {
          root: {
            '.MuiOutlinedInput-input': {
              fontSize: '0.85rem',
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          size: 'small',
          margin: 'dense',
          variant: 'outlined',
        },
        styleOverrides: {
          root: {
            fontSize: '0.75rem',
          },
        },
      },
      MuiLink: {
        defaultProps: {
          variant: 'body3',
        },
        styleOverrides: {
          root: {
            cursor: 'pointer',
          },
        },
      },
      MuiAutocomplete: {
        defaultProps: {
          autoComplete: '-off-',
        },
      },
      MuiFormControl: {
        defaultProps: {
          autoComplete: '-off-',
          size: 'small',
          margin: 'dense',
          variant: 'outlined',
          fullWidth: true,
        },
      },
    },
    palette: {
      mode: 'dark',
      typeFullName: 'darkTheme2',
      text: {
        primary: '#c7c4c4',
        contrastText: '#fff',
      },
      iconColor: {
        main: '#6b7691',
      },
      background: {
        paper: '#12191d',
        default: '#263238',
      },
      default: {
        main: '#aeb0b1',
        contrastText: '#fff',
      },
      primary: {
        main: '#15d683',
        contrastText: '#ffffff',
        default: '#c7c4c4',
      },
      secondary: {
        main: '#1976d2',
      },
      danger: {
        main: '#C62828',
      },
      error: {
        main: '#E53935',
      },
      btnNeutral: {
        main: '#8b0000',
        contrastText: '#8b0000',
        hover: '#8b0000',
      },
      nsLeftMenuTextColor: 'black',
      nsAppBG: {
        main: '',
      },
      nsAppDialogHeaderBG: {
        main: '#1976d2',
      },
      nsTileHeaderBG: {
        main: '#101418',
      },
      nsTileBodyBG: {
        main: '#161d21',
      },
      nsAppHeaderBG: {
        main: '',
      },
      nsDangerColor: {
        main: '#8b0000',
        hover: '#8b0000',
        contrastText: '#8b0000',
      },
      nsTableRowUpload: {
        main: '#6b6e6e',
      },
      nsTableHeaderBG: {
        main: '#0b1318',
      },
      nsTableBodyBG: {
        main: '#19252a',
        tabColor: '#333f44',
      },
      nsTableRowHoverBG: {
        main: '#8b0000',
      },
      nsStickDivBG: {
        main: '#263238',
      },
      nsPanelInfoBG: {
        main: '',
      },
    },
  },

  lightTheme: {
    components: {
      MuiPaper: {
        defaultProps: {
          elevation: 0,
          variant: 'outlined',
        },
        styleOverrides: {
          root: {
            '&.MuiDialog-paper': {
              border: '1px solid rgb(133 133 133)',
            },
            '&.MuiAppBar-root': {
              // color: '#5c5c5c',
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          root: {
            '& .sectionTitle': {
              background: '#e5e5e5',
              border: '1px solid #cfcfcf',
            },
          },
        },
      },
      MuiOutlinedInput: {
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 100px inherit inset',
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          autoComplete: '-off-',
          size: 'small',
          margin: 'dense',
          variant: 'outlined',
          fullWidth: true,
        },
        styleOverrides: {
          root: {
            '.MuiOutlinedInput-input': {
              fontSize: '0.85rem',
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {
          size: 'small',
          margin: 'dense',
          variant: 'outlined',
        },
        styleOverrides: {
          root: {
            fontSize: '0.75rem',
          },
        },
      },
      MuiLink: {
        defaultProps: {
          variant: 'body3',
        },
        styleOverrides: {
          root: {
            cursor: 'pointer',
          },
        },
      },
      MuiAutocomplete: {
        defaultProps: {
          autoComplete: '-off-',
        },
        styleOverrides: {
          root: {
            width: 'inherit !important',
          },
        },
      },
      MuiFormControl: {
        defaultProps: {
          autoComplete: '-off-',
          size: 'small',
          margin: 'dense',
          variant: 'outlined',
          fullWidth: true,
        },
      },
    },
    palette: {
      mode: 'light',
      typeFullName: 'lightTheme',
      text: { primary: '#3b3b3b' },
      iconColor: {
        main: '#76a6d5',
      },
      background: {
        paper: 'white',
        default: '#F3F6F9',
      },
      default: {
        main: 'white',
        contrastText: '#fff',
      },
      primary: {
        main: '#15d683',
        contrastText: '#fff',
        default: '#484848',
      },
      secondary: {
        main: '#1976d2',
      },
      success: {
        main: '#2E7D32',
      },
      error: {
        main: '#E53935',
      },
      danger: {
        main: '#C62828',
      },
      warning: {
        main: '#FFA726',
      },
      info: {
        main: '#379aeb',
      },
      btnNeutral: {
        main: '#8b0000',
        hover: '#8b0000',
        contrastText: '#8b0000',
      },
      nsAppBG: {
        main: '',
      },
      nsAppDialogHeaderBG: {
        main: '#1976d2',
      },
      nsAppHeaderBG: {
        main: '#e9e9e9',
      },
      nsTileHeaderBG: {
        main: 'rgb(90 146 201)',
      },
      nsTileBodyBG: {
        main: 'white',
      },
      nsLeftMenuTextColor: 'black',
      nsDangerColor: {
        main: 'black',
      },
      nsTableRowUpload: {
        main: 'beige',
      },
      nsTableHeaderBG: {
        main: '#fbfbfb',
      },
      nsTableBodyBG: {
        main: 'white',
        tabColor: '#f5f5f5',
      },
      nsTableRowHoverBG: {
        main: '#8b0000',
      },
      nsTableRowBorder: {
        main: '#8b0000',
      },
      nsStickDivBG: {
        main: 'white',
      },
      nsPanelInfoBG: {
        main: 'beige',
      },
      sbAppBarYMenuBG: {
        main: '#8b0000',
      },

      contrastThreshold: 3,
      tonalOffset: 0.2, // changes can be viewed when hover over a button
    },
  },
};

const appColors = {
  grey: {
    palette: {
      primary: {
        main: grey[800],
      },
      secondary: {
        main: grey[50],
      },
    },
  },
  purple: {
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: purple[50],
      },
    },
  },
  deepPurple: {
    palette: {
      primary: {
        main: deepPurple[500],
      },
      secondary: {
        main: deepPurple[50],
      },
    },
  },
  indigo: {
    palette: {
      primary: {
        main: indigo[800],
      },
      secondary: {
        main: indigo[50],
      },
    },
  },
  green: {
    palette: {
      primary: {
        main: green[500],
      },
      secondary: {
        main: green[50],
      },
    },
  },
  black: {
    palette: {
      primary: {
        main: grey[900],
      },
      secondary: {
        main: grey[50],
      },
    },
  },
};

export { appThemes, appColors };
