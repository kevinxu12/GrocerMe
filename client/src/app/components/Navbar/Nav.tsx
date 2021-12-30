import * as React from 'react';
import styled from 'styled-components/macro';
import { StyledConstants } from 'styles/StyleConstants';

export function Nav() {
  return (
    <NavLinks>
      <Wrapper>
        <Item>About us</Item>
        <Item>Buy</Item>
        <Item>Sell</Item>
        <Item>Careers</Item>
        <Item>Request early access</Item>
      </Wrapper>
    </NavLinks>
  );
}

const NavLinks = styled.div`
  width: 60%;
  height: 10%;
  align-self: center;
  margin-left: 603px;
  margin-bottom: 1px;
  display: flex;
  align-items: flex-start;
`;

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
`;

const Item = styled.a`
  color: ${p => p.theme.grey};
  font-family: ${StyledConstants.INTER};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  font-size: ${StyledConstants.FONT_SIZE_M};
  letter-spacing: -0.36px;
  font-weight: 500;
  margin-left: 40px;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.4;
  }
`;

export const InterMediumMineShaft18px = `
  color: ${p => p.theme.grey};
  font-family: ${StyledConstants.INTER};
  font-size: ${StyledConstants.FONT_SIZE_M}
  font-weight: 500;
  font-style: normal;
`;
