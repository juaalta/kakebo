import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { JournalEntry } from "@routes/month/state/journal-entry/models/journal-entry.model";
import { MonthBalance } from "@routes/month/state/month-balance/models/month_balance.model";
import { Store } from "@ngrx/store";
import {
  MonthState,
  monthBalanceSelector,
  journalEntriesSelector
} from "@routes/month/state";
import { map } from "rxjs/operators";
import {
  PostJournalEntry,
  DeleteJournalEntry
} from "@routes/month/state/journal-entry/journal-entry.actions";

@Component({
  selector: "kab-plan",
  template: `
    <kab-widget-header mode="h2" caption="Plan your goal to save" value="{{month_balance.goal}} €"></kab-widget-header>
    <main class="column">
      <kab-goal *ngIf="month_balance.incomes>0" class="" [month_balance]="month_balance" (setGoal)="setGoalForMonth($event)"></kab-goal>
      <section class="row">
        <section class="column column-40">
          <kab-prevision class="container" [year]="month_balance.year" [month]="month_balance.month" (saveProjection)="saveNewEntry($event)"></kab-prevision>
        </section>
        <section class="column column-50 column-offset-10">
          <kab-incomes class="container" 
          [projectionsToList]="projectedIncomes" 
          (deleteProjection)="deleteAnEntry($event)"></kab-incomes>
          <hr>
          <kab-outgoings class="container" 
          [projectionsToList]="projectedOutgoings" 
          (deleteProjection)="deleteAnEntry($event)"></kab-outgoings>
        </section>
      </section>
    <main>
  `,
  styles: []
})
export class PlanComponent implements OnInit, OnDestroy {
  public monthBalanceSubscription: Subscription;
  public projectedIncomesSubscription: Subscription;
  public projectedOutgoingsSubscription: Subscription;
  public projectedIncomes: JournalEntry[];
  public projectedOutgoings: JournalEntry[];
  public monthBalance: MonthBalance;

  constructor(private store: Store<MonthState>) {}

  ngOnInit() {
    this.monthBalanceSubscription = this.store
      .select(monthBalanceSelector)
      .subscribe(
        (monthBalance: MonthBalance) => (this.monthBalance = monthBalance)
      );
    this.projectedIncomesSubscription = this.store
      .select(journalEntriesSelector)
      .pipe(
        map((journalEntries: JournalEntry[]) =>
          journalEntries.filter(j => j.kind === "I")
        )
      )
      .subscribe(
        (expenses: JournalEntry[]) => (this.projectedIncomes = expenses)
      );
    this.projectedOutgoingsSubscription = this.store
      .select(journalEntriesSelector)
      .pipe(
        map((journalEntries: JournalEntry[]) =>
          journalEntries.filter(j => j.kind === "O")
        )
      )
      .subscribe(
        (expenses: JournalEntry[]) => (this.projectedOutgoings = expenses)
      );
  }

  public saveNewEntry(projectedEntry: JournalEntry) {
    this.store.dispatch(new PostJournalEntry(projectedEntry));
  }
  public deleteAnEntry(projectedEntry: JournalEntry) {
    this.store.dispatch(new DeleteJournalEntry(projectedEntry));
  }
  // SavingsGoal
  public setGoalForMonth(savingsGoal: any) {
    // this.store.dispatchSetGoalMonth(savingsGoal.goalToSave);
  }

  ngOnDestroy(): void {
    this.monthBalanceSubscription.unsubscribe();
    this.projectedIncomesSubscription.unsubscribe();
    this.projectedOutgoingsSubscription.unsubscribe();
  }
}
