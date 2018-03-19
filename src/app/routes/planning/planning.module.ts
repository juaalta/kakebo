import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PlanningRoutingModule } from "./planning-routing.module";
import { ComponentsModule } from "@tools/components/components.module";

@NgModule({
  imports: [CommonModule, PlanningRoutingModule, ComponentsModule],
  declarations: []
})
export class PlanningModule {}
