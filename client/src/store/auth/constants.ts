/**
 * @file HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 * @author Kevin Xu
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

import { ActionType } from './../../types/actions';

export const CHANGE_AUTH: ActionType = 'client/store/auth/CHANGE_AUTH';
export const LOGOUT: ActionType = 'client/store/auth/LOGOUT';
