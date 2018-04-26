import { Component, OnInit } from '@angular/core';
import { JournalEntry } from '../state/models/journal-entry.model';
import { expenseCategories } from '../state/models/expense-categories.model';
import { JournalEntryService } from '../state/journal-entry.service';

@Component({
  selector: 'kab-expenses',
  templateUrl: './expenses.component.html',
  styles: []
})
export class ExpensesComponent implements OnInit {
  public expenseCategories = expenseCategories;
  public currentExpense: JournalEntry;
  public expensesList: JournalEntry[];
  public title = 'New Expense';

  constructor(private jeService: JournalEntryService) {}

  ngOnInit() {
    this.refreshData();
  }

  public onSaveExpense() {
    this.jeService.saveJournalEntry(this.currentExpense);
    this.refreshData();
  }
  public onDeleteExpense(expense: JournalEntry) {
    this.jeService.deleteJournalEntry(expense);
    this.refreshData();
  }
  private refreshData = () => {
    this.currentExpense = this.jeService.getNewExpense();
    this.expensesList = this.jeService.getExpensesList();
  };
}
