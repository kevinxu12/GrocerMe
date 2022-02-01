/**
 * @file Helpers related to making http requests from the frontend
 * @author Kevin Xu
 */
/* eslint-disable jsdoc/require-returns-type */
import axios, { AxiosResponse } from 'axios';
import generateServerUrl from './url';

/**
 * Parses a raw axios response to fetch data stored within our custom SuccessResponse
 *
 * @param {AxiosResponse} response raw Axios Response
 * @returns Custom data stored in the SuccessResponse, else Null
 */
export function parseAxiosSuccessResponse<T>(
  response: AxiosResponse,
): T | null {
  if (response.status === 204 || response.status === 205) {
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

/**
 * An Api client wrapper around axios. Use this instead of calling axios directly
 */
export class Api {
  /**
   * Wrapper around axios.get
   *
   * @param {string} url the raw url string
   * @returns {AxiosResponse} axiosResponse
   */
  public static async get(url: string) {
    return await axios.get(generateServerUrl(url), { withCredentials: true });
  }

  /**
   * Wrapper around axios.post
   *
   * TO DO, we should probably type the request body, instead of using ANY in the future.
   *
   * @param {string} url raw url string
   * @param {any} body Post object
   * @returns {AxiosResponse} axiosResponse
   */
  public static async post(url: string, body: any = {}) {
    return await axios.post(generateServerUrl(url), body, {
      withCredentials: true,
    });
  }
}
