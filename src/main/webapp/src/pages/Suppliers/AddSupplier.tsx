import { useEffect, type FC, useState, useContext } from 'react';
import Form from '../../components/form/Form';
import Input from '../../components/input/Input';
import { useForm, type SubmitHandler, useFieldArray, Controller } from 'react-hook-form';
import { useAxios } from '../../hooks/useAxios';
import InputArray from '../../components/input/InputArray';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { type Supplier } from '../../definitions/api/Supplier';
import { usePathResolver } from '../../hooks/usePathResolver';
import ActionbarContext from '../../contexts/ActionbarContext';

type SupplierInputs = {
  id: string;
  name: string;
  marketplace: string;
  address_street: string;
  address_number: string;
  address_zip_code: string;
  contact_phone_number: Array<{ value: string }>;
  contact_email: Array<{ value: string }>;
};

const AddSupplier: FC = () => {
  const { page, action } = usePathResolver();
  const data = useLoaderData() as { payload: Supplier };
  const [contactPhone, setContactPhone] = useState([{ value: '' }]);
  const [contactEmail, setContactEmail] = useState([{ value: '' }]);
  const { reloadData } = useContext(ActionbarContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (data != null) {
      const { contact_phone_number, contact_email } = data.payload;

      setContactPhone(contact_phone_number.map((value) => ({ value })));
      setContactEmail(contact_email.map((value) => ({ value })));
    }
  }, [data]);

  const { register, handleSubmit, reset, control } = useForm({
    values: {
      ...data?.payload,
      contact_phone_number: contactPhone,
      contact_email: contactEmail,
    },
    defaultValues: {
      contact_email: [{ value: '' }],
      contact_phone_number: [{ value: '' }],
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
  const { request: updateRequest, loading: updateLoading } = useAxios(
    'PUT',
    `supplier/${data?.payload.id}`,
  );

  const onSubmit: SubmitHandler<SupplierInputs> = async ({
    id,
    contact_email,
    contact_phone_number,
    ...data
  }) => {
    if (id === undefined) {
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
    navigate(`/${page}`);
    reloadData();
  };

  return (
    <>
      <div className='actionbar__content__header'>
        {action === 'add' ? 'Adicionar Fornecedor' : 'Editar Fornecedor'}
      </div>
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
    </>
  );
};

export default AddSupplier;
