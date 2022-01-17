/**
 * @file Api Error Responses
 * @author Kevin Xu
 */

import { Response } from 'express';
import { environment } from '../config';
import {
  AuthFailureResponse,
  AccessTokenErrorResponse,
  InternalErrorResponse,
  NotFoundResponse,
  BadRequestResponse,
  ForbiddenResponse,
} from './ApiResponse';

enum ErrorType {
  BAD_TOKEN = 'BadTokenError',
  TOKEN_EXPIRED = 'TokenExpiredError',
  UNAUTHORIZED = 'AuthFailureError',
  ACCESS_TOKEN = 'AccessTokenError',
  INTERNAL = 'InternalError',
  NOT_FOUND = 'NotFoundError',
  NO_ENTRY = 'NoEntryError',
  NO_DATA = 'NoDataError',
  BAD_REQUEST = 'BadRequestError',
  FORBIDDEN = 'ForbiddenError',
}
/**
 * Generic ApiError response abstract class
 */
export abstract class ApiError extends Error {
  /**
   * ApiError Constructor
   *
   * @param {ErrorType} type Enum of error type
   * @param {string} message Message of the error
   */
  constructor(public type: ErrorType, public message: string = 'error') {
    super(type);
  }

  /**
   * Generic Handler for ApiErrors. Converts an ApiError and type into the appropriate ApiError instance, then injects the ApiError instance into node response header
   *
   * @param {ApiError} err the error sent to the handler
   * @param {Response} res REST response obj
   * @returns {Response} Response object with custom ApiError
   */
  public static handle(err: ApiError, res: Response): Response {
    switch (err.type) {
      case ErrorType.BAD_TOKEN:
      case ErrorType.TOKEN_EXPIRED:
      case ErrorType.UNAUTHORIZED:
        return new AuthFailureResponse(err.message).send(res);
      case ErrorType.ACCESS_TOKEN:
        return new AccessTokenErrorResponse(err.message).send(res);
      case ErrorType.INTERNAL:
        return new InternalErrorResponse(err.message).send(res);
      case ErrorType.NOT_FOUND:
      case ErrorType.NO_ENTRY:
      case ErrorType.NO_DATA:
        return new NotFoundResponse(err.message).send(res);
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(err.message).send(res);
      case ErrorType.FORBIDDEN:
        return new ForbiddenResponse(err.message).send(res);
      default: {
        let message = err.message;
        // Do not send failure message in production as it may send sensitive data
        if (environment === 'production') message = 'Something wrong happened.';
        return new InternalErrorResponse(message).send(res);
      }
    }
  }
}
/**
 * Error for invalid authentication
 */
export class AuthFailureError extends ApiError {
  /**
   *
   * @param {string} message Custom error message
   */
  constructor(message = 'Invalid Credentials') {
    super(ErrorType.UNAUTHORIZED, message);
  }
}

/**
 * Error for anything internal we did wrong. i.e logic errors
 */
export class InternalError extends ApiError {
  /**
   *
   * @param {string} message Custom error message
   */
  constructor(message = 'Internal error from us') {
    super(ErrorType.INTERNAL, message);
  }
}

/**
 * 401 style error
 */
export class BadRequestError extends ApiError {
  /**
   *
   * @param {string} message Custom error message
   */
  constructor(message = 'Bad Request') {
    super(ErrorType.BAD_REQUEST, message);
  }
}

/**
 * 404 style error
 */
export class NotFoundError extends ApiError {
  /**
   *
   * @param {string} message Custom error message
   */
  constructor(message = 'Not Found') {
    super(ErrorType.NOT_FOUND, message);
  }
}

/**
 * 403 style error
 */
export class ForbiddenError extends ApiError {
  /**
   *
   * @param {string} message Custom error message
   */
  constructor(message = 'Permission denied') {
    super(ErrorType.FORBIDDEN, message);
  }
}

/**
 * Error if we've reached an endpoint, but the desired data doesn't exist, but we don't want to return null
 */
export class NoEntryError extends ApiError {
  /**
   *
   * @param {string} message Custom error message
   */
  constructor(message = "Entry don't exists") {
    super(ErrorType.NO_ENTRY, message);
  }
}
/**
 * Bad Token
 */
export class BadTokenError extends ApiError {
  /**
   *
   * @param {string} message Custom error message
   */
  constructor(message = 'Token is not valid') {
    super(ErrorType.BAD_TOKEN, message);
  }
}
/**
 * Expired Token
 */
export class TokenExpiredError extends ApiError {
  /**
   *
   * @param {string} message Custom error message
   */
  constructor(message = 'Token is expired') {
    super(ErrorType.TOKEN_EXPIRED, message);
  }
}
