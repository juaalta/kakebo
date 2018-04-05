import { Action } from "@ngrx/store";
import { MonthBalance } from "@routes/month/models/month_balance.model";
import { monthBalanceInitialState } from "@routes/month/state/models/month_balance.model";
import {
  MonthBalanceActions,
  MonthBalanceActionTypes
} from "@routes/month/state/month-balance/month-balance.actions";

export function monthBalanceReducer(
  state = monthBalanceInitialState,
  action: MonthBalanceActions
): MonthBalance {
  console.log(action.type, action.payload);
  switch (action.type) {
    case MonthBalanceActionTypes.GetMonthBalance:
      return state;
    case MonthBalanceActionTypes.GetMonthBalanceCompleted:
      return action.payload;
    case MonthBalanceActionTypes.GetMonthBalanceFailed:
      return {
        ...monthBalanceInitialState, 
        year:action.payload.year, 
        month: action.payload.month
      };
    default:
      return state;
  }
}
