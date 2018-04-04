import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from "@ngrx/store";
import { environment } from "@environments/environment";
import { monthBalanceReducer } from "@routes/month/state/month-balance/month-balance.reducer";
import { MonthBalance } from "@routes/month/state/models/month_balance.model";

export interface MonthState {
  monthBalance: MonthBalance;
}

export const reducers: ActionReducerMap<MonthState> = {
  monthBalance: monthBalanceReducer
};

export const metaReducers: MetaReducer<MonthState>[] = !environment.production
  ? []
  : [];
