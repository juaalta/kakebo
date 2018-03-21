import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { ControlService } from "@routes/control/control.service";

@Component({
  selector: "kab-review",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <header>
    <h2>
      Review your balance
    </h2>
  </header>
  <main>
    <dd>
      <dt>Total Income</dt>
      <dd><strong>{{month_balance.incomes}}</strong></dd>
    <dl>
      <dt>Regular Outgoings</dt>
      <dd><strong>{{month_balance.outgoigns}}</strong></dd>
    </dl>
    <dl>
      <dt>Expenses</dt>
      <dd><strong>{{month_balance.expenses}}</strong></dd>
    </dl>
    <dl>
      <dt>Savings</dt>
      <dd><strong>{{month_balance.savings}}</strong></dd>
    </dl>
    <dl>
      <dt>Available</dt>
      <dd><strong>{{month_balance.available}}</strong></dd>
    </dl>
  </main>
  `,
  styles: []
})
export class ReviewComponent implements OnInit {
  public month_balance: MonthBalance;
  private year = 2018;
  private month = 3;

  constructor(private controlService: ControlService) {}

  ngOnInit() {
    this.getData();
  }
  private getData() {
    this.month_balance = this.controlService.getMonthBalance(
      this.year,
      this.month
    );
  }
}
