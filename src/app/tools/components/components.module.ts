import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSnackBarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatTabsModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./layout/footer/footer.component";
import { HeaderComponent } from "./layout/header/header.component";
import { NavComponent } from "./layout/nav/nav.component";
import { WidgetHeaderComponent } from "./layout/widget-header/widget-header.component";
import { MonthNamePipe } from "./month-name.pipe";
import { ObjectKeysPipe } from "./object-keys.pipe";
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatTabsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavComponent,
    MonthNamePipe,
    ObjectKeysPipe,
    WidgetHeaderComponent,
    SidenavComponent,
  ],
  exports: [
    ReactiveFormsModule,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    SidenavComponent,
    MonthNamePipe,
    ObjectKeysPipe,
    WidgetHeaderComponent,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    FlexLayoutModule,
    MatTabsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
/**
 * Shared module with components for every view
 */
export class ComponentsModule { }
