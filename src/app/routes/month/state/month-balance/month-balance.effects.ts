import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { switchMap, catchError, map } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import {
  GetMonthBalance,
  MonthBalanceActionTypes,
  GetMonthBalanceCompleted,
  GetMonthBalanceFailed
} from "@routes/month/state/month-balance/month-balance.actions";
import { MonthBalance } from "@routes/month/state/models/month_balance.model";
import { MonthBalanceApi } from "@routes/month/state/month-balance/month-balance-api.service";

@Injectable()
export class MonthBalanceEffects {
  private onGetMonthBalance$ = (action: GetMonthBalance) => {
    return this.monthBalanceApi
      .getMonthBalancesByYearMonth$(action.payload)
      .pipe(
        map((res:MonthBalance) =>{
          return new GetMonthBalanceCompleted(res);
        }),
        catchError(()=>{
          return of(new GetMonthBalanceFailed(action.payload));
        })
      );
  };
  constructor(private actions$: Actions, private monthBalanceApi: MonthBalanceApi) {}

  @Effect()
  public getMonthBalance$: Observable<Action> = this.actions$.pipe(
    ofType<GetMonthBalance>(MonthBalanceActionTypes.GetMonthBalance),
    switchMap(this.onGetMonthBalance$)
  );

}
