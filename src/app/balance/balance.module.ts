import { BalanceComponent } from './balance.component';
import { BalanceRoutingModule } from './balance-routing.module';
import { CommonModule } from '@angular/common';
import { ExpensesComponent } from './expenses/expenses.component';
import { FormsModule } from '@angular/forms';
import { JournalEntryService } from './state/journal-entry.service';
import { ListExpensesComponent } from './expenses/list-expenses/list-expenses.component';
import { NewExpenseComponent } from './expenses/new-expense/new-expense.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ForecastsComponent } from './forecasts/forecasts.component';
import { NewForecastComponent } from './forecasts/new-forecast/new-forecast.component';
import { ListForecastsComponent } from './forecasts/list-forecasts/list-forecasts.component';

@NgModule({
  imports: [
    CommonModule,
    BalanceRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    BalanceComponent,
    ExpensesComponent,
    NewExpenseComponent,
    ListExpensesComponent,
    ForecastsComponent,
    NewForecastComponent,
    ListForecastsComponent
  ],
  providers: [JournalEntryService]
})
export class BalanceModule {}
