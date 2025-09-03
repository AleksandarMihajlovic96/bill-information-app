/* eslint-disable no-unused-vars */
export interface Bill {
  billNo: string;
  billType: string;
  billStatus: string;
  sponsor: string;
  titleEn: string;
  titleGa: string;
}

export interface BillTableProps {
  bills: Bill[];
  favourites: string[];
  onToggleFavourite: (billNo: string) => void;
  page: number;
  setPage: (page: number) => void;
  totalCount: number;
  pageSize: number;
}
