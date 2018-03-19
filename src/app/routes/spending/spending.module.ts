import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SpendingRoutingModule } from "./spending-routing.module";
import { ComponentsModule } from "@tools/components/components.module";
import { SpendingComponent } from './spending.component';

@NgModule({
  imports: [CommonModule, SpendingRoutingModule, ComponentsModule],
  declarations: [SpendingComponent]
})
export class SpendingModule {}
