import { Component, OnInit } from '@angular/core';
import {
  JournalEntry,
  expenseInitialState,
  journalEntriesInitialState
} from '../state/models/journal-entry.model';
import { expenseCategories } from '../state/models/expenseCategories.model';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'kab-expenses',
  templateUrl: './expenses.component.html',
  styles: []
})
export class ExpensesComponent implements OnInit {
  public expenseCategories = expenseCategories;
  public numberOfExpenses = 0;
  public expense: JournalEntry = expenseInitialState;
  public expenses: JournalEntry[] = journalEntriesInitialState;
  public title = 'New Expense';

  constructor() {}

  ngOnInit() {}

  public saveExpense() {
    const clonedJournalEntry = { ...this.expense };
    this.expenses.push(clonedJournalEntry);
    this.numberOfExpenses = this.expenses.length;
    this.expense = expenseInitialState;
  }
  public deleteExpense(expense: JournalEntry) {
    const index = this.expenses.indexOf(expense);
    this.expenses.splice(index, 1);
    this.numberOfExpenses = this.expenses.length;
  }

  public mustShowErrors = (control: AbstractControl) =>
    (control.touched || control.dirty) && control.invalid;
}
