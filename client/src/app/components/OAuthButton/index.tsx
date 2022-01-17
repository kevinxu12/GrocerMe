/**
 * @file Component for Google OAuth. In Progress
 * @author Kevin Xu
 */
import React from 'react';
import generateServerUrl from 'utils/url';
/**
 * @returns {React.ElementType} Returns a google oauth button
 */
function GoogleButton() {
  /**
   *
   * @param {React.MouseEvent<HTMLElement>} ev Click event
   */
  const handleLogin = async (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    window.open(generateServerUrl('/google'), '_self');
  };

  return (
    <button
      onClick={e => {
        handleLogin(e);
      }}
    >
      Sign with Google
    </button>
  );
}

export default GoogleButton;
