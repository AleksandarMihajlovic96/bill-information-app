// Dropdown.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dropdown from './Dropdown';

// Mock i18n translation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // return the key itself
  }),
}));

describe('Dropdown component', () => {
  const mockSetDropdownValue = jest.fn();

  const mockData = [
    { value: 'all', name: 'common.all' },
    { value: 'other', name: 'common.other' },
  ];

  beforeEach(() => {
    mockSetDropdownValue.mockClear();
  });

  it('renders the label and items', () => {
    render(
      <Dropdown dropdownValue="all" setDropdownValue={mockSetDropdownValue} data={mockData} />,
    );

    // Label should be rendered
    expect(screen.getByText('billsPage.filterByBillType')).toBeInTheDocument();

    // Current value should be selected
    expect(screen.getByText('common.all')).toBeInTheDocument();
  });

  it('calls setDropdownValue when a new item is selected', () => {
    render(
      <Dropdown dropdownValue="all" setDropdownValue={mockSetDropdownValue} data={mockData} />,
    );

    // Open dropdown
    fireEvent.mouseDown(screen.getByRole('combobox'));

    // Click on "other"
    fireEvent.click(screen.getByText('common.other'));

    // Should call setDropdownValue with "other"
    expect(mockSetDropdownValue).toHaveBeenCalledWith('other');
  });
});
