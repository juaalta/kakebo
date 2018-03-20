import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ControlComponent } from "@routes/control/control.component";

const routes: Routes = [
  {
    path: "",
    component: ControlComponent,
    children: [
      {
        path: "plan",
        loadChildren: "@routes/control/planning/planning.module#PlanningModule"
      },
      {
        path: "track",
        loadChildren: "@routes/control/spending/spending.module#SpendingModule"
      },
      {
        path: "review",
        loadChildren: "@routes/control/review/review.module#ReviewModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlRoutingModule {}
