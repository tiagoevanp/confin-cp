import { useCallback, type FC } from 'react';
import Page from '../../components/page/Page';
import PageContent from '../../components/page/PageContent';
import Form from '../../components/form/Form';
import { Controller, useForm } from 'react-hook-form';
import { useDataFetch } from '../../hooks/useDataFetch';
import { type Business } from '../../definitions/api/config/Business';
import Input from '../../components/input/Input';
import InputMoney from '../../components/input/InputMoney';
import SelectMultiple from '../../components/select/SelectMultiple';
import { type Supply } from '../../definitions/api/Supply';
import { useAxios } from '../../hooks/useAxios';

type BusinessConfInput = {
  profit_default: string;
  credit_card_fee: string;
  pix_fee: string;
  bank_slip_fee: string;
  pro_labore: string;
  supplies_default: Array<{ value: string; label: string }>;
};

const BusinessConf: FC = () => {
  const { data: configs, loading } = useDataFetch<Business>('config/business');
  const { data: supplies, loading: loadingSupplies } = useDataFetch<Supply>('supply');

  const { register, handleSubmit, reset, control } = useForm<BusinessConfInput>({
    defaultValues: {
      profit_default: '',
      credit_card_fee: '',
      pix_fee: '',
      bank_slip_fee: '',
      pro_labore: '',
      supplies_default: [],
    },
    values: {
      profit_default:
        configs.find((config) => config.id === 'profit_default')?.value.toString() ?? '',
      credit_card_fee:
        configs.find((config) => config.id === 'credit_card_fee')?.value.toString() ?? '',
      pix_fee: configs.find((config) => config.id === 'pix_fee')?.value.toString() ?? '',
      bank_slip_fee:
        configs.find((config) => config.id === 'bank_slip_fee')?.value.toString() ?? '',
      pro_labore: configs.find((config) => config.id === 'pro_labore')?.value.toString() ?? '',
      supplies_default: configs.find((config) => config.id === 'supplies_default')?.values ?? [],
    },
  });

  const { request, loading: updateLoading } = useAxios('PUT', 'config/business');

  const onSubmit = useCallback(
    (data: BusinessConfInput) => {
      request(
        (Object.keys(data) as Array<keyof typeof data>).map((key) => ({
          id: key,
          value: !Array.isArray(data[key]) ? Number(data[key].toString().replace('.', '')) : 0,
          values: Array.isArray(data[key]) ? data[key] : [],
        })),
      );
    },
    [request],
  );

  return (
    <Page>
      <PageContent>
        <h1>Configurações de Negócio</h1>
        <Form
          disabled={loading || loadingSupplies || updateLoading}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          reset={reset}
        >
          {configs.map((config, idx) => {
            switch (config.id) {
              case 'profit_default':
                return (
                  <Input
                    key={idx}
                    {...register('profit_default')}
                    type='number'
                    label='Lucro Padrão'
                  />
                );
              case 'credit_card_fee':
                return (
                  <Input
                    key={idx}
                    {...register('credit_card_fee')}
                    type='number'
                    label='Taxa Cartão de Crédito'
                  />
                );
              case 'pix_fee':
                return <Input key={idx} {...register('pix_fee')} type='number' label='Taxa Pix' />;
              case 'bank_slip_fee':
                return (
                  <Controller
                    key={idx}
                    control={control}
                    name='bank_slip_fee'
                    render={({ field }) => <InputMoney {...field} label='Taxa Boleto' />}
                  />
                );
              case 'pro_labore':
                return (
                  <Controller
                    key={idx}
                    control={control}
                    name='pro_labore'
                    render={({ field }) => <InputMoney {...field} label='Pró-Labore' />}
                  />
                );
              case 'supplies_default':
                return (
                  <Controller
                    key={idx}
                    control={control}
                    name='supplies_default'
                    render={({ field }) => (
                      <SelectMultiple
                        {...field}
                        label='Suprimentos Padrão'
                        options={supplies?.map((supply) => ({
                          value: supply.id,
                          label: supply.name,
                        }))}
                      />
                    )}
                  />
                );
              default:
                return null;
            }
          })}
        </Form>
      </PageContent>
    </Page>
  );
};

export default BusinessConf;
