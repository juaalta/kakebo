import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kab-spending",
  template: `
    <header>
      <h2> Track your expenses </h2>
    </header>
    <main class="column">
      <section>
        <kab-new-expense></kab-new-expense>
      </section>
      <section>
        <kab-expenses-list></kab-expenses-list>
      </section>
    <main>
  `,
  styles: []
})
export class SpendingComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
