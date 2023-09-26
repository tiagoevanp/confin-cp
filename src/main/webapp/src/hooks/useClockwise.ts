import { useCallback, useState } from 'react';

export const useClockwise = (lastState: number): [number, () => void, () => void] => {
  const [state, setState] = useState(0);

  const clockwise = useCallback(() => {
    setState((s) => (s + 1) % lastState);
  }, [lastState]);

  const reset = useCallback(() => {
    setState(0);
  }, []);

  return [state, clockwise, reset];
};
