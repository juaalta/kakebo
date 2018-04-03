import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { ValidateUser, UserActionTypes, ValidateUserCompleted } from '@tools/global/state/user.actions';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private api : UserApi) {}

  @Effect()
  get$: Observable<Action> = this.actions$.pipe(
    ofType<ValidateUser>(UserActionTypes.ValidateUser),
    switchMap(action => {
      return this.api.sendCredential(action.payload)
        .pipe(
          map((res:any) => new ValidateUserCompleted({
            posts: res
          }))
        );
    })
  );
  
}

export class UserApi {
  private url = environment.apiUrl + "pub/credentials/";
  constructor(private http: HttpClient) {}

  public sendCredential(credential, service: string): Observable<any> {
    const credentialsUrl = this.url + service.toLowerCase();
    return this.http.post(credentialsUrl, credential);
  }
}
