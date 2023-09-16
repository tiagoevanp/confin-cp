import { type PropsWithChildren, type FC } from 'react';
import './Button.scss';
import { createClassName } from '../helpers/createClassName';

type ButtonProps = PropsWithChildren<{
  variant?: 'default' | 'success' | 'danger';
  onClick: () => void;
}>;

const Button: FC<ButtonProps> = ({ variant, onClick, children }) => {
  const className = createClassName('button', [variant]);

  return <button {...{ className, onClick }}>{children}</button>;
};

export default Button;
