/**
 * @file Component for Navbar shown for logged-in users
 * @author Kevin Xu
 */
import React, { ComponentType, memo, useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import styled from 'styled-components/macro';
import './custom.scss';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { logoutWithThunk } from 'store/auth/thunk';
import { GenericThunkDispatch } from 'types/actions';

interface PrivateNavDispatchType {
  onLogout: () => void;
}
interface PrivateNavPropsType extends PrivateNavDispatchType {}

/**
 * @param {object} props props passed
 * @param {Function} props.onLogout logout function
 * @returns {React.ElementType} Private Navbar Component
 */
const PrivateNav = (props: PrivateNavPropsType): React.ReactElement => {
  const [sidebar, setSidebar] = useState(false);
  /**
   * @returns {boolean} whether to show side bar or not
   */
  const showSidebar = () => setSidebar(!sidebar);
  const SidebarProps = {
    open: sidebar,
  };
  return (
    <Wrapper>
      <Icon>
        <FaIcons.FaBars onClick={showSidebar} />
      </Icon>
      <Sidebar {...SidebarProps}>
        <ProSidebar>
          <Menu>
            <MenuItem icon={<AiIcons.AiOutlineClose />} onClick={showSidebar} />
            <MenuItem icon={<AiIcons.AiFillHome />}>Home</MenuItem>
            <MenuItem
              icon={<AiIcons.AiOutlineLogout />}
              onClick={props.onLogout}
            >
              Logout
            </MenuItem>
          </Menu>
        </ProSidebar>
      </Sidebar>
    </Wrapper>
  );
};

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

const withConnect = connect(null, mapDispatchToProps);

export default compose<ComponentType>(withConnect, memo)(PrivateNav);

const Icon = styled.div`
  min-height: 5%;
  min-width: 5%;
`;

const Sidebar = styled.nav`
  display: none;
  ${({ open }: any) =>
    open &&
    `
    width: 20%;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0%;
    `}
`;

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
  width: 100%;
`;
