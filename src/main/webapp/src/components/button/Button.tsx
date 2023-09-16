import { type PropsWithChildren, type FC } from 'react';
import './Button.scss';
import { createClassName } from '../helpers/createClassName';
import Icon from '../icon/Icon';

type ButtonProps = PropsWithChildren<{
  variant?: 'success' | 'danger';
  onClick: () => void;
}>;

type SquareButtonProps = Omit<ButtonProps, 'children'> & {
  square: boolean;
  name: 'edit';
};

const isSquare = (props: ButtonProps | SquareButtonProps): props is SquareButtonProps =>
  (props as SquareButtonProps).square !== undefined &&
  (props as SquareButtonProps).name !== undefined;

const Button: FC<ButtonProps | SquareButtonProps> = (props) => {
  const { variant, onClick } = props;

  const className = isSquare(props)
    ? createClassName('button', { square: props.square, variant })
    : createClassName('button', { variant });

  return (
    <button {...{ className, onClick }}>
      {isSquare(props) ? <Icon name={props.name} variant={variant} /> : props.children}
    </button>
  );
};

export default Button;
