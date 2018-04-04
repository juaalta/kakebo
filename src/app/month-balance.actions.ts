import { Action } from '@ngrx/store';

export enum MonthBalanceActionTypes {
  MonthBalanceAction = '[MonthBalance] Action'
}

export class MonthBalance implements Action {
  readonly type = MonthBalanceActionTypes.MonthBalanceAction;
}

export type MonthBalanceActions = MonthBalance;
