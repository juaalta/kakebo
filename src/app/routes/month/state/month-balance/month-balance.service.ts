import { MonthBalanceApi } from "@routes/month/state/month-balance/month-balance-api.service";
import { Store } from "@ngrx/store";
import { MonthState } from "@routes/month/state";
import { Injectable } from "@angular/core";
import {
  CalculateMonthBalance,
  PutMonthBalance,
  GetMonthBalance,
  GetMonthBalanceCompleted,
  PostMonthBalance,
  GetMonthBalanceFailed,
  PostMonthBalanceCompleted,
  PostMonthBalanceFailed,
  PutMonthBalanceCompleted,
  PutMonthBalanceFailed,
  SetGoalMonthBalance
} from "@routes/month/state/month-balance/month-balance.actions";
import { of } from "rxjs/observable/of";
import { JournalEntry } from "@routes/month/state/journal-entry/models/journal-entry.model";
import { map } from "rxjs/operators/map";
import { MonthBalance, monthBalanceInitialState } from "@routes/month/state/month-balance/models/month_balance.model";
import { catchError } from "rxjs/operators/catchError";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class MonthBalanceService {
  constructor(
    private monthBalanceApi: MonthBalanceApi,
    private store: Store<MonthState>
  ) {}

  public onCalculateMonthBalance$ = (action: CalculateMonthBalance) => {
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

  public onGetMonthBalance$ = (action: GetMonthBalance) => {
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

  public onPostMonthBalance$ = (action: PostMonthBalance) => {
    return this.monthBalanceApi.postMonthBalance$(action.payload).pipe(
      map((res: MonthBalance) => {
        return new PostMonthBalanceCompleted(res);
      }),
      catchError((err, caught) => {
        return of(new PostMonthBalanceFailed(err));
      })
    );
  };

  public onPutMonthBalance$ = (action: PutMonthBalance) => {
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

  public onSetGoalMonthBalance$ = (action: SetGoalMonthBalance) => {
    const monthBalance = action.payload;
    monthBalance.available = monthBalance.savings - monthBalance.goal;
    return of(new PutMonthBalance(monthBalance));
  };
}
