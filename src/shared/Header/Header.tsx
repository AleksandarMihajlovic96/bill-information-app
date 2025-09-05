import React, { useState } from 'react';
import { IconButton, Avatar, Menu, MenuItem, Typography, Switch } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { HeaderAppBar, HeaderProfileMenu, HeaderTitle, HeaderToolbar } from './Header.styles';

/**
 * Header
 *
 * React functional component that renders the application header bar.
 * - Displays the application title in the top-left.
 * - Shows a user avatar button in the top-right corner.
 * - Opens a dropdown menu when the avatar is clicked.
 * - Provides a language toggle (English ↔ Gaeilge) inside the dropdown menu.
 *
 * Usage:
 * <Header />
 */

const Header: React.FC = () => {
  const { i18n, t } = useTranslation();
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
    <HeaderAppBar>
      <HeaderToolbar>
        <HeaderTitle>{t('billsPage.billInformation').toUpperCase()}</HeaderTitle>
        <IconButton onClick={handleMenuOpen}>
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
            <HeaderProfileMenu>
              <Typography>{i18n.language === 'en' ? 'English' : 'Gaeilge'}</Typography>
              <Switch checked={i18n.language === 'ga'} onChange={toggleLanguage} color="primary" />
            </HeaderProfileMenu>
          </MenuItem>
        </Menu>
      </HeaderToolbar>
    </HeaderAppBar>
  );
};

export default Header;
