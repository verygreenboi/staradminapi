import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { LoadWalletComponent } from './load-wallet/load-wallet.component';
import { LoadBankComponent } from './load-bank/load-bank.component';
import { routing } from './wallet.routing';
import { SharedModule } from '../shared/shared.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentModule } from '../payment/payment.module';

@NgModule({
  imports: [
    AlertModule.forRoot(),
    CommonModule,
    PaymentModule.forRoot(),
    ReactiveFormsModule,
    routing,
    SharedModule
  ],
  declarations: [OverviewComponent, LoadWalletComponent, LoadBankComponent]
})
export class WalletModule { }
