import { Component, OnInit } from "@angular/core";
import { JournalEntry } from "@routes/control/models/journal_entry.model";
import { ControlService } from "@routes/control/control.service";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { ActivatedRoute } from "@angular/router";
import { StoreService } from "@routes/control/store.service";

@Component({
  selector: "kab-track",
  template: `
    <header>
      <h2>
        Track your expenses. Left to expend <span class="float-right">{{month_balance?.available}} €</span>
      </h2>
      <kab-widget-header [target]="month_balance"></kab-widget-header>
    </header>
    <main class="column">
      <section>
        <kab-new-expense [year]="year" [month]="month" (saveExpense)="saveNewExpense($event)"></kab-new-expense>
      </section>
      <section>
        <kab-expenses-list [expensesToList]="expenses" (deleteExpense)="deleteExpense($event)"></kab-expenses-list>
      </section>
    <main>
  `,
  styles: []
})
export class TrackComponent implements OnInit {
  public expenses: JournalEntry[] = [];
  public month_balance: MonthBalance;
  public year: number;
  public month: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private controlService: ControlService,
    private store: StoreService
  ) {}

  ngOnInit() {
    const params = this.activatedRoute.parent.parent.snapshot.params;
    this.year = +params["y"];
    this.month = +params["m"];
    this.store.getMonthBalance$.subscribe(this.onMonthBalancesUpdated);
    this.store.getExpenses$.subscribe(res => (this.expenses = res));
  }
  public saveNewExpense(expense: JournalEntry) {
    this.controlService.postJournalEntry(expense);
  }
  public deleteExpense(expense: JournalEntry) {
    this.controlService.deleteJournalEntry(expense);
  }

  private onMonthBalancesUpdated = (monthBalances: MonthBalance[]): void => {
    this.month_balance = this.controlService.filterMonthBalanceByYearMonth(
      monthBalances,
      this.year,
      this.month
    );
  };
}
