/**
 * @file Hooks helper
 * @author Kevin Xu
 */
import { useEffect, useRef } from 'react';
/*eslint-disable */
/**
 *
 * @param {E} value any value
 * @returns {E | undefined} the previous value held by the ref
 */
export function usePrevious<E>(value: E): E | undefined {
  const ref = useRef<E>();
  useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  }, [value]); //this code will run when the value of 'value' changes
  return ref.current; //in the end, return the current ref value.
}
export default usePrevious;
