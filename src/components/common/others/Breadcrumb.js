import React, { useEffect, useState } from 'react';
import { css } from 'styled-components';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';

const StyledBreadcrumb = styled('ul')(
  ({ theme }) => css`
    padding-left: 0px;
    list-style: none;
    display: inline-block;

    .icon {
      /* font-size: 14px; */

      .MuiSvgIcon-root {
        top: 1px;
        position: relative;
        font-size: large;
      }
    }

    li {
      float: left;

      a {
        color: #fff;
        display: block;
        background: #2c91e7;
        text-decoration: none;
        position: relative;
        height: 20px;
        line-height: 20px;
        padding: 0 8.5px 0 5px;
        text-align: center;
        margin-right: 23px;
      }

      /* &:nth-child(even) {
        a {
          background-color: red;

          &:before {
            border-color: red;
            border-left-color: transparent;
          }
          &:after {
            border-left-color: red;
          }
        }
      } */

      &:first-child {
        a {
          padding-left: 15px;
          @include border-radius(4px 0 0 4px);
          &:before {
            border: none;
          }
        }
      }

      &:last-child {
        /* pointer-events: none; */
        a {
          padding-right: 15px;
          @include border-radius(0 4px 4px 0);
          &:after {
            border: none;
          }

          background-color: #0070b9;

          &:before {
            border-color: #0070b9;
            border-left-color: transparent;
          }
        }
      }

      a {
        &:before,
        &:after {
          content: '';
          position: absolute;
          top: 0;
          border: 0 solid #2c91e7;
          border-width: 10px 10px;
          width: 0;
          height: 0;
        }

        &:before {
          left: -20px;
          border-left-color: transparent;
        }

        &:after {
          left: 100%;
          border-color: transparent;
          border-left-color: #2c91e7;
        }

        &:hover {
          background-color: #8b0000;

          &:before {
            border-color: #1f6fb3;
            border-left-color: transparent;
          }
          &:after {
            border-left-color: #1f6fb3;
          }
        }

        &:active {
          background-color: #159135;

          &:before {
            border-color: #159135;
            border-left-color: transparent;
          }
          &:after {
            border-left-color: #159135;
          }
        }
      }
    }
  `
);

// const linkMapping = {
//   'manage-request': 'Manage Request',
//   'contact-manager': 'Contact Manager',
// };

//   const [state, setState] = useState([
//     {
//       id: 1,
//       label: 'Dashboard',
//       icon: <DashboardOutlinedIcon />,
//       link: '#',
//     },
//     {
//       id: 2,
//       label: 'Manage Request',
//       icon: null,
//       link: '#',
//     },
//     {
//       id: 3,
//       label: 'Signing Detail',
//       icon: null,
//       link: '#',
//     },
//   ]);

const Breadcrumb = (props) => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    let _links = [];
    console.log(props.providerRouteHistory);
    props.providerRouteHistory.forEach((link) => {
      console.log(link);
      let obj = {};
      if (/\/manage-request/.test(link)) {
        obj.label = 'Manage Request';
        obj.link = link;
        setLinks([...links, obj]);
      } else if (/\/manage-request\/detail\/[0-9]/.test(link)) {
        // console.log('=====>>>> Debug');
        obj.label = 'Signing Detail';
        obj.link = link;
        setLinks([...links, obj]);
      }
    });
    // setLinks(_links);
    return () => {};
  }, [props.providerRouteHistory]);

  // const getLinkFriendlyName = (link) => {
  //   console.log(link);
  //   // if (/xyz.[a-z]*.abc.com/.test("/manage-request/detail/:detailID"))
  //   if (/\/manage-request/.test(link)) {
  //     return 'Manage Request';
  //   } else if (/\/manage-request\/detail\/[0-9]/.test(link)) {
  //     // console.log('=====>>>> Debug');
  //     return 'Signing Detail';
  //   }
  // };

  // console.log(links);

  return (
    <StyledBreadcrumb id="breadcrumb">
      <li>
        <Link to={{ pathname: '/Dashboard' }}>
          <span className="icon">
            <DashboardOutlinedIcon />
          </span>
        </Link>
      </li>
      {links.map((item, index) => (
        <li key={index}>
          <Link to={{ pathname: item.link }}>
            <span className="icon">{item.label}</span>
          </Link>
        </li>
      ))}
    </StyledBreadcrumb>
  );
};
export default Breadcrumb;

