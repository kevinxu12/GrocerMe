/**
 * @file Admin dashboard Home component
 * @author Kevin Xu
 */

import Stack from '@mui/material/Stack';
import SnackbarComponent from 'app/components/SnackbarComponent';
import React from 'react';
import { ItemRequestDashboard } from './ItemRequest';
import { SupplierRequestDashboard } from './SupplierRequest';

/**
 *
 * @returns {React.ReactElement} Admin Dashboard
 */
export const AdminDashboard = (): React.ReactElement => {
  return (
    <div>
      <Stack sx={{ width: '80%' }} spacing={5}>
        <SnackbarComponent component={SupplierRequestDashboard} />
        <SnackbarComponent component={ItemRequestDashboard} />
      </Stack>
    </div>
  );
};
