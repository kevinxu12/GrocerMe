import React from 'react';
import GoogleLogin from 'react-google-login';
function GoogleButton() {
  const handleLogin = async googleData => {
    console.log('Clicked');
  };
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || 'N/A'}
      buttonText="Log in with Google"
      onSuccess={handleLogin}
      onFailure={handleLogin}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default GoogleButton;
