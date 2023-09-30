import { type PropsWithChildren, type FC, type ReactElement } from 'react';
import './InputGroup.scss';

type InputGroupProps = PropsWithChildren<{
  label: string;
  button: ReactElement;
}>;

const InputGroup: FC<InputGroupProps> = ({ label, button, children }) => {
  return (
    <>
      <div className='cp-input-group__label'>
        <h3>{label}</h3>
        {button}
      </div>
      <div className='cp-input-group'>{children}</div>
    </>
  );
};

export default InputGroup;
