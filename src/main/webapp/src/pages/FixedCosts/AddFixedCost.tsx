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
import { type FixedCost } from '../../definitions/api/FixedCost';
import { useInputMask } from '../../hooks/useInputMask';

type FixedCostInputs = Omit<FixedCost, 'value'> & {
  value: string | number;
};

const AddFixedCost: FC = () => {
  const { page, action } = usePathResolver();
  const data = useLoaderData() as { payload: FixedCost };
  const [errorMessage, setErrorMessage] = useState('');
  const { reloadData } = useContext(ActionbarContext);
  const navigate = useNavigate();
  const inputMask = useInputMask();

  const { register, handleSubmit, reset, control } = useForm<FixedCostInputs>({
    defaultValues: {
      name: '',
      value: '',
    },
    values: {
      id: data?.payload?.id,
      name: data?.payload?.name,
      value: inputMask(data?.payload?.value),
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
        value: {
          integer: Number(value.toString().split(',')[0].replace('.', '')),
          decimal: Number(value.toString().split(',')[1]),
          type: 'MONEY',
        },
        ...data,
      });
    } else {
      response = await updateRequest({
        id,
        value: {
          integer: Number(value.toString().split(',')[0].replace('.', '')),
          decimal: Number(value.toString().split(',')[1]),
          type: 'MONEY',
        },
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
