export type ActionType = String;
export interface Action<P> {
  type: ActionType;
  payload: P;
}

export interface ChangeUsernamePayload {
  username: String;
}

export type ChangeUsernameAction = Action<ChangeUsernamePayload>;

export type LogoutAction = Action<{}>;

export type AuthAction = LogoutAction | ChangeUsernameAction;
