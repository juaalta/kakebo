import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MonthBalance } from "@routes/month/models/month_balance.model";
import { StoreService } from "@routes/month/store.service";
import { NavLink } from "@tools/models/nav-link.model";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

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
    <h2>No Balance for {{month | monthName }} of {{ year }}</h2>
    <p>Creating a new one...</p>
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
    private store: StoreService
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
