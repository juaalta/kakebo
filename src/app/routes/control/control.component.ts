import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { ControlService } from "@routes/control/control.service";

@Component({
  selector: "kab-contol",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <h1>Savings on {{month_balance.month | monthName }} of {{ month_balance.year }} <span class="float-right">{{month_balance.savings}} €</span></h1>
  <h4>Have spent {{month_balance.outgoigns + month_balance.expenses}} € </h4>
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
  public savings = 0;
  public month_balance: MonthBalance;

  constructor(
    private activatedRoute: ActivatedRoute,
    private controlService: ControlService
  ) {}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    this.month_balance = this.controlService.getMonthBalance(
      +params["y"],
      +params["m"]
    );
  }
}
