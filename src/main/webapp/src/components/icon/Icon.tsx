import { type FC } from 'react';
import './Icon.scss';
import { createClassName } from '../helpers/createClassName';

type IconProps = {
  name: string;
  variant?: 'success' | 'danger';
};

const Icon: FC<IconProps> = ({ name, variant }) => {
  const className = createClassName('icon', { name, variant });

  return <i {...{ className }} />;
};

export default Icon;
