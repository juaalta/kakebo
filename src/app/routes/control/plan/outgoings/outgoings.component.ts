import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-outgoings",
  template: `
  <h3>Regular Outgoings <span class="float-right">357 €</span></h3>
  <p>Mortgage, energy, communications...</p>
  <table>
    <thead>
      <tr>
        <th>Outgoing</th>
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
export class OutgoingsComponent implements OnInit {
  public projections = [];
  constructor() {}

  ngOnInit() {
    this.projections.push({ description: "Mortgage", amount: 357 });
  }
  public delete(projection) {}
}
