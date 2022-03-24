/**
 * @file A component to request to be a supplier
 * @author Kevin Xu
 */
import React from 'react';
import { Typography } from '@mui/material';
import Api from 'utils/api';
import Button from '@mui/material/Button';
import { setMessageSnackbarType } from 'types';

interface SupplierRequestComponentPropTypes {
  setMessage: setMessageSnackbarType;
}

/**
 *
 * @param {Object} root0 top level props
 * @param {Function} root0.setMessage set message for the snackbar that shows on api request / response
 * @returns {React.ReactElement} Component to make requests
 */
export const SupplierRequestComponent = ({
  setMessage,
}: SupplierRequestComponentPropTypes): React.ReactElement => {
  /**
   * When the user clicks to make a new request, we fire an API call to make that request. We set the snackbar model
   * to the corresponding message
   */
  const onClick = async () => {
    await Api.post(
      '/newSupplierRequest',
      {},
      setMessage,
      'Successfully made new supplier request',
    );
  };
  return (
    <div className="onboard">
      <Typography variant="h5"> Onboard as a supplier! </Typography>
      <Typography variant="subtitle2"> We noticed you are new!</Typography>
      <Button variant="contained" onClick={onClick}>
        Click Here to Become a Supplier
      </Button>
    </div>
  );
};
