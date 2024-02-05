import React, { useState } from 'react';

export const useInputValue = (initialValue, inputError) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  React.useEffect(() => {
    setError(inputError && inputError[0] ? true : false);
    setHelperText(inputError);
    return () => {};
  }, [inputError]);

  const onChange = (e) => {
    setValue(e.target.value);
    setError(false);
  };

  return { value, onChange, error, helperText };
};
