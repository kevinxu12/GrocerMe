/**
 * @file Types for redux actions
 * @author Kevin Xu
 */
import { AnyAction } from '@reduxjs/toolkit';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from './RootState';
export type ActionType = String;
export interface Action<P> {
  type: ActionType;
  payload: P;
}

// should move these to a separate reducer-specific actions type file in the future as we get more reducers
export interface ChangeUsernamePayload {
  username: String;
}

export type ChangeUsernameAction = Action<ChangeUsernamePayload>;

export type LogoutAction = Action<{}>;

export type AuthAction = LogoutAction | ChangeUsernameAction;

export type GenericThunkAction = ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
>;

export type GenericThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
