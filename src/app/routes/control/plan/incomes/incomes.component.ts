import { Component, OnInit } from "@angular/core";
import { JournalEntry } from "@routes/control/models/journal_entry.model";

@Component({
  selector: "kab-incomes",
  template: `
  <header>
    <h3>Projected Incomes <span class="float-right">{{projections[0].amount}} €</span></h3>
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
  public projections: JournalEntry[] = [];
  constructor() {}

  ngOnInit() {
    this.projections.push({
      year: 2018,
      month: 4,
      day: 1,
      kind: "I",
      description: "Salary",
      amount: 1987
    });
  }
  public delete(projection) {}
}
