import { useMemo } from 'react';

export const useClassName = (
  el: string,
  props: Record<string, string | boolean | undefined>,
): string => {
  const customProps = useMemo(
    () =>
      Object.keys(props)
        .filter((key) => props[key])
        .map((key) => `${el}--${typeof props[key] === 'boolean' ? key : props[key]}`),
    [el, props],
  );

  return `${el} ${customProps.join(' ')}`;
};
