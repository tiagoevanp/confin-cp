import { useState, type FC, useContext } from 'react';
import Form from '../../components/form/Form';
import { type SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useAxios } from '../../hooks/useAxios';
import { type Product } from '../../definitions/api/Product';
import { usePathResolver } from '../../hooks/usePathResolver';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { type Supply } from '../../definitions/api/Supply';
import ActionbarContext from '../../contexts/ActionbarContext';
import Input from '../../components/input/Input';
import SelectMultiple from '../../components/select/SelectMultiple';
import { useDataFetch } from '../../hooks/useDataFetch';
import InputGroup from '../../components/input/InputGroup';
import InputMoney from '../../components/input/InputMoney';
import Callout from '../../components/callout/Callout';
import { type Supplier } from '../../definitions/api/Supplier';
import Select from '../../components/select/Select';
import { type Purchase } from '../../definitions/api/helpers/Purchase';
import { useValueMask } from '../../hooks/useValueMask';
import { useConfigs } from '../../hooks/useConfigs';

type ProductInputs = Omit<Product, 'purchase' | 'profit_percentage'> & {
  purchase: Omit<Purchase, 'value' | 'discount_value' | 'discount_percentage'> & {
    value: string | number;
    discount_value: string | number;
    discount_percentage: string | number;
  };
  profit_percentage: string | number;
};

const AddProduct: FC = () => {
  const { page, action } = usePathResolver();
  const data = useLoaderData() as { payload: Product };
  const [errorMessage, setErrorMessage] = useState('');
  const { reloadData } = useContext(ActionbarContext);
  const navigate = useNavigate();
  const valueMask = useValueMask();
  const configs = useConfigs(['profit_default', 'supplies_default']);

  const { register, handleSubmit, reset, control } = useForm<ProductInputs>({
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
      supply_id:
        data?.payload?.supply_id.length > 0
          ? data?.payload?.supply_id
          : action === 'add'
          ? configs?.supplies_default?.values
          : [],
      discount_id: data?.payload?.discount_id,
      profit_percentage:
        valueMask(data?.payload?.profit_percentage) !== ''
          ? valueMask(data?.payload?.profit_percentage)
          : valueMask(configs?.profit_default?.value),
      purchase: {
        value: valueMask(data?.payload?.purchase?.value),
        discount_percentage: valueMask(data?.payload?.purchase?.discount_percentage),
        discount_value: valueMask(data?.payload?.purchase?.discount_value),
        quantity: data?.payload?.purchase?.quantity,
        date: data?.payload?.purchase?.date?.split('T')[0],
      },
    },
  });

  const { data: suppliesData, loading: suppliesLoading } = useDataFetch<Supply>('supply');
  const { data: suppliersData, loading: suppliersLoading } = useDataFetch<Supplier>('supplier');
  const { data: discountsData, loading: discountsLoading } = useDataFetch<Supplier>('discount');
  const { request: addRequest, loading: addLoading } = useAxios('POST', 'product');
  const { request: updateRequest, loading: updateLoading } = useAxios(
    'PUT',
    `product/${data?.payload.id}`,
  );

  const onSubmit: SubmitHandler<ProductInputs> = async ({
    id,
    purchase,
    profit_percentage,
    ...data
  }) => {
    setErrorMessage('');

    let response;

    if (id === undefined) {
      response = await addRequest({
        ...data,
        ...(profit_percentage != null && {
          profit_percentage: {
            integer: Number(profit_percentage.toString().split(',')[0].replace('.', '')),
            decimal: Number(profit_percentage.toString().split(',')[1]),
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
        ...(profit_percentage != null && {
          profit_percentage: {
            integer: Number(profit_percentage.toString().split(',')[0].replace('.', '')),
            decimal: Number(profit_percentage.toString().split(',')[1]),
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
        {action === 'add' ? 'Adicionar Produto' : 'Editar Produto'}
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
        <Controller
          control={control}
          name='supply_id'
          render={({ field: { name, value, onChange, onBlur, ref } }) => (
            <SelectMultiple
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              label='Suprimentos'
              disabled={suppliesLoading}
              options={suppliesData.map((supply) => ({
                value: supply.id,
                label: supply.name,
              }))}
            />
          )}
        />
        <Input {...register('profit_percentage')} label='Lucro Percentual' type='number' required />
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
        <Controller
          control={control}
          name='discount_id'
          render={({ field: { name, value, onChange, onBlur, ref } }) => (
            <Select
              name={name}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              label='Desconto de Venda'
              disabled={discountsLoading}
              options={discountsData.map((discount) => ({
                value: discount.id,
                label: discount.name,
              }))}
            />
          )}
        />
      </Form>
    </>
  );
};

export default AddProduct;
