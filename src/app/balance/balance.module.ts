import { BalanceComponent } from './balance.component';
import { BalanceRoutingModule } from './balance-routing.module';
import { CommonModule } from '@angular/common';
import { ExpensesComponent } from './expenses/expenses.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, BalanceRoutingModule, FormsModule],
  declarations: [BalanceComponent, ExpensesComponent]
})
export class BalanceModule {}
