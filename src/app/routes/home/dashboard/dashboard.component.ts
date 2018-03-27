import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { MonthBalance } from "@routes/control/models/month_balance.model";

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
        <th>Goal</th>
        <th>Available</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let balance of balances$ | async" >
        <td><a [routerLink]="['control',balance.year,balance.month]"> {{ balance.year }} </a></td>
        <td><a [routerLink]="['control',balance.year,balance.month]"> {{ balance.month | monthName }}</a></td>
        <td>{{ balance.incomes }}</td>
        <td>{{ balance.outgoings }}</td>
        <td>{{ balance.expenses }}</td>
        <td>{{ balance.savings }}</td>
        <td>{{ balance.goal }}</td>
        <td>{{ balance.available }}</td>
      </tr>
    </tbody>
  </table>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  private urlMonthBalances = environment.apiUrl + "pub/monthbalances/";
  public balances$;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.balances$ = this.http.get<MonthBalance[]>(this.urlMonthBalances);
  }
}
