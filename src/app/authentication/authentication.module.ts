import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RecoverComponent } from './recover/recover.component';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from '../shared/auth-layout/auth-layout.component';
import { SharedModule } from '../shared/shared.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    AlertModule.forRoot(),
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthLayoutComponent,
        children: [
          {
            path: '',
            component: LoginComponent
          },
          {
            path: 'recover-password',
            component: RecoverComponent
          }
        ]
      }
    ]),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [LoginComponent, RecoverComponent]
})
export class AuthenticationModule { }
