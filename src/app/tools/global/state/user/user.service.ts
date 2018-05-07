import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Action, Store } from "@ngrx/store";
import { GlobalState } from "@tools/global/state";
import { ShowMessage } from "@tools/global/state/message/message.actions";
import { CredentialResponse } from "@tools/global/state/user/models/credentials.model";
import { UserApi } from "@tools/global/state/user/user-api.service";
import { ValidateUser, ValidateUserCompleted, ValidateUserFailed } from "@tools/global/state/user/user.actions";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class UserService {

  constructor(
    private api: UserApi,
    private router: Router,
    private store: Store<GlobalState>
  ) { }

  public validateUser$ = (action: ValidateUser): Observable<Action> => {
    this.store.dispatch(
      new ShowMessage({ caption: "validating", type: "info" })
    );
    return this.api.sendCredential(action.payload).pipe(
      map((res: CredentialResponse) => {
        this.store.dispatch(new ShowMessage({ caption: "", type: "info" }));
        this.router.navigateByUrl("/");
        localStorage.setItem('token', res.token);
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

}