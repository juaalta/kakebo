import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavLink } from "@tools/models/nav-link.model";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { MonthStore } from "@routes/month/state/month-store.state";
import { MonthBalance } from "@routes/month/state/models/month_balance.model";

@Component({
  selector: "kab-month",
  template: `
  <section *ngIf="month_balance$ | async ">
    <kab-widget-header mode="h1" caption="Balance on {{month | monthName }} of {{ year }}" value="{{savings$ | async}} €"></kab-widget-header>
    <section class="row">
      <aside class="column column-20">
        <kab-nav [navLinks]="navLinks"></kab-nav>
      </aside>  
      <main class="column float-left">
        <router-outlet></router-outlet>
      </main>    
    </section>
  </section>
  <ng-template #noMonthBalance>
    <kab-widget-header mode="h3" caption="No Balance for {{month | monthName }} of {{ year }}" value="Creating a new one..."></kab-widget-header>
  </ng-template>
  `,
  styles: []
})
export class MonthComponent implements OnInit {
  public month_balance$: Observable<MonthBalance>;
  public savings$: Observable<number>;
  public year: number;
  public month: number;
  public navLinks: NavLink[] = [
    {
      caption: "Plan",
      routerLink: "plan"
    },
    {
      caption: "Track",
      routerLink: "track"
    },
    {
      caption: "Review",
      routerLink: "review"
    }
  ];
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: MonthStore
  ) {}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    this.year = +params["y"];
    this.month = +params["m"];
    this.month_balance$ = this.store.selectMonthBalance$;
    this.savings$ = this.month_balance$.pipe(map(m => m.savings));
    this.store.dispatchYearMonth(this.year, this.month);
    this.store.dispatchGetMonthBalances();
    this.store.dispatchGetJournalEntries();
  }
}
