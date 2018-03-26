import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { ControlService } from "@routes/control/control.service";
import { StoreService } from "@routes/control/store.service";

@Component({
  selector: "kab-contol",
  template: `
  <h1>Balance on {{month_balance?.month | monthName }} of {{ month_balance?.year }} <span class="float-right">{{month_balance?.savings}} €</span></h1>
  <p>Have spent {{month_balance?.outgoigns + month_balance?.expenses}} € and want to save {{month_balance?.goal}} € </p>
  <kab-widget-header [target]="month_balance"></kab-widget-header>
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
  public month_balance: MonthBalance;
  public year: number;
  public month: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private controlService: ControlService,
    private store: StoreService
  ) {}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    this.year = +params["y"];
    this.month = +params["m"];
    this.month_balance = null;
    this.controlService.getMonthBalances(this.year, this.month);
    this.controlService.getJournalEntries();
    this.store.getMonthBalance$.subscribe(this.onMonthBalancesUpdated);
  }

  private onMonthBalancesUpdated = (monthBalances: MonthBalance[]) => {
    this.month_balance = this.controlService.filterMonthBalanceByYearMonth(
      monthBalances,
      this.year,
      this.month
    );
  };
}
