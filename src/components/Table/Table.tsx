import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import get from 'lodash.get';
import { getColumnNodes } from './utils';

import './Table.scss';

export enum Sort {
  desc = 'desc',
  asc = 'asc',
}

export type SortType = Sort.desc | Sort.asc;

interface TableProps<T = any> {
  data: T[];
  onSortColumn?: (sortColumn:string, sortType:SortType) => void;
  sortColumn?: string;
  sortType?: SortType;
}

const Table: React.FC<TableProps> = ({ children, data, onSortColumn, ...props }) => {
  const [sortColumn, setSortColumn] = useState<string | undefined>(props.sortColumn);
  const [sortType, setSortType] = useState<SortType | undefined>(props.sortType);

  const onSortChange = useCallback((column: string) => {
    if (sortColumn === column) {
      setSortType(sortType === Sort.asc ? Sort.desc : Sort.asc )
    } else {
      setSortColumn(column);
      setSortType(Sort.asc)
    }

  }, [setSortColumn, setSortType, sortColumn, sortType]);

  useEffect(() => {
    if (typeof onSortColumn === 'function' && sortColumn && sortType) {
      onSortColumn(sortColumn, sortType)
    }
  }, [onSortColumn, sortType, sortColumn]);

  const cells = useMemo<ReactNode[]>(() => {
    return children ? getColumnNodes('Cell', children) : []
  }, [children]);

  const headers = useMemo<ReactNode[]>(() => {
    if (children) {
      return getColumnNodes('HeadCell', children).map((node: any, index) => {
        const cell = cells[index];
        const column = React.Children.toArray(children)[index];

        const { sortable } = get(column, 'props', {});
        const { dataKey } = get(cell, 'props', {});
        const newProps = { ...node.props, sortColumn, sortType, dataKey, sortable, onSortChange, key: dataKey };

        return React.cloneElement(node, newProps);
      })
    }

    return [];
  }, [children, cells, sortColumn,onSortChange, sortType ]);

  return (
    <table className="table__container">
      <thead>
      <tr>
        {headers}
      </tr>
      </thead>
      <tbody>
      {data.map((rowData, rowIndex) => {
        return (
          <tr key={rowIndex}>
            {cells.map((cell: any, cellIndex) => {
              return React.cloneElement(cell, { ...cell.props, rowData, key: `${rowIndex}_${cellIndex}` });
            })}
          </tr>
        );
      })}
      </tbody>
    </table>
  );
};

export default Table;