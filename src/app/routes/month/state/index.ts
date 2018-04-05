import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from "@ngrx/store";
import { environment } from "@environments/environment";
import { monthBalanceReducer } from "@routes/month/state/month-balance/month-balance.reducer";
import { journalEntryReducer } from "@routes/month/state/journal-entry/journal-entry.reducer";
import { MonthBalance } from "@routes/month/state/month-balance/models/month_balance.model";
import { JournalEntry } from "@routes/month/state/journal-entry/models/journal-entry.model";

export const MONTH_FEATURE = 'month'

export interface MonthState {
  monthBalance: MonthBalance;
  journalEntries: JournalEntry[]
}

export const reducers: ActionReducerMap<MonthState> = {
  monthBalance: monthBalanceReducer,
  journalEntries: journalEntryReducer
};

export const metaReducers: MetaReducer<MonthState>[] = !environment.production
  ? []
  : [];

export const monthStateFeatureSelector = createFeatureSelector<MonthState>(MONTH_FEATURE);
export const monthBalanceSelector = createSelector(monthStateFeatureSelector,(s)=>s.monthBalance);
export const journalEntriesSelector = createSelector(monthStateFeatureSelector,(s)=>s.journalEntries);
