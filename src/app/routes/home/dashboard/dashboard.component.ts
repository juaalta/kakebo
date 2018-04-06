import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";
import { GlobalState } from "@tools/global/state";
import { User } from "@tools/global/state/user/models/user.model";

@Component({
  selector: "kab-dashboard",
  template: `
  <section *ngIf="user?.userIsAnonymous ;else userData">
    <kab-widget-header mode="h1" caption="Kakebo" value="Welcome" ></kab-widget-header>
    <kab-widget-header mode="h2" caption="Take Control" value="Ledger for household economy."></kab-widget-header>
    <a class="button" routerLink="credentials/login"> Log in to start saving money </a>
  </section>
  <ng-template #userData>
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
  </ng-template>
        `,
  styles: []
})
export class DashboardComponent implements OnInit {
  public user: User;
  public year: number;
  public month: number;
  public balances$: Observable<any[]>;

  constructor(private store: Store<GlobalState>, private http: HttpClient) {
    const today = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth() + 1;
  }

  ngOnInit() {
    this.store
      .select(globalState => globalState.user)
      .subscribe((user: User) => {
        this.user = user;
        if (this.user && !this.user.userIsAnonymous) {
          const urlMonthBalances = environment.apiUrl + "priv/monthbalances/";
          this.balances$ = this.http.get<any[]>(urlMonthBalances);
        }
      });
  }
}
