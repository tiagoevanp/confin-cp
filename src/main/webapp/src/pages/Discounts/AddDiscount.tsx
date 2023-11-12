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
import InputMoney from '../../components/input/InputMoney';
import { useValueMask } from '../../hooks/useValueMask';

type DiscountInputs = Omit<Discount, 'value'> & { value: string | number };

const AddDiscount: FC = () => {
  const { page, action } = usePathResolver();
  const data = useLoaderData() as { payload: Discount };
  const [errorMessage, setErrorMessage] = useState('');
  const [discountType, setDiscountType] = useState(data?.payload?.type.value);
  const { reloadData } = useContext(ActionbarContext);
  const navigate = useNavigate();
  const valueMask = useValueMask();

  const { register, handleSubmit, reset, control, watch, resetField } = useForm<DiscountInputs>({
    defaultValues: {
      value: 0,
    },
    values: {
      id: data?.payload.id,
      name: data?.payload.name,
      type: data?.payload.type,
      value: valueMask(data?.payload?.value),
    },
  });

  const { request: addRequest, loading: addLoading } = useAxios('POST', 'discount');
  const { request: updateRequest, loading: updateLoading } = useAxios(
    'PUT',
    `discount/${data?.payload.id}`,
  );

  const onSubmit: SubmitHandler<DiscountInputs> = async ({ id, value, ...data }) => {
    setErrorMessage('');

    let response;

    if (id === undefined) {
      response = await addRequest({
        value: {
          integer: Number(value.toString().split(',')[0].replace('.', '')),
          decimal: Number(value.toString().split(',')[1]),
          type: discountType === 'PERCENTAGE' ? 'PERCENTAGE' : 'MONEY',
        },
        ...data,
      });
    } else {
      response = await updateRequest({
        id,
        value: {
          integer: Number(value.toString().split(',')[0].replace('.', '')),
          decimal: Number(value.toString().split(',')[1]),
          type: discountType === 'PERCENTAGE' ? 'PERCENTAGE' : 'MONEY',
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
        <Controller
          control={control}
          name='type'
          rules={{ required: true }}
          render={({ field: { name, value, onChange, onBlur, ref } }) => (
            <Select
              name={name}
              value={value}
              onChange={(option) => {
                if (option?.value === 'PERCENTAGE') {
                  setDiscountType('PERCENTAGE');
                } else {
                  setDiscountType('MONEY_INTEGER');
                }
                resetField('value');
                onChange(option);
              }}
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
        <Controller
          control={control}
          name='value'
          rules={{ required: true }}
          render={({ field: { name, value, onChange, onBlur, ref } }) =>
            discountType === 'PERCENTAGE' ? (
              <Input
                disabled={watch('type') === undefined}
                type='number'
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                label='Valor'
                required
              />
            ) : (
              <InputMoney
                disabled={watch('type') === undefined}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                label='Valor'
                required
              />
            )
          }
        />
      </Form>
    </>
  );
};

export default AddDiscount;
