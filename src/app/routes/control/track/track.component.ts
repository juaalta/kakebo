import { Component, OnInit } from "@angular/core";
import { JournalEntry } from "@routes/control/models/journal_entry.model";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { StoreService } from "@routes/control/store.service";

@Component({
  selector: "kab-track",
  template: `
    <header>
      <h2>
        Track your expenses. Left to expend <span class="float-right">{{month_balance.available}} €</span>
      </h2>
    </header>
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
  public expenses: JournalEntry[] = [];
  public month_balance: MonthBalance;
  constructor(private store: StoreService) {}

  ngOnInit() {
    this.store.selectMonthBalance$.subscribe(res => (this.month_balance = res));
    this.store.selectExpenses$.subscribe(res => (this.expenses = res));
  }
  public saveNewExpense(expense: JournalEntry) {
    this.store.dispatchPostJournalEntry(expense);
  }
  public deleteExpense(expense: JournalEntry) {
    this.store.dispatchDeleteJournalEntry(expense);
  }
}
