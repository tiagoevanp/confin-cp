import { type PropsWithChildren, type FC } from 'react';
import './PageContent.scss';

const PageContent: FC<PropsWithChildren> = ({ children }) => {
  return <div className='page-content'>{children}</div>;
};

export default PageContent;
