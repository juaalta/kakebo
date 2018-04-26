import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalanceComponent } from './balance.component';
import { ForecastsComponent } from './forecasts/forecasts.component';
import { ExpensesComponent } from './expenses/expenses.component';

const routes: Routes = [
  {
    path: '',
    component: BalanceComponent
  },
  {
    path: 'forecasts',
    component: ForecastsComponent
  },
  {
    path: 'expenses',
    component: ExpensesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalanceRoutingModule {}
