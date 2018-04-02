import { Component, OnInit } from "@angular/core";
import { MonthBalance } from "@routes/month/models/month_balance.model";
import { StoreService } from "@routes/month/store.service";

@Component({
  selector: "kab-review",
  template: `
  <header>
    <h2>
    Review what you do with your incomes of <span class="float-right">{{month_balance.incomes}} €</span>
    </h2>
  </header>
  <main>
    <dd>
      <dt>Total Income</dt>
      <dd><strong>{{month_balance.incomes}} €</strong></dd>
    <dl>
      <dt>Regular Outgoings</dt>
      <dd><strong>{{month_balance.outgoings}} €</strong></dd>
    </dl>
    <dl>
      <dt>Expenses</dt>
      <dd><strong>{{month_balance.expenses}} €</strong></dd>
    </dl>
    <dl>
      <dt>Savings</dt>
      <dd><strong>{{month_balance.savings}} €</strong></dd>
    </dl>
    <dl>
      <dt>Goal</dt>
      <dd><strong>{{month_balance.goal}} €</strong></dd>
    </dl>
    <dl>
      <dt>Available</dt>
      <dd><strong>{{month_balance.available}} €</strong></dd>
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
