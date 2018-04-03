import { Action } from "@ngrx/store";
import { UserActions, UserActionTypes } from "@tools/global/state/user.actions";
import { initialState, User } from "@tools/global/state/user.model";

export function userReducer(state = initialState, action: UserActions): User {
  switch (action.type) {
    case UserActionTypes.ValidateUser:
      return { ...state, comunicating: true };
    case UserActionTypes.ValidateUserCompleted:
      const user: User = action.payload;
      return { ...user, password: "" };
    default:
      return state;
  }
}
