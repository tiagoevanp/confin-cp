import { type Business } from '../../definitions/api/config/Business';
import { inputMask } from '../../hooks/useInputMask';
import { type BusinessConfInput } from '../BusinessConf/BusinessConf';

export const getConfigValueType = (configs: Business[], id: Business['id']): string => {
  const configValue = configs?.find((config) => config.id === id)?.value;

  if (configValue == null) {
    return '';
  }

  return configValue.type;
};

export const getConfigValue = (configs: Business[], id: Business['id']): string => {
  const configValue = configs?.find((config) => config.id === id)?.value;

  if (configValue == null) {
    return '';
  }

  return inputMask(configValue);
};

export const getConfigValues = (
  configs: Business[],
  id: Business['id'],
): BusinessConfInput['supplies_default'] => {
  const configValue = configs?.find((config) => config.id === id);

  if (configValue == null) {
    return [];
  }

  return configValue.values;
};
