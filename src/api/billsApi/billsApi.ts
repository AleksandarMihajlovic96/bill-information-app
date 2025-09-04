import axios from 'axios';
import type { BillsResponse, BillsResults } from './billsApi.types';
import { combineSponsors } from '../../utils/utils';
import type { Bill } from '../../components/BillTable/BillTable.types';

const LEGISLATION_URL = '/api/v1/legislation';

export const mapApiBillToBill = (billResult: BillsResults): Bill => ({
  billNo: billResult.bill.billNo || 'Unknown',
  billType: billResult.bill.billType || 'Unknown',
  billStatus: billResult.bill.status || 'Unknown',
  sponsor:
    billResult.bill.sponsors && billResult.bill.sponsors.length > 0
      ? combineSponsors(billResult.bill.sponsors)
      : 'Unknown',
  titleEn: billResult.bill.shortTitleEn || 'N/A',
  titleGa: billResult.bill.shortTitleGa || 'N/A',
});

export const getBills = async (): Promise<Bill[]> => {
  const response = await axios.get<BillsResponse>(LEGISLATION_URL);
  const data = response.data;

  return data.results.map((r: BillsResults) => mapApiBillToBill(r));
};
