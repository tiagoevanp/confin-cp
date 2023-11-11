import { useCallback, type FC, useState } from 'react';
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
import Callout from '../../components/callout/Callout';
import { type Option } from '../../definitions/api/helpers/Option';
import { getConfigValue, getConfigValueType, getConfigValues } from '../helpers/config';

export type BusinessConfInput = {
  profit_default: string | number;
  credit_card_fee: string | number;
  pix_fee: string | number;
  bank_slip_fee: string | number;
  pro_labore: string | number;
  supplies_default: Option[];
};

const BusinessConf: FC = () => {
  const { data: configs, loading } = useDataFetch<Business>('config/business');
  const { data: supplies, loading: loadingSupplies } = useDataFetch<Supply>('supply');
  const [callout, setCallout] = useState<{
    type: 'success' | 'danger';
    message: string;
  }>({
    type: 'success',
    message: '',
  });

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
      profit_default: getConfigValue(configs, 'profit_default'),
      credit_card_fee: getConfigValue(configs, 'credit_card_fee'),
      pix_fee: getConfigValue(configs, 'pix_fee'),
      bank_slip_fee: getConfigValue(configs, 'bank_slip_fee'),
      pro_labore: getConfigValue(configs, 'pro_labore'),
      supplies_default: getConfigValues(configs, 'supplies_default'),
    },
  });

  const { request, loading: updateLoading } = useAxios('PUT', 'config/business');

  const onSubmit = useCallback(
    async (data: BusinessConfInput) => {
      setCallout({ type: 'success', message: '' });

      if (data == null) return;

      const response = await request(
        (Object.keys(data) as Array<keyof typeof data>).map((key) => ({
          id: key,
          value: !Array.isArray(data[key])
            ? {
                integer: Number(data[key].toString().split('.')[0]),
                decimal: Number(data[key].toString().split('.')[1]),
                type: getConfigValueType(configs, key),
              }
            : undefined,
          values: Array.isArray(data[key]) ? data[key] : [],
        })),
      );

      if (response.success === true) {
        setCallout({ type: 'success', message: 'Configurações salvas com sucesso!' });
      } else {
        setCallout({ type: 'danger', message: response.message });
      }
    },
    [configs, request],
  );

  if (loading) {
    // TODO: loading component
    return null;
  }

  if (configs == null || configs.length === 0) {
    // TODO: error component
    return null;
  }

  return (
    <Page>
      <PageContent>
        <Form
          disabled={loading || loadingSupplies || updateLoading}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          reset={() => {
            reset();
          }}
        >
          {callout.message !== '' && <Callout {...callout} />}
          <h1>Configurações de Negócio</h1>
          {configs?.map((config, idx) => {
            switch (config.id) {
              case 'profit_default':
                return (
                  <Input
                    key={idx}
                    {...register('profit_default')}
                    type='number'
                    label='Lucro Percentual Padrão'
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
