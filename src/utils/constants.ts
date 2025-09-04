import type { DropdownData } from '../shared/Dropdown/Dropdown.types';

export const FILTER_BY_TYPE: DropdownData[] = [
  {
    value: '',
    name: 'common.all',
  },
  {
    value: 'Goverment',
    name: 'billsPage.goverment',
  },
  {
    value: 'Private',
    name: 'billsPage.private',
  },
  {
    value: 'Other',
    name: 'common.other',
  },
];
