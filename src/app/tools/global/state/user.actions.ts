import { Action } from '@ngrx/store';
import { User } from '@tools/global/state/user.model';

export enum UserActionTypes {
  ValidateUser = '[User] ValidateUser',
  ValidateUserCompleted = '[User] ValidateUserCompleted',
}

export class ValidateUser implements Action {
  readonly type = UserActionTypes.ValidateUser;
  constructor(public payload:User){  }
}
export class ValidateUserCompleted implements Action {
  readonly type = UserActionTypes.ValidateUserCompleted;
  constructor(public payload:User){  }
}

export type UserActions = ValidateUser | ValidateUserCompleted;
