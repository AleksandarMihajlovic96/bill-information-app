import axios from 'axios';
import type { BillsResponse, BillsResults } from './billsApi.types';
import type { Bill } from '../../components/BillTable/BillTable.types';
import { getBills, mapApiBillToBill } from './billsApi';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Helper sponsors
const sponsors = [{ sponsor: { as: { showAs: 'Alice' } } }, { sponsor: { as: { showAs: 'Bob' } } }];

describe('mapApiBillToBill', () => {
  it('maps bill data correctly', () => {
    const input: BillsResults = {
      bill: {
        billNo: '123',
        billType: 'Public',
        status: 'Active',
        shortTitleEn: 'English Title',
        shortTitleGa: 'Gaelic Title',
        sponsors,
      },
    };

    const result = mapApiBillToBill(input);

    expect(result).toEqual<Bill>({
      billNo: '123',
      billType: 'Public',
      billStatus: 'Active',
      sponsor: 'Alice,Bob',
      titleEn: 'English Title',
      titleGa: 'Gaelic Title',
    });
  });

  it('handles missing optional fields gracefully', () => {
    const input: BillsResults = {
      bill: {
        billNo: '',
        billType: '',
        status: '',
        shortTitleEn: '',
        shortTitleGa: '',
        sponsors: [],
      },
    };

    const result = mapApiBillToBill(input);

    expect(result).toEqual<Bill>({
      billNo: 'Unknown',
      billType: 'Unknown',
      billStatus: 'Unknown',
      sponsor: 'Unknown',
      titleEn: 'N/A',
      titleGa: 'N/A',
    });
  });
});

describe('getBills', () => {
  it('fetches and maps bills correctly', async () => {
    const mockResponse: BillsResponse = {
      results: [
        {
          bill: {
            billNo: '456',
            billType: 'Private',
            status: 'Passed',
            shortTitleEn: 'Another Bill',
            shortTitleGa: 'Bill Éile',
            sponsors,
          },
        },
      ],
    };

    mockedAxios.get.mockResolvedValue({ data: mockResponse });

    const bills = await getBills();

    expect(axios.get).toHaveBeenCalledWith('/api/v1/legislation');
    expect(bills).toEqual([
      {
        billNo: '456',
        billType: 'Private',
        billStatus: 'Passed',
        sponsor: 'Alice,Bob',
        titleEn: 'Another Bill',
        titleGa: 'Bill Éile',
      },
    ]);
  });
});
