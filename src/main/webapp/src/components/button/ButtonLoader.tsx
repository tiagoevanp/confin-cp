import { type FC } from 'react';
import { type ButtonProps } from './Button';
import { createClassName } from '../helpers/createClassName';

type ButtonLoaderProps = {
  isSquare: boolean;
  variant: ButtonProps['variant'];
};

const ButtonLoader: FC<ButtonLoaderProps> = ({ variant, isSquare }) => {
  const className = createClassName('button-loader', { variant });

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
