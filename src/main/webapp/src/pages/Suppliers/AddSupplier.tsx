import { type FC } from 'react';
import Form from '../../components/form/Form';
import Input from '../../components/input/Input';
import { useForm, type SubmitHandler, useFieldArray } from 'react-hook-form';
import { useAxios } from '../../hooks/useAxios';
import Button from '../../components/button/Button';
import InputGroup from '../../components/input/InputGroup';

type Inputs = {
  id: string;
  name: string;
  marketplace: string;
  address: {
    street: string;
    number: number;
    zip_code: string;
  };
  contact: Array<{
    phone_number: string;
    email: string;
  }>;
};

const AddSupplier: FC = () => {
  const { register, handleSubmit, reset, control } = useForm<Inputs>({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contact',
  });
  const { request, loading } = useAxios('POST', 'supplier');

  const onSubmit: SubmitHandler<Inputs> = async ({ id, contact, ...data }) => {
    if (id === '') {
      await request({
        contact: {
          phone_number: contact.map((item) => item.phone_number),
          email: contact.map((item) => item.email),
        },
        ...data,
      });
    }
  };

  return (
    <Form handleSubmit={handleSubmit} onSubmit={onSubmit} reset={reset} loading={loading}>
      <Input {...register('id')} type='text' hidden />
      <Input
        {...register('name', {
          required: true,
        })}
        label='Nome'
        type='text'
      />
      <Input {...register('marketplace', { required: true })} label='Marketplace' type='text' />
      <Input {...register('address.street')} label='Rua' type='text' />
      <Input {...register('address.number')} label='Número' type='number' />
      <Input {...register('address.zip_code')} label='CEP' type='text' />
      <InputGroup
        label='Contatos'
        button={
          <Button
            square
            name='close'
            onClick={() => {
              append({ phone_number: '', email: '' });
            }}
          />
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {fields.map((field, index) => (
            <div
              key={field.id}
              style={{ display: 'flex', flexGrow: 1, alignItems: 'center', gap: '10px' }}
            >
              <div
                style={{
                  marginBlockEnd: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                }}
              >
                <Input
                  {...register(`contact.${index}.phone_number`)}
                  label={`Telefone ${index + 1}`}
                  type='text'
                />
                <Input
                  {...register(`contact.${index}.email`)}
                  label={`E-mail ${index + 1}`}
                  type='text'
                />
              </div>
              <Button
                square
                name='delete'
                onClick={() => {
                  remove(index);
                }}
              />
            </div>
          ))}
        </div>
      </InputGroup>
    </Form>
  );
};

export default AddSupplier;
