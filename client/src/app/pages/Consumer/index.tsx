/**
 * @file A Home page for logged-in users, both consumers and suppliers
 * Dashboard is not a private route, because dashboard will refresh periodically to check if the user is still logged in or not.
 * @author Kevin Xu
 */
import RefreshComponent from 'app/components/RefreshComponent';
import React from 'react';

/**
 *
 * @returns {React.ReactElement} a Consumer landing page wrapper
 */
const Consumer = (): React.ReactElement => {
  return (
    <RefreshComponent>
      <div>This is a dashboard</div>
    </RefreshComponent>
  );
};

export default Consumer;
