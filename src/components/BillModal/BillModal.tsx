import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Tabs, Tab, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { BillModalProps } from './BillModal.types';

const BillModal: React.FC<BillModalProps> = ({ bill, onClose }) => {
  const [tab, setTab] = useState(0);
  const { t } = useTranslation();

  return (
    <Dialog open={true} onClose={onClose} fullWidth>
      <DialogTitle>{t('billsPage.billDetails')}</DialogTitle>
      <DialogContent>
        <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
          <Tab label={t('common.english')} />
          <Tab label={t('common.gaeilge')} />
        </Tabs>
        <Box sx={{ mt: 2 }}>
          {tab === 0 && <Typography>{bill.titleEn}</Typography>}
          {tab === 1 && <Typography>{bill.titleGa}</Typography>}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BillModal;
