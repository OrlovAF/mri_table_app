import React, { ReactNode } from 'react';
import get from 'lodash.get';

export const getColumnNodes = (nodeName: 'HeadCell' | 'Cell', children: any): ReactNode[] => React.Children.toArray(children).map((child) => {
  return React.Children
    .toArray(get(child, 'props.children', []))
    .find((child) => get(child, 'type.name') === nodeName);
});

