import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Switch,
  Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ga' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <AppBar position="static" sx={{ height: '40px', justifyContent: 'center' }}>
      <Toolbar sx={{ minHeight: '40px !important', justifyContent: 'flex-end' }}>
        <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
          <Avatar alt="User Avatar" />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem>
            <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
              <Typography>{i18n.language === 'en' ? 'English' : 'Gaeilge'}</Typography>
              <Switch checked={i18n.language === 'ga'} onChange={toggleLanguage} color="primary" />
            </Box>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
