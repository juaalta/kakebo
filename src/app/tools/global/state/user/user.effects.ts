import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { ValidateUser, UserActionTypes } from "@tools/global/state/user/user.actions";
import { Action } from "@ngrx/store";
import { switchMap } from "rxjs/operators/switchMap";
import { UserService } from "@tools/global/state/user/user.service";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private user: UserService
  ) {}

  @Effect()
  public validateUser$: Observable<Action> = this.actions$.pipe(
    ofType<ValidateUser>(UserActionTypes.ValidateUser),
    switchMap(this.user.validateUser$)
  );
}