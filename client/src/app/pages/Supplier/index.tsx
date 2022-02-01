/**
 * @file Supplier Route is a top-level component that routes to the correct component depending
 * on whether a user is a supplier or not
 * If a user is a supplier, route to a "Supplier Dashboard" Component
 * Else, route to a "Not Supplier" Component
 * @author Kevin Xu
 */
import { compose } from '@reduxjs/toolkit';
import SnackbarComponent from 'app/components/SnackbarComponent';
import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectRoles } from 'store/auth/selectors';
import { Role, RoleCode } from 'types/rest';
import { isRoleCodeIncluded } from 'utils/auth';
import { NotSupplier } from './NotSupplier';

export interface SupplierHomePropTypes {
  roles: Role[];
}
/**
 * Supplier Route.
 *
 * @param {Role[]} roles the roles of the logged in user
 * @returns {React.ReactElement} a Router to the correct component depending no role
 */
const SupplierRoute = ({
  roles,
}: SupplierHomePropTypes): React.ReactElement => {
  const [isSupplier] = useState(isRoleCodeIncluded(RoleCode.SUPPLIER, roles));
  return (
    <div>
      {isSupplier ? (
        <div> Hello Supplier </div>
      ) : (
        <SnackbarComponent component={NotSupplier} />
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  roles: makeSelectRoles(),
});

const withConnect = connect(mapStateToProps, null);
export default compose(withConnect, memo)(SupplierRoute);
