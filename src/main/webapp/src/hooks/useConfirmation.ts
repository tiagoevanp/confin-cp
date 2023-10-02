import { useCallback } from 'react';

export const useConfirmation = (message: string, request: () => void): (() => void) => {
  return useCallback(() => {
    window.confirm(message) && request();
  }, [message, request]);
};
