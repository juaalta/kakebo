import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-plan",
  template: `
    <header>
      <h2>
        Plan your incomes and regular outgoings
      </h2>
    </header>
    <main class="row">
      <section class="column column-40">
        <kab-prevision class="container"></kab-prevision>
        <kab-goal class="container"></kab-goal>
      </section>
      <section class="column column-50 column-offset-10">
        <kab-incomes class="container"></kab-incomes>
        <kab-outgoings class="container"></kab-outgoings>
      </section>
    <main>
  `,
  styles: []
})
export class PlanComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
