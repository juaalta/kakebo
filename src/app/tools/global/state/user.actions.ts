import { Action } from "@ngrx/store";
import { User } from "@tools/global/state/user.model";
import {
  Credential,
  CredentialResponse
} from "@tools/global/state/credentials.model";

export enum UserActionTypes {
  ValidateUser = "[User] ValidateUser",
  ValidateUserCompleted = "[User] ValidateUserCompleted",
  ValidateUserFailed = "[User] ValidateUserFailed"
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

export type UserActions =
  | ValidateUser
  | ValidateUserCompleted
  | ValidateUserFailed;
