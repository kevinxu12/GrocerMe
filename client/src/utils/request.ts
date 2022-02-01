/**
 * @file Helpers related to making http requests from the frontend
 * @author Kevin Xu
 */
/* eslint-disable jsdoc/require-returns-type */
import { AxiosResponse } from 'axios';

/**
 * Parses a raw axios response to fetch data stored within our custom SuccessResponse
 *
 * @param {AxiosResponse} response raw Axios Response
 * @returns Custom data stored in the SuccessResponse, else Null
 */
export function parseAxiosSuccessResponse<T>(
  response: AxiosResponse | undefined,
): T | null {
  if (
    response === undefined ||
    response.status === 204 ||
    response.status === 205
  ) {
    return null;
  }
  const responseData = response.data;
  // custom data will be stored in here
  if ('data' in responseData) {
    return responseData.data;
  }
  return null;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 * @returns {object|undefined} Returns either the response, or throws an error
 */
export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  throw error;
}

/**
 * Timeout for some length
 *
 * @param {*} ms time of delay
 * @returns {*} Promise of a timeout
 */
export function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
