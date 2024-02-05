import React, { useEffect, useRef, useState } from 'react';
import { DashboardCard } from './style';

const DashboardWelcome = (props) => {
  useEffect(() => {
    return () => {
      console.log('Does it need cleanup?');
    };
  }, []);

  return <DashboardCard></DashboardCard>;
};

export default DashboardWelcome;
