import { type FC, useState, useContext } from 'react';
import Form from '../../components/form/Form';
import Input from '../../components/input/Input';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { useAxios } from '../../hooks/useAxios';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { usePathResolver } from '../../hooks/usePathResolver';
import ActionbarContext from '../../contexts/ActionbarContext';
import Callout from '../../components/callout/Callout';
import { type Supply } from '../../definitions/api/Supply';
import InputGroup from '../../components/input/InputGroup';
import InputMoney from '../../components/input/InputMoney';
import Select from '../../components/select/Select';
import { useDataFetch } from '../../hooks/useDataFetch';

type SupplyInputs = {
  id: string;
  name: string;
  purchase: {
    date: Date;
    value: number;
    discount_value: number;
    discount_percentage: number;
    quantity: number;
  };
  supplier_id: { value: string; label: string };
  annual_depreciation_value: number;
  annual_maintenance_value: number;
};

const AddSupply: FC = () => {
  const { page, action } = usePathResolver();
  const data = useLoaderData() as { payload: Supply };
  const [errorMessage, setErrorMessage] = useState('');
  const { reloadData } = useContext(ActionbarContext);
  const navigate = useNavigate();

  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: {
      purchase: {
        discount_value: '',
      },
    },
    values: {
      ...data?.payload,
      purchase: { ...data?.payload?.purchase, date: data?.payload?.purchase.date.split('T')[0] },
    },
  });

  const { data: suppliersData, loading: suppliersLoading } = useDataFetch('supplier');
  const { request: addRequest, loading: addLoading } = useAxios('POST', 'supply');
  const { request: updateRequest, loading: updateLoading } = useAxios(
    'PUT',
    `supply/${data?.payload.id}`,
  );

  const onSubmit: SubmitHandler<SupplyInputs> = async ({ id, purchase, ...data }) => {
    setErrorMessage('');

    let response;

    if (id === undefined) {
      response = await addRequest({
        ...data,
        purchase: {
          ...purchase,
          value: Number(purchase.value.toString().replace('.', '')),
          ...(purchase.discount_value != null && {
            discount_value: Number(purchase.discount_value.toString().replace('.', '')),
          }),
        },
      });
    } else {
      response = await updateRequest({
        id,
        ...data,
        purchase: {
          ...purchase,
          value: Number(purchase.value.toString().replace('.', '')),
          ...(purchase.discount_value != null && {
            discount_value: Number(purchase.discount_value.toString().replace('.', '')),
          }),
        },
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
        {action === 'add' ? 'Adicionar Suprimento' : 'Editar Suprimento'}
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
          name='supplier_id'
          rules={{ required: true }}
          render={({ field: { name, value, onChange, onBlur, ref } }) => (
            <Select
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              label='Fornecedor'
              disabled={suppliersLoading}
              required
              options={suppliersData.map((supplier) => ({
                value: supplier.id,
                label: supplier.name,
              }))}
            />
          )}
        />
        <InputGroup label='Compra'>
          <Input
            {...register('purchase.date', {
              required: true,
            })}
            label='Data de Compra'
            type='date'
            required
          />
          <Controller
            control={control}
            name='purchase.value'
            rules={{ required: true }}
            render={({ field }) => <InputMoney {...field} label='Valor' required />}
          ></Controller>
          <Input
            {...register('purchase.quantity', {
              required: true,
            })}
            label='Quantidade'
            type='number'
            required
          />
          <Input
            {...register('purchase.discount_percentage')}
            label='Desconto Percentual'
            type='number'
          />
          <Controller
            control={control}
            name='purchase.discount_value'
            render={({ field }) => <InputMoney {...field} label='Desconto em Valor' />}
          ></Controller>
        </InputGroup>
        <Input
          {...register('annual_depreciation_value')}
          label='Valor Percentual de Depreciação Anual'
          type='number'
        />
        <Input
          {...register('annual_maintenance_value')}
          label='Valor Percentual de Manutenção Anual'
          type='number'
        />
      </Form>
    </>
  );
};

export default AddSupply;
