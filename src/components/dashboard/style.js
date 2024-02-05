import { css } from 'styled-components';
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';

const DashboardCard = styled(Card)(
  ({ theme }) => css`
    width: 47%;
    display: inline-block;
    vertical-align: top;
    margin: Calc(2% - 10px);
    min-height: 150px;
    background-color: ${theme.palette.secondary.main};
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 4px;
    box-shadow: ${theme.shadows[3]};

    @media screen and (max-width: 1200px) {
      margin: Calc(2% - 5px);
    }
    

    @media screen and (max-width: 600px) {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      width: 100%;
    }

    .title {
      color: #f3f6f9;
      font-weight: bold;
      font-size: 18px;
    }

    .link {
      color: ${theme.palette.mode == 'dark' ? '#91b1cf' : '#004a91'} !important;
    }

    .icon-link {
      float: left;
    }

    .icon-welcome {
      margin-bottom: 10px;
      margin-left: 5px;
      margin-right: 15px;
    }

    .message-welcome {
      font-weight: 600;
      font-family: system-ui;
    }

    .card-header {
      padding: 12px;
      background-color: ${theme.palette.mode == 'dark'
        ? theme.palette.nsTileHeaderBG.main
        : theme.palette.primary.main};

      ${theme.palette.nsTileHeaderBG.main};
    }

    .card-content {
      padding-top: 15px !important;
    }

    .links {
      /* width: 50px; */
      height: 14px;
      background-color: white;
      color: gray;
      border-radius: 5px;
      padding: 3px;
      text-align: center;
      line-height: 7px;
      font-size: 11px;
      align-self: center;
      border: 1px solid;
      border-color: #bdb9b973;
      margin-right: 15px;
    }

    .car-content-weather {
      @media screen and (max-width: 1000px) {
        border-radius: 0px !important;
        padding: 0px !important;
        margin-top: 0px;
      }

      ${theme.breakpoints.up('xs')} {
        padding: 1rem !important;
      }
    }

    .refresh {
      float: right;
      margin-bottom: -20px;
      color: #f3f6f9;
      padding-top: 0px;
    }

    .link {
      color: dodgerblue;
      cursor: pointer;
      text-decoration: none;
      :hover {
        background-color: #8b0000;
      }
    }

    .cell-fun {
      border-bottom: 0px;
      padding: 0px !important;
    }

    .answer {
      margin-left: 10px;
    }
  `
);

export { DashboardCard };
