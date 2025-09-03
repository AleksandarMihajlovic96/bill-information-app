import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import BillTable from '../components/BillTable';
import type { Bill } from '../interfaces/Bill';
import { useTranslation } from 'react-i18next';

const mockBills: Bill[] = [
  {
    billNo: 'B001',
    billType: 'Government',
    billStatus: 'In Progress',
    sponsor: 'Minister of Finance',
    titleEn: 'Finance Bill 2025',
    titleGa: 'Bille Airgeadais 2025',
  },
  {
    billNo: 'B002',
    billType: 'Private',
    billStatus: 'Passed',
    sponsor: 'John Doe TD',
    titleEn: 'Education Reform Bill',
    titleGa: 'Bille Athchóirithe Oideachais',
  },
  {
    billNo: 'B003',
    billType: 'Other',
    billStatus: 'Introduced',
    sponsor: 'Senator Jane Smith',
    titleEn: 'Environmental Protection Bill',
    titleGa: 'Bille um Chosaint Comhshaoil',
  },
];

const BillsPage: React.FC = () => {
  const [favourites, setFavourites] = useState<string[]>([]);
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
  const pageSize = 10;

  //   const { data: allBills = [] } = useBills();

  const handleToggleFavourite = (billNo: string) => {
    setFavourites((prev) =>
      prev.includes(billNo) ? prev.filter((id) => id !== billNo) : [...prev, billNo],
    );
    console.log(`Dispatching favourite toggle for Bill ${billNo}`);
  };

  const bills = mockBills.slice(page * pageSize, (page + 1) * pageSize);
  const favouritedBills = mockBills.filter((b) => favourites.includes(b.billNo));

  //   if (isLoading) {
  //     return (
  //       <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
  //         <CircularProgress />
  //       </Box>
  //     );
  //   }

  //   if (isError) {
  //     return <Box sx={{ p: 3 }}>Error fetching bills</Box>;
  //   }

  return (
    <Box sx={{ p: 3 }}>
      <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
        <Tab label={t('billsPage.allBills')} />
        <Tab label={t('billsPage.favourites')} />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {tab === 0 && (
          <BillTable
            bills={
              tab === 0 ? bills : favouritedBills.slice(page * pageSize, (page + 1) * pageSize)
            }
            favourites={favourites}
            onToggleFavourite={handleToggleFavourite}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            totalCount={tab === 0 ? mockBills.length : favouritedBills.length}
          />
        )}
        {tab === 1 && (
          <BillTable
            bills={favouritedBills}
            favourites={favourites}
            onToggleFavourite={handleToggleFavourite}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            totalCount={tab === 1 ? mockBills.length : favouritedBills.length}
          />
        )}
      </Box>
    </Box>
  );
};

export default BillsPage;
