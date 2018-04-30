import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CredentialsRoutingModule } from './credentials-routing.module';
import { CredentialsComponent } from './credentials/credentials.component';
import { SharedModule } from '../shared/shared.module';
import { CredentialsService } from './state/credentials.service';

@NgModule({
  imports: [
    CommonModule,
    CredentialsRoutingModule,
    SharedModule
  ],
  declarations: [CredentialsComponent],
  providers: [CredentialsService]
})
export class CredentialsModule {}
