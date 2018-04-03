import { Action } from "@ngrx/store";
import { UserActions, UserActionTypes } from "@tools/global/state/user.actions";
import { initialState, User } from "@tools/global/state/user.model";

export function userReducer(state = initialState, action: UserActions): User {
  switch (action.type) {
    case UserActionTypes.ValidateUser:
      return { ...state, comunicating: true, userMessage: "Validating..." };
    case UserActionTypes.ValidateUserCompleted:
      return {
        ...state,
        token: action.payload.token,
        password: "",
        userIsAnonymous: false,
        comunicating: false,
        userMessage: ""
      };
    case UserActionTypes.ValidateUserFailed:
      return {
        ...state,
        token: "",
        password: "",
        userIsAnonymous: true,
        comunicating: false,
        userMessage: "Invalid Credentials"
      };
    default:
      return state;
  }
}
