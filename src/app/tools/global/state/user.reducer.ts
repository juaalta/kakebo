import { Action } from "@ngrx/store";
import { UserActions, UserActionTypes } from "@tools/global/state/user.actions";
import { initialState, User } from "@tools/global/state/user.model";

export function userReducer(state = initialState, action: UserActions): User {
  switch (action.type) {
    case UserActionTypes.ValidateUser:
      return {
        ...state,
        email: action.payload.email,
        userMessage: "Validating..."
      };
    case UserActionTypes.ValidateUserCompleted:
      return {
        ...state,
        token: action.payload.token,
        userIsAnonymous: false,
        userMessage: ""
      };
    case UserActionTypes.ValidateUserFailed:
      return {
        ...state,
        token: "",
        userIsAnonymous: true,
        userMessage: "Invalid Credentials"
      };
    case UserActionTypes.ShowMessage:
      return {
        ...state,
        userMessage: action.payload
      };
    default:
      return state;
  }
}
