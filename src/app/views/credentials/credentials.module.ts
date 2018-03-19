import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CredentialsRoutingModule } from './credentials-routing.module';
import { ComponentsModule } from '@lib/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    CredentialsRoutingModule,
    ComponentsModule
  ],
  declarations: []
})
export class CredentialsModule { }
