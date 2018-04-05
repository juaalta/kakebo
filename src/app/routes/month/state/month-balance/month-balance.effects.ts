import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { switchMap, catchError, map } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import {
  GetMonthBalance,
  MonthBalanceActionTypes,
  GetMonthBalanceCompleted,
  GetMonthBalanceFailed,
  PostMonthBalance,
  PostMonthBalanceCompleted,
  PostMonthBalanceFailed
} from "@routes/month/state/month-balance/month-balance.actions";
import {
  MonthBalance,
  monthBalanceInitialState
} from "@routes/month/state/month-balance/models/month_balance.model";
import { MonthBalanceApi } from "@routes/month/state/month-balance/month-balance-api.service";
import { MonthState } from "@routes/month/state";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class MonthBalanceEffects {
  private onGetMonthBalance$ = (action: GetMonthBalance) => {
    return this.monthBalanceApi
      .getMonthBalancesByYearMonth$(action.payload)
      .pipe(
        map((res: MonthBalance[]) => {
          return new GetMonthBalanceCompleted(res[0]);
        }),
        catchError((err, caught) => {
          const newMonthBalance = {
            ...monthBalanceInitialState,
            year: action.payload.year,
            month: action.payload.month
          };
          if (err instanceof HttpErrorResponse && err.status === 404) {
            this.store.dispatch(new PostMonthBalance(newMonthBalance));
          }
          return of(new GetMonthBalanceFailed(newMonthBalance));
        })
      );
  };

  private onPostMonthBalance$ = (action: PostMonthBalance) => {
    return this.monthBalanceApi.postMonthBalance$(action.payload).pipe(
      map((res: MonthBalance) => {
        return new PostMonthBalanceCompleted(res);
      }),
      catchError((err, caught) => {
        return of(new PostMonthBalanceFailed(err));
      })
    );
  };
  constructor(
    private actions$: Actions,
    private monthBalanceApi: MonthBalanceApi,
    private store: Store<MonthState>
  ) {}

  @Effect()
  public getMonthBalance$: Observable<Action> = this.actions$.pipe(
    ofType<GetMonthBalance>(MonthBalanceActionTypes.GetMonthBalance),
    switchMap(this.onGetMonthBalance$)
  );

  @Effect()
  public postMonthBalance$: Observable<Action> = this.actions$.pipe(
    ofType<PostMonthBalance>(MonthBalanceActionTypes.PostMonthBalance),
    switchMap(this.onPostMonthBalance$)
  );
}
