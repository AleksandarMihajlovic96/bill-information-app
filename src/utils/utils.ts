import type { Sponsors } from '../api/billsApi/billsApi.types';

export function combineSponsors(sponsors: Sponsors[]): string {
  return sponsors.map((item) => item.sponsor.as.showAs).join(',');
}
