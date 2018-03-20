import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PlanningComponent } from "@routes/monthly_control/plan/plan.component";

const routes: Routes = [
  {
    path: "",
    component: PlanningComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanRoutingModule {}
