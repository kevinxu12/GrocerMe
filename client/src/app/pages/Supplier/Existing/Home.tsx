/**
 * @file Home Page for All Suppliers
 * @author Kevin Xu
 */
import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import SnackbarComponent from 'app/components/SnackbarComponent';
import React from 'react';
import { All as AllItemRequests } from './ItemRequests/All';
import NewItemRequest from './ItemRequests/New';
import { All as AllMatchRequests } from './MatchRequests';

/**
 *
 * @returns {React.ReactElement} Home page for suppliers
 */
export const Home = (): React.ReactElement => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Stack spacing={5}>
            <SnackbarComponent component={NewItemRequest} />
            <AllItemRequests />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <SnackbarComponent component={AllMatchRequests} />
        </Grid>
      </Grid>
    </div>
  );
};
