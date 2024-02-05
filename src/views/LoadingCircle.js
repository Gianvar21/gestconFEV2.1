// LoadingCircle.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 5px solid #8b0000; /* Cambia el color según tus preferencias */
  border-top: 5px solid transparent;
  border-radius: 50%;
  animation: ${spinAnimation} 0.7s linear infinite;
`;

const LoadingCircle = () => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
);

export default LoadingCircle;
