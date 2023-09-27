import { type PropsWithChildren, type FC, useMemo, type MouseEvent } from 'react';
import './Button.scss';
import { useClassName } from '../../hooks/useClassName';
import Icon, { type IconProps } from '../icon/Icon';
import ButtonLoader from './ButtonLoader';

export type ButtonProps = PropsWithChildren<{
  variant?: 'success' | 'danger' | 'warning' | 'white';
  disabled?: boolean;
  loading?: boolean;
  ghost?: boolean;
  onClick: (e: MouseEvent) => void;
}>;

type SquareButtonProps = Omit<ButtonProps, 'children'> & {
  square: boolean;
  name: IconProps['name'];
};

const isSquare = (props: ButtonProps | SquareButtonProps): props is SquareButtonProps =>
  'square' in props && 'name' in props;

const Button: FC<ButtonProps | SquareButtonProps> = (props) => {
  const { disabled, ghost, loading, variant, onClick } = props;

  const conditionalProps = isSquare(props)
    ? { square: props.square, variant, ghost }
    : { variant, ghost };

  const className = useClassName('cp-button', conditionalProps);

  const innerContent = useMemo(() => {
    if (loading ?? false) {
      return <ButtonLoader ghost={ghost} variant={variant} isSquare={isSquare(props)} />;
    }

    if (isSquare(props)) {
      return <Icon name={props.name} variant={variant} />;
    }

    return props.children;
  }, [ghost, loading, props, variant]);

  return (
    <button
      type='button'
      disabled={disabled}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
      }}
    >
      {innerContent}
    </button>
  );
};

export default Button;
