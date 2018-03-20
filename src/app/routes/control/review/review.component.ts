import { Component, OnInit } from "@angular/core";
import { MonthBalance } from "@routes/control/models/month_balance.model";

@Component({
  selector: "kab-review",
  template: `
  <h2>
    Review your balance
  </h2>
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
  </main>
  `,
  styles: []
})
export class ReviewComponent implements OnInit {
  public month_balance: MonthBalance = {
    year: 2018,
    month: 4,
    incomes: 1987,
    outgoigns: 357,
    expenses: 495,
    savings: 1135,
    goal: 0
  };
  constructor() {}

  ngOnInit() {}
}
