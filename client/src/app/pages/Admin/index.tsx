/**
 * @file Admin dashboard Home component
 * @author Kevin Xu
 */

import SnackbarComponent from 'app/components/SnackbarComponent';
import React from 'react';
import { SupplierRequestDashboard } from './SupplierRequest';

/**
 *
 * @returns {React.ReactElement} Admin Dashboard
 */
export const AdminDashboard = (): React.ReactElement => {
  return <SnackbarComponent component={SupplierRequestDashboard} />;
};
