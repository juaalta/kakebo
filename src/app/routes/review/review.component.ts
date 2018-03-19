import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-review",
  template: `
  <h2>
    Review your balance
  </h2>
  <main>
  <dd>
    <dt>Total Income</dt>
    <dd><strong>{{balance.incoming}}</strong></dd>
  <dl>
    <dt>Regular Outgoing</dt>
    <dd><strong>{{balance.outgoing}}</strong></dd>
  </dl>
  <dl>
    <dt>Expenses</dt>
    <dd><strong>{{balance.expenses}}</strong></dd>
  </dl>
  <dl>
    <dt>Saving</dt>
    <dd><strong>{{balance.savings}}</strong></dd>
  </dl>
  </main>
  `,
  styles: []
})
export class ReviewComponent implements OnInit {
  public balance = {
    incoming: 1987,
    outgoing: 357,
    expenses: 495,
    savings: 1135
  };
  constructor() {}

  ngOnInit() {}
}
