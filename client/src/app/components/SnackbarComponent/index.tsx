/**
 * @file Component Wrapper that makes it easy to display any snackbar API alerts
 * Adds a prop called setMessage to the child component that specifies the snackbar message
 * @author Kevin Xu
 */
import React, { useCallback, useState } from 'react';
import { isErrorMessage } from 'utils/errors';
import { CustomSnackBar } from '../Snackbar';

/**
 * See file description
 *
 * @param {Object} param0 General Props
 * @param {React.ReactElement} param0.component Component to wrap around
 * @returns {React.ReactElement} A wrapped component
 */
const SnackbarComponent = ({
  component: Component,
  ...rest
}): React.ReactElement => {
  const [message, setMessage] = useState<string>('');
  const [isReset, setIsReset] = useState<boolean>(true);
  /**
   * resets the component to display a new snackbar
   * Unsure if useCallback is needed here.
   */
  const reset = useCallback(() => {
    setIsReset(true);
    setMessage('');
  }, []);

  return (
    <div>
      <Component {...rest} setMessage={setMessage} />
      {message && isErrorMessage(message) && isReset && (
        <CustomSnackBar text={message} reset={reset} severity={'error'} />
      )}
      {message && !isErrorMessage(message) && isReset && (
        <CustomSnackBar text={message} reset={reset} severity={'success'} />
      )}
    </div>
  );
};

export default SnackbarComponent;
