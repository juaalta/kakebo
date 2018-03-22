import { Component, OnInit } from "@angular/core";
import { JournalEntry } from "@routes/control/models/journal_entry.model";
import { ControlService } from "@routes/control/control.service";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { ActivatedRoute } from "@angular/router";

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
    private controlService: ControlService
  ) {}

  ngOnInit() {
    const params = this.activatedRoute.parent.parent.snapshot.params;
    this.year = +params["y"];
    this.month = +params["m"];
    this.getData();
  }
  public saveNewExpense(expense: JournalEntry) {
    this.controlService
      .postJournalEntry$(expense)
      .subscribe(() => this.getData());
  }
  public deleteExpense(expense: JournalEntry) {
    this.controlService
      .deleteJournalEntry$(expense)
      .subscribe(() => this.getData());
  }
  private getData() {
    this.controlService.getJournalEntries$().subscribe(journalEntries => {
      this.expenses = this.controlService.findJournalsByKind(
        journalEntries,
        "E",
        this.year,
        this.month
      );
    });
    this.controlService
      .getMonthBalance$(this.year, this.month)
      .subscribe(monthBalance => {
        this.month_balance = monthBalance;
      });
  }
}
