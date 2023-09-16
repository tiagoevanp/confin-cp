export const createClassName = (el: string, props: Array<string | undefined>): string => {
  const customProps = props.filter(Boolean).map((prop) => `${el}--${prop}`);
  return `${el} ${customProps.join(' ')}`;
};
