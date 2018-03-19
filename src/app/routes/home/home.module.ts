import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "@tools/components/components.module";
import { HomeRoutingModule } from "./home-routing.module";
@NgModule({
  imports: [CommonModule, ComponentsModule, HomeRoutingModule],
  declarations: []
})
export class HomeModule {}
