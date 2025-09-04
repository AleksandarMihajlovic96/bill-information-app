import { InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { DropdownProps } from './Dropdown.types';
import { DropdownFormControl } from './Dropdown.styles';

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
