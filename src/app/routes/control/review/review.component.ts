import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { ControlService } from "@routes/control/control.service";
import { ActivatedRoute } from "@angular/router";

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
      <dd><strong>{{month_balance.incomes}} €</strong></dd>
    <dl>
      <dt>Regular Outgoings</dt>
      <dd><strong>{{month_balance.outgoigns}} €</strong></dd>
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
      <dt>Available</dt>
      <dd><strong>{{month_balance.available}} €</strong></dd>
    </dl>
  </main>
  `,
  styles: []
})
export class ReviewComponent implements OnInit {
  public month_balance: MonthBalance;
  public year: number;
  public month: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private controlService: ControlService
  ) {}

  ngOnInit() {
    const params = this.activatedRoute.parent.parent.snapshot.params;
    this.year = +params["y"];
    this.month = +params["m"];
    this.getData();
  }
  private getData() {
    this.controlService
      .getMonthBalances$()
      .subscribe(
        monthBalances =>
          (this.month_balance = this.controlService.findMonthBalance(
            monthBalances,
            this.year,
            this.month
          ))
      );
  }
}
