import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-expenses-list",
  template: `
  <h3>Expenses <span class="float-right">495 €</span></h3>
  <p>General, Leisure, Culture, Extras...</p>
  <table>
    <thead>
      <tr>
        <th>Expense</th>
        <th>Amount</th>
        <th>X</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Description</td>
        <td>495</td>
        <td>X</td>
      </tr>
    </tbody>
  </table>
  `,
  styles: []
})
export class ExpensesListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
