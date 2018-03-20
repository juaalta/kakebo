import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { JournalEntry } from "@routes/control/models/journal_entry.model";
import { expenseCategories } from "@routes/control/models/expenseCategories.model";
@Component({
  selector: "kab-new-expense",
  template: `
  <h3>Record a new Expense</h3>
  <form [formGroup]="form" (submit)="submit(form.value)">
    <fieldset>
      <label for="expenseCategory">Category</label>
      <select id="expenseCategory" formControlName="expenseCategory">
        <option *ngFor="let expenseCategory of expenseCategories | objectKeys" [value]="expenseCategory">{{ expenseCategory | categoryName }}</option>
      </select>
      <label for="date">Date</label>
      <input type="date" formControlName="date">
      <label for="description">Description</label>
      <input type="text" formControlName="description">
      <label for="amount">Amount</label>
      <input type="number" formControlName="amount">
      <input class="button-primary" type="submit" value="Save Expense" [disabled]="form.invalid" >
    </fieldset>
  </form>
  `,
  styles: []
})
export class NewExpenseComponent implements OnInit {
  public expenseCategories = expenseCategories;
  public form: FormGroup;
  private expense: JournalEntry;
  constructor(private formbuilder: FormBuilder) {}

  ngOnInit() {
    this.expense = {
      kind: "E",
      year: 2018,
      month: 4,
      day: 1,
      expenseCategory: null,
      description: "",
      amount: 0
    };
    this.form = this.formbuilder.group({
      expenseCategory: [this.expense.expenseCategory, Validators.required],
      date: new Date(
        this.expense.year,
        this.expense.month - 1,
        this.expense.day,
        12,
        0,
        0
      )
        .toISOString()
        .substring(0, 10),
      description: this.expense.description,
      amount: [this.expense.amount, Validators.required]
    });
  }

  public submit(expense) {
    console.log(expense);
    this.expense.expenseCategory = expense.expenseCategory;
    this.expense.description = expense.description;
    this.expense.amount = expense.amount;
  }
}
