import { useQuery } from '@tanstack/react-query';
import { getBills } from '../api/billsApi/billsApi';
import type { Bill } from '../components/BillTable/BillTable.types';

export const useBills = () => {
  return useQuery<Bill[]>({
    queryKey: ['bills'],
    queryFn: getBills,
  });
};
