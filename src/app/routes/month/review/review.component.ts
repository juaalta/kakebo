import { Component, OnInit, OnDestroy } from "@angular/core";
import { MonthBalance } from "@routes/month/models/month_balance.model";
import { StoreService } from "@routes/month/store.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "kab-review",
  template: `
  <kab-widget-header mode="h2" caption="Review what you do with your incomes of" value="{{month_balance.incomes}} €"></kab-widget-header>
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
export class ReviewComponent implements OnInit, OnDestroy {
  public monthBalanceSubscription: Subscription;
  public month_balance: MonthBalance;

  constructor(private store: StoreService) {}

  ngOnInit() {
    this.monthBalanceSubscription = this.store.selectMonthBalance$.subscribe(
      res => (this.month_balance = res)
    );
  }

  ngOnDestroy(): void {
    this.monthBalanceSubscription.unsubscribe();
  }
}
