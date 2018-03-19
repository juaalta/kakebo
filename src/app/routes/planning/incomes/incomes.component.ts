import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-incomes",
  template: `
  <header>
    <h3>Incomes <span class="float-right">1987 €</span></h3>
    <p>Salary, extras...</p>
  </header>
  <table>
    <thead>
      <tr>
        <th>Income</th>
        <th>Amount</th>
        <th>X</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Description</td>
        <td>1987</td>
        <td>X</td>
      </tr>
    </tbody>
  </table>
  `,
  styles: []
})
export class IncomesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
