import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BalanceRoutingModule } from './balance-routing.module';
import { BalanceComponent } from './balance.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ListExpensesComponent } from './expenses/list-expenses/list-expenses.component';
import { NewExpenseComponent } from './expenses/new-expense/new-expense.component';
import { ForecastsComponent } from './forecasts/forecasts.component';
import { ListForecastsComponent } from './forecasts/list-forecasts/list-forecasts.component';
import { NewForecastComponent } from './forecasts/new-forecast/new-forecast.component';
import { GoalComponent } from './goal/goal.component';
import { ReviewComponent } from './review/review.component';
import { MonthBalanceStoreService } from './store/balance-store.service';
import { JournalEntryApiService } from './store/journal-entry-api.service';
import { JournalEntryService } from './store/journal-entry.service';
import { MonthBalanceApiService } from './store/month-balance-api.service';
import { MonthBalanceService } from './store/month-balance.service';

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
    MonthBalanceApiService,
    MonthBalanceStoreService
  ]
})
export class BalanceModule {}
