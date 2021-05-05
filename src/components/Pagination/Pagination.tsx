import React from 'react';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import './Pagination.scss';

interface MenuItem {
  value: number;
  label: string | number;
}

interface PaginationProps {
  lengthMenu: MenuItem[];
  page: number;
  rowsPerPage: number;
  total: number;
  onChangePage: (eventKey: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ lengthMenu , total, rowsPerPage}) => {
  return (
    <div className="pagination__container">
      <span>
        Row per page:
      </span>
      <span>
        <select>
          {lengthMenu.map(({ value, label }) => {
            return <option key={value} value={value}>{label}</option>
          })}
        </select>
      </span>
      <span>
        1 - { total < rowsPerPage ? total: rowsPerPage} of {total}
      </span>
      <span className="arrow_controls">
        <div >
          <ArrowBackIosIcon/>
        </div>
        <div>
        <ArrowForwardIosIcon/>
        </div>
      </span>
    </div>
  );
};

export default Pagination;