import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { JournalEntry } from "@routes/month/models/journal_entry.model";
import { MonthBalance } from "@routes/month/models/month_balance.model";
import { SavingsGoal } from "@routes/month/models/savings_goal.model";
import { StoreService } from "@routes/month/store.service";
import { Subscription } from "rxjs/Subscription";

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
  public month_balance: MonthBalance;

  constructor(private store: StoreService) {}

  ngOnInit() {
    this.monthBalanceSubscription = this.store.selectMonthBalance$.subscribe(
      res => (this.month_balance = res)
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
