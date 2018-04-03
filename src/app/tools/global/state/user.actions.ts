import { Action } from '@ngrx/store';

export enum UserActionTypes {
  ValidateUser = '[User] ValidateUser',
  ValidateUserCompleted = '[User] ValidateUserCompleted',
}

export class ValidateUser implements Action {
  readonly type = UserActionTypes.ValidateUser;
}
export class ValidateUserCompleted implements Action {
  readonly type = UserActionTypes.ValidateUserCompleted;
}

export type UserActions = ValidateUser | ValidateUserCompleted;
