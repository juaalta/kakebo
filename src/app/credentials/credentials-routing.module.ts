import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CredentialsComponent } from './credentials/credentials.component';

const routes: Routes = [
  {
    path: 'login',
    component: CredentialsComponent,
    data: {
      alternateAction: 'Registration',
      credential: {
        email: 'admin@api-base.com',
        password: '1234'
      },
      endPoint: 'login',
      title: 'Log In'
    }
  },
  {
    path: 'registration',
    component: CredentialsComponent,
    data: {
      alternateAction: 'Log In',
      credential: { email: '', password: '' },
      endPoint: 'registration',
      title: 'Registration'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CredentialsRoutingModule {}
