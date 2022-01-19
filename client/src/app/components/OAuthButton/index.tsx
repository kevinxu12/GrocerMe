/**
 * @file Component for Google OAuth. In Progress
 * @author Kevin Xu
 */
import React from 'react';
import generateServerUrl from 'utils/url';
import GoogleButton from 'react-google-button';
/**
 * @returns {React.ElementType} Returns a google oauth button
 */
function OAuthButton() {
  /**
   *
   * @param {React.MouseEvent<HTMLElement>} ev Click event
   */
  const handleLogin = async (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    window.open(generateServerUrl('/google'), '_self');
  };

  return (
    <GoogleButton
      onClick={e => {
        handleLogin(e);
      }}
    >
      Sign with Google
    </GoogleButton>
  );
}

export default OAuthButton;
