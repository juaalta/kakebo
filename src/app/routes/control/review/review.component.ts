import { Component, OnInit } from "@angular/core";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { StoreService } from "@routes/control/store.service";

@Component({
  selector: "kab-review",
  template: `
  <header>
    <h2>
      Review your balance
    </h2>
  </header>
  <main>
    <dd>
      <dt>Total Income</dt>
      <dd><strong>{{month_balance?.incomes}} €</strong></dd>
    <dl>
      <dt>Regular Outgoings</dt>
      <dd><strong>{{month_balance?.outgoigns}} €</strong></dd>
    </dl>
    <dl>
      <dt>Expenses</dt>
      <dd><strong>{{month_balance?.expenses}} €</strong></dd>
    </dl>
    <dl>
      <dt>Savings</dt>
      <dd><strong>{{month_balance?.savings}} €</strong></dd>
    </dl>
    <dl>
      <dt>Available</dt>
      <dd><strong>{{month_balance?.available}} €</strong></dd>
    </dl>
  </main>
  `,
  styles: []
})
export class ReviewComponent implements OnInit {
  public month_balance: MonthBalance;

  constructor(private store: StoreService) {}

  ngOnInit() {
    this.store.selectMonthBalance$.subscribe(res => (this.month_balance = res));
  }
}
