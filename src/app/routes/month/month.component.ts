import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavLink } from "@tools/models/nav-link.model";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { Store, createFeatureSelector, createSelector } from "@ngrx/store";
import { MonthState } from "@routes/month/state";
import { GetMonthBalance } from "@routes/month/state/month-balance/month-balance.actions";
import { GetJournalEntries } from "@routes/month/state/journal-entry/journal-entry.actions";
import { MonthBalance } from "@routes/month/state/month-balance/models/month_balance.model";

@Component({
  selector: "kab-month",
  template: `

  <section *ngIf="monthBalance; else noMonthBalance">
    <kab-widget-header mode="h1" caption="Balance on {{month | monthName }} of {{ year }}" value="{{ monthBalance.savings }} €"></kab-widget-header>
    <section class="row">
      <aside class="column column-20">
        <kab-nav [navLinks]="navLinks"></kab-nav>
      </aside>  
      <main class="column float-left">
        
      </main>    
    </section>
  </section>
  <ng-template #noMonthBalance>
    nada
    <kab-widget-header mode="h3" caption="No Balance for {{month | monthName }} of {{ year }}" value="Creating a new one..."></kab-widget-header>
  </ng-template>
  {{ monthBalance | json }}
  `,
  styles: []
})
//<router-outlet></router-outlet>
export class MonthComponent implements OnInit {
  public year: number;
  public month: number;
  public monthBalance : MonthBalance;
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
    private store: Store<MonthState>
  ) {}

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    this.year = +params["y"];
    this.month = +params["m"];
    this.store.dispatch(
      new GetMonthBalance({ year: this.year, month: this.month })
    );
    this.store.dispatch(
      new GetJournalEntries({ year: this.year, month: this.month })
    );
    this.store
      .select(createSelector(createFeatureSelector<MonthState>('month'),(s)=>s.monthBalance))
      .subscribe((monthBalance: MonthBalance) => (this.monthBalance = monthBalance));
  }
}
