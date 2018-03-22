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
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "kab-plan",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header>
      <h2>
        Left to expend<span class="float-right">{{month_balance.available}}  €</span>
      </h2>
      <kab-widget-header [target]="month_balance"></kab-widget-header>
    </header>
    <main class="column">
      <kab-goal *ngIf="month_balance.incomes>0" class="" [month_balance]="month_balance" (setGoal)="setGoalForMonth($event)"></kab-goal>
      <section class="row">
        <section class="column column-40">
          <kab-prevision class="container" [year]="year" [month]="month" (saveProjection)="saveNewEntry($event)"></kab-prevision>
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
  public year :number;
  public month :number;

  constructor(private activatedRoute: ActivatedRoute, private planService: PlanService) {}

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
    this.planService.setGoalForMonth(savingsGoal);
    this.getData();
  }

  private getData() {
    const params = this.activatedRoute.parent.parent.snapshot.params;
    this.year = +params["y"];
    this.month = +params["m"];
    this.projectedIncomes = this.planService.projectedIncomes;
    this.projectedOutgoings = this.planService.projectedOutgoins;
    this.month_balance = this.planService.month_balance;
  }
}
