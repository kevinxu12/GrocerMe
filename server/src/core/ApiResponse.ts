/**
 * @file Node.js Route Api Responses
 * @author Kevin Xu
 */
import { Response } from 'express';

// Helper code for the API consumer to understand the error and handle is accordingly
enum StatusCode {
  SUCCESS = '10000',
  FAILURE = '10001',
  RETRY = '10002',
  INVALID_ACCESS_TOKEN = '10003',
}

enum ResponseStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

/**
 *
 */
abstract class ApiResponse {
  /**
   * @param {string} statusCode Client-side information about status
   * @param {number} status Sever-side information about status
   * @param {string} message Response text message
   */
  constructor(
    protected statusCode: StatusCode,
    protected status: ResponseStatus,
    protected message: string,
  ) {}

  /**
   * Generates new Response, with desired status in header and ApiResponse as body
   *
   * @param {Response} res raw Response object
   * @param {ApiResponse} response the ApiResponse model for the body
   * @returns {Response} returns a Reponse with ApiMessage as body, corresponding status as header
   */
  protected prepare<T extends ApiResponse>(res: Response, response: T): Response {
    return res.status(this.status).json(ApiResponse.sanitize(response));
  }

  /**
   * Given raw response object, generates the final Response object to send back
   *
   * @param {Response} res Raw response
   * @returns {Response} Final, new Response object, with desired status in header and ApiResponse as body
   */
  public send(res: Response): Response {
    const response = this.prepare<ApiResponse>(res, this);
    console.log(response);
    return response;
  }

  /**
   * Sanitizes an ApiResponse by creating new empty clone without the status attribute.
   *
   * @param {ApiResponse} response ApiResponse to be sanitized
   * @returns {ApiResponse} returns sanitized ApiResponse
   */
  private static sanitize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;
    Object.assign(clone, response);
    // @ts-ignore
    delete clone.status;
    for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
    return clone;
  }
}

/**
 *
 */
export class AuthFailureResponse extends ApiResponse {
  /**
   * @param {string} message Custom Failure Message
   */
  constructor(message = 'Authentication Failure') {
    super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message);
  }
}

/**
 *
 */
export class NotFoundResponse extends ApiResponse {
  private url: string | undefined;

  /**
   * @param {string} message Custom NotFound Message
   */
  constructor(message = 'Not Found') {
    super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
  }

  /**
   * Send a NotFoundResponse object back, a generic Response object with NotFoundURL injected into the body of response
   *
   * @param {Response} res Original Response object
   * @returns {Response} modfiied response object
   */
  send(res: Response): Response {
    this.url = res.req?.originalUrl;
    return super.prepare<NotFoundResponse>(res, this);
  }
}

/**
 *
 */
export class ForbiddenResponse extends ApiResponse {
  /**
   * @param {string} message Custom Forbidden Message String
   */
  constructor(message = 'Forbidden') {
    super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message);
  }
}

/**
 *
 */
export class BadRequestResponse extends ApiResponse {
  /**
   * @param {string} message Custom Bad Request String
   */
  constructor(message = 'Bad Parameters') {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
  }
}

/**
 *
 */
export class InternalErrorResponse extends ApiResponse {
  /**
   * @param {string} message Custom Internal Error String
   */
  constructor(message = 'Internal Error') {
    super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
  }
}

/**
 *
 */
export class SuccessMsgResponse extends ApiResponse {
  /**
   * @param {string} message Custom Success String
   */
  constructor(message: string) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }
}

/**
 *
 */
export class FailureMsgResponse extends ApiResponse {
  /**
   * @param {string} message Custom failure Message String
   */
  constructor(message: string) {
    super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message);
  }
}

/**
 *
 */
export class SuccessResponse<T> extends ApiResponse {
  /**
   * @param {string} message Custom Success Response String
   * @param {any} data data to be included in body
   */
  constructor(message: string, private data: T) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  /**
   * Sends a SuccessResponse object back, a generic Response object with data attribute
   *
   * @param {Response} res  Original Response object
   * @returns {Response} SuccessResponse Object
   */
  send(res: Response): Response {
    return super.prepare<SuccessResponse<T>>(res, this);
  }
}

/**
 *
 */
export class AccessTokenErrorResponse extends ApiResponse {
  private instruction = 'refresh_token';

  /**
   * @param {string} message Custom AccessTokenErrorResponse message
   */
  constructor(message = 'Access token invalid') {
    super(StatusCode.INVALID_ACCESS_TOKEN, ResponseStatus.UNAUTHORIZED, message);
  }

  /**
   * Send a AccessTokenResponse object back, a generic Response Object with instructions injected into the body of response
   *
   * @param {Response} res Original Response object
   * @returns {Response} AccessTokenResponse Object
   */
  send(res: Response): Response {
    res.setHeader('instruction', this.instruction);
    return super.prepare<AccessTokenErrorResponse>(res, this);
  }
}

/**
 *
 */
export class TokenRefreshResponse extends ApiResponse {
  /**
   * @param {string} message Custom Message to convey to user
   * @param {string} accessToken accessToken for API authentication
   * @param {string} refreshToken refreshToken for API authentication
   */
  constructor(message: string, private accessToken: string, private refreshToken: string) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  /**
   * Sends a TokenRefeshResponse object back, a generic Response object with accessToken and refreshToken populated
   *
   * @param {Response} res Original Response object
   * @returns {Response} TokenRefreshResponse Object
   */
  send(res: Response): Response {
    return super.prepare<TokenRefreshResponse>(res, this);
  }
}
