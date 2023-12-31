import { type FC } from 'react';
import './Icon.scss';
import { useClassName } from '../../hooks/useClassName';
import { type ButtonProps } from '../button/Button';

export type IconProps = {
  name:
    | 'edit'
    | 'delete'
    | 'close'
    | 'add'
    | 'home'
    | 'logout'
    | 'clipboard'
    | 'settings'
    | 'success'
    | 'danger'
    | 'warning'
    | 'sad'
    | 'empty';
  variant?: ButtonProps['variant'] | 'blue-dark';
};

const Icon: FC<IconProps> = ({ name, variant }) => {
  const className = useClassName('cp-icon', { variant });

  return <i className={`${className} cp-icon-name--${name}`} />;
};

export default Icon;
