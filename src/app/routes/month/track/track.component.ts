import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";
import { MonthBalance } from "@routes/month/state/models/month_balance.model";
import { MonthStore } from "@routes/month/state/month-store.state";

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
  constructor(private store: MonthStore) {}

  ngOnInit() {
    this.monthBalanceSubscription = this.store.selectMonthBalance$.subscribe(
      res => (this.monthBalance = res)
    );
    this.expensesSubscription = this.store.selectExpenses$.subscribe(
      res => (this.expenses = res)
    );
  }
  public saveNewExpense(expense: JournalEntry) {
    this.store.dispatchPostJournalEntry(expense);
  }
  public deleteExpense(expense: JournalEntry) {
    this.store.dispatchDeleteJournalEntry(expense);
  }

  ngOnDestroy(): void {
    this.monthBalanceSubscription.unsubscribe();
    this.expensesSubscription.unsubscribe();
  }
}
