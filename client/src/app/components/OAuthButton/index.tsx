/**
 * @file Component for Google OAuth. In Progress
 * @author Kevin Xu
 */
import React from 'react';
import GoogleLogin from 'react-google-login';
/**
 * @returns {React.ElementType} Returns a google oauth button
 */
function GoogleButton() {
  /**
   * @param {object} googleData the data returned from oauth api
   */
  const handleLogin = googleData => {
    console.log('Clicked');
  };
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || 'N/A'}
      buttonText="Log in with Google"
      onSuccess={response => {
        handleLogin(response);
      }}
      onFailure={response => {
        handleLogin(response);
      }}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default GoogleButton;
