import { Component, OnInit } from '@angular/core';
import {
  JournalEntry,
  expenseInitialState,
  journalEntriesInitialState
} from '../state/models/journal-entry.model';
import { expenseCategories } from '../state/models/expense-categories.model';

@Component({
  selector: 'kab-expenses',
  templateUrl: './expenses.component.html',
  styles: []
})
export class ExpensesComponent implements OnInit {
  public expenseCategories = expenseCategories;
  public currentExpense: JournalEntry = expenseInitialState;
  public expensesList: JournalEntry[] = journalEntriesInitialState;
  public title = 'New Expense';

  constructor() {}

  ngOnInit() {}

  public saveExpense() {
    const clonedJournalEntry = {
      ...this.currentExpense,
      _id: new Date().getTime().toString()
    };
    this.expensesList.push(clonedJournalEntry);
    this.currentExpense = expenseInitialState;
  }
  public deleteExpense(expense: JournalEntry) {
    const index = this.expensesList.indexOf(expense);
    this.expensesList.splice(index, 1);
  }
}
