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
  PostMonthBalanceFailed,
  CalculateMonthBalance,
  PutMonthBalance,
  PutMonthBalanceCompleted,
  PutMonthBalanceFailed,
  SetGoalMonthBalance
} from "@routes/month/state/month-balance/month-balance.actions";
import {
  MonthBalance,
  monthBalanceInitialState
} from "@routes/month/state/month-balance/models/month_balance.model";
import { MonthBalanceApi } from "@routes/month/state/month-balance/month-balance-api.service";
import { MonthState } from "@routes/month/state";
import { HttpErrorResponse } from "@angular/common/http";
import { JournalEntry } from "@routes/month/state/journal-entry/models/journal-entry.model";
import { error } from "util";

@Injectable()
export class MonthBalanceEffects {
  private onCalculateMonthBalance$ = (action: CalculateMonthBalance) => {
    const payload = action.payload;
    const mB = payload.monthBalance;
    const amount = payload.journalEntry.amount * payload.amountSing;
    switch (payload.journalEntry.kind) {
      case "I":
        mB.incomes += amount;
        break;
      case "O":
        mB.outgoings += amount;
        break;
      case "E":
        mB.expenses += amount;
        break;
    }
    mB.savings = mB.incomes - mB.outgoings - mB.expenses;
    mB.available = mB.savings - mB.goal;
    return of(new PutMonthBalance(mB));
  };
  private sumAmount = (entries: JournalEntry[]): number =>
    entries.map(p => p.amount).reduce((state, current) => state + current, 0);

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
          return of(new GetMonthBalanceFailed(err));
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

  private onPutMonthBalance$ = (action: PutMonthBalance) => {
    return this.monthBalanceApi.putMonthBalance$(action.payload).pipe(
      map((res: MonthBalance) => {
        return new PutMonthBalanceCompleted(res);
      }),
      catchError((err, caught) => {
        console.log("onPutMonthBalance.catchError", err);
        return of(new PutMonthBalanceFailed(err));
      })
    );
  };

  private onSetGoalMonthBalance$ = (action: SetGoalMonthBalance) => {
    const monthBalance = action.payload;
    monthBalance.available = monthBalance.savings - monthBalance.goal;
    return of(new PutMonthBalance(monthBalance));
  };

  constructor(
    private actions$: Actions,
    private monthBalanceApi: MonthBalanceApi,
    private store: Store<MonthState>
  ) {}

  @Effect()
  public calculateMonthBalance$: Observable<Action> = this.actions$.pipe(
    ofType<CalculateMonthBalance>(
      MonthBalanceActionTypes.CalculateMonthBalance
    ),
    switchMap(this.onCalculateMonthBalance$)
  );

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

  @Effect()
  public putMonthBalance$: Observable<Action> = this.actions$.pipe(
    ofType<PutMonthBalance>(MonthBalanceActionTypes.PutMonthBalance),
    switchMap(this.onPutMonthBalance$)
  );

  @Effect()
  public setGoalMonthBalance$: Observable<Action> = this.actions$.pipe(
    ofType<SetGoalMonthBalance>(MonthBalanceActionTypes.SetGoalMonthBalance),
    switchMap(this.onSetGoalMonthBalance$)
  );
}
