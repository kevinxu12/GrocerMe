/**
 * @file Home Page for All Suppliers
 * @author Kevin Xu
 */
import Stack from '@mui/material/Stack';
import SnackbarComponent from 'app/components/SnackbarComponent';
import React from 'react';
import { All as AllItemRequests } from './ItemRequests/All';
import NewItemRequest from './ItemRequests/New';

/**
 *
 * @returns {React.ReactElement} Home page for suppliers
 */
export const Home = (): React.ReactElement => {
  return (
    <div>
      <Stack spacing={5}>
        <SnackbarComponent component={NewItemRequest} />
        <AllItemRequests />
      </Stack>
    </div>
  );
};
