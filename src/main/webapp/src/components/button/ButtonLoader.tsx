import { type FC } from 'react';
import { type ButtonProps } from './Button';
import { useClassName } from '../../hooks/useClassName';

type ButtonLoaderProps = {
  ghost?: ButtonProps['ghost'];
  isSquare: boolean;
  variant: ButtonProps['variant'];
};

const ButtonLoader: FC<ButtonLoaderProps> = ({ ghost, variant, isSquare }) => {
  const className = useClassName('cp-button-loader', { ghost, variant });
  const squareClassName = useClassName('cp-button-square-loader__dot', { ghost, variant });

  if (isSquare) {
    return (
      <div className='cp-button-square-loader'>
        <div className={squareClassName}></div>
      </div>
    );
  }

  return (
    <>
      <div className={`${className} cp-button-loader__dot`} />
      <div className={`${className} cp-button-loader__dot`} />
      <div className={`${className} cp-button-loader__dot`} />
    </>
  );
};

export default ButtonLoader;
