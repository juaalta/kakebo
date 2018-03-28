import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { StoreService } from "@routes/control/store.service";

@Component({
  selector: "kab-contol",
  template: `
  <section *ngIf="month_balance">
    <h1>Balance on {{month | monthName }} of {{ year }} <span class="float-right">{{month_balance.savings}} €</span></h1>
    <kab-widget-header [target]="month_balance"></kab-widget-header>
    <section class="row">
      <aside class="column column-20">
        <kab-nav></kab-nav>
      </aside>  
      <main class="column float-left">
        <router-outlet></router-outlet>
      </main>    
    </section>
  </section>
  <ng-template #noMonthBalance>
    <h2>No Balance for {{month | monthName }} of {{ year }}</h2>
    <p>Creating a new one...</p>
  </ng-template>
  `,
  styles: []
})
export class ControlComponent implements OnInit {
  public month_balance: MonthBalance;
  public year: number;
  public month: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: StoreService
  ) {}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    this.year = +params["y"];
    this.month = +params["m"];
    this.month_balance = null;
    this.store.selectMonthBalance$.subscribe(res => (this.month_balance = res));
    this.store.dispatchYearMonth(this.year, this.month);
    this.store.dispatchGetMonthBalances();
    this.store.dispatchGetJournalEntries();
  }
}
