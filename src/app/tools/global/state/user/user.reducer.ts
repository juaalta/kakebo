import { Action } from "@ngrx/store";
import {
  userInitialState,
  User
} from "@tools/global/state/user/models/user.model";
import {
  UserActions,
  UserActionTypes
} from "@tools/global/state/user/user.actions";

export function userReducer(
  state = userInitialState,
  action: UserActions
): User {
  switch (action.type) {
    case UserActionTypes.ValidateUser:
      return {
        ...state,
        email: action.payload.email
      };
    case UserActionTypes.ValidateUserCompleted:
      return {
        ...state,
        token: action.payload.token,
        userIsAnonymous: false
      };
    case UserActionTypes.ValidateUserFailed:
      return {
        ...state,
        token: "",
        userIsAnonymous: true
      };
    default:
      return state;
  }
}
