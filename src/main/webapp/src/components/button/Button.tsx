import { type PropsWithChildren, type FC, useMemo } from 'react';
import './Button.scss';
import { useClassName } from '../../hooks/useClassName';
import Icon, { type IconProps } from '../icon/Icon';
import ButtonLoader from './ButtonLoader';

export type ButtonProps = PropsWithChildren<{
  variant?: 'success' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
}>;

type SquareButtonProps = Omit<ButtonProps, 'children'> & {
  square: boolean;
  name: IconProps['name'];
};

const isSquare = (props: ButtonProps | SquareButtonProps): props is SquareButtonProps =>
  'square' in props && 'name' in props;

const Button: FC<ButtonProps | SquareButtonProps> = (props) => {
  const { disabled, loading, variant, onClick } = props;

  const conditionalProps = isSquare(props) ? { square: props.square, variant } : { variant };

  const className = useClassName('cp-button', conditionalProps);

  const innerContent = useMemo(() => {
    if (loading ?? false) {
      return <ButtonLoader variant={variant} isSquare={isSquare(props)} />;
    }

    if (isSquare(props)) {
      return <Icon name={props.name} variant={variant} />;
    }

    return props.children;
  }, [loading, props, variant]);

  return (
    <button type='button' disabled={disabled} className={className} onClick={onClick}>
      {innerContent}
    </button>
  );
};

export default Button;
