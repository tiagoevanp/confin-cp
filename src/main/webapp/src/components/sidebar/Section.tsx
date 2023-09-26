import { type PropsWithChildren, type FC } from 'react';
import Icon, { type IconProps } from '../icon/Icon';

type SectionProps = PropsWithChildren<{
  title: string;
  icon: IconProps['name'];
}>;

const Section: FC<SectionProps> = ({ title, icon, children }) => {
  return (
    <>
      <div className='sidebar__section'>
        <Icon name={icon} variant='blue-dark' />
        <h1>{title}</h1>
      </div>
      <div className='sidebar__items'>{children}</div>
    </>
  );
};

export default Section;
