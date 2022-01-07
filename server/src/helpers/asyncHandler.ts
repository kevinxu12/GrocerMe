/**
 * @file Helper to deal with async requests
 * @author Kevin Xu
 */
import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

/**
 * @param {AsyncFunction} execution a node.js function execution
 * @returns {Promise} Launches the next function execution
 */
export default (execution: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
  execution(req, res, next).catch(next);
};
