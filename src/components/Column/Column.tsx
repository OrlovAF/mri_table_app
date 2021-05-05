import React from 'react';

interface ColumnProps {
  sortable?: boolean
}

const Column: React.FC<ColumnProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Column;