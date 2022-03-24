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
import Api from 'utils/api';
import { isRoleCodeIncluded } from 'utils/auth';
import { Home } from './Existing/Home';
import { SupplierRequestComponent } from './Prospective/SupplierRequest';
import SnackbarComponent from 'app/components/SnackbarComponent';
import { Role } from 'types/rest';

/**
 *
 * @param {Object} root0 Props
 * @param {Role[]} root0.roles roles
 * @returns {React.ReactElement} See above
 */
export const Route = ({ roles }): React.ReactElement => {
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
  const isSupplier =
    requestState === RequestStatus.ACCEPTED ||
    isRoleCodeIncluded(RoleCode.SUPPLIER, roles);
  const isAwaiting = requestState === RequestStatus.AWAITING;
  return (
    <div>
      {isSupplier ? (
        <Home />
      ) : requestState == null ? (
        <SnackbarComponent component={SupplierRequestComponent} />
      ) : isAwaiting ? (
        <div> Already submitted Request. Please wait for a response </div>
      ) : (
        /* if not awaiting, assume the request is rejected */
        <div>You've already been Rejected. For now, you cannot apply again</div>
      )}
    </div>
  );
};
