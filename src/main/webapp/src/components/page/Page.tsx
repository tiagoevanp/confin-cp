import { type PropsWithChildren, type FC } from 'react';
import './Page.scss';

const Page: FC<PropsWithChildren> = ({ children }) => {
  return <section className='page'>{children}</section>;
};

export default Page;
