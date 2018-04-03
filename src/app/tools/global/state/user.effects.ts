import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { Action } from "@ngrx/store";
import {
  ValidateUser,
  UserActionTypes,
  ValidateUserCompleted
} from "@tools/global/state/user.actions";
import { switchMap, map, tap } from "rxjs/operators";
import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";
import { User } from "@tools/global/state/user.model";
import { UserApi } from "@tools/global/state/user-api.service";
import { Router } from "@angular/router";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private api: UserApi,
    private router: Router
  ) {}

  @Effect()
  validateUser$: Observable<Action> = this.actions$.pipe(
    ofType<ValidateUser>(UserActionTypes.ValidateUser),
    switchMap(action => {
      const user: User = action.payload;
      const service = user.isNew ? "registration" : "login";
      return this.api.sendCredential(user, service).pipe(
        tap(() => this.router.navigateByUrl("/")),
        map(
          (res: any) =>
            new ValidateUserCompleted({
              ...user,
              token: res.token,
              userIsAnonymous: false,
              comunicating: false
            })
        )
      );
    })
  );
}
