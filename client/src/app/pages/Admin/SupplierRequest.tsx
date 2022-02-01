/**
 * @file SupplierRequests Dashboard
 * @author Kevin Xu
 */
import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SupplierRequest } from 'types/rest';
import Api from 'utils/api';
import { parseAxiosSuccessResponse } from 'utils/request';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { getErrorMessage } from 'utils/errors';

/**
 * Render a Component where you can manage SupplierRequests
 *
 * @param root0
 * @param root0.setMessage
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
    Api.post(
      '/acceptSupplierRequest',
      { email },
      setMessage,
      'Successfully accepted supplier request',
    );
  };

  /**
   * @param {string} email the email to reject supplier request for
   */
  const onRejectSupplierRequest = async (email: string) => {
    Api.post(
      '/rejectSupplierRequest',
      { email },
      setMessage,
      'successfully rejected supplier reqeust',
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
  return (
    <div>
      {' '}
      {supplierRequests.map(({ email }) => (
        <div>
          <div> {email}</div>
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
        </div>
      ))}{' '}
    </div>
  );
};
