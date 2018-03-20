import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MonthlyControlComponent } from "@routes/monthly_control/monthly_control.component";

const routes: Routes = [
  {
    path: "",
    component: MonthlyControlComponent,
    children: [
      {
        path: "plan",
        loadChildren: "@routes/planning/planning.module#PlanningModule"
      },
      {
        path: "track",
        loadChildren: "@routes/spending/spending.module#SpendingModule"
      },
      {
        path: "review",
        loadChildren: "@routes/review/review.module#ReviewModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonthlyControlRoutingModule {}
