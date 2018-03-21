import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ControlRoutingModule } from "./control-routing.module";
import { ControlComponent } from "./control.component";
import { ComponentsModule } from "@tools/components/components.module";
import { ControlService } from "@routes/control/control.service";

@NgModule({
  imports: [CommonModule, ControlRoutingModule, ComponentsModule],
  declarations: [ControlComponent],
  providers:[ControlService]
})
export class ControlModule {}
