import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-expenses-list",
  template: `
  <h3>Expenses <span class="float-right">495 €</span></h3>
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
    <td>{{ expense.category }}</td>
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
  public expenses = [];
  constructor() {}

  ngOnInit() {
    this.expenses.push({
      category: "General",
      description: "Clothes",
      amount: 495
    });
  }
  public delete(expense) {}
}
