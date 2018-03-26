import { Component, OnInit, Input } from "@angular/core";
import { JournalEntry } from "@routes/control/models/journal_entry.model";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { SavingsGoal } from "@routes/control/models/savings_goal.model";
import { ControlService } from "@routes/control/control.service";
import { StoreService } from "@routes/control/store.service";

@Component({
  selector: "kab-plan",
  template: `
    <header>
      <h2>
        Left to expend<span class="float-right">{{month_balance?.available}}  €</span>
      </h2>
      <kab-widget-header [target]="month_balance"></kab-widget-header>
    </header>
    <main class="column">
      <kab-goal *ngIf="month_balance?.incomes>0" class="" [month_balance]="month_balance" (setGoal)="setGoalForMonth($event)"></kab-goal>
      <section class="row">
        <section class="column column-40">
          <kab-prevision class="container" [year]="month_balance?.year" [month]="month_balance?.month" (saveProjection)="saveNewEntry($event)"></kab-prevision>
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
export class PlanComponent implements OnInit {
  public projectedIncomes: JournalEntry[];
  public projectedOutgoings: JournalEntry[];
  public month_balance: MonthBalance;

  constructor(
    private controlService: ControlService,
    private store: StoreService
  ) {}

  ngOnInit() {
    this.store.selectMonthBalance$.subscribe(res => (this.month_balance = res));
    this.store.selectProjectedIncomes$.subscribe(
      res => (this.projectedIncomes = res)
    );
    this.store.selectProjectedOutgoings$.subscribe(
      res => (this.projectedOutgoings = res)
    );
  }

  public saveNewEntry(projectedEntry: JournalEntry) {
    this.controlService.postJournalEntry(projectedEntry);
  }
  public deleteAnEntry(projectedEntry: JournalEntry) {
    this.controlService.deleteJournalEntry(projectedEntry);
  }
  public setGoalForMonth(savingsGoal: SavingsGoal) {
    this.month_balance.goal = savingsGoal.goalToSave;
    this.controlService.putMonthBalance(this.month_balance);
  }
}
