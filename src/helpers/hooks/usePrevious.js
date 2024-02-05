import { useEffect, useRef } from 'react';

export const usePrevious = (initialValue) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = initialValue;
  });
  return ref.current;
};
