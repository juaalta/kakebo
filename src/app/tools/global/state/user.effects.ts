import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { Action } from "@ngrx/store";
import {
  ValidateUser,
  UserActionTypes,
  ValidateUserCompleted,
  ValidateUserFailed
} from "@tools/global/state/user.actions";
import { switchMap, map, tap, catchError } from "rxjs/operators";
import { environment } from "@environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UserApi } from "@tools/global/state/user-api.service";
import { Router } from "@angular/router";
import { of } from "rxjs/observable/of";
import { CredentialResponse } from "@tools/global/state/models/credentials.model";

@Injectable()
export class UserEffects {
  private onValidateUser$ = (action: ValidateUser): Observable<Action> =>
    this.api
      .sendCredential(action.payload, action.payload.service)
      .pipe(
        tap(() => this.router.navigateByUrl("/")),
        map((res: CredentialResponse) => new ValidateUserCompleted(res)),
        catchError(() => of(new ValidateUserFailed()))
      );

  constructor(
    private actions$: Actions,
    private api: UserApi,
    private router: Router
  ) {}

  @Effect()
  public validateUser$: Observable<Action> = this.actions$.pipe(
    ofType<ValidateUser>(UserActionTypes.ValidateUser),
    switchMap(this.onValidateUser$)
  );
}
