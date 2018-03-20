import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-dashboard",
  template: `
  <header>
    <h3>Monthly balances <span class="float-right">495 €</span></h3>
    <p>General, Leisure, Culture, Extras...</p>
  </header>
  <table>
    <thead>
      <tr>
        <th>Year</th>
        <th>Month</th>
        <th>Incoming</th>
        <th>Outgoing</th>
        <th>Expenses</th>
        <th>Savings</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let balance of balances" >
        <td>{{ balance.year }}</td>
        <td><a [routerLink]="['control',2018,4]"> {{ balance.month }}</a></td>
        <td>{{ balance.incoming }}</td>
        <td>{{ balance.outgoing }}</td>
        <td>{{ balance.expenses }}</td>
        <td>{{ balance.savings }}</td>
      </tr>
    </tbody>
  </table>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  public balances = [];
  public balance = {
    year: 2018,
    month: 4,
    incoming: 1987,
    outgoing: 357,
    expenses: 495,
    savings: 1135
  };
  constructor() {}

  ngOnInit() {
    this.balances.push(this.balance);
  }
}
