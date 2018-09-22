import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BanksComponent } from './banks/banks.component';
import { BankComponent } from './bank/bank.component';
import { NewBankComponent } from './new/new.component';
import { routing } from './bank.routing';
import { SharedModule } from '../shared/shared.module';
import { BankService } from './bank.service';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomValidationModule } from 'ng4-validation';

@NgModule({
  imports: [
    AlertModule.forRoot(),
    CommonModule,
    CustomValidationModule,
    ReactiveFormsModule,
    routing,
    SharedModule
  ],
  declarations: [BanksComponent, BankComponent, NewBankComponent],
  providers: [
    BankService
  ]
})
export class BankModule { }
