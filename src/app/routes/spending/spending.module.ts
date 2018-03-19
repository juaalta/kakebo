import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SpendingRoutingModule } from "./spending-routing.module";
import { ComponentsModule } from "@tools/components/components.module";
import { SpendingComponent } from './spending.component';
import { NewExpenseComponent } from './new-expense/new-expense.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';

@NgModule({
  imports: [CommonModule, SpendingRoutingModule, ComponentsModule],
  declarations: [SpendingComponent, NewExpenseComponent, ExpensesListComponent]
})
export class SpendingModule {}
