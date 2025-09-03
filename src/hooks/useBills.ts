import { useQuery } from '@tanstack/react-query';
import { getBills } from '../api/billsApi';
import type { Bill } from '../interfaces/Bill';

export const useBills = () => {
  return useQuery<Bill[]>({
    queryKey: ['bills'],
    queryFn: getBills,
  });
};
