import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { NavComponent } from "./layout/nav/nav.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { MonthNamePipe } from "./month-name.pipe";
import { ObjectKeysPipe } from "./object-keys.pipe";
import { WidgetComponent } from "./layout/widget/widget.component";

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavComponent,
    MonthNamePipe,
    ObjectKeysPipe,
    WidgetComponent
  ],
  exports: [
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    MonthNamePipe,
    ObjectKeysPipe,
    WidgetComponent
  ]
})
/**
 * Shared module with components for every view
 */
export class ComponentsModule {}
