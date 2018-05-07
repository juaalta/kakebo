import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { MonthState, journalEntriesSelector, monthBalanceSelector } from "@routes/month/state";
import { DeleteJournalEntry, PostJournalEntry } from "@routes/month/state/journal-entry/journal-entry.actions";
import { JournalEntry } from "@routes/month/state/journal-entry/models/journal-entry.model";
import { MonthBalance } from "@routes/month/state/month-balance/models/month_balance.model";
import { SetGoalMonthBalance } from "@routes/month/state/month-balance/month-balance.actions";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "kab-plan",
  // template: `
  //   <kab-widget-header mode="h2" caption="Plan your goal to save" value="{{monthBalance.goal}} €"></kab-widget-header>
  //   <main class="column">
  //     <kab-goal *ngIf="monthBalance.incomes>0" class="" [monthBalance]="monthBalance" (setGoal)="setGoalForMonth($event)"></kab-goal>
  //     <section class="row">
  //       <section class="column column-40">
  //         <kab-prevision class="container" [year]="monthBalance.year" [month]="monthBalance.month" (saveProjection)="saveNewEntry($event)"></kab-prevision>
  //       </section>
  //       <section class="column column-50 column-offset-10">
  //         <kab-incomes class="container" 
  //         [projectionsToList]="projectedIncomes" 
  //         (deleteProjection)="deleteAnEntry($event)"></kab-incomes>
  //         <hr>
  //         <kab-outgoings class="container" 
  //         [projectionsToList]="projectedOutgoings" 
  //         (deleteProjection)="deleteAnEntry($event)"></kab-outgoings>
  //       </section>
  //     </section>
  //   <main>
  // `,
  templateUrl: './plan.component.html',
  styles: []
})
export class PlanComponent implements OnInit, OnDestroy {
  public monthBalanceSubscription: Subscription;
  public projectedIncomesSubscription: Subscription;
  public projectedOutgoingsSubscription: Subscription;
  public projectedIncomes: JournalEntry[];
  public projectedOutgoings: JournalEntry[];
  public monthBalance: MonthBalance;

  constructor(private store: Store<MonthState>) { }

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
    this.store.dispatch(
      new PostJournalEntry({
        monthBalance: this.monthBalance,
        journalEntry: projectedEntry
      })
    );
  }
  public deleteAnEntry(projectedEntry: JournalEntry) {
    this.store.dispatch(
      new DeleteJournalEntry({
        monthBalance: this.monthBalance,
        journalEntry: projectedEntry
      })
    );
  }

  public setGoalForMonth(savingsGoal: number) {
    const monthBalance = { ...this.monthBalance, goal: savingsGoal };
    this.store.dispatch(new SetGoalMonthBalance(monthBalance));
  }

  ngOnDestroy(): void {
    this.monthBalanceSubscription.unsubscribe();
    this.projectedIncomesSubscription.unsubscribe();
    this.projectedOutgoingsSubscription.unsubscribe();
  }
}
