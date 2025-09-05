import React, { useMemo, useState } from 'react';
import { Tabs, Tab, CircularProgress } from '@mui/material';
import BillTable from '../../components/BillTable/BillTable';
import { useTranslation } from 'react-i18next';
import { useBills } from '../../hooks/useBills';
import { BillsPageContainer, BillTableContainer, ErrorBox, LoadingBox } from './BillsPage.styles';

/**
 * BillsPage
 *
 * React functional component that serves as the main page for displaying bills.
 * - Fetches bills from the backend using the `useBills` hook.
 * - Manages local state for favourites, active tab, and current pagination page.
 * - Provides two tabs All Bills and Favourites
 * - Uses `BillTable` to render bills in a paginated and filterable table.
 * - Allows users to toggle favourite bills, which are stored in local state.
 *
 * Behaviour:
 * - When the "All Bills" tab is active, displays all fetched bills.
 * - When the "Favourites" tab is active, only displays bills marked as favourites.
 * - Resets pagination to the first page when switching between tabs.
 *
 * Usage:
 * <BillsPage />
 */
const BillsPage: React.FC = () => {
  const [favourites, setFavourites] = useState<string[]>([]);
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(0);
  const { t } = useTranslation();
  const pageSize = 5;

  const { data: allBills = [], isLoading, isError } = useBills();

  // Handle row click to dispatch API call to save/unsave favourite bill
  const handleToggleFavourite = (billNo: string) => {
    setFavourites((prev) =>
      prev.includes(billNo) ? prev.filter((id) => id !== billNo) : [...prev, billNo],
    );
    console.log(`Dispatching favourite toggle for Bill ${billNo}`);
  };

  const bills = allBills;
  const favouritedBills = useMemo(
    () => allBills.filter((b) => favourites.includes(b.billNo)),
    [allBills, favourites],
  );

  // Show Loading UI until bills are loaded
  if (isLoading) {
    return (
      <LoadingBox>
        <CircularProgress />
      </LoadingBox>
    );
  }

  // Show Error UI if bills are not loaded
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
            totalCount={allBills.length}
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
            totalCount={favouritedBills.length}
          />
        )}
      </BillTableContainer>
    </BillsPageContainer>
  );
};

export default BillsPage;
