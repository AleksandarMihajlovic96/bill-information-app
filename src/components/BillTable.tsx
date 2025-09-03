/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import type { Bill, BillTableProps } from '../interfaces/Bill';
import BillModal from './BillModal';
import { useTranslation } from 'react-i18next';

const BillTable: React.FC<BillTableProps> = ({
  bills,
  favourites,
  onToggleFavourite,
  totalCount,
  pageSize,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [filterType, setFilterType] = useState<string>('');
  const { t } = useTranslation();

  // Filter bills by type
  const filteredBills = filterType ? bills.filter((bill) => bill.billType === filterType) : bills;

  // Slice for pagination
  const paginatedBills = filteredBills.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      {/* Filter Dropdown */}
      <FormControl sx={{ m: 2, minWidth: 200 }}>
        <InputLabel id="bill-type-label">{t('billsPage.filterByBillType')}</InputLabel>
        <Select
          labelId="bill-type-label"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <MenuItem value="">{t('common.all')}</MenuItem>
          <MenuItem value="Government">{t('billsPage.goverment')}</MenuItem>
          <MenuItem value="Private">{t('billsPage.private')}</MenuItem>
          <MenuItem value="Other">{t('common.other')}</MenuItem>
        </Select>
      </FormControl>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('billsPage.billsTableHeaders.billNo')}</TableCell>
              <TableCell>{t('billsPage.billsTableHeaders.type')}</TableCell>
              <TableCell>{t('billsPage.billsTableHeaders.status')}</TableCell>
              <TableCell>{t('billsPage.billsTableHeaders.sponsor')}</TableCell>
              <TableCell>{t('billsPage.billsTableHeaders.favourite')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBills.map((bill) => (
              <TableRow
                key={bill.billNo}
                hover
                onClick={() => setSelectedBill(bill)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{bill.billNo}</TableCell>
                <TableCell>{bill.billType}</TableCell>
                <TableCell>{bill.billStatus}</TableCell>
                <TableCell>{bill.sponsor}</TableCell>
                <TableCell
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log(`Dispatching favourite for Bill ${bill.billNo}`);
                    onToggleFavourite(bill.billNo);
                  }}
                >
                  <IconButton>
                    {favourites.includes(bill.billNo) ? <Star /> : <StarBorder />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[pageSize]}
        />
      </TableContainer>

      {selectedBill && <BillModal bill={selectedBill} onClose={() => setSelectedBill(null)} />}
    </>
  );
};

export default BillTable;
