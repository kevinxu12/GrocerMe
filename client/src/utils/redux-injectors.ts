/**
 * @file Redux Inject methods
 * @author Kevin Xu
 */
import {
  useInjectReducer as useReducer,
  useInjectSaga as useSaga,
} from 'redux-injectors';
import {
  InjectReducerParams,
  InjectSagaParams,
  RootStateKeyType,
} from './types/injector-typings';

/* Wrap redux-injectors with stricter types */

/**
 * @param {InjectReducerParams} params params for reducer injection
 * @returns {typeof useReducer} useReducer instance
 */
export function useInjectReducer<Key extends RootStateKeyType>(
  params: InjectReducerParams<Key>,
) {
  return useReducer(params);
}

/**
 * @param {InjectSagaParams} params params for saga injection
 * @returns {typeof useSaga} useSaga instance
 */
export function useInjectSaga(params: InjectSagaParams) {
  return useSaga(params);
}
