import { type PropsWithChildren, type FC } from 'react';
import './InputGroup.scss';

type InputGroupProps = PropsWithChildren<{
  label: string;
}>;

const InputGroup: FC<InputGroupProps> = ({ label, children }) => {
  return (
    <>
      <div className='cp-input-group__label'>
        <h3>{label}</h3>
      </div>
      <div className='cp-input-group'>{children}</div>
    </>
  );
};

export default InputGroup;
