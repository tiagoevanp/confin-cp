import { type FC } from 'react';
import Form from '../../components/form/Form';
import Input from '../../components/input/Input';
import { useForm, type SubmitHandler, useFieldArray } from 'react-hook-form';
import { useAxios } from '../../hooks/useAxios';
import Button from '../../components/button/Button';
import InputGroup from '../../components/input/InputGroup';

export type SupplierInputs = {
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

type AddSupplierProps = {
  row?: SupplierInputs;
};

const AddSupplier: FC<AddSupplierProps> = ({ row }) => {
  const { register, handleSubmit, reset, control } = useForm({ values: { ...row } });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'contact',
  });
  const { request: addRequest, loading: addLoading } = useAxios('POST', 'supplier');
  const { request: updateRequest, loading: updateLoading } = useAxios('PUT', `supplier/${row?.id}`);

  const onSubmit: SubmitHandler<SupplierInputs> = async ({ id, contact, ...data }) => {
    const mappedContact =
      contact.length > 0
        ? {
            phone_number: contact.map((item) => item.phone_number),
            email: contact.map((item) => item.email),
          }
        : undefined;

    if (id === '') {
      await addRequest({
        contact: mappedContact,
        ...data,
      });
    } else {
      await updateRequest({
        id,
        contact: mappedContact,
        ...data,
      });
    }
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      reset={() => {
        reset();
      }}
      loading={addLoading || updateLoading}
    >
      <Input {...register('id')} type='text' hidden disabled label='ID' />
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
