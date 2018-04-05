import { Action } from "@ngrx/store";
import {
  JournalEntryActions,
  JournalEntryActionTypes
} from "@routes/month/state/journal-entry/journal-entry.actions";
import {
  JournalEntry,
  journalEntriesInitialState
} from "@routes/month/state/journal-entry/models/journal-entry.model";

export function journalEntryReducer(
  state = journalEntriesInitialState,
  action: JournalEntryActions
): JournalEntry[] {
  switch (action.type) {
    case JournalEntryActionTypes.GetJournalEntries:
      return state;
    case JournalEntryActionTypes.GetJournalEntriesCompleted:
      return action.payload;
    case JournalEntryActionTypes.GetJournalEntriesFailed:
      return state;
    case JournalEntryActionTypes.PostJournalEntry:
      return state;
    case JournalEntryActionTypes.PostJournalEntryCompleted:
      return [...state, action.payload];
    case JournalEntryActionTypes.PostJournalEntryFailed:
      return state;
    case JournalEntryActionTypes.DeleteJournalEntry:
      return state;
    case JournalEntryActionTypes.DeleteJournalEntryCompleted:
      return state.filter(j => j._id !== action.payload._id);
    case JournalEntryActionTypes.DeleteJournalEntryFailed:
      return state;
    default:
      return state;
  }
}
