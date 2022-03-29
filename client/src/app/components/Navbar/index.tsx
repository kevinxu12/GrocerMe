/**
 * @file Navbar Home Component
 * @author Kevin Xu
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { StyledConstants } from 'styles/StyleConstants';
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
  return <div>{!isAuthenticated ? <PublicNav /> : <PrivateNav />}</div>;
}
