/**
 * @file Component for Navbar shown for logged-in users
 * @author Kevin Xu
 */
import React, { ComponentType, memo, useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import * as AiIcons from 'react-icons/ai';
import styled from 'styled-components/macro';
import './custom.scss';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { logoutWithThunk } from 'store/auth/thunk';
import { GenericThunkDispatch } from 'types/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectRoles } from 'store/auth/selectors';
import { Role, RoleCode } from 'types/rest';
import { isRoleCodeIncluded } from 'utils/auth';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { StyledConstants } from 'styles/StyleConstants';

interface PrivateNavDispatchType {
  onLogout: () => void;
}
interface PrivateNavPropsType extends PrivateNavDispatchType {
  roles: Role[];
}

/**
 * @param {object} props props passed
 * @param {Function} props.onLogout logout function
 * @returns {React.ElementType} Private Navbar Component
 */
const PrivateNav = (props: PrivateNavPropsType): React.ReactElement => {
  const [isSupplier, setIsSupplier] = useState(false);

  useDeepCompareEffect(() => {
    setIsSupplier(
      props.roles ? isRoleCodeIncluded(RoleCode.SUPPLIER, props.roles) : false,
    );
  }, [props.roles]);

  console.log('rendering the sidebar');
  return (
    <Sidebar>
      <ProSidebar>
        <Menu>
          <MenuItem icon={<AiIcons.AiFillHome />}>Home</MenuItem>
          {isSupplier && (
            <MenuItem icon={<AiIcons.AiFillDashboard />}>
              {' '}
              Supplier Home{' '}
            </MenuItem>
          )}
          <MenuItem
            icon={<AiIcons.AiOutlineLogout />}
            onClick={async () => {
              await props.onLogout();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </ProSidebar>
    </Sidebar>
  );
};

const mapStateToProps = createStructuredSelector({
  roles: makeSelectRoles(),
});

/**
 * Maps dispatch functions to component props
 *
 * @param {GenericThunkDispatch} dispatch the dispatch object from redux
 * @returns {PrivateNavDispatchType} Object passed to props containing redux dispatch functions
 */
function mapDispatchToProps(
  dispatch: GenericThunkDispatch,
): PrivateNavDispatchType {
  return {
    /**
     * Dispatches a logout action
     */
    onLogout: () => {
      dispatch(logoutWithThunk());
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose<ComponentType>(withConnect, memo)(PrivateNav);

const Sidebar = styled.nav`
  width: ${StyledConstants.SIDE_BAR_WIDTH};
  height: 100%;
  display: flex;
  justify-content: center;
  overscroll: hidden;
  position: fixed;
  top: 0;
  left: 0%;
`;
