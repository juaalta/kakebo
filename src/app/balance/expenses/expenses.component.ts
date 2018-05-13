import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { JournalEntryService } from '../store/journal-entry.service';
import { expenseCategories } from '../store/models/expense-categories.model';
import { JournalEntry } from '../store/models/journal-entry.model';

@Component({
  selector: 'kab-expenses',
  templateUrl: './expenses.component.html',
  styles: []
})
export class ExpensesComponent implements OnInit {
  public title = 'New Expense';
  public expenseCategories = expenseCategories;
  public currentExpense: JournalEntry;
  public expensesList$: Observable<JournalEntry[]>;

  constructor(private jeService: JournalEntryService) {
    console.log('ExpensesComponent');
  }

  ngOnInit() {
    this.refreshData();
  }

  public onSaveExpense(expense: JournalEntry) {
    this.currentExpense = expense;
    this.jeService
      .saveJournalEntry$(this.currentExpense)
      .subscribe(this.refreshData);
  }
  public onDeleteExpense(expense: JournalEntry) {
    this.jeService
      .deleteJournalEntry$(expense)
      .subscribe(this.refreshData);
  }
  private refreshData = () => {
    this.currentExpense = this.jeService.getNewExpense();
    this.expensesList$ = this.jeService.getExpensesList$();
  };
}
