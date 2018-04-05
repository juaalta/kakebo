import { Action } from "@ngrx/store";
import {
  YearMonth,
  MonthBalance
} from "@routes/month/state/month-balance/models/month_balance.model";

export enum MonthBalanceActionTypes {
  GetMonthBalance = "[MonthBalance] GetMonthBalance",
  GetMonthBalanceCompleted = "[MonthBalance] GetMonthBalanceCompleted",
  GetMonthBalanceFailed = "[MonthBalance] GetMonthBalanceFailed",
  PostMonthBalance = "[MonthBalance] PostMonthBalance",
  PostMonthBalanceCompleted = "[MonthBalance] PostMonthBalanceCompleted",
  PostMonthBalanceFailed = "[MonthBalance] PostMonthBalanceFailed"
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


export type MonthBalanceActions =
  | GetMonthBalance
  | GetMonthBalanceCompleted
  | GetMonthBalanceFailed
  | PostMonthBalance
  | PostMonthBalanceCompleted
  | PostMonthBalanceFailed;
