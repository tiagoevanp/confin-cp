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
