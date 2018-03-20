import { Component, OnInit } from "@angular/core";
import { JournalEntry } from "@routes/control/models/journal_entry.model";

@Component({
  selector: "kab-tarck",
  template: `
    <header>
      <h2> Track your expenses </h2>
    </header>
    <main class="column">
      <section>
        <kab-new-expense (saveExpense)="saveNewExpense($event)"></kab-new-expense>
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
  constructor() {}

  ngOnInit() {}
  saveNewExpense(expense: JournalEntry) {
    this.expenses = [...this.expenses, expense];
  }
  deleteExpense(expense: JournalEntry) {
    this.expenses = this.expenses.filter(p => p !== expense);
  }
}
