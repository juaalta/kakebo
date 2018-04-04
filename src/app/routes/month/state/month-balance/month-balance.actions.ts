import { Action } from "@ngrx/store";
import {
  YearMonth,
  MonthBalance
} from "@routes/month/state/models/month_balance.model";

export enum MonthBalanceActionTypes {
  GetMonthBalance = "[MonthBalance] GetMonthBalance",
  GetMonthBalanceCompleted = "[MonthBalance] GetMonthBalanceCompleted",
  GetMonthBalanceFailed = "[MonthBalance] GetMonthBalanceFailed"
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

export type MonthBalanceActions =
  | GetMonthBalance
  | GetMonthBalanceCompleted
  | GetMonthBalanceFailed;
