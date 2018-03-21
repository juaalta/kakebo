import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "kab-dashboard",
  changeDetection: ChangeDetectionStrategy.OnPush,
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
        <td><a [routerLink]="['control',balance.year,balance.month]"> {{ balance.year }} </a></td>
        <td><a [routerLink]="['control',balance.year,balance.month]"> {{ balance.month | monthName }}</a></td>
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
    month: 3,
    incoming: 0,
    outgoing: 0,
    expenses: 0,
    savings: 0
  };
  constructor() {}

  ngOnInit() {
    this.balances = [...this.balances, this.balance];
  }
}
