export const createClassName = (
  el: string,
  props: Record<string, string | boolean | undefined>,
): string => {
  const propsKeys = Object.keys(props);
  const customProps = propsKeys
    .filter((key) => props[key])
    .map((key) => `${el}--${typeof props[key] === 'boolean' ? key : props[key]}`);
  return `${el} ${customProps.join(' ')}`;
};
