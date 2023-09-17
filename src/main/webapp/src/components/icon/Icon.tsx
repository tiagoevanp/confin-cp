import { type FC } from 'react';
import './Icon.scss';
import { createClassName } from '../helpers/createClassName';
import { type ButtonProps } from '../button/Button';

export type IconProps = {
  name: 'edit';
  variant?: ButtonProps['variant'];
};

const Icon: FC<IconProps> = ({ name, variant }) => {
  const className = createClassName('icon', { name, variant });

  return <i {...{ className }} />;
};

export default Icon;
