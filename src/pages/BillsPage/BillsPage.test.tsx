import { render, screen, fireEvent } from '@testing-library/react';
import BillsPage from './BillsPage';
import '@testing-library/jest-dom';
import { useBills } from '../../hooks/useBills';

// Mock i18n
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('../../components/BillTable/BillTable', () => ({
  __esModule: true,
  default: ({ bills, favourites }: any) => (
    <div data-testid="bill-table">
      BillTable rendered with {bills.length} bills. Favourites: {favourites.join(',')}
    </div>
  ),
}));

jest.mock('../../hooks/useBills', () => ({
  useBills: jest.fn(),
}));

const mockBills = [
  { billNo: '1', billType: 'Public', billStatus: 'Enacted', sponsor: 'Test1' },
  { billNo: '2', billType: 'Private', billStatus: 'Enacted', sponsor: 'Test2' },
];

describe('BillsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useBills as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
    });

    render(<BillsPage />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useBills as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
    });

    render(<BillsPage />);
    expect(screen.getByText('billsPage.errorFetchingBills')).toBeInTheDocument();
  });

  it('renders BillTable with all bills on first tab', () => {
    (useBills as jest.Mock).mockReturnValue({
      data: mockBills,
      isLoading: false,
      isError: false,
    });

    render(<BillsPage />);

    expect(screen.getByTestId('bill-table')).toHaveTextContent('BillTable rendered with 2 bills');
  });

  it('switches to favourites tab', () => {
    (useBills as jest.Mock).mockReturnValue({
      data: mockBills,
      isLoading: false,
      isError: false,
    });

    render(<BillsPage />);

    fireEvent.click(screen.getByText('billsPage.favourites'));

    expect(screen.getByTestId('bill-table')).toHaveTextContent('BillTable rendered with 0 bills');
  });

  it('toggles favourites correctly', () => {
    (useBills as jest.Mock).mockReturnValue({
      data: mockBills,
      isLoading: false,
      isError: false,
    });

    render(<BillsPage />);

    expect(screen.getByTestId('bill-table')).toHaveTextContent('Favourites:');

    fireEvent.click(screen.getByText('billsPage.favourites'));
    expect(screen.getByTestId('bill-table')).toHaveTextContent('BillTable rendered with 0 bills');

    fireEvent.click(screen.getByText('billsPage.allBills'));
    expect(screen.getByTestId('bill-table')).toHaveTextContent('BillTable rendered with 2 bills');
  });
});
