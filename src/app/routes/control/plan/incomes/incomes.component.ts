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
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let projection of projections">
        <td>{{ projection.description }}</td>
        <td>{{ projection.amount }}</td>
        <td><button (click)="delete(projection)">X</button>  </td>
      </tr>
    </tbody>
  </table>
  `,
  styles: []
})
export class IncomesComponent implements OnInit {
  public projections = [];
  constructor() {}

  ngOnInit() {
    this.projections.push({ description: "Salary", amount: 1987 });
  }
  public delete(projection) {}
}
