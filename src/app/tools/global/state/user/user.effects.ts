import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { Action, Store } from "@ngrx/store";
import { switchMap, map, tap, catchError } from "rxjs/operators";
import { environment } from "@environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { of } from "rxjs/observable/of";
import { CredentialResponse } from "@tools/global/state/user/models/credentials.model";
import {
  ValidateUser,
  ValidateUserCompleted,
  ValidateUserFailed,
  UserActionTypes
} from "@tools/global/state/user/user.actions";
import { UserApi } from "@tools/global/state/user/user-api.service";
import { State } from "@tools/global/state";
import { ShowMessage } from "@tools/global/state/message/message.actions";

@Injectable()
export class UserEffects {
  private onValidateUser$ = (action: ValidateUser): Observable<Action> => {
    this.store.dispatch(
      new ShowMessage({ caption: "validating", type: "info" })
    );
    return this.api.sendCredential(action.payload, action.payload.service).pipe(
      tap(() => this.router.navigateByUrl("/")),
      map((res: CredentialResponse) => {
        this.store.dispatch(new ShowMessage({ caption: "", type: "info" }));
        return new ValidateUserCompleted(res);
      }),
      catchError(() => {
        this.store.dispatch(
          new ShowMessage({ caption: "Invalid Credentials", type: "warn" })
        );
        return of(new ValidateUserFailed());
      })
    );
  };

  constructor(
    private actions$: Actions,
    private api: UserApi,
    private router: Router,
    private store: Store<State>
  ) {}

  @Effect()
  public validateUser$: Observable<Action> = this.actions$.pipe(
    ofType<ValidateUser>(UserActionTypes.ValidateUser),
    switchMap(this.onValidateUser$)
  );
}
