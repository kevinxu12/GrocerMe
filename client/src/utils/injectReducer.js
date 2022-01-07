/**
 * @file Helpers to inject a new reducer into a store
 * @author Kevin Xu
 */
import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './reducerInjectors';

/**
 * Dynamically injects a reducer
 *
 * @param {object} props the props passed
 * @param {string} props.key the key to inject the reducer in
 * @param {object} props.reducer reducer to inject
 * @returns {Function} See below
 */
const wrappedComponent =
  ({ key, reducer }) =>
  WrappedComponent => {
    /**
     * A wrapper component that injects a given reducer into a key
     */
    class ReducerInjector extends React.Component {
      static WrappedComponent = WrappedComponent;

      static contextType = ReactReduxContext;

      static displayName = `withReducer(${
        WrappedComponent.displayName || WrappedComponent.name || 'Component'
      })`;

      /**
       * @param {object} props ReducerInjector Props
       * @param {object} context React Redux Context
       */
      constructor(props, context) {
        super(props, context);

        getInjectors(context.store).injectReducer(key, reducer);
      }

      /**
       * @returns {React.ElementType} Renders a Wrapped Component
       */
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistNonReactStatics(ReducerInjector, WrappedComponent);
  };

export default wrappedComponent;

/**
 * Wrapper function to inject reducer without unnecessary renders
 *
 * @param {object} root0 general props
 * @param {string} root0.key the string of the reducer to inject
 * @param {object} root0.reducer the reducer object to inject
 */
const useInjectReducer = ({ key, reducer }) => {
  const context = React.useContext(ReactReduxContext);
  React.useEffect(() => {
    getInjectors(context.store).injectReducer(key, reducer);
  }, [context.store, key, reducer]);
};

export { useInjectReducer };
