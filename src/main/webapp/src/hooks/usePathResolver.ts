import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const usePathResolver = (): { page: string; action: string } => {
  const location = useLocation();
  const path = useMemo(() => location.pathname.split('/'), [location]);

  return { page: path[1], action: path[2] };
};
