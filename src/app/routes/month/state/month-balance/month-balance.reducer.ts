import { Action } from "@ngrx/store";
import { MonthBalance } from "@routes/month/models/month_balance.model";
import { monthBalanceInitialState } from "@routes/month/state/models/month_balance.model";

export function monthBalanceReducer(
  state = monthBalanceInitialState,
  action: Action
): MonthBalance {
  switch (action.type) {
    default:
      return state;
  }
}
