import { forwardRef } from 'react';
import Input from './Input';
import Button from '../button/Button';
import './InputArray.scss';

type InputArrayProps = {
  label: string;
  index: number;
  name: string;
  value: string;
  onChange: () => void;
  onBlur: () => void;
  append: (props: { value: string }) => void;
  remove: (index: number) => void;
};

const InputArray = forwardRef<HTMLInputElement, InputArrayProps>(
  ({ label, index, append, remove, ...props }, ref) => {
    return (
      <div className='cp-input-array'>
        <div className={'cp-input-array__input'}>
          <Input label={label} type='text' ref={ref} {...props} />
        </div>
        {index === 0 ? (
          <Button
            square
            name='add'
            onClick={() => {
              append({ value: '' });
            }}
          />
        ) : (
          <Button
            square
            name='delete'
            onClick={() => {
              remove(index);
            }}
          />
        )}
      </div>
    );
  },
);

InputArray.displayName = 'InputArray';

export default InputArray;
