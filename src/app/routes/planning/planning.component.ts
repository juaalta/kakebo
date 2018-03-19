import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-planning",
  template: `
    <header>
      <h2>
        Plan your incomes and regular outgoings
      </h2>
    </header>
    <main>
      <section class="row">
        <kab-savings class="container"></kab-savings>
        <kab-prevision class="container"></kab-prevision>
      </section>
      <section class="row">
        <kab-incomes class="container"></kab-incomes>
        <kab-outgoings class="container"></kab-outgoings>
      </section>
    <main>
  `,
  styles: []
})
export class PlanningComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
