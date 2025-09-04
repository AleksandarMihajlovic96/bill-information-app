export interface BillsResponse {
  results: BillsResults[];
}
export interface BillsResults {
  bill: BillData;
}

export interface BillData {
  billNo: string;
  billType: string;
  status: string;
  sponsors: Sponsors[];
  shortTitleEn: string;
  shortTitleGa: string;
}
export interface Sponsors {
  sponsor: Sponsor;
}

export interface Sponsor {
  as: {
    showAs: string;
  };
}
