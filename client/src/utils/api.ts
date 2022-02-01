/**
 * @file An Api client wrapper around axios. Use this instead of calling axios directly
 * @author Kevin Xu
 */
import axios, { AxiosResponse } from 'axios';
import { getErrorMessage } from './errors';
import generateServerUrl from './url';
/**
 *
 */
class Api {
  /**
   * Wrapper around axios.get
   *
   * @param {string} url the raw url string
   * @param {Function} cb Optional callback to run on error
   * @param {string} success_message Success message
   * @returns {AxiosResponse} axiosResponse
   */
  public static async get(
    url: string,
    cb?: Function,
    success_message?: string,
  ) {
    try {
      const res = await axios.get(generateServerUrl(url), {
        withCredentials: true,
      });
      if (cb && success_message) {
        await cb(success_message);
      }
      return res;
    } catch (error) {
      if (cb) {
        cb(getErrorMessage(error));
      } else {
        throw error;
      }
    }
  }

  /**
   * Wrapper around axios.post
   *
   * TO DO, we should probably type the request body, instead of using ANY in the future.
   *
   * @param {string} url raw url string
   * @param {any} body Post object
   * @param {Function} cb Optional Callback
   * @param {string} success_message success message to call callback with
   * @returns {AxiosResponse} axiosResponse
   */
  public static async post(
    url: string,
    body: any = {},
    cb?: Function,
    success_message?: string,
  ) {
    try {
      const res = await axios.post(generateServerUrl(url), body, {
        withCredentials: true,
      });
      if (cb && success_message) {
        await cb(success_message);
      }
      return res;
    } catch (error) {
      if (cb) {
        cb(getErrorMessage(error));
      } else {
        throw error;
      }
    }
  }
}
export default Api;
