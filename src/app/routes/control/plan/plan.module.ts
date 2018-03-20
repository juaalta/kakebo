import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PlanRoutingModule } from "./plan-routing.module";
import { ComponentsModule } from "@tools/components/components.module";
import { PlanComponent } from "./plan.component";
import { IncomesComponent } from "./incomes/incomes.component";
import { OutgoingsComponent } from "./outgoings/outgoings.component";
import { PrevisionComponent } from "./prevision/prevision.component";
import { SavingsComponent } from "./savings/savings.component";

@NgModule({
  imports: [CommonModule, PlanRoutingModule, ComponentsModule],
  declarations: [
    PlanComponent,
    IncomesComponent,
    OutgoingsComponent,
    PrevisionComponent,
    SavingsComponent
  ]
})
export class PlanningModule {}
