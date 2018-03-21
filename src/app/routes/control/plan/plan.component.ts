import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";
import { JournalEntry } from "@routes/control/models/journal_entry.model";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { SavingsGoal } from "@routes/control/models/savings_goal.model";
import { PlanService } from "@routes/control/plan/plan.service";

@Component({
  selector: "kab-plan",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header>
      <h2>
        Set saving goal of {{ this.month_balance.goal }} € and left to expend <span class="float-right">{{availableToExpend}} €</span>
      </h2>
    </header>
    <main class="row">
      <section class="column column-40">
        <kab-prevision class="container" (saveProjection)="saveNewEntry($event)"></kab-prevision>
        <hr>
        <kab-goal class="container" [month_balance]="month_balance" (setGoal)="setGoalForMonth($event)"></kab-goal>
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
    <main>
  `,
  styles: []
})
export class PlanComponent implements OnInit {
  public projectedIncomes: JournalEntry[];
  public projectedOutgoings: JournalEntry[];
  public month_balance: MonthBalance;
  public availableToExpend = 0;
  private year: 2018;
  private month: 4;

  constructor(private planService: PlanService) {}

  ngOnInit() {
    this.getData();
  }

  public saveNewEntry(projectedEntry: JournalEntry) {
    this.planService.postNewEntry(projectedEntry);
    this.getData();
  }
  public deleteAnEntry(projectedEntry: JournalEntry) {
    this.planService.deleteEntry(projectedEntry);
    this.getData();
  }
  public setGoalForMonth(savingsGoal: SavingsGoal) {
    savingsGoal.year = this.year;
    savingsGoal.month = this.month;
    this.planService.setGoalForMonth(savingsGoal);
    this.getData();
  }

  private getData() {
    this.projectedIncomes = this.planService.projectedIncomes;
    this.projectedOutgoings = this.planService.projectedOutgoins;
    this.month_balance = this.planService.month_balance;
    this.availableToExpend = this.planService.availableToExpend;
  }
}
