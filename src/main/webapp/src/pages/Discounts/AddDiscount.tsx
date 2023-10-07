import { type FC, useState, useContext } from 'react';
import Form from '../../components/form/Form';
import Input from '../../components/input/Input';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { useAxios } from '../../hooks/useAxios';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { usePathResolver } from '../../hooks/usePathResolver';
import ActionbarContext from '../../contexts/ActionbarContext';
import Callout from '../../components/callout/Callout';
import { type Discount } from '../../definitions/api/Discount';
import Select from '../../components/select/Select';

type DiscountInputs = {
  id: string;
  name: string;
  marketplace: string;
  address_street: string;
  address_number: string;
  address_zip_code: string;
  contact_phone_number: Array<{ value: string }>;
  contact_email: Array<{ value: string }>;
};

const AddDiscount: FC = () => {
  const { page, action } = usePathResolver();
  const data = useLoaderData() as { payload: Discount };
  const [errorMessage, setErrorMessage] = useState('');
  const { reloadData } = useContext(ActionbarContext);
  const navigate = useNavigate();

  const { register, handleSubmit, reset, control } = useForm({
    values: {
      ...data?.payload,
    },
  });

  const { request: addRequest, loading: addLoading } = useAxios('POST', 'discount');
  const { request: updateRequest, loading: updateLoading } = useAxios(
    'PUT',
    `discount/${data?.payload.id}`,
  );

  const onSubmit: SubmitHandler<DiscountInputs> = async ({ id, ...data }) => {
    setErrorMessage('');

    let response;

    if (id === undefined) {
      response = await addRequest({
        ...data,
      });
    } else {
      response = await updateRequest({
        id,
        ...data,
      });
    }

    if (response.success === true) {
      navigate(`/${page}`);
      reloadData();
    } else {
      setErrorMessage(response.message);
    }
  };

  return (
    <>
      <div className='actionbar__content__header'>
        {action === 'add' ? 'Adicionar Desconto' : 'Editar Desconto'}
      </div>
      <Form
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        reset={() => {
          reset();
        }}
        loading={addLoading || updateLoading}
      >
        {errorMessage !== '' && <Callout message={errorMessage} type='danger' />}
        <Input {...register('id')} type='text' hidden disabled label='ID' required />
        <Input
          {...register('name', {
            required: true,
          })}
          label='Nome'
          type='text'
          required
        />
        <Input
          {...register('value', {
            required: true,
          })}
          label='Valor'
          type='number'
          required
        />
        <Controller
          control={control}
          name={'type'}
          rules={{ required: true }}
          render={({ field: { name, value, onChange, onBlur, ref } }) => (
            <Select
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              label='Tipo do Valor'
              required
              options={[
                { value: 'PERCENTAGE', label: 'Porcentagem' },
                { value: 'MONEY_INTEGER', label: 'Valor Fixo' },
              ]}
            />
          )}
        />
      </Form>
    </>
  );
};

export default AddDiscount;
