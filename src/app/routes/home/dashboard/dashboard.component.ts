import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";

@Component({
  selector: "kab-dashboard",
  template: `
  <kab-widget-header mode="h1" caption="Kakebo" value="Monthly balances" ></kab-widget-header>
  <a [routerLink]="['month', year , month]"> Create or view a balance controller for the current month </a>
  <table>
    <thead>
      <tr>
        <th>Year</th>
        <th>Month</th>
        <th>Incoming</th>
        <th>Outgoing</th>
        <th>Expenses</th>
        <th><em>Goal</em></th>
        <th><strong>Savings</strong></th>
        <th>Available</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let balance of balances$ | async" >
        <td><a [routerLink]="['month',balance.year,balance.month]"> {{ balance.year }} </a></td>
        <td><a [routerLink]="['month',balance.year,balance.month]"> {{ balance.month | monthName }}</a></td>
        <td>{{ balance.incomes }}</td>
        <td>{{ balance.outgoings }}</td>
        <td>{{ balance.expenses }}</td>
        <td><em>{{ balance.goal }}</em></td>
        <td><strong>{{ balance.savings }}</strong></td>
        <td>{{ balance.available }}</td>
      </tr>
    </tbody>
  </table>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  private urlMonthBalances = environment.apiUrl + "priv/monthbalances/";
  public balances$;
  public year = new Date().getFullYear();
  public month = new Date().getMonth() + 1;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.balances$ = this.http.get<any[]>(this.urlMonthBalances);
  }
}
