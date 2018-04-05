import { Component, OnInit } from "@angular/core";

import { Subscription } from "rxjs/Subscription";
import { Store } from "@ngrx/store";
import {
  MonthState,
  monthBalanceSelector,
  journalEntriesSelector
} from "@routes/month/state";
import { JournalEntry } from "@routes/month/state/journal-entry/models/journal-entry.model";
import { MonthBalance } from "@routes/month/state/month-balance/models/month_balance.model";
import {
  PostJournalEntry,
  DeleteJournalEntry
} from "@routes/month/state/journal-entry/journal-entry.actions";
import { map } from "rxjs/operators";

@Component({
  selector: "kab-track",
  template: `
    <kab-widget-header mode="h2" caption="Track your expenses. Left to expend" value="{{monthBalance.available}} €"></kab-widget-header>
    <main class="column">
      <section>
        <kab-new-expense [year]="monthBalance.year" [month]="monthBalance.month" (saveExpense)="saveNewExpense($event)"></kab-new-expense>
      </section>
      <section>
        <kab-expenses-list [expensesToList]="expenses" (deleteExpense)="deleteExpense($event)"></kab-expenses-list>
      </section>
    <main>
  `,
  styles: []
})
export class TrackComponent implements OnInit {
  public monthBalanceSubscription: Subscription;
  public expensesSubscription: Subscription;
  public expenses: JournalEntry[] = [];
  public monthBalance: MonthBalance;

  constructor(private store: Store<MonthState>) {}

  ngOnInit() {
    this.monthBalanceSubscription = this.store
      .select(monthBalanceSelector)
      .subscribe(
        (monthBalance: MonthBalance) => (this.monthBalance = monthBalance)
      );
    this.expensesSubscription = this.store
      .select(journalEntriesSelector)
      .pipe(
        map((journalEntries: JournalEntry[]) =>
          journalEntries.filter(j => j.kind === "E")
        )
      )
      .subscribe((expenses: JournalEntry[]) => (this.expenses = expenses));
  }
  public saveNewExpense(expense: JournalEntry) {
    this.store.dispatch(
      new PostJournalEntry({
        monthBalance: this.monthBalance,
        journalEntry: expense
      })
    );
  }
  public deleteExpense(expense: JournalEntry) {
    this.store.dispatch(
      new DeleteJournalEntry({
        monthBalance: this.monthBalance,
        journalEntry: expense
      })
    );
  }

  ngOnDestroy(): void {
    this.monthBalanceSubscription.unsubscribe();
    this.expensesSubscription.unsubscribe();
  }
}
