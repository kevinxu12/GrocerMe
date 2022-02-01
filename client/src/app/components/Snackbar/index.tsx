/**
 * @file A generalized snackbar component that displays an alert
 * @author Kevin Xu
 */
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 *
 * @param {object} props General props object
 * @param {string} props.text text to display in the snackbar alert
 * @param {() => void} props.reset Passed down by the parent, ensures the parent's state is reset and a new snackbar can render from scratch
 * @param {AlertColor} props.severity the severity of the snackbar alert
 * @returns {React.ReactElement} snackbar component
 */
export const CustomSnackBar = ({
  text,
  reset,
  severity = 'success',
}): React.ReactElement => {
  const [open, setOpen] = React.useState(true);
  /**
   * Handle closing the snackbar
   *
   * @param {React.SyntheticEvent | Event} event mouse click
   * @param {string} reason the reason for closing
   * @returns {void} empty return
   */
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ): void => {
    if (reason === 'clickaway') {
      return;
    }
    reset();
    setOpen(false);
  };
  return (
    <Snackbar open={open} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity as AlertColor}
        sx={{ width: '100%' }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};
