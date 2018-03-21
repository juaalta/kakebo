import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PlanRoutingModule } from "./plan-routing.module";
import { ComponentsModule } from "@tools/components/components.module";
import { PlanComponent } from "./plan.component";
import { IncomesComponent } from "./incomes/incomes.component";
import { OutgoingsComponent } from "./outgoings/outgoings.component";
import { PrevisionComponent } from "./prevision/prevision.component";
import { GoalComponent } from "@routes/control/plan/goal/goal.component";
import { PlanService } from "@routes/control/plan/plan.service";

@NgModule({
  imports: [CommonModule, PlanRoutingModule, ComponentsModule],
  declarations: [
    PlanComponent,
    IncomesComponent,
    OutgoingsComponent,
    PrevisionComponent,
    GoalComponent
  ],
  providers:[PlanService]
})
export class PlanningModule {}
