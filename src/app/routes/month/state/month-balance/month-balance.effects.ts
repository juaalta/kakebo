import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { MonthBalanceService } from "@routes/month/state/month-balance/month-balance.service";
import { Action } from "@ngrx/store";
import { MonthState } from "@routes/month/state";
import { Observable } from "rxjs/Observable";
import { CalculateMonthBalance, MonthBalanceActionTypes, GetMonthBalance, PostMonthBalance, SetGoalMonthBalance, PutMonthBalance } from "@routes/month/state/month-balance/month-balance.actions";
import { switchMap } from "rxjs/operators";

@Injectable()
export class MonthBalanceEffects {
  constructor(
    private actions$: Actions,
    private monthBalanceService: MonthBalanceService
  ) {}

  @Effect()
  public calculateMonthBalance$: Observable<Action> = this.actions$.pipe(
    ofType<CalculateMonthBalance>(
      MonthBalanceActionTypes.CalculateMonthBalance
    ),
    switchMap(this.monthBalanceService.onCalculateMonthBalance$)
  );

  @Effect()
  public getMonthBalance$: Observable<Action> = this.actions$.pipe(
    ofType<GetMonthBalance>(MonthBalanceActionTypes.GetMonthBalance),
    switchMap(this.monthBalanceService.onGetMonthBalance$)
  );

  @Effect()
  public postMonthBalance$: Observable<Action> = this.actions$.pipe(
    ofType<PostMonthBalance>(MonthBalanceActionTypes.PostMonthBalance),
    switchMap(this.monthBalanceService.onPostMonthBalance$)
  );

  @Effect()
  public putMonthBalance$: Observable<Action> = this.actions$.pipe(
    ofType<PutMonthBalance>(MonthBalanceActionTypes.PutMonthBalance),
    switchMap(this.monthBalanceService.onPutMonthBalance$)
  );

  @Effect()
  public setGoalMonthBalance$: Observable<Action> = this.actions$.pipe(
    ofType<SetGoalMonthBalance>(MonthBalanceActionTypes.SetGoalMonthBalance),
    switchMap(this.monthBalanceService.onSetGoalMonthBalance$)
  );
}
