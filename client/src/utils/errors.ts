/**
 * @file Helpers for generating error messages in try / catches
 * @author Kevin Xu
 */
/* eslint-disable jsdoc/no-undefined-types */

type ErrorWithMessage = {
  message: string;
};

/**
 * Checks if is an error with a message
 *
 * @param {unknown} error Unknown error
 * @returns {boolean} true if error is with message, false otherwise
 */
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}
/**
 * Converts to a definitive error with a message
 *
 * @param {unknown} maybeError a potential error with a message
 * @returns {ErrorWithMessage} error with a message
 */
function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}
/**
 * Gets an Error Message from an unknown error
 *
 * @param {unknown} error the unknown error
 * @returns {string} error message
 */
export function getErrorMessage(error: unknown): string {
  return toErrorWithMessage(error).message;
}
