import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MonthBalance } from "@routes/control/models/month_balance.model";

@Component({
  selector: "kab-contol",
  template: `
  <h1>Available On {{month_balance.month | monthName }} of {{ month_balance.year }} <span class="float-right">{{available}} €</span></h1>
  <section class="row">
    <aside class="column column-20">
      <kab-nav></kab-nav>
    </aside>  
    <main class="column float-left">
      <router-outlet></router-outlet>
    </main>    
  </section>
  `,
  styles: []
})
export class ControlComponent implements OnInit {
  public available = 0;
  public month_balance: MonthBalance = {
    year: 2018,
    month: 4,
    incomes: 1987,
    outgoigns: 867,
    expenses: 0,
    savings: 0,
    goal: 0
  };
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;

    this.month_balance.month = params["m"];
    this.month_balance.year = params["y"];
    this.available =
      this.month_balance.incomes -
      this.month_balance.outgoigns -
      this.month_balance.expenses;
  }
}
