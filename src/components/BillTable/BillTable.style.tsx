import { TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import styled from 'styled-components';
import { Star } from '@mui/icons-material';

export const BillTableCell = styled(TableCell)`
  color: #f97316 !important;
`;

export const BillTableContainer = styled(TableContainer)`
  border-radius: 10px;
`;

export const BillTableRow = styled(TableRow)`
  &:hover {
    background-color: #1e3a8a !important;
    cursor: pointer;
  }
`;

export const BillTableHead = styled(TableHead)`
  background-color: #1e3a8a !important;
`;

export const ActiveStar = styled(Star)`
  color: #fad02c;
`;
