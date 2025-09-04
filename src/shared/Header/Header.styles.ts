import styled from 'styled-components';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';

export const HeaderAppBar = styled(AppBar)`
  height: 55px;
  justify-content: center;
`;

export const HeaderToolbar = styled(Toolbar)`
  min-height: 40px !import;
  justify-content: space-between;
`;

export const HeaderProfileMenu = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const HeaderTitle = styled(Typography)`
  font-size: 18px !important;
  font-weight: bold;
  color: white;
`;
