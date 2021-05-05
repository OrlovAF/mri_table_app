import { sortBy } from './index';
import { Sort } from '../components/Table/Table';

const create = (id: number, name: string) => ({ id, name });

describe('Sort by', () => {
  const a = create(1, 'a');
  const b = create(2, 'b');
  const c = create(3, 'c');

  const list = [c, a, b];

  it('should be sorted by column id with number value with ASC order', () => {
    const sorted = sortBy(list.slice(), 'id', Sort.asc);

    expect(sorted).toEqual([a, b, c]);
  });

  it('should be sorted by column id with number value with DESC order', () => {
    const sorted = sortBy(list.slice(), 'id', Sort.desc);

    expect(sorted).toEqual([c, b, a]);
  });

  it('should be sorted by column name with string value with ASC order', () => {
    const sorted = sortBy(list.slice(), 'name', Sort.asc);

    expect(sorted).toEqual([a, b, c]);
  });

  it('should be sorted by column name with string value with DESC order', () => {
    const sorted = sortBy(list.slice(), 'name', Sort.desc);

    expect(sorted).toEqual([c, b, a]);
  });


  // sortBy()
});