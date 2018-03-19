import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SpendingRoutingModule } from "./spending-routing.module";
import { ComponentsModule } from "@tools/components/components.module";

@NgModule({
  imports: [CommonModule, SpendingRoutingModule, ComponentsModule],
  declarations: []
})
export class SpendingModule {}
