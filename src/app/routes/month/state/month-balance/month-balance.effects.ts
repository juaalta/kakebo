import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { Action } from "@ngrx/store";
import {
  GetMonthBalance,
  MonthBalanceActionTypes
} from "@routes/month/state/month-balance/month-balance.actions";
import { switchMap } from "rxjs/operators";

@Injectable()
export class MonthBalanceEffects {
  private onGetMonthBalance$ = (action: GetMonthBalance) => {
    console.log("onGetMonthBalance$");
    return null;
  };
  constructor(private actions$: Actions) {}

  @Effect()
  public getMonthBalance$: Observable<Action> = this.actions$.pipe(
    ofType<GetMonthBalance>(MonthBalanceActionTypes.GetMonthBalance),
    switchMap(this.onGetMonthBalance$)
  );
}
