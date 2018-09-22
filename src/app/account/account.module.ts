import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { routing } from './account.routing';
import { SharedModule } from '../shared/shared.module';
import { AlertModule } from 'ngx-bootstrap';
import { CustomValidationModule } from 'ng4-validation';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountService } from './account.service';

@NgModule({
  imports: [
    AlertModule.forRoot(),
    CommonModule,
    CustomValidationModule,
    ReactiveFormsModule,
    routing,
    SharedModule
  ],
  declarations: [AccountsComponent, AccountComponent, NewAccountComponent],
  providers: [
    AccountService
  ]
})
export class AccountModule { }
