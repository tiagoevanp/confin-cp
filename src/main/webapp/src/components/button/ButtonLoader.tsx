import { type FC } from 'react';
import { type ButtonProps } from './Button';
import { useClassName } from '../../hooks/useClassName';

type ButtonLoaderProps = {
  isSquare: boolean;
  variant: ButtonProps['variant'];
};

const ButtonLoader: FC<ButtonLoaderProps> = ({ variant, isSquare }) => {
  const className = useClassName('cp-button-loader', { variant });

  if (isSquare) {
    return <div className={className} />;
  }

  return (
    <>
      <div className={className} />
      <div className={className} />
      <div className={className} />
    </>
  );
};

export default ButtonLoader;
