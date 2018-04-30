import { BalanceComponent } from './balance.component';
import { BalanceRoutingModule } from './balance-routing.module';
import { CommonModule } from '@angular/common';
import { ExpensesComponent } from './expenses/expenses.component';
import { ForecastsComponent } from './forecasts/forecasts.component';
import { JournalEntryService } from './state/journal-entry.service';
import { ListExpensesComponent } from './expenses/list-expenses/list-expenses.component';
import { ListForecastsComponent } from './forecasts/list-forecasts/list-forecasts.component';
import { NewExpenseComponent } from './expenses/new-expense/new-expense.component';
import { NewForecastComponent } from './forecasts/new-forecast/new-forecast.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { JournalEntryApiService } from './state/journal-entry-api.service';
import { GoalComponent } from './goal/goal.component';
import { MonthBalanceService } from './state/month-balance.service';
import { MonthBalanceApiService } from './state/month-balance-api.service';
import { ReviewComponent } from './review/review.component';

@NgModule({
  imports: [BalanceRoutingModule, CommonModule, SharedModule],
  declarations: [
    BalanceComponent,
    ExpensesComponent,
    ForecastsComponent,
    ListExpensesComponent,
    ListForecastsComponent,
    NewExpenseComponent,
    NewForecastComponent,
    GoalComponent,
    ReviewComponent
  ],
  providers: [
    JournalEntryService,
    JournalEntryApiService,
    MonthBalanceService,
    MonthBalanceApiService
  ]
})
export class BalanceModule {}
