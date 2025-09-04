import { render, screen, fireEvent } from '@testing-library/react';
import BillTable from './BillTable';
import type { Bill } from './BillTable.types';
import '@testing-library/jest-dom';

// Mock i18n
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock BillModal to avoid rendering complexity
jest.mock('../BillModal/BillModal', () => ({
  __esModule: true,
  default: ({ bill, onClose }: any) => (
    <div data-testid="bill-modal">
      Bill Modal Opened for {bill.billNo}
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

const mockBills: Bill[] = [
  {
    billNo: '123',
    billType: 'Public',
    billStatus: 'Active',
    sponsor: 'Test1',
    titleEn: 'Title EN',
    titleGa: 'Title GA',
  },
  {
    billNo: '456',
    billType: 'Private',
    billStatus: 'Pending',
    sponsor: 'Test2',
    titleEn: 'Another Title EN',
    titleGa: 'Another Title GA',
  },
];

describe('BillTable', () => {
  const mockOnToggleFavourite = jest.fn();
  const mockSetPage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders headers correctly', () => {
    render(
      <BillTable
        bills={mockBills}
        favourites={[]}
        onToggleFavourite={mockOnToggleFavourite}
        totalCount={2}
        pageSize={5}
        page={0}
        setPage={mockSetPage}
      />,
    );

    expect(screen.getByText('billsPage.billsTableHeaders.billNo')).toBeInTheDocument();
    expect(screen.getByText('billsPage.billsTableHeaders.status')).toBeInTheDocument();
  });

  it('renders bills data rows', () => {
    render(
      <BillTable
        bills={mockBills}
        favourites={[]}
        onToggleFavourite={mockOnToggleFavourite}
        totalCount={2}
        pageSize={5}
        page={0}
        setPage={mockSetPage}
      />,
    );

    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByText('456')).toBeInTheDocument();
    expect(screen.getByText('Test1')).toBeInTheDocument();
    expect(screen.getByText('Test2')).toBeInTheDocument();
  });

  it('calls onToggleFavourite when star clicked', () => {
    render(
      <BillTable
        bills={mockBills}
        favourites={[]}
        onToggleFavourite={mockOnToggleFavourite}
        totalCount={2}
        pageSize={5}
        page={0}
        setPage={mockSetPage}
      />,
    );

    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(mockOnToggleFavourite).toHaveBeenCalledWith('123');
  });

  it('renders active star when bill is in favourites', () => {
    render(
      <BillTable
        bills={mockBills}
        favourites={['123']}
        onToggleFavourite={mockOnToggleFavourite}
        totalCount={2}
        pageSize={5}
        page={0}
        setPage={mockSetPage}
      />,
    );

    expect(screen.getByTestId('StarIcon')).toBeInTheDocument();
  });

  it('calls setPage when pagination is changed', () => {
    render(
      <BillTable
        bills={mockBills}
        favourites={[]}
        onToggleFavourite={mockOnToggleFavourite}
        totalCount={10}
        pageSize={5}
        page={0}
        setPage={mockSetPage}
      />,
    );

    const nextPageBtn = screen.getByLabelText('Go to next page');
    fireEvent.click(nextPageBtn);

    expect(mockSetPage).toHaveBeenCalledWith(1);
  });

  it('renders BillModal when a row is clicked', () => {
    render(
      <BillTable
        bills={mockBills}
        favourites={[]}
        onToggleFavourite={mockOnToggleFavourite}
        totalCount={1}
        pageSize={5}
        page={0}
        setPage={mockSetPage}
      />,
    );

    // Click on the bill row by billNo
    fireEvent.click(screen.getByText('123'));

    expect(screen.getByTestId('bill-modal')).toBeInTheDocument();
  });

  it('closes BillModal when onClose is triggered', () => {
    render(
      <BillTable
        bills={mockBills}
        favourites={[]}
        onToggleFavourite={mockOnToggleFavourite}
        totalCount={1}
        pageSize={5}
        page={0}
        setPage={mockSetPage}
      />,
    );

    // Open modal
    fireEvent.click(screen.getByText('123'));
    expect(screen.getByTestId('bill-modal')).toBeInTheDocument();

    // Close modal via button in mocked BillModal
    fireEvent.click(screen.getByText('Close'));

    expect(screen.queryByTestId('bill-modal')).not.toBeInTheDocument();
  });
});
