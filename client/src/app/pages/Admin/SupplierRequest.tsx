/**
 * @file SupplierRequests Dashboard
 * @author Kevin Xu
 */
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { RequestStatus, SupplierRequest } from 'types/rest';
import Api from 'utils/api';
import { parseAxiosSuccessResponse } from 'utils/request';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

/**
 * Render a Component where you can manage SupplierRequests
 *
 * @param {Object} root0 top level props
 * @param {Function} root0.setMessage set message for the snackbar that shows on api request / response
 * @returns {React.ReactElement} Supplier Request Component
 */
export const SupplierRequestDashboard = ({
  setMessage,
}): React.ReactElement => {
  const [supplierRequests, setSupplierRequests] = useState<SupplierRequest[]>(
    [],
  );
  /**
   * @param {string} email the email to accept supplier request for
   */
  const onAcceptSupplierRequest = async (email: string) => {
    await Api.post(
      '/acceptSupplierRequest',
      { email },
      setMessage,
      'Successfully accepted supplier request',
    );
    setSupplierRequests(
      supplierRequests.filter((a: SupplierRequest) => a.email !== email),
    );
  };

  /**
   * @param {string} email the email to reject supplier request for
   */
  const onRejectSupplierRequest = async (email: string) => {
    await Api.post(
      '/rejectSupplierRequest',
      { email },
      setMessage,
      'successfully rejected supplier reqeust',
    );
    setSupplierRequests(
      supplierRequests.filter((a: SupplierRequest) => a.email !== email),
    );
  };
  useEffect(() => {
    /**
     * Fetch all supplier requests
     */
    const fetchSupplierRequests = async () => {
      const response = await Api.get('/allSupplierRequests');
      const supplierRequests =
        parseAxiosSuccessResponse<SupplierRequest[]>(response);
      setSupplierRequests(supplierRequests || []);
    };
    fetchSupplierRequests();
  }, []);
  const awaitingSupplierRequests = supplierRequests.filter(
    (a: SupplierRequest) => a.status === RequestStatus.AWAITING,
  );
  const pastSupplierRequests = supplierRequests.filter(
    (a: SupplierRequest) => a.status !== RequestStatus.AWAITING,
  );
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Typography variant="h5" component="div" sx={{ mb: 3 }}>
            All Supplier Requests
          </Typography>
          <Stack spacing={1}>
            {awaitingSupplierRequests.map(({ email }, index) => (
              <Card key={index} sx={{ width: '50%' }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Request From
                  </Typography>
                  <Typography variant="body2">{email}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton
                    aria-label="check-circle"
                    color="success"
                    onClick={() => {
                      onAcceptSupplierRequest(email);
                    }}
                  >
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton
                    aria-label="check-circle"
                    color="error"
                    onClick={() => {
                      onRejectSupplierRequest(email);
                    }}
                  >
                    <CancelIcon />
                  </IconButton>
                </CardActions>
              </Card>
            ))}{' '}
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h5" component="div" sx={{ mb: 3 }}>
            Past Supplier Requests
          </Typography>
          <Stack spacing={1}>
            {pastSupplierRequests.map(({ email, status }, index: number) => (
              <Card key={index} sx={{ width: '50%' }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Request From
                  </Typography>
                  <Typography variant="body2">
                    {email} was met with status {status}
                  </Typography>
                </CardContent>
              </Card>
            ))}{' '}
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};
