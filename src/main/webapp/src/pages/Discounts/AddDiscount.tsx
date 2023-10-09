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
import { useMoneyMask } from '../../hooks/useMoneyMask';

type DiscountInputs = {
  id: string;
  name: string;
  type: 'PERCENTAGE' | 'MONEY_INTEGER';
  value: number;
};

const AddDiscount: FC = () => {
  const { page, action } = usePathResolver();
  const data = useLoaderData() as { payload: Discount };
  const [errorMessage, setErrorMessage] = useState('');
  const [discountType, setDiscountType] = useState(data?.payload?.type.value);
  const { reloadData } = useContext(ActionbarContext);
  const navigate = useNavigate();
  const moneyMask = useMoneyMask();

  const { register, handleSubmit, reset, control, watch, resetField } = useForm({
    defaultValues: {
      value: '',
    },
    values: {
      ...data?.payload,
      ...(data?.payload?.value != null && {
        value:
          data?.payload?.type.value === 'PERCENTAGE'
            ? data.payload.value.toString()
            : moneyMask(data.payload.value.toString()),
      }),
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
                disabled={watch('type')?.value === undefined}
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
                disabled={watch('type')?.value === undefined}
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
