import React from 'react';
import get from 'lodash.get';

import './Cell.scss';

interface CellProps {
  dataKey?: string | undefined;
  width?: number;
  rowData?: Record<string, any>
}

export interface RowData<T> {
  rowData: T;
}

const Cell: React.FC<CellProps> = ({ children, ...props }) => {
  const { dataKey = '', rowData } = props;
  return (
    <td className="cell__container">{
      typeof children === 'function' ? children(props) : get(rowData, dataKey, '')
    }</td>
  )
};

export default Cell;

