/**
 * @file Navbar Home Component
 * @author Kevin Xu
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { StyledConstants } from 'styles/StyleConstants';
import { Logo } from './Logo';
import { PublicNav } from './PublicNav';
import { PageWrapper } from '../PageWrapper';
import { useSelector } from 'react-redux';
import { RootState } from 'types';
import PrivateNav from './PrivateNav';

/**
 * @returns {React.ReactElement} Returns navbar component
 */
export function NavBar(): React.ReactElement {
  const isAuthenticated = useSelector((state: RootState) =>
    state ? state.auth.username : true,
  );
  return (
    <Wrapper>
      {!isAuthenticated ? (
        <>
          <Logo />
          <PublicNav />
        </>
      ) : (
        <PrivateNav />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.header`
  height: ${StyledConstants.NAV_BAR_HEIGHT};
  display: flex;
  background-color: 'rgba(250, 250, 250, 1)'
  position: fixed;
  top: 0;
  margin-left: 1%;
  width: 100%;
  z-index: 2;
  ${PageWrapper} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
