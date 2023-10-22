type useTableColumnsWithDataReturn = any;

export const useTableColumnsWithData = <T>(
  data: T,
  tableColumns: (data: T) => any,
): useTableColumnsWithDataReturn => {
  return tableColumns(data);
};
