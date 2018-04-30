import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BalanceComponent } from './balance.component';
import { ForecastsComponent } from './forecasts/forecasts.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { GoalComponent } from './goal/goal.component';

const routes: Routes = [
  {
    path: '',
    component: BalanceComponent,
    children: [
      {
        path: '',
        redirectTo: 'goal'
      },
      {
        path: 'forecasts',
        component: ForecastsComponent
      },
      {
        path: 'expenses',
        component: ExpensesComponent
      },
      {
        path: 'goal',
        component: GoalComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalanceRoutingModule {}
