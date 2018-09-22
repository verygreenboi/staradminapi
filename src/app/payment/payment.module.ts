import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentService } from './payment.service';
import { QrWidgetComponent } from './qr-widget/qr-widget.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [QrWidgetComponent],
  providers: [PaymentService]
})
export class PaymentModule {
  static forRoot() {
    return {
      ngModule: PaymentModule,
      providers: [PaymentService],
      exports: [QrWidgetComponent]
    };
  }
}
