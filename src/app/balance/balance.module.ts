import { BalanceComponent } from './balance.component';
import { BalanceRoutingModule } from './balance-routing.module';
import { CommonModule } from '@angular/common';
import { ExpensesComponent } from './expenses/expenses.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NewExpenseComponent } from './expenses/new-expense/new-expense.component';
import { ListExpensesComponent } from './expenses/list-expenses/list-expenses.component';

@NgModule({
  imports: [CommonModule, BalanceRoutingModule, FormsModule],
  declarations: [BalanceComponent, ExpensesComponent, NewExpenseComponent, ListExpensesComponent]
})
export class BalanceModule {}
