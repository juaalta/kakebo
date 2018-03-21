import { Component, OnInit } from "@angular/core";
import { JournalEntry } from "@routes/control/models/journal_entry.model";
import { ControlService } from "@routes/control/control.service";
import { MonthBalance } from "@routes/control/models/month_balance.model";

@Component({
  selector: "kab-tarck",
  template: `
    <header>
      <h2>
        Track your expenses. Left to expend <span class="float-right">{{month_balance.available}} €</span>
      </h2>
    </header>
    <main class="column">
      <section>
        <kab-new-expense (saveExpense)="saveNewExpense($event)"></kab-new-expense>
      </section>
      <section>
        <kab-expenses-list [expensesToList]="expenses" (deleteExpense)="deleteExpense($event)"></kab-expenses-list>
      </section>
    <main>
    {{month_balance | json}}
  `,
  styles: []
})
export class TrackComponent implements OnInit {
  public expenses: JournalEntry[] = [];
  public month_balance: MonthBalance;
  private year = 2018;
  private month = 3;
  constructor(private controlService: ControlService) {}

  ngOnInit() {
    this.getData();
  }
  public saveNewExpense(expense: JournalEntry) {
    this.controlService.postJournalEntry(expense);
    this.getData();
  }
  public deleteExpense(expense: JournalEntry) {
    this.controlService.deleteJournalEntry(expense);
    this.getData();
  }
  private getData() {
    this.expenses = this.controlService.filterJournalsByKind(
      "E",
      this.year,
      this.month
    );
    this.month_balance = this.controlService.getMonthBalance(
      this.year,
      this.month
    );
  }
}
