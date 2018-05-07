import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { MonthState, monthBalanceSelector } from "@routes/month/state";
import { MonthBalance } from "@routes/month/state/month-balance/models/month_balance.model";
import { Subscription } from "rxjs";

@Component({
  selector: "kab-review",
  template: `
  <kab-widget-header mode="h2" caption="Review what you do with your incomes of" value="{{monthBalance.incomes}} €"></kab-widget-header>
  <main>
    <dd>
      <dt>Total Income</dt>
      <dd><strong>{{monthBalance.incomes}} €</strong></dd>
    <dl>
      <dt>Regular Outgoings</dt>
      <dd><strong>{{monthBalance.outgoings}} €</strong></dd>
    </dl>
    <dl>
      <dt>Expenses</dt>
      <dd><strong>{{monthBalance.expenses}} €</strong></dd>
    </dl>
    <dl>
      <dt>Savings</dt>
      <dd><strong>{{monthBalance.savings}} €</strong></dd>
    </dl>
    <dl>
      <dt>Goal</dt>
      <dd><strong>{{monthBalance.goal}} €</strong></dd>
    </dl>
    <dl>
      <dt>Available</dt>
      <dd><strong>{{monthBalance.available}} €</strong></dd>
    </dl>
  </main>
  `,
  styles: []
})
export class ReviewComponent implements OnInit, OnDestroy {
  public monthBalanceSubscription: Subscription;
  public monthBalance: MonthBalance;

  constructor(private store: Store<MonthState>) { }

  ngOnInit() {
    this.monthBalanceSubscription = this.store
      .select(monthBalanceSelector)
      .subscribe(
        (monthBalance: MonthBalance) => (this.monthBalance = monthBalance)
      );
  }

  ngOnDestroy(): void {
    this.monthBalanceSubscription.unsubscribe();
  }
}
