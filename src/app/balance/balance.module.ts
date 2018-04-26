import { BalanceComponent } from './balance.component';
import { BalanceRoutingModule } from './balance-routing.module';
import { CommonModule } from '@angular/common';
import { ExpensesComponent } from './expenses/expenses.component';
import { FormsModule } from '@angular/forms';
import { JournalEntryService } from './state/journal-entry.service';
import { ListExpensesComponent } from './expenses/list-expenses/list-expenses.component';
import { NewExpenseComponent } from './expenses/new-expense/new-expense.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, BalanceRoutingModule, FormsModule],
  declarations: [
    BalanceComponent,
    ExpensesComponent,
    NewExpenseComponent,
    ListExpensesComponent
  ],
  providers: [JournalEntryService]
})
export class BalanceModule {}
