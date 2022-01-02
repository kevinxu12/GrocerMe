import React, { ComponentType, memo, useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import styled from 'styled-components/macro';
import './custom.scss';
import { connect } from 'react-redux';
import { compose } from '@reduxjs/toolkit';
import { logout } from 'store/auth/actions';

interface PrivateNavPropsType {
  onLogout: () => void;
}

const PrivateNav = (props: PrivateNavPropsType) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const SidebarProps = {
    open: sidebar,
  };
  console.log(props);
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

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => {
      dispatch(logout());
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
