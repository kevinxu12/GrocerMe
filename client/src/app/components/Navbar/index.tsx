/**
 *
 * Navbar
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { StyledConstants } from 'styles/StyleConstants';
import { Logo } from './Logo';
import { Nav } from './Nav';
import { PageWrapper } from '../PageWrapper';

export function NavBar() {
  return (
    <Wrapper>
      <Logo />
      <Nav />
    </Wrapper>
  );
}

const Wrapper = styled.header`
  height: ${StyledConstants.NAV_BAR_HEIGHT};
  display: flex;
  background-color: 'rgba(250, 250, 250, 1)'
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
  ${PageWrapper} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
