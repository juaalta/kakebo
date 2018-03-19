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
    <dd><strong>1987</strong></dd>
  <dl>
    <dt>Regular Outgoing</dt>
    <dd><strong>357</strong></dd>
  </dl>
  <dl>
    <dt>Expenses</dt>
    <dd><strong>495</strong></dd>
  </dl>
  <dl>
    <dt>Saving</dt>
    <dd><strong>1135</strong></dd>
  </dl>
  </main>
  `,
  styles: []
})
export class ReviewComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
