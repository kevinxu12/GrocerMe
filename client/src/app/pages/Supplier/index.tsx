/**
 * @file Supplier Route is a top-level component for the pages that show on the /supplier tab
 * @author Kevin Xu
 */
import { compose } from '@reduxjs/toolkit';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectRoles } from 'store/auth/selectors';
import { Role } from 'types/rest';
import { Route } from './Route';

export interface SupplierHomePropTypes {
  roles: Role[];
}
/**
 * Supplier Route.
 *
 * @param {Role[]} roles the roles of the logged in user
 * @returns {React.ReactElement} a Router to the correct component depending no role
 */
const Supplier = ({ roles }: SupplierHomePropTypes): React.ReactElement => {
  return <Route roles={roles} />;
};

const mapStateToProps = createStructuredSelector({
  roles: makeSelectRoles(),
});

const withConnect = connect(mapStateToProps, null);
export default compose(withConnect, memo)(Supplier);
