import type { Bill } from '../BillTable/BillTable.types';

export interface BillModalProps {
  bill: Bill;
  onClose: () => void;
}
