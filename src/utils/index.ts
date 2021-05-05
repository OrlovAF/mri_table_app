import { Sort } from 'components/Table/Table';
import get from 'lodash.get';

export const sortBy = (data: any[], sortColumn: string, sortType: Sort) => {
  if (sortColumn && sortType) {
    return data.sort((a, b) => {
      const x = get(a, sortColumn);

      const y = get(b, sortColumn);

      const isString = typeof x === 'string' && typeof y === 'string';
      if (sortType === Sort.asc) {
        return isString ? x.localeCompare(y) : x - y;
      } else {
        return isString ? y.localeCompare(x) : y - x;
      }
    });
  }
  return data;
};