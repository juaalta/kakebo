import { Injectable } from "@angular/core";
import { UserApi } from "@tools/global/state/user/user-api.service";
import { Router } from "@angular/router";
import { Store, Action } from "@ngrx/store";
import { GlobalState } from "@tools/global/state";
import { ValidateUser, ValidateUserCompleted, ValidateUserFailed } from "@tools/global/state/user/user.actions";
import { Observable } from "rxjs/Observable";
import { ShowMessage } from "@tools/global/state/message/message.actions";
import { map } from "rxjs/operators/map";
import { CredentialResponse } from "@tools/global/state/user/models/credentials.model";
import { catchError } from "rxjs/operators/catchError";
import { of } from "rxjs/observable/of";

@Injectable()
export class UserService{

  constructor(
    private api: UserApi,
    private router: Router,
    private store: Store<GlobalState>
  ) {}

  public validateUser$ = (action: ValidateUser): Observable<Action> => {
    this.store.dispatch(
      new ShowMessage({ caption: "validating", type: "info" })
    );
    return this.api.sendCredential(action.payload).pipe(
      map((res: CredentialResponse) => {
        this.store.dispatch(new ShowMessage({ caption: "", type: "info" }));
        this.router.navigateByUrl("/");
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