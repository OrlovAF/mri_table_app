import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Cell, Column, HeadCell, Table } from 'components';
import Panel from 'components/Panel/Panel';
import { RowData } from 'components/Cell/Cell';
import { Order } from './Order';
import Pagination from 'components/Pagination/Pagination';
import { sortBy } from 'utils';
import { Sort, SortType } from 'components/Table/Table';

// styles
import './OrderPage.scss';

interface OrderPageProps {

}

const DATE_FORMAT = 'yyyy-MM-dd';

const formatTableDate = (date: string) => format(new Date(date), DATE_FORMAT);


const OrderPage: React.FC<OrderPageProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Order[]>([]);

  const [selected, setSelected] = useState<number[]>([]);

  const addOrRemove = (id: number) => {
    const result = selected.includes(id) ? selected.filter(item => item !== id) : selected.concat(id);
    setSelected(result);
  };

  const [sort, setSort] = useState<{ sortColumn: string, sortType: SortType }>({
    sortColumn: 'order_number',
    sortType: Sort.asc,
  });

  const onSortChange = useCallback((sortColumn, sortType) => {
    return setSort({ sortColumn, sortType });
  }, [setSort]);

  useEffect(() => {
    setLoading(true);
    axios.get<Order[]>('/data/orders.json')
      .then((response) => setData(response.data))
      .finally(() => setLoading(false));
  }, []);

  const sortedData = useMemo<Order[]>(() => sortBy(data, sort.sortColumn, sort.sortType), [sort, data]);

  if (loading) {
    return <div> Loading... </div>;
  }

  return (
    <Panel>
      <div className="order_header">
        <h2> Orders </h2>
        <span className="order_header__actions"> <MoreVertIcon/> </span>
      </div>
      <Table
        data={sortedData}
        onSortColumn={onSortChange}
        sortColumn={sort.sortColumn}
        sortType={sort.sortType}
      >
        <Column>
          <HeadCell>{() => {
            const allSelected = sortedData.length === selected.length;
            const onClick = () => {
              return setSelected(allSelected ? [] : sortedData.map(({ order_number }) => order_number ));
            };
            return (
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onClick}/>
            );
          }}</HeadCell>
          <Cell>
            {({ rowData }: RowData<Order>) => {
              return (
                <input
                  type="checkbox"
                  checked={selected.includes(rowData.order_number)}
                  onChange={() => addOrRemove(rowData.order_number)}
                />
              );
            }}
          </Cell>
        </Column>

        <Column sortable>
          <HeadCell>Order Number</HeadCell>
          <Cell dataKey="order_number"/>
        </Column>

        <Column sortable>
          <HeadCell>Customer Name</HeadCell>
          <Cell dataKey="customer.first_name">
            {({ rowData }: RowData<Order>) => (`${rowData.customer.last_name}, ${rowData.customer.first_name}`)}
          </Cell>
        </Column>

        <Column sortable>
          <HeadCell>Customer Address</HeadCell>
          <Cell dataKey="customer.address.line1"/>
        </Column>

        <Column sortable>
          <HeadCell>Order Value</HeadCell>
          <Cell dataKey="order_details.value">
            {({ rowData }: RowData<Order>) => `$${rowData.order_details.value}`}
          </Cell>
        </Column>

        <Column sortable>
          <HeadCell>Order Date</HeadCell>
          <Cell dataKey="order_details.date">
            {({ rowData }: RowData<Order>) => formatTableDate(rowData.order_details.date)}
          </Cell>
        </Column>

        <Column sortable>
          <HeadCell>Ship Date</HeadCell>
          <Cell dataKey="shipping_details.date">
            {({ rowData }: RowData<Order>) => formatTableDate(rowData.shipping_details.date)}
          </Cell>
        </Column>

        <Column sortable>
          <HeadCell>Status</HeadCell>
          <Cell dataKey="status"/>
        </Column>

      </Table>

      <Pagination
        lengthMenu={[
          {
            value: 10,
            label: 10,
          },
          {
            value: 20,
            label: 20,
          },
        ]}
        page={0}
        rowsPerPage={10}
        total={data.length}
        onChangePage={() => {
        }}
      />
    </Panel>
  );
};

export default OrderPage;