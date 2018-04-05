import { Action } from "@ngrx/store";
import {
  monthBalanceInitialState,
  MonthBalance
} from "@routes/month/state/month-balance/models/month_balance.model";
import {
  MonthBalanceActions,
  MonthBalanceActionTypes
} from "@routes/month/state/month-balance/month-balance.actions";

export function monthBalanceReducer(
  state = monthBalanceInitialState,
  action: MonthBalanceActions
): MonthBalance {
  switch (action.type) {
    case MonthBalanceActionTypes.CalculateMonthBalance:
      return state;
    case MonthBalanceActionTypes.GetMonthBalance:
      return state;
    case MonthBalanceActionTypes.GetMonthBalanceCompleted:
      return action.payload;
    case MonthBalanceActionTypes.GetMonthBalanceFailed:
      return state;
    case MonthBalanceActionTypes.PostMonthBalance:
      return state;
    case MonthBalanceActionTypes.PostMonthBalanceCompleted:
      return action.payload;
    case MonthBalanceActionTypes.PostMonthBalanceFailed:
      return state;
    case MonthBalanceActionTypes.PutMonthBalance:
      return state;
    case MonthBalanceActionTypes.PutMonthBalanceCompleted:
      return action.payload;
    case MonthBalanceActionTypes.PutMonthBalanceFailed:
      return state;
    case MonthBalanceActionTypes.SetGoalMonthBalance:
      return action.payload;
    default:
      return state;
  }
}
