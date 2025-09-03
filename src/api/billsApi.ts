import axios from 'axios';
import type { Bill } from '../interfaces/Bill';

const API_URL = '/api/v1/bills';

const mapApiBillToBill = (apiBill: any): Bill => ({
  billNo: apiBill.billNo,
  billType: apiBill.billType?.name || 'Unknown',
  billStatus: apiBill.billStatus?.status || 'Unknown',
  sponsor: apiBill.sponsors?.[0]?.by?.showAs || 'Unknown',
  titleEn: apiBill.title?.en || 'N/A',
  titleGa: apiBill.title?.ga || 'N/A',
});

export const getBills = async (): Promise<Bill[]> => {
  const response = await axios.get(API_URL);
  const results = response.data.results || [];
  return results.map((r: any) => mapApiBillToBill(r.bill));
};
