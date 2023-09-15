import { type PropsWithChildren, type FC } from 'react';
import './Button.scss';

type ButtonProps = PropsWithChildren<{
  onClick: () => void;
}>;

const Button: FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button className='button' onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
