import { Component, OnInit, Output, EventEmitter } from "@angular/core";
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
  @Output() saveExpense = new EventEmitter<JournalEntry>();
  public expenseCategories = expenseCategories;
  public form: FormGroup;
  constructor(private formbuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formbuilder.group({
      expenseCategory: [null, Validators.required],
      date: new Date().toISOString().substring(0, 10),
      description: "",
      amount: [0, Validators.required]
    });
  }

  public submit(expense: JournalEntry) {
    console.log(expense);
    expense.kind = "E";
    this.saveExpense.emit(expense);
  }
}
