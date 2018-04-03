import { Action } from "@ngrx/store";
import {
  Credential,
  CredentialResponse
} from "@tools/global/state/models/credentials.model";

export enum UserActionTypes {
  ValidateUser = "[User] ValidateUser",
  ValidateUserCompleted = "[User] ValidateUserCompleted",
  ValidateUserFailed = "[User] ValidateUserFailed",
  ShowMessage = "[User] ShowMessage"
}

export class ValidateUser implements Action {
  readonly type = UserActionTypes.ValidateUser;
  constructor(public payload: Credential) {}
}
export class ValidateUserCompleted implements Action {
  readonly type = UserActionTypes.ValidateUserCompleted;
  constructor(public payload: CredentialResponse) {}
}
export class ValidateUserFailed implements Action {
  readonly type = UserActionTypes.ValidateUserFailed;
  constructor() {}
}

export class ShowMessage implements Action {
  readonly type = UserActionTypes.ShowMessage;
  constructor(public payload: string) {}
}

export type UserActions =
  | ValidateUser
  | ValidateUserCompleted
  | ValidateUserFailed
  | ShowMessage;
