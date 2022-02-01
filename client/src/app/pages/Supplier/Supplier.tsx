/**
 * @file Supplier Router Component
 * There are categories of consumers who are suppliers
 * There are two categories of consumers who are not suppliers.
 * - users who have requested to be suppliers, but are not suppliers. This could happen because
 *  - these users may have made a request but the request has been rejected
 *  - these users may have made a request but are awaiting a response from admins
 * - users who did not submit any requests
 * @author Kevin Xu
 */
import React, { useEffect, useState } from 'react';
import { parseAxiosSuccessResponse } from 'utils/request';
import { RequestStatus, RoleCode, SupplierRequest } from 'types/rest';
import Button from '@mui/material/Button';
import { getErrorMessage } from 'utils/errors';
import Api from 'utils/api';
import { isRoleCodeIncluded } from 'utils/auth';

/**
 *
 * @param {Object} root0 Props
 * @param {(string) => void} root0.setMessage sets the message for the API response snackbar
 * @param {Role[]} root0.roles roles
 * @returns {React.ReactElement} See above
 */
export const Supplier = ({ setMessage, roles }): React.ReactElement => {
  const [requestState, setRequestState] = useState<RequestStatus | null>(null);
  /**
   * When the user clicks to make a new request, we fire an API call to make that request. We set the snackbar model
   * to the corresponding message
   */
  const onClick = async () => {
    try {
      await Api.post('/newSupplierRequest');
      setMessage('Successfully posted a new request');
    } catch (error) {
      setMessage(getErrorMessage(error));
    }
  };
  useEffect(() => {
    /**
     * fetch whether or not a user has requested to be a supplier.
     * If a user has requested to be a supplier, store the state of the request in requestState
     */
    const getMaybeSupplierRequest = async () => {
      const maybeSupplierRequest = await Api.get('/supplierRequestForUser');
      const supplyRequest: SupplierRequest | null =
        parseAxiosSuccessResponse<SupplierRequest>(maybeSupplierRequest);
      if (supplyRequest && 'status' in supplyRequest) {
        const status = supplyRequest.status;
        setRequestState(status as RequestStatus);
      }
    };
    getMaybeSupplierRequest();
  }, []);
  const isSupplier =
    requestState === RequestStatus.ACCEPTED ||
    isRoleCodeIncluded(RoleCode.SUPPLIER, roles);
  const isAwaiting = requestState === RequestStatus.AWAITING;
  return (
    <div>
      {isSupplier ? (
        <div> Welcome Supplier </div>
      ) : requestState == null ? (
        <div>
          <Button variant="contained" onClick={onClick}>
            Click Here to Become a Supplier
          </Button>
        </div>
      ) : isAwaiting ? (
        <div> Already submitted Request. Please wait for a response </div>
      ) : (
        /* if not awaiting, assume the request is rejected */
        <div>You've already been Rejected. For now, you cannot apply again</div>
      )}
    </div>
  );
};
