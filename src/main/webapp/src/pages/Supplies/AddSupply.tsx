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
import { type Supplier } from '../../definitions/api/Supplier';
import { type Purchase } from '../../definitions/api/helpers/Purchase';
import { useInputMask } from '../../hooks/useInputMask';

type SupplyInputs = Omit<
  Supply,
  'purchase' | 'annual_depreciation_value' | 'annual_maintenance_value'
> & {
  purchase: Omit<Purchase, 'value' | 'discount_value' | 'discount_percentage'> & {
    value: string | number;
    discount_value: string | number;
    discount_percentage: string | number;
  };
  annual_depreciation_value: string | number;
  annual_maintenance_value: string | number;
};

const AddSupply: FC = () => {
  const { page, action } = usePathResolver();
  const data = useLoaderData() as { payload: Supply };
  const [errorMessage, setErrorMessage] = useState('');
  const { reloadData } = useContext(ActionbarContext);
  const navigate = useNavigate();
  const inputMask = useInputMask();

  const { register, handleSubmit, reset, control } = useForm<SupplyInputs>({
    defaultValues: {
      purchase: {
        discount_value: '',
        value: '',
      },
    },
    values: {
      id: data?.payload?.id,
      name: data?.payload?.name,
      supplier_id: data?.payload?.supplier_id,
      annual_depreciation_value: inputMask(data?.payload?.annual_depreciation_value),
      annual_maintenance_value: inputMask(data?.payload.annual_maintenance_value),
      purchase: {
        value: inputMask(data?.payload?.purchase?.value),
        discount_percentage: inputMask(data?.payload?.purchase?.discount_percentage),
        discount_value: inputMask(data?.payload?.purchase?.discount_value),
        quantity: data?.payload?.purchase?.quantity,
        date: data?.payload?.purchase?.date?.split('T')[0],
      },
    },
  });

  const { data: suppliersData, loading: suppliersLoading } = useDataFetch<Supplier>('supplier');
  const { request: addRequest, loading: addLoading } = useAxios('POST', 'supply');
  const { request: updateRequest, loading: updateLoading } = useAxios(
    'PUT',
    `supply/${data?.payload.id}`,
  );

  const onSubmit: SubmitHandler<SupplyInputs> = async ({
    id,
    purchase,
    annual_depreciation_value,
    annual_maintenance_value,
    ...data
  }) => {
    setErrorMessage('');

    let response;

    if (id === undefined) {
      response = await addRequest({
        ...data,
        ...(annual_depreciation_value != null && {
          annual_depreciation_value: {
            integer: Number(annual_depreciation_value.toString().split(',')[0].replace('.', '')),
            decimal: Number(annual_depreciation_value.toString().split(',')[1]),
            type: 'PERCENTAGE',
          },
        }),
        ...(annual_maintenance_value != null && {
          annual_maintenance_value: {
            integer: Number(annual_maintenance_value.toString().split(',')[0].replace('.', '')),
            decimal: Number(annual_maintenance_value.toString().split(',')[1]),
            type: 'PERCENTAGE',
          },
        }),
        purchase: {
          ...purchase,
          value: {
            integer: Number(purchase.value.toString().split(',')[0].replace('.', '')),
            decimal: Number(purchase.value.toString().split(',')[1]),
            type: 'MONEY',
          },
          ...(purchase.discount_value != null && {
            discount_value: {
              integer: Number(purchase.discount_value.toString().split(',')[0].replace('.', '')),
              decimal: Number(purchase.discount_value.toString().split(',')[1]),
              type: 'MONEY',
            },
          }),
          ...(purchase.discount_percentage != null && {
            discount_percentage: {
              integer: Number(
                purchase.discount_percentage.toString().split(',')[0].replace('.', ''),
              ),
              decimal: Number(purchase.discount_percentage.toString().split(',')[1]),
              type: 'PERCENTAGE',
            },
          }),
        },
      });
    } else {
      response = await updateRequest({
        id,
        ...data,
        ...(annual_depreciation_value != null && {
          annual_depreciation_value: {
            integer: Number(annual_depreciation_value.toString().split(',')[0].replace('.', '')),
            decimal: Number(annual_depreciation_value.toString().split(',')[1]),
            type: 'PERCENTAGE',
          },
        }),
        ...(annual_maintenance_value != null && {
          annual_maintenance_value: {
            integer: Number(annual_maintenance_value.toString().split(',')[0].replace('.', '')),
            decimal: Number(annual_maintenance_value.toString().split(',')[1]),
            type: 'PERCENTAGE',
          },
        }),
        purchase: {
          ...purchase,
          value: {
            integer: Number(purchase.value.toString().split(',')[0].replace('.', '')),
            decimal: Number(purchase.value.toString().split(',')[1]),
            type: 'MONEY',
          },
          ...(purchase.discount_value != null && {
            discount_value: {
              integer: Number(purchase.discount_value.toString().split(',')[0].replace('.', '')),
              decimal: Number(purchase.discount_value.toString().split(',')[1]),
              type: 'MONEY',
            },
          }),
          ...(purchase.discount_percentage != null && {
            discount_percentage: {
              integer: Number(
                purchase.discount_percentage.toString().split(',')[0].replace('.', ''),
              ),
              decimal: Number(purchase.discount_percentage.toString().split(',')[1]),
              type: 'PERCENTAGE',
            },
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
