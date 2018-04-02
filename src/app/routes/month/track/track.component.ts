import { Component, OnInit } from "@angular/core";
import { JournalEntry } from "@routes/month/models/journal_entry.model";
import { MonthBalance } from "@routes/month/models/month_balance.model";
import { StoreService } from "@routes/month/store.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "kab-track",
  template: `
    <kab-widget-header mode="h2" caption="Track your expenses. Left to expend" value="{{month_balance.available}} €"></kab-widget-header>
    <main class="column">
      <section>
        <kab-new-expense [year]="month_balance.year" [month]="month_balance.month" (saveExpense)="saveNewExpense($event)"></kab-new-expense>
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
  public month_balance: MonthBalance;
  constructor(private store: StoreService) {}

  ngOnInit() {
    this.monthBalanceSubscription = this.store.selectMonthBalance$.subscribe(
      res => (this.month_balance = res)
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
