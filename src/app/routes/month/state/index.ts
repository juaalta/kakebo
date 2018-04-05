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
