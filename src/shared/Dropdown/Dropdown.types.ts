/* eslint-disable no-unused-vars */
export interface DropdownProps {
  dropdownValue: string;
  setDropdownValue: (value: string) => void;
  data: DropdownData[];
}

export interface DropdownData {
  value: string;
  name: string;
}
