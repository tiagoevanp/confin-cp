import { type FC, type PropsWithChildren } from 'react';
import Backdrop from '../backdrop/Backdrop';

const PageActionBar: FC<PropsWithChildren> = ({ children }) => {
  return <Backdrop>{children}</Backdrop>;
};

export default PageActionBar;
