import React from 'react';
import cls from 'classnames';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Sort } from 'components/Table/Table';

import './HeadCell.scss';

interface HeadCellProps {
  sortable?: boolean;
  sortColumn?: string;
  sortType?: string;
  dataKey?: string;
  onSortChange?: (column: string) => void;
}

const HeadCell: React.FC<HeadCellProps> = ({ children, sortable, ...props }) => {
  const { sortColumn, dataKey, onSortChange, sortType } = props;
  const currentSort = sortColumn === dataKey;
  const isAsc = sortType === Sort.asc;
  return (
    <th
      className="headCell__container"
      onClick={() => dataKey && typeof onSortChange === 'function' && onSortChange(dataKey)}
    >
      <div className="headCell__content">
        {sortable && (
          <span className={cls('headCell__sortable', { 'headCell__visible': currentSort }, { 'headCell__asc': isAsc })}>
            <ArrowDownwardIcon/>
          </span>
        )}
        <span>
        {typeof children === 'function' ? children() : children}
      </span>
      </div>
    </th>
  );
};

export default HeadCell;

