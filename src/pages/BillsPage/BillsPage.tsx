import React, { useState } from 'react';
import { Tabs, Tab, CircularProgress } from '@mui/material';
import BillTable from '../../components/BillTable/BillTable';
import { useTranslation } from 'react-i18next';
import { useBills } from '../../hooks/useBills';
import { BillsPageContainer, BillTableContainer, ErrorBox, LoadingBox } from './BillsPage.styles';

const BillsPage: React.FC = () => {
  const [favourites, setFavourites] = useState<string[]>([]);
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
  const pageSize = 5;

  const { data: allBills = [], isLoading, isError } = useBills();

  const handleToggleFavourite = (billNo: string) => {
    setFavourites((prev) =>
      prev.includes(billNo) ? prev.filter((id) => id !== billNo) : [...prev, billNo],
    );
    console.log(`Dispatching favourite toggle for Bill ${billNo}`);
  };

  const bills = allBills;
  const favouritedBills = allBills.filter((b) => favourites.includes(b.billNo));

  if (isLoading) {
    return (
      <LoadingBox>
        <CircularProgress />
      </LoadingBox>
    );
  }

  if (isError) {
    return <ErrorBox>{t('billsPage.errorFetchingBills')}</ErrorBox>;
  }

  return (
    <BillsPageContainer>
      <Tabs
        value={tab}
        onChange={(_, newValue) => {
          setTab(newValue);
          setPage(0);
        }}
      >
        <Tab label={t('billsPage.allBills')} />
        <Tab label={t('billsPage.favourites')} />
      </Tabs>

      <BillTableContainer>
        {tab === 0 && (
          <BillTable
            bills={bills}
            favourites={favourites}
            onToggleFavourite={handleToggleFavourite}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            totalCount={tab === 0 ? allBills.length : favouritedBills.length}
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
            totalCount={tab === 1 ? allBills.length : favouritedBills.length}
          />
        )}
      </BillTableContainer>
    </BillsPageContainer>
  );
};

export default BillsPage;
