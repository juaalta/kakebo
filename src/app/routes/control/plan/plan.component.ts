import { Component, OnInit, Input, ChangeDetectionStrategy } from "@angular/core";
import { JournalEntry } from "@routes/control/models/journal_entry.model";
import { MonthBalance } from "@routes/control/models/month_balance.model";
import { SavingsGoal } from "@routes/control/models/savings_goal.model";

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
  public projectedEntries: JournalEntry[] = [];
  public projectedIncomes: JournalEntry[];
  public projectedOutgoings: JournalEntry[];
  public month_balance: MonthBalance = {
    year: 0,
    month: 0,
    incomes: 0,
    outgoigns: 0,
    expenses: 0,
    savings: 0,
    goal: 0
  };
  public availableToExpend = 0;

  constructor() {}

  ngOnInit() {}

  saveNewEntry(projectedEntry: JournalEntry) {
    this.projectedEntries = [...this.projectedEntries, projectedEntry];
    this.updateFilterdeLists();
  }
  deleteAnEntry(projectedEntry: JournalEntry) {
    this.projectedEntries = this.projectedEntries.filter(
      p => p !== projectedEntry
    );
    this.updateFilterdeLists();
  }
  public setGoalForMonth(savingsGoal: SavingsGoal) {
    this.month_balance = {
      ...this.month_balance,
      goal: savingsGoal.goalToSave
    };
    this.updateAvailableAmount();
  }
  private updateFilterdeLists() {
    this.projectedIncomes = this.projectedEntries.filter(p => p.kind === "I");
    this.projectedOutgoings = this.projectedEntries.filter(p => p.kind === "O");
    this.month_balance = {
      ...this.month_balance,
      incomes: this.sumAmount(this.projectedIncomes),
      outgoigns: this.sumAmount(this.projectedOutgoings)
    };
    this.updateAvailableAmount();
  }
  private updateAvailableAmount() {
    this.availableToExpend =
      this.month_balance.incomes -
      this.month_balance.outgoigns -
      this.month_balance.goal;
  }

  private sumAmount = (entries: JournalEntry[]) =>
    entries.map(p => p.amount).reduce((state, current) => state + current, 0);
}
