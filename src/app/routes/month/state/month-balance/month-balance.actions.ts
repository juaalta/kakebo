import { Action } from "@ngrx/store";
import {
  YearMonth,
  MonthBalance
} from "@routes/month/state/month-balance/models/month_balance.model";
import { MonthState } from "@routes/month/state";
import { JournalEntry } from "@routes/month/state/journal-entry/models/journal-entry.model";

export enum MonthBalanceActionTypes {
  CalculateMonthBalance = "[MonthBalance] CalculateMonthBalance",
  GetMonthBalance = "[MonthBalance] GetMonthBalance",
  GetMonthBalanceCompleted = "[MonthBalance] GetMonthBalanceCompleted",
  GetMonthBalanceFailed = "[MonthBalance] GetMonthBalanceFailed",
  PostMonthBalance = "[MonthBalance] PostMonthBalance",
  PostMonthBalanceCompleted = "[MonthBalance] PostMonthBalanceCompleted",
  PostMonthBalanceFailed = "[MonthBalance] PostMonthBalanceFailed",
  PutMonthBalance = "[MonthBalance] PutMonthBalance",
  PutMonthBalanceCompleted = "[MonthBalance] PutMonthBalanceCompleted",
  PutMonthBalanceFailed = "[MonthBalance] PutMonthBalanceFailed",
  SetGoalMonthBalance = "[MonthBalance] PutMonthBalanceFailed"
}

export class CalculateMonthBalance implements Action {
  readonly type = MonthBalanceActionTypes.CalculateMonthBalance;
  constructor(
    public payload: {
      monthBalance: MonthBalance;
      journalEntry: JournalEntry;
      amountSing: -1 | 1;
    }
  ) {}
}
export class GetMonthBalance implements Action {
  readonly type = MonthBalanceActionTypes.GetMonthBalance;
  constructor(public payload: YearMonth) {}
}

export class GetMonthBalanceCompleted implements Action {
  readonly type = MonthBalanceActionTypes.GetMonthBalanceCompleted;
  constructor(public payload: MonthBalance) {}
}

export class GetMonthBalanceFailed implements Action {
  readonly type = MonthBalanceActionTypes.GetMonthBalanceFailed;
  constructor(public payload: any) {}
}

export class PostMonthBalance implements Action {
  readonly type = MonthBalanceActionTypes.PostMonthBalance;
  constructor(public payload: MonthBalance) {}
}

export class PostMonthBalanceCompleted implements Action {
  readonly type = MonthBalanceActionTypes.PostMonthBalanceCompleted;
  constructor(public payload: MonthBalance) {}
}

export class PostMonthBalanceFailed implements Action {
  readonly type = MonthBalanceActionTypes.PostMonthBalanceFailed;
  constructor(public payload: MonthBalance) {}
}

export class PutMonthBalance implements Action {
  readonly type = MonthBalanceActionTypes.PutMonthBalance;
  constructor(public payload: MonthBalance) {}
}

export class PutMonthBalanceCompleted implements Action {
  readonly type = MonthBalanceActionTypes.PutMonthBalanceCompleted;
  constructor(public payload: MonthBalance) {}
}

export class PutMonthBalanceFailed implements Action {
  readonly type = MonthBalanceActionTypes.PutMonthBalanceFailed;
  constructor(public payload: MonthBalance) {}
}

export class SetGoalMonthBalance implements Action {
  readonly type = MonthBalanceActionTypes.SetGoalMonthBalance;
  constructor(public payload: MonthBalance) {}
}

export type MonthBalanceActions =
  | CalculateMonthBalance
  | GetMonthBalance
  | GetMonthBalanceCompleted
  | GetMonthBalanceFailed
  | PostMonthBalance
  | PostMonthBalanceCompleted
  | PostMonthBalanceFailed
  | PutMonthBalance
  | PutMonthBalanceCompleted
  | PutMonthBalanceFailed
  | SetGoalMonthBalance;
