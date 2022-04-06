/**
 * @file Navbar Home Component
 * @author Kevin Xu
 */
import * as React from 'react';
import { PublicNav } from './PublicNav';
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
