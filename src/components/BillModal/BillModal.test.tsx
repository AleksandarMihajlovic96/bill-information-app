import { render, screen, fireEvent } from '@testing-library/react';
import BillModal from './BillModal';
import type { BillModalProps } from './BillModal.types';
import '@testing-library/jest-dom';

// Mock i18n
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockBill: BillModalProps['bill'] = {
  billNo: '123',
  billType: 'Public',
  billStatus: 'Active',
  sponsor: 'Alice',
  titleEn: 'English Bill Title',
  titleGa: 'Gaeilge Bill Title',
};

describe('BillModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders dialog with correct title', () => {
    render(<BillModal bill={mockBill} onClose={mockOnClose} />);
    expect(screen.getByText('billsPage.billDetails')).toBeInTheDocument();
  });

  it('shows English title by default', () => {
    render(<BillModal bill={mockBill} onClose={mockOnClose} />);
    expect(screen.getByText('English Bill Title')).toBeInTheDocument();
  });

  it('switches to Gaeilge tab and shows Gaeilge title', () => {
    render(<BillModal bill={mockBill} onClose={mockOnClose} />);
    const gaeilgeTab = screen.getByRole('tab', { name: 'common.gaeilge' });
    fireEvent.click(gaeilgeTab);
    expect(screen.getByText('Gaeilge Bill Title')).toBeInTheDocument();
  });

  it('calls onClose when Escape is pressed', () => {
    render(<BillModal bill={mockBill} onClose={mockOnClose} />);
    const dialog = screen.getByRole('dialog');
    fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });
    expect(mockOnClose).toHaveBeenCalled();
  });
});
