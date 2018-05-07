import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { UserActionTypes, ValidateUser } from "@tools/global/state/user/user.actions";
import { UserService } from "@tools/global/state/user/user.service";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private user: UserService
  ) { }

  @Effect()
  public validateUser$: Observable<Action> = this.actions$.pipe(
    ofType<ValidateUser>(UserActionTypes.ValidateUser),
    switchMap(this.user.validateUser$)
  );
}