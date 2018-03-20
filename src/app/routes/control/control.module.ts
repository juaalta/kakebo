import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ControlRoutingModule } from "./control-routing.module";
import { ControlComponent } from "./control.component";
import { ComponentsModule } from "@tools/components/components.module";

@NgModule({
  imports: [CommonModule, ControlRoutingModule, ComponentsModule],
  declarations: [ControlComponent]
})
export class ControlModule {}
