import { Component, OnInit, Input, OnDestroy } from "@angular/core";

import { SavingsGoal } from "@routes/month/models/savings_goal.model";
import { Subscription } from "rxjs/Subscription";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";
import { MonthStore } from "@routes/month/state/month-store.state";
import { MonthBalance } from "@routes/month/state/models/month_balance.model";

@Component({
  selector: "kab-plan",
  template: `
    <kab-widget-header mode="h2" caption="Plan your goal to save" value="{{monthBalance.goal}} €"></kab-widget-header>
    <main class="column">
      <kab-goal *ngIf="monthBalance.incomes>0" class="" [monthBalance]="monthBalance" (setGoal)="setGoalForMonth($event)"></kab-goal>
      <section class="row">
        <section class="column column-40">
          <kab-prevision class="container" [year]="monthBalance.year" [month]="monthBalance.month" (saveProjection)="saveNewEntry($event)"></kab-prevision>
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

  constructor(private store: MonthStore) {}

  ngOnInit() {
    this.monthBalanceSubscription = this.store.selectMonthBalance$.subscribe(
      res => (this.monthBalance = res)
    );
    this.projectedIncomesSubscription = this.store.selectProjectedIncomes$.subscribe(
      res => (this.projectedIncomes = res)
    );
    this.projectedOutgoingsSubscription = this.store.selectProjectedOutgoings$.subscribe(
      res => (this.projectedOutgoings = res)
    );
  }

  public saveNewEntry(projectedEntry: JournalEntry) {
    this.store.dispatchPostJournalEntry(projectedEntry);
  }
  public deleteAnEntry(projectedEntry: JournalEntry) {
    this.store.dispatchDeleteJournalEntry(projectedEntry);
  }
  public setGoalForMonth(savingsGoal: SavingsGoal) {
    this.store.dispatchSetGoalMonth(savingsGoal.goalToSave);
  }

  ngOnDestroy(): void {
    this.monthBalanceSubscription.unsubscribe();
    this.projectedIncomesSubscription.unsubscribe();
    this.projectedOutgoingsSubscription.unsubscribe();
  }
}
