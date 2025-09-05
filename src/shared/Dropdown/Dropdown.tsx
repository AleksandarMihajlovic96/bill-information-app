import { InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { DropdownProps } from './Dropdown.types';
import { DropdownFormControl } from './Dropdown.styles';

/**
 * Dropdown
 *
 * Reusable React functional component for rendering a styled dropdown select input.
 * - Wraps MUI's `Select` and `MenuItem` components inside a custom styled form control.
 * - Displays a label above the dropdown using `InputLabel`.
 * - Accepts dynamic data (array of items) to populate the dropdown options.
 * - Calls the provided `setDropdownValue` function whenever the user selects a new option.
 *
 * Usage:
 * <Dropdown
 *   dropdownValue={filterType}
 *   setDropdownValue={setFilterType}
 *   data={FILTER_BY_TYPE}
 * />
 */

const Dropdown: React.FC<DropdownProps> = ({ dropdownValue, setDropdownValue, data }) => {
  const { t } = useTranslation();

  const handleDropdownChange = (value: string) => {
    setDropdownValue(value);
  };
  return (
    <DropdownFormControl>
      <InputLabel id="bill-type-label">{t('billsPage.filterByBillType')}</InputLabel>
      <Select
        labelId="bill-type-label"
        value={dropdownValue}
        onChange={(e) => handleDropdownChange(e.target.value)}
      >
        {data.map((item, key) => (
          <MenuItem key={key} value={item.value}>
            {t(item.name as any)}
          </MenuItem>
        ))}
      </Select>
    </DropdownFormControl>
  );
};

export default Dropdown;
