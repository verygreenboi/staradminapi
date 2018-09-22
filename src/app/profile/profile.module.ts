import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { PasswordComponent } from './password/password.component';
import { RouterModule } from '@angular/router';
import { DashLayoutComponent } from '../shared/dash-layout/dash-layout.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    AlertModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashLayoutComponent,
        children: [
          {
            path: '',
            component: EditComponent
          },
          {
            path: 'password',
            component: PasswordComponent
          }
        ]
      }
    ]),
    SharedModule
  ],
  declarations: [EditComponent, PasswordComponent],
  exports: [PasswordComponent]
})
export class ProfileModule { }
