import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "@tools/components/components.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from './home.component';
@NgModule({
  imports: [CommonModule, ComponentsModule, HomeRoutingModule],
  declarations: [HomeComponent]
})
export class HomeModule {}
