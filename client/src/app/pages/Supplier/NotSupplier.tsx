/**
 * @file Supplier Component for consumers who are not suppliers.
 * There are two categories of consumers who are not suppliers.
 * - users who have requested to be suppliers, but are not suppliers. This could happen because
 *  - these users may have made a request but the request has been rejected
 *  - these users may have made a request but are awaiting a response from admins
 * - users who did not submit any requests
 * @author Kevin Xu
 */
import React, { useEffect, useState } from 'react';
import { Api, parseAxiosSuccessResponse } from 'utils/request';
import { RequestStatus, SupplierRequest } from 'types/rest';
import Button from '@mui/material/Button';

/**
 *
 * @returns {React.ReactElement} See above
 */
export const NotSupplier = (): React.ReactElement => {
  const [requestState, setRequestState] = useState<RequestStatus | null>(null);
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
  const isAwaiting = requestState === RequestStatus.AWAITING;
  return (
    <div>
      {requestState == null ? (
        <Button
          variant="contained"
          onClick={async () => {
            await Api.post('/newSupplierRequest');
          }}
        >
          Click Here to Become a Supplier
        </Button>
      ) : isAwaiting ? (
        <div> Already submitted Request. Please wait for a response. </div>
      ) : (
        /* if not awaiting, assume the request is rejected */
        <div>You've already been Rejected. For now, you cannot apply again</div>
      )}
    </div>
  );
};
