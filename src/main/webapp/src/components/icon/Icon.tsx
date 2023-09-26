import { type FC } from 'react';
import './Icon.scss';
import { useClassName } from '../../hooks/useClassName';
import { type ButtonProps } from '../button/Button';

export type IconProps = {
  name: 'edit' | 'delete' | 'close' | 'home' | 'logout' | 'clipboard' | 'settings';
  variant?: ButtonProps['variant'] | 'blue-dark';
};

const Icon: FC<IconProps> = ({ name, variant }) => {
  const className = useClassName('cp-icon', { name, variant });

  return <i {...{ className }} />;
};

export default Icon;
