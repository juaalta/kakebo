import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PlanningRoutingModule } from "./planning-routing.module";
import { ComponentsModule } from "@tools/components/components.module";
import { PlanningComponent } from './planning.component';
import { IncomesComponent } from './incomes/incomes.component';
import { OutgoingsComponent } from './outgoings/outgoings.component';
import { PrevisionComponent } from './prevision/prevision.component';
import { SavingsComponent } from './savings/savings.component';

@NgModule({
  imports: [CommonModule, PlanningRoutingModule, ComponentsModule],
  declarations: [PlanningComponent, IncomesComponent, OutgoingsComponent, PrevisionComponent, SavingsComponent]
})
export class PlanningModule {}
