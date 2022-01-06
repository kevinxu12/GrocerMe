/**
 * @file Helpers to inject a saga
 * @author Kevin Xu
 */
import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './sagaInjectors';

/**
 * Dynamically injects a saga, passes component's props as saga arguments
 *
 * @param {object} props the props
 * @param {string} props.key A key of the saga
 * @param {Function} props.saga A root saga that will be injected
 * @param {string} [props.mode] By default (constants.DAEMON) the saga will be started
 * on component mount and never canceled or started again. Another two options:
 *   - constants.RESTART_ON_REMOUNT — the saga will be started on component mount and
 *   cancelled with `task.cancel()` on component unmount for improved performance,
 *   - constants.ONCE_TILL_UNMOUNT — behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 * @returns {Function} function that takes a componet to be wrapped and creates the wrapped component
 */
const injectSaga =
  ({ key, saga, mode }) =>
  WrappedComponent => {
    /**
     * Wrapper Class for InjectSaga
     */
    class InjectSaga extends React.Component {
      static WrappedComponent = WrappedComponent;

      static contextType = ReactReduxContext;

      static displayName = `withSaga(${
        WrappedComponent.displayName || WrappedComponent.name || 'Component'
      })`;

      /**
       * @param {object} props SagaInjector Props
       * @param {object} context React Redux Context
       */
      constructor(props, context) {
        super(props, context);

        this.injectors = getInjectors(context.store);

        this.injectors.injectSaga(key, { saga, mode }, this.props);
      }

      /**
       *
       */
      componentWillUnmount() {
        this.injectors.ejectSaga(key);
      }

      /**
       *  @returns {React.ElementType} Renders a Wrapped Component
       */
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistNonReactStatics(InjectSaga, WrappedComponent);
  };

export default injectSaga;

/**
 * Wrapper function to inject saga without unnecessary renders
 *
 * @param {object} root0 Props
 * @param {string} root0.key Key of the saga
 * @param {Function} root0.saga A root saga that will be injected
 * @param {string} root0.mode See above
 */
const useInjectSaga = ({ key, saga, mode }) => {
  const context = React.useContext(ReactReduxContext);
  React.useEffect(() => {
    const injectors = getInjectors(context.store);
    injectors.injectSaga(key, { saga, mode });

    return () => {
      injectors.ejectSaga(key);
    };
  }, [context.store, key, mode, saga]);
};

export { useInjectSaga };
