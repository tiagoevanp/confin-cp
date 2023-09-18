import { useCallback, useState } from 'react';

export const useToggle = (initialValue: boolean): [boolean, (force?: boolean) => void] => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback((force?: boolean) => {
    setValue((v) => force ?? !v);
  }, []);

  return [value, toggle];
};
