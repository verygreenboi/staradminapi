import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WalletPayment, defaultWalletPayment } from '../payment/payment';
import { ParseService } from '../parse.service';
import { map, startWith } from 'rxjs/operators/';

export interface WalletPaymentStatus {
  payment: WalletPayment;
  status: number;
}

export const defaultWalletPaymentStatus: WalletPaymentStatus = {
  payment: defaultWalletPayment,
  status: 0
};

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  subscription: Parse.Events;

  constructor(public parseService: ParseService) { }

  createWalletPayment(amount: number): Observable<WalletPayment> {
    const payment = new Parse.Object('Payment');
    payment.set('type', 0);
    payment.set('amount', amount);
    return this.parseService.save(payment).pipe(
      map(p => this.parseWalletPayment(p))
    );
  }

  getWalletPayment(id: string): Observable<WalletPayment> {
    const q = new Parse.Query('Payment');
    q.equalTo('objectId', id);
    return this.parseService.get(q).pipe(
      map(p => this.parseWalletPayment(p)),
      startWith(defaultWalletPayment)
    );
  }

  walletLive(id: string): Observable<WalletPayment> {
    const q = new Parse.Query('Payment');
    q.equalTo('objectId', id);
    this.subscription = q.subscribe();

    return Observable.create(emitter => {
      this.subscription.on('update', (object: Parse.Object) => {
        emitter.next(this.parseWalletPayment(object));
      });
      this.subscription.on('error', (err) => {
        emitter.error(err);
      });
    });
  }

  parseWalletPayment(p: Parse.Object): WalletPayment {
    return {
      amount: p.has('amount') ? p.get('amount') : 0,
      status: p.has('status') ? p.get('status') : 0,
      type: 0,
      btcAddress: p.has('btcAddress') ? p.get('btcAddress') : null,
      objectId: p.id,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt
    };
  }
}
