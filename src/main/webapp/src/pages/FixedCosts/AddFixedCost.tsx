import { type FC, useState, useContext } from 'react';
import Form from '../../components/form/Form';
import Input from '../../components/input/Input';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { useAxios } from '../../hooks/useAxios';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { usePathResolver } from '../../hooks/usePathResolver';
import ActionbarContext from '../../contexts/ActionbarContext';
import Callout from '../../components/callout/Callout';
import InputMoney from '../../components/input/InputMoney';
import { useMoneyMask } from '../../hooks/useMoneyMask';
import { type FixedCost } from '../../definitions/api/FixedCost';

type FixedCostInputs = {
  id: string;
  name: string;
  value: number;
};

const AddFixedCost: FC = () => {
  const { page, action } = usePathResolver();
  const data = useLoaderData() as { payload: FixedCost };
  const [errorMessage, setErrorMessage] = useState('');
  const { reloadData } = useContext(ActionbarContext);
  const navigate = useNavigate();
  const moneyMask = useMoneyMask();

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      name: '',
      value: '',
    },
    values: {
      ...data?.payload,
      ...(data?.payload?.value != null && {
        value: moneyMask(data.payload.value.toString()),
      }),
    },
  });

  const { request: addRequest, loading: addLoading } = useAxios('POST', 'fixed-cost');
  const { request: updateRequest, loading: updateLoading } = useAxios(
    'PUT',
    `fixed-cost/${data?.payload.id}`,
  );

  const onSubmit: SubmitHandler<FixedCostInputs> = async ({ id, value, ...data }) => {
    setErrorMessage('');

    let response;

    if (id === undefined) {
      response = await addRequest({
        value: Number(value.toString().replace('.', '')),
        ...data,
      });
    } else {
      response = await updateRequest({
        id,
        value: Number(value.toString().replace('.', '')),
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
        {action === 'add' ? 'Adicionar Custo Fixo' : 'Editar Custo Fixo'}
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
        <Controller
          control={control}
          name='value'
          rules={{ required: true }}
          render={({ field }) => <InputMoney {...field} label='Valor' required />}
        ></Controller>
      </Form>
    </>
  );
};

export default AddFixedCost;
