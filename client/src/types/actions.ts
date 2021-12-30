export type ActionType = String;
export interface Action<P> {
  type: ActionType;
  payload: P;
}

export interface ChangeUsernamePayload {
  username: String;
}

export type HomeAction = Action<ChangeUsernamePayload>;
