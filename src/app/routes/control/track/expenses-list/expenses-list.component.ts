import { Component, OnInit } from "@angular/core";
import { JournalEntry } from "@routes/control/models/journal_entry.model";

@Component({
  selector: "kab-expenses-list",
  template: `
  <h3>Expenses <span class="float-right">{{ expenses[0].amount }} €</span></h3>
  <p>General, Leisure, Culture, Extras...</p>
  <table>
    <thead>
      <tr>
        <th>Category</th>
        <th>Expense</th>
        <th>Amount</th>
        <th>X</th>
      </tr>
    </thead>
    <tbody>
    <tr *ngFor="let expense of expenses">
    <td>{{ expense.expenseCategory | categoryName }}</td>
    <td>{{ expense.description }}</td>
    <td>{{ expense.amount }}</td>
    <td><button (click)="delete(expense)">X</button>  </td>
      </tr>
    </tbody>
  </table>
  `,
  styles: []
})
export class ExpensesListComponent implements OnInit {
  public expenses: JournalEntry[] = [];
  constructor() {}

  ngOnInit() {
    this.expenses.push({
      kind: "E",
      year: 2018,
      month: 4,
      day: 1,
      expenseCategory: "G",
      description: "Clothes",
      amount: 159
    });
  }
  public delete(expense) {}
}
