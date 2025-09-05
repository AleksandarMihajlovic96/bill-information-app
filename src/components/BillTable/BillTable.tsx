import React, { useMemo, useState } from 'react';
import { Table, TableBody, TableRow, Paper, IconButton, TablePagination } from '@mui/material';
import { StarBorder } from '@mui/icons-material';
import BillModal from '../BillModal/BillModal';
import { useTranslation } from 'react-i18next';
import Dropdown from '../../shared/Dropdown/Dropdown';
import { FILTER_BY_TYPE } from '../../utils/constants';
import type { Bill, BillTableProps } from './BillTable.types';
import {
  ActiveStar,
  BillTableCell,
  BillTableContainer,
  BillTableHead,
  BillTableRow,
} from './BillTable.style';

/**
 * BillTable
 *
 * React functional component that renders a paginated and filterable table of bills.
 * - Displays bills with columns for bill number, type, status, sponsor, and favourite toggle.
 * - Provides a dropdown to filter bills by type.
 * - Implements pagination using MUI's TablePagination component.
 * - Allows users to mark/unmark bills as favourites via a star icon.
 * - Opens a `BillModal` dialog with detailed bill information when a row is clicked.
 *
 * Usage:
 * <BillTable
 *   bills={bills}
 *   favourites={favourites}
 *   onToggleFavourite={handleToggleFavourite}
 *   totalCount={totalCount}
 *   pageSize={10}
 *   page={page}
 *   setPage={setPage}
 * />
 */

const BillTable: React.FC<BillTableProps> = ({
  bills,
  favourites,
  onToggleFavourite,
  totalCount,
  pageSize,
  page,
  setPage,
}) => {
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [filterType, setFilterType] = useState<string>('');
  const { t } = useTranslation();

  // Filter bills by type
  const filteredBills = useMemo(
    () => (filterType ? bills.filter((bill) => bill.billType === filterType) : bills),
    [bills, filterType],
  );

  // Slice for pagination
  const paginatedBills = useMemo(
    () => filteredBills.slice(page * pageSize, page * pageSize + pageSize),
    [filteredBills, page, pageSize],
  );

  // Handle row click to callback dispatch API call to save/unsave favourite bill (onToggleFavourite)
  const handleTableCellClick = (
    e: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
    bill: Bill,
  ) => {
    e.stopPropagation();
    console.log(`API request dispatched: toggling favourite for Bill ${bill.billNo}`);
    onToggleFavourite(bill.billNo);
  };

  return (
    <>
      <Dropdown dropdownValue={filterType} setDropdownValue={setFilterType} data={FILTER_BY_TYPE} />

      <BillTableContainer>
        <Paper>
          <Table>
            <BillTableHead>
              <TableRow>
                <BillTableCell>{t('billsPage.billsTableHeaders.billNo')}</BillTableCell>
                <BillTableCell>{t('billsPage.billsTableHeaders.type')}</BillTableCell>
                <BillTableCell>{t('billsPage.billsTableHeaders.status')}</BillTableCell>
                <BillTableCell>{t('billsPage.billsTableHeaders.sponsor')}</BillTableCell>
                <BillTableCell>{t('billsPage.billsTableHeaders.favourite')}</BillTableCell>
              </TableRow>
            </BillTableHead>
            <TableBody>
              {paginatedBills.length > 0 ? (
                paginatedBills.map((bill) => (
                  <BillTableRow key={bill.billNo} hover onClick={() => setSelectedBill(bill)}>
                    <BillTableCell>{bill.billNo}</BillTableCell>
                    <BillTableCell>{bill.billType}</BillTableCell>
                    <BillTableCell>{bill.billStatus}</BillTableCell>
                    <BillTableCell>{bill.sponsor}</BillTableCell>
                    <BillTableCell
                      onClick={(e) => {
                        handleTableCellClick(e, bill);
                      }}
                    >
                      <IconButton>
                        {favourites.includes(bill.billNo) ? <ActiveStar /> : <StarBorder />}
                      </IconButton>
                    </BillTableCell>
                  </BillTableRow>
                ))
              ) : (
                <TableRow>
                  <BillTableCell colSpan={5} align="center">
                    {t(
                      filteredBills.length === 0 && filterType !== ''
                        ? 'billsPage.chooseDifferentFilter'
                        : 'billsPage.noBillsAvailable',
                    )}
                  </BillTableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
        <TablePagination
          component="div"
          count={filterType !== '' ? filteredBills.length : totalCount}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[pageSize]}
        />
      </BillTableContainer>

      {selectedBill && <BillModal bill={selectedBill} onClose={() => setSelectedBill(null)} />}
    </>
  );
};

export default BillTable;
