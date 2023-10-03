import { type FC } from 'react';
import Form from '../../components/form/Form';
import Input from '../../components/input/Input';
import { useForm, type SubmitHandler, useFieldArray, Controller } from 'react-hook-form';
import { useAxios } from '../../hooks/useAxios';
import InputArray from '../../components/input/InputArray';
import { type SupplierInputs } from './Suppliers';

type AddSupplierProps = {
  row?: SupplierInputs;
};

const AddSupplier: FC<AddSupplierProps> = ({ row: { ...row } }) => {
  const { register, handleSubmit, reset, control } = useForm({
    values: { ...row },
    defaultValues: {
      contact_phone_number: [{ value: '' }],
      contact_email: [{ value: '' }],
    },
  });
  const {
    fields: phoneFields,
    append: phoneAppend,
    remove: phoneRemove,
  } = useFieldArray({
    control,
    name: 'contact_phone_number',
  });

  const {
    fields: emailFields,
    append: emailAppend,
    remove: emailRemove,
  } = useFieldArray({
    control,
    name: 'contact_email',
  });

  const { request: addRequest, loading: addLoading } = useAxios('POST', 'supplier');
  const { request: updateRequest, loading: updateLoading } = useAxios('PUT', `supplier/${row?.id}`);

  const onSubmit: SubmitHandler<SupplierInputs> = async ({
    id,
    contact_email,
    contact_phone_number,
    ...data
  }) => {
    if (id === '') {
      await addRequest({
        contact_email: contact_email.map((email) => email.value),
        contact_phone_number: contact_phone_number.map((phone) => phone.value),
        ...data,
      });
    } else {
      await updateRequest({
        id,
        contact_email: contact_email.map((email) => email.value),
        contact_phone_number: contact_phone_number.map((phone) => phone.value),
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
      <Input {...register('address_street')} label='Rua' type='text' />
      <Input {...register('address_number')} label='Número' type='number' />
      <Input {...register('address_zip_code')} label='CEP' type='text' />
      {phoneFields.map((field, index) => (
        <Controller
          key={field.id}
          control={control}
          name={`contact_phone_number.${index}.value`}
          render={({ field: { name, value, onChange, onBlur, ref } }) => (
            <InputArray
              label={`Telefone ${index + 1}`}
              index={index}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
              append={phoneAppend}
              remove={phoneRemove}
            />
          )}
        />
      ))}
      {emailFields.map((field, index) => (
        <Controller
          key={field.id}
          control={control}
          name={`contact_email.${index}.value`}
          render={({ field: { name, value, onChange, onBlur, ref } }) => (
            <InputArray
              label={`Email ${index + 1}`}
              index={index}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
              append={emailAppend}
              remove={emailRemove}
            />
          )}
        />
      ))}
    </Form>
  );
};

export default AddSupplier;
